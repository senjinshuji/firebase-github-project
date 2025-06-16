const { exec } = require('child_process');
const readline = require('readline');

console.log('Firebase認証セットアップ');
console.log('========================\n');

console.log('以下のコマンドを新しいターミナルウィンドウで実行してください:\n');
console.log('cd /Users/senjin/search-ranking-monitor/firebase-github-project');
console.log('npx firebase login\n');

console.log('ブラウザが開いたら:');
console.log('1. メール: shuji.kato@senjinholings.com');
console.log('2. パスワード: coiota4649');
console.log('3. Firebaseへのアクセスを許可\n');

console.log('ログイン成功後:');
console.log('npx firebase init hosting');
console.log('npx firebase deploy\n');

console.log('または、以下のコマンドで一度に実行:');
console.log('npx firebase login && npx firebase init hosting && npx firebase deploy');