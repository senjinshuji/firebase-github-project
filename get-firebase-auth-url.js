const crypto = require('crypto');

// Firebase OAuth2 設定
const CLIENT_ID = '563584335869-fgrhgmd47bqnekij5i8b5pr03ho849e6.apps.googleusercontent.com';
const REDIRECT_URI = 'http://localhost:9005';
const SCOPE = 'email openid https://www.googleapis.com/auth/cloudplatformprojects.readonly https://www.googleapis.com/auth/firebase https://www.googleapis.com/auth/cloud-platform';

// ランダムなstateを生成
const state = crypto.randomBytes(20).toString('hex');

// 認証URLを構築
const authUrl = `https://accounts.google.com/o/oauth2/auth?` +
  `client_id=${CLIENT_ID}&` +
  `scope=${encodeURIComponent(SCOPE)}&` +
  `response_type=code&` +
  `state=${state}&` +
  `redirect_uri=${encodeURIComponent(REDIRECT_URI)}&` +
  `prompt=consent&` +
  `access_type=offline`;

console.log('Firebase認証URL:');
console.log(authUrl);
console.log('\nこのURLをブラウザで開いて認証してください。');