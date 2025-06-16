const functions = require('firebase-functions');
const admin = require('firebase-admin');
const puppeteer = require('puppeteer');
const cors = require('cors')({ origin: true });

admin.initializeApp();

// Amazon検索関数
async function searchAmazon(keyword, asin) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    
    // User-Agentを設定
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    
    // Amazon検索
    await page.goto(`https://www.amazon.co.jp/s?k=${encodeURIComponent(keyword)}`, {
      waitUntil: 'networkidle2',
      timeout: 30000
    });
    
    // 検索結果を取得
    let rank = 999; // デフォルトは圏外
    let foundOnPage = 1;
    
    // 最大5ページまで検索
    for (let pageNum = 1; pageNum <= 5; pageNum++) {
      if (pageNum > 1) {
        // 次のページへ
        try {
          await page.click('a.s-pagination-next');
          await page.waitForNavigation({ waitUntil: 'networkidle2' });
        } catch (e) {
          break; // 次のページがない
        }
      }
      
      // 商品リストを取得
      const products = await page.evaluate(() => {
        const items = [];
        const productElements = document.querySelectorAll('[data-component-type="s-search-result"]');
        
        productElements.forEach((el, index) => {
          const linkElement = el.querySelector('h2 a');
          if (linkElement) {
            const href = linkElement.href;
            const asinMatch = href.match(/\/dp\/([A-Z0-9]{10})/);
            if (asinMatch) {
              items.push({
                rank: index + 1,
                asin: asinMatch[1],
                title: linkElement.textContent.trim()
              });
            }
          }
        });
        
        return items;
      });
      
      // ASINが一致する商品を探す
      const found = products.find(p => p.asin === asin);
      if (found) {
        rank = (pageNum - 1) * 24 + found.rank; // ページあたり約24商品
        foundOnPage = pageNum;
        break;
      }
    }
    
    return { rank, foundOnPage };
    
  } finally {
    await browser.close();
  }
}

// 楽天検索関数
async function searchRakuten(keyword, itemUrl) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    
    // 楽天検索
    await page.goto(`https://search.rakuten.co.jp/search/mall/${encodeURIComponent(keyword)}/`, {
      waitUntil: 'networkidle2',
      timeout: 30000
    });
    
    let rank = 999;
    let foundOnPage = 1;
    
    // 商品URLからショップ名と商品IDを抽出
    const itemMatch = itemUrl.match(/item\.rakuten\.co\.jp\/([^\/]+)\/([^\/\?]+)/);
    if (!itemMatch) return { rank, foundOnPage };
    
    const shopName = itemMatch[1];
    const itemId = itemMatch[2];
    
    // 最大5ページまで検索
    for (let pageNum = 1; pageNum <= 5; pageNum++) {
      if (pageNum > 1) {
        try {
          await page.goto(`https://search.rakuten.co.jp/search/mall/${encodeURIComponent(keyword)}/?p=${pageNum}`, {
            waitUntil: 'networkidle2'
          });
        } catch (e) {
          break;
        }
      }
      
      // 商品リストを取得
      const products = await page.evaluate(() => {
        const items = [];
        const productElements = document.querySelectorAll('.searchresultitem');
        
        productElements.forEach((el, index) => {
          const linkElement = el.querySelector('.title a');
          if (linkElement) {
            items.push({
              rank: index + 1,
              url: linkElement.href,
              title: linkElement.textContent.trim()
            });
          }
        });
        
        return items;
      });
      
      // URLが一致する商品を探す
      const found = products.find(p => 
        p.url.includes(shopName) && p.url.includes(itemId)
      );
      
      if (found) {
        rank = (pageNum - 1) * 45 + found.rank; // ページあたり約45商品
        foundOnPage = pageNum;
        break;
      }
    }
    
    return { rank, foundOnPage };
    
  } finally {
    await browser.close();
  }
}

// メインの検索関数
exports.searchRankings = functions
  .runWith({
    timeoutSeconds: 300,
    memory: '2GB'
  })
  .https.onRequest((request, response) => {
    cors(request, response, async () => {
      try {
        const { keyword, amazonUrl, rakutenUrl } = request.body;
        
        if (!keyword) {
          return response.status(400).json({ error: 'キーワードが必要です' });
        }
        
        const results = {
          keyword,
          amazonRank: 999,
          rakutenRank: 999,
          searchDate: new Date().toISOString()
        };
        
        // Amazon検索
        if (amazonUrl) {
          const asinMatch = amazonUrl.match(/\/dp\/([A-Z0-9]{10})/);
          if (asinMatch) {
            try {
              const amazonResult = await searchAmazon(keyword, asinMatch[1]);
              results.amazonRank = amazonResult.rank;
              results.amazonPage = amazonResult.foundOnPage;
            } catch (error) {
              console.error('Amazon検索エラー:', error);
              results.amazonError = error.message;
            }
          }
        }
        
        // 楽天検索
        if (rakutenUrl) {
          try {
            const rakutenResult = await searchRakuten(keyword, rakutenUrl);
            results.rakutenRank = rakutenResult.rank;
            results.rakutenPage = rakutenResult.foundOnPage;
          } catch (error) {
            console.error('楽天検索エラー:', error);
            results.rakutenError = error.message;
          }
        }
        
        // 3秒から5秒のランダムな遅延
        const delay = 3000 + Math.random() * 2000;
        await new Promise(resolve => setTimeout(resolve, delay));
        
        response.json(results);
        
      } catch (error) {
        console.error('検索エラー:', error);
        response.status(500).json({ error: error.message });
      }
    });
  });

// ヘルスチェック
exports.healthCheck = functions.https.onRequest((request, response) => {
  response.json({ status: 'OK', timestamp: new Date().toISOString() });
});