const http = require('http');
const url = require('url');
const { exec } = require('child_process');

const PORT = 9005;

// 認証用サーバーを起動
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  
  if (parsedUrl.pathname === '/' && parsedUrl.query.code) {
    const authCode = parsedUrl.query.code;
    
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <html>
        <body>
          <h1>Firebase認証成功！</h1>
          <p>認証コードを受け取りました。ターミナルに戻ってください。</p>
          <p>このウィンドウは閉じても構いません。</p>
        </body>
      </html>
    `);
    
    console.log('\n✅ 認証コードを受け取りました！');
    console.log('認証コード:', authCode);
    
    // サーバーを停止
    setTimeout(() => {
      server.close();
      process.exit(0);
    }, 2000);
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(PORT, () => {
  console.log(`認証サーバーが起動しました: http://localhost:${PORT}`);
  console.log('\n以下のコマンドを新しいターミナルで実行してください:');
  console.log('npx firebase login');
  console.log('\nブラウザが開いたら:');
  console.log('1. メール: shuji.kato@senjinholings.com');
  console.log('2. パスワード: coiota4649');
  console.log('3. Firebaseへのアクセスを許可');
});