# Firebase手動セットアップ手順

## ステップ1: Firebase Consoleでプロジェクト作成

1. **Firebaseコンソールにアクセス**
   - URL: https://console.firebase.google.com/
   - メール: shuji.kato@senjinholings.com
   - パスワード: coiota4649

2. **新しいプロジェクトを作成**
   - 「プロジェクトを作成」をクリック
   - プロジェクト名: `Firebase GitHub Project`
   - プロジェクトID: 自動生成されたものをメモ（例: `firebase-github-proj-abc123`）
   - Googleアナリティクス: 無効でOK
   - 「プロジェクトを作成」をクリック

3. **Hostingを有効化**
   - 左メニューから「Hosting」を選択
   - 「始める」をクリック
   - 手順は飛ばして「コンソールに進む」

## ステップ2: ローカルでFirebase設定

ターミナルで実行:

```bash
cd /Users/senjin/search-ranking-monitor/firebase-github-project

# Firebaseにログイン
npx firebase login

# プロジェクトを選択
npx firebase use --add
# 作成したプロジェクトを選択して、エイリアスは「default」と入力

# デプロイ
npx firebase deploy
```

## ステップ3: サービスアカウントの作成（GitHub Actions用）

1. **Firebase Console > プロジェクト設定 > サービスアカウント**
2. 「新しい秘密鍵を生成」をクリック
3. JSONファイルがダウンロードされます

## ステップ4: GitHub Secretsの設定

1. https://github.com/senjinshuji/firebase-github-project/settings/secrets/actions

2. 以下のシークレットを追加:
   - **FIREBASE_PROJECT_ID**: Firebaseプロジェクト（例: firebase-github-proj-abc123）
   - **FIREBASE_SERVICE_ACCOUNT**: ダウンロードしたJSONファイルの内容を全てコピー＆ペースト

## ステップ5: 自動デプロイの確認

```bash
# 変更を加えてプッシュ
git add .
git commit -m "Set up Firebase hosting"
git push
```

GitHub Actionsが自動的に実行され、Firebaseにデプロイされます。

## デプロイ後のURL

デプロイが成功すると、以下のURLでアクセスできます：
- https://[プロジェクトID].web.app
- https://[プロジェクトID].firebaseapp.com