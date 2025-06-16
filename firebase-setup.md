# Firebase完全版セットアップガイド

## 🚀 現在の状態

Firebase Hostingで動作する完全なWebアプリケーションを作成しました！

### ✅ 実装済み機能
- 商品登録・管理
- キーワード管理
- 順位データの記録
- グラフによる可視化
- ダッシュボード
- データのローカル保存

### 📱 アプリケーションURL
- メインページ: https://rank-tracker-1637e.web.app
- Webアプリ: https://rank-tracker-1637e.web.app/app.html

## 🔥 次のステップ：Firebase統合

### 1. Firestore Database設定

Firebase Consoleで以下を実行：

```javascript
// Firestoreのデータ構造
{
  "products": {
    "productId": {
      "name": "商品名",
      "amazonUrl": "https://...",
      "rakutenUrl": "https://...",
      "keywords": ["キーワード1", "キーワード2"],
      "createdAt": "2024-01-01T00:00:00Z"
    }
  },
  "rankings": {
    "rankingId": {
      "productId": "xxx",
      "productName": "商品名",
      "keyword": "キーワード",
      "amazonRank": 10,
      "rakutenRank": 15,
      "date": "2024-01-01T00:00:00Z"
    }
  }
}
```

### 2. Firebase Functions（サーバーレス関数）

検索順位を取得する関数を作成：

```javascript
// functions/index.js
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const puppeteer = require('puppeteer');

admin.initializeApp();

exports.searchRankings = functions.https.onCall(async (data, context) => {
  const { productId, keyword } = data;
  
  // Puppeteerで検索実行
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Amazon検索
  await page.goto(`https://www.amazon.co.jp/s?k=${encodeURIComponent(keyword)}`);
  // 検索結果から順位を取得...
  
  // 結果をFirestoreに保存
  await admin.firestore().collection('rankings').add({
    productId,
    keyword,
    amazonRank,
    rakutenRank,
    date: new Date()
  });
  
  await browser.close();
  return { amazonRank, rakutenRank };
});

// 定期実行（毎日9時）
exports.scheduledSearch = functions.pubsub.schedule('0 9 * * *').onRun(async (context) => {
  // 全商品・キーワードで検索実行
});
```

### 3. アプリケーションのFirebase接続

```javascript
// app.htmlに追加
<script src="https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.0.0/firebase-functions-compat.js"></script>

<script>
// Firebase設定
const firebaseConfig = {
  apiKey: "...",
  authDomain: "rank-tracker-1637e.firebaseapp.com",
  projectId: "rank-tracker-1637e",
  storageBucket: "rank-tracker-1637e.appspot.com",
  messagingSenderId: "...",
  appId: "..."
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const functions = firebase.functions();

// 商品をFirestoreから読み込み
async function loadProducts() {
  const snapshot = await db.collection('products').get();
  products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// 順位検索をFunctionsで実行
async function searchRankings(productId, keyword) {
  const searchFunction = functions.httpsCallable('searchRankings');
  const result = await searchFunction({ productId, keyword });
  return result.data;
}
</script>
```

## 🎯 メリット

1. **完全クラウド化**
   - サーバー管理不要
   - 自動スケーリング
   - 高可用性

2. **コスト効率**
   - 使った分だけの課金
   - 無料枠が充実

3. **セキュリティ**
   - Firebaseのセキュリティルール
   - HTTPS標準対応

4. **リアルタイム同期**
   - 複数デバイスで自動同期
   - オフライン対応

## 📝 実装手順

1. Firebase Consoleで設定
2. Firebase CLIでFunctions初期化
3. app.htmlをFirebase接続版に更新
4. デプロイ

これでStreamlit不要の完全なWebアプリケーションが完成します！