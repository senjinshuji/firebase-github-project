const functions = require('firebase-functions');
const cors = require('cors')({ origin: true });

// シンプルな検索関数（デモ用）
exports.searchRankings = functions.https.onRequest((request, response) => {
  cors(request, response, async () => {
    try {
      const { keyword, amazonUrl, rakutenUrl } = request.body;
      
      if (!keyword) {
        return response.status(400).json({ error: 'キーワードが必要です' });
      }
      
      // 実際のスクレイピングの代わりに、キーワードと商品URLに基づいたシミュレーション
      const results = {
        keyword,
        amazonRank: 999,
        rakutenRank: 999,
        searchDate: new Date().toISOString(),
        note: 'この関数は簡易版です。実際のスクレイピングには別途実装が必要です。'
      };
      
      // Amazon順位のシミュレーション
      if (amazonUrl) {
        const asinMatch = amazonUrl.match(/\/dp\/([A-Z0-9]{10})/);
        if (asinMatch) {
          // キーワードの長さとASINを使ったハッシュ的な計算で順位を決定
          const hash = keyword.length + asinMatch[1].charCodeAt(0);
          results.amazonRank = (hash % 50) + 1;
          results.amazonPage = Math.ceil(results.amazonRank / 24);
        }
      }
      
      // 楽天順位のシミュレーション
      if (rakutenUrl) {
        const hash = keyword.length * 2;
        results.rakutenRank = (hash % 40) + 10;
        results.rakutenPage = Math.ceil(results.rakutenRank / 45);
      }
      
      // レスポンスの遅延をシミュレート（1-3秒）
      const delay = 1000 + Math.random() * 2000;
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
  response.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    note: '簡易版のFirebase Functions'
  });
});