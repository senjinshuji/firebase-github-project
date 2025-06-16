# GitHub Personal Access Token 取得手順

## 1. GitHubにログイン
1. https://github.com にアクセス
2. ユーザー名: senjinshuji
3. パスワード: senjin4649

## 2. Personal Access Tokenの作成

1. ログイン後、右上のプロフィールアイコンをクリック
2. **Settings** を選択
3. 左側メニューの一番下にある **Developer settings** をクリック
4. **Personal access tokens** → **Tokens (classic)** を選択
5. **Generate new token** → **Generate new token (classic)** をクリック

## 3. トークンの設定

### Note (トークン名)
```
firebase-github-project
```

### Expiration (有効期限)
- 30 days（推奨）
- または必要に応じて選択

### Select scopes (権限)
以下にチェックを入れてください：
- ✅ **repo** (Full control of private repositories)
  - これで全てのrepo関連の権限が付与されます
- ✅ **workflow** (Update GitHub Action workflows)
  - GitHub Actionsの設定に必要

## 4. トークンの生成と保存

1. ページ下部の **Generate token** をクリック
2. **生成されたトークンをコピー**（この画面でしか表示されません！）
3. 安全な場所に保存

## 5. トークンの使用方法

### コマンドラインでの使用
```bash
# リモートリポジトリを追加
git remote add origin https://github.com/senjinshuji/firebase-github-project.git

# プッシュ時
git push -u origin main
# Username: senjinshuji
# Password: [生成したトークンを貼り付け]
```

### トークンをURLに含める方法（オプション）
```bash
git remote set-url origin https://senjinshuji:[TOKEN]@github.com/senjinshuji/firebase-github-project.git
```
※ [TOKEN]を実際のトークンに置き換えてください

## 重要な注意事項

⚠️ **トークンは一度しか表示されません**
- 必ずコピーして安全な場所に保存してください
- パスワードマネージャーの使用を推奨

⚠️ **トークンはパスワードと同じ扱い**
- 他人と共有しない
- 公開リポジトリにコミットしない
- .gitignoreに含めるべきファイルに保存

## トークンを紛失した場合

1. 同じ手順で新しいトークンを生成
2. 古いトークンは Settings → Developer settings → Personal access tokens から削除可能