const https = require('https');
const fs = require('fs');
const path = require('path');

// Firebaseプロジェクト設定
const PROJECT_ID = 'senjin-firebase-github';
const SITE_NAME = 'senjin-firebase-github';

console.log('Firebase Hosting デプロイ準備');
console.log('============================\n');

// デプロイ用のファイルリスト
const filesToDeploy = [
  'index.html'
];

console.log('デプロイするファイル:');
filesToDeploy.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✓ ${file}`);
  } else {
    console.log(`✗ ${file} (見つかりません)`);
  }
});

console.log('\n手動デプロイ手順:');
console.log('1. Firebase Console (https://console.firebase.google.com/) にアクセス');
console.log('2. ログイン情報:');
console.log('   - メール: shuji.kato@senjinholings.com');
console.log('   - パスワード: coiota4649');
console.log('3. 新しいプロジェクトを作成:');
console.log('   - プロジェクト名: Firebase GitHub Project');
console.log('   - プロジェクトID: senjin-firebase-github');
console.log('4. Hostingを有効化');
console.log('5. ターミナルで実行:');
console.log('   cd /Users/senjin/search-ranking-monitor/firebase-github-project');
console.log('   npx firebase login');
console.log('   npx firebase deploy --project senjin-firebase-github');

// package.jsonにデプロイスクリプトを追加
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
packageJson.scripts = packageJson.scripts || {};
packageJson.scripts.deploy = 'firebase deploy --project senjin-firebase-github';
packageJson.scripts['deploy:hosting'] = 'firebase deploy --only hosting --project senjin-firebase-github';

fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));

console.log('\n✓ package.jsonを更新しました');
console.log('  npm run deploy - 全てをデプロイ');
console.log('  npm run deploy:hosting - ホスティングのみデプロイ');