# GitHubリポジトリ作成手順

## 1. ブラウザでリポジトリを作成

1. **https://github.com/new** にアクセス
2. ログイン情報：
   - Username: `senjinshuji`
   - Password: `senjin4649`

3. リポジトリ設定：
   - **Repository name**: `firebase-github-project`
   - **Description**: `Firebase and GitHub integration project`
   - **Public** を選択
   - ⚠️ **"Add a README file" はチェックしない**
   - ⚠️ **"Add .gitignore" はチェックしない**
   - ⚠️ **"Choose a license" は None のまま**

4. **"Create repository"** をクリック

## 2. 作成後の画面で表示されるコマンドは無視

既にローカルリポジトリの設定は完了しているので、以下のコマンドを実行するだけです：

```bash
cd /Users/senjin/search-ranking-monitor/firebase-github-project
git push -u origin main
```

これでGitHubにコードがアップロードされます！