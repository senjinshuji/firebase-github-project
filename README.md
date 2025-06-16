# Rank Tracker - Amazon・楽天検索順位モニタリングシステム

## 概要

Amazon.co.jpと楽天市場での商品検索順位を自動的に監視・記録するPythonベースのツールです。

## 主な機能

- 🔍 **自動検索**: 指定したキーワードで商品を自動検索し、順位を記録
- 📊 **データ可視化**: 順位推移をグラフで視覚的に確認
- 🤖 **定期実行**: 毎日自動的に順位をチェック・更新
- ☁️ **クラウド連携**: Google Sheetsとの自動同期機能
- 🌐 **Web UI**: Streamlitベースの使いやすいインターフェース

## デプロイ情報

- **Firebase Hosting URL**: https://rank-tracker-1637e.web.app
- **GitHub Repository**: https://github.com/senjinshuji/firebase-github-project

## ローカル環境での実行

```bash
# 依存関係のインストール
pip install -r requirements.txt

# Streamlitアプリの起動
streamlit run streamlit_app.py

# 検索実行
python run_local_search.py
```

## 技術スタック

- Python 3.8+
- Streamlit (Web UI)
- Selenium (Webスクレイピング)
- Google Sheets API
- Firebase Hosting
- GitHub Actions (CI/CD)

## ライセンス

ISC