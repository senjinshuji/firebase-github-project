# セットアップ手順

## 1. GitHubリポジトリの作成

以下の手順でGitHubにリポジトリを作成してください：

1. https://github.com/new にアクセス
2. Repository name: `firebase-github-project`
3. Public/Privateを選択
4. **"Add a README file"はチェックしない**（既に作成済みのため）
5. "Create repository"をクリック

作成後、以下のコマンドを実行：

```bash
cd /Users/senjin/search-ranking-monitor/firebase-github-project
git remote add origin https://github.com/senjinshuji/firebase-github-project.git
git branch -M main
git push -u origin main
```

ユーザー名とパスワードを求められたら：
- Username: senjinshuji
- Password: senjin4649

## 2. Firebaseプロジェクトの初期化

1. Firebaseにログイン：
```bash
npx firebase login
```

2. Firebaseプロジェクトを初期化：
```bash
npx firebase init
```

選択項目：
- **Hosting: Configure files for Firebase Hosting**を選択（スペースキーで選択、Enterで確定）
- Use an existing projectを選択（または新規作成）
- Public directory: `.` （現在のディレクトリ）
- Configure as a single-page app: **No**
- Set up automatic builds with GitHub: **Yes**
- GitHubユーザー名: senjinshuji
- リポジトリ: senjinshuji/firebase-github-project

## 3. デプロイ

```bash
npx firebase deploy
```

## 4. GitHub Actionsの設定（自動デプロイ）

Firebaseの初期化時にGitHub Actionsが自動設定されます。
以降、mainブランチにpushするたびに自動的にFirebaseにデプロイされます。

## トラブルシューティング

### GitHubの認証エラーが出る場合

パスワード認証の代わりにPersonal Access Tokenを使用する必要があります：

1. https://github.com/settings/tokens にアクセス
2. "Generate new token (classic)"をクリック
3. 必要な権限を選択（repo権限が必要）
4. トークンを生成してコピー
5. パスワードの代わりにこのトークンを使用

### Firebaseプロジェクトがない場合

1. https://console.firebase.google.com/ にアクセス
2. "プロジェクトを作成"をクリック
3. プロジェクト名を入力して作成