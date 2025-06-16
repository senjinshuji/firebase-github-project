# Firebase クイックデプロイ手順

## オプション1: Firebase Console経由（推奨）

1. **Firebase Console** にアクセス
   - https://console.firebase.google.com/
   - メール: shuji.kato@senjinholings.com
   - パスワード: coiota4649

2. **Hostingからデプロイ**
   - 左メニューの「Hosting」をクリック
   - 「ファイルをアップロード」をクリック
   - `index.html`をドラッグ＆ドロップ

## オプション2: ターミナルから（要認証）

```bash
# 1. 認証（一度だけ必要）
npx firebase login

# 2. デプロイ
npm run deploy
```

## オプション3: GitHub Actions経由（自動）

1. GitHub Secretsを設定後、コードを変更してプッシュ
```bash
echo "<!-- Updated: $(date) -->" >> index.html
git add index.html
git commit -m "Update index.html"
git push
```

2. GitHub ActionsがFirebaseに自動デプロイ

## 現在のファイル構成

- ✅ `index.html` - デプロイするWebページ
- ✅ `firebase.json` - Firebase設定
- ✅ `.firebaserc` - プロジェクトID設定
- ✅ GitHub Actions設定済み

全ての準備は完了しています！