# Firebase CLI セットアップ手順

## 1. Firebaseにログイン

ターミナルで以下のコマンドを実行：

```bash
cd /Users/senjin/search-ranking-monitor/firebase-github-project
npx firebase login
```

これにより：
1. ブラウザが自動的に開きます
2. Googleアカウントでログイン
3. Firebaseへのアクセスを許可
4. ターミナルに戻ると「Success! Logged in as [your-email]」と表示されます

## 2. Firebaseプロジェクトの初期化

```bash
npx firebase init
```

### 設定手順：

1. **Which Firebase features do you want to set up?**
   - スペースキーで `Hosting: Configure files for Firebase Hosting` を選択
   - Enterキーで確定

2. **Please select an option:**
   - `Use an existing project` を選択（既存のプロジェクトがある場合）
   - または `Create a new project` を選択

3. **新規プロジェクトの場合:**
   - Project ID: `firebase-github-proj-[ランダム文字]`（自動生成される）
   - Project Name: `Firebase GitHub Project`

4. **What do you want to use as your public directory?**
   - `.` （現在のディレクトリ）と入力

5. **Configure as a single-page app?**
   - `N` （いいえ）

6. **Set up automatic builds and deploys with GitHub?**
   - `Y` （はい）

7. **For which GitHub repository?**
   - `senjinshuji/firebase-github-project`

8. **Set up the workflow to run a build script?**
   - `N` （いいえ）

9. **Set up automatic deployment to your site's live channel?**
   - `Y` （はい）

## 3. 初回デプロイ

```bash
npx firebase deploy
```

デプロイが成功すると、以下のようなURLが表示されます：
- Hosting URL: https://[your-project-id].web.app

## 4. GitHub Actionsの確認

GitHubリポジトリに自動的に以下のファイルが作成されます：
- `.github/workflows/firebase-hosting-merge.yml`
- `.github/workflows/firebase-hosting-pull-request.yml`

これにより、mainブランチへのプッシュ時に自動デプロイされます。

## トラブルシューティング

### ログインできない場合
```bash
# キャッシュをクリア
npx firebase logout
npx firebase login --reauth
```

### プロジェクトが見つからない場合
```bash
# プロジェクト一覧を確認
npx firebase projects:list
```

### デプロイエラーの場合
```bash
# デバッグモードで実行
npx firebase deploy --debug
```