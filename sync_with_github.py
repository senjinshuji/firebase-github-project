"""
GitHub経由でdata.jsonを同期するスクリプト
"""

import subprocess
import os
import sys
from datetime import datetime

def run_command(cmd):
    """コマンドを実行して結果を表示"""
    print(f"$ {cmd}")
    result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    if result.stdout:
        print(result.stdout)
    if result.stderr:
        print(result.stderr, file=sys.stderr)
    return result.returncode == 0

def sync_pull():
    """GitHubから最新のdata.jsonを取得"""
    print("📥 GitHubから最新データを取得中...")
    
    # 現在の変更を一時保存
    if run_command("git stash"):
        print("✅ ローカルの変更を一時保存しました")
    
    # 最新版を取得
    if run_command("git pull origin main"):
        print("✅ 最新版を取得しました")
    
    # 一時保存した変更を戻す（競合する場合は手動解決が必要）
    run_command("git stash pop")
    
    print("✅ 同期完了！")

def sync_push():
    """ローカルのdata.jsonをGitHubにアップロード"""
    print("📤 ローカルデータをGitHubにアップロード中...")
    
    # data.jsonのみをステージング
    if not run_command("git add data.json"):
        print("❌ data.jsonが見つかりません")
        return False
    
    # コミット
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    commit_msg = f"Update search results - {timestamp}"
    
    if run_command(f'git commit -m "{commit_msg}"'):
        print("✅ コミット作成完了")
    else:
        print("ℹ️ 変更がないか、既にコミット済みです")
        return True
    
    # プッシュ
    if run_command("git push origin main"):
        print("✅ GitHubへのアップロード完了！")
        return True
    else:
        print("❌ プッシュに失敗しました")
        print("Personal Access Tokenの設定が必要かもしれません")
        return False

def auto_sync():
    """自動同期（プル→ローカル更新→プッシュ）"""
    print("🔄 自動同期を開始します")
    print("=" * 50)
    
    # 1. 最新版を取得
    sync_pull()
    
    print("\n" + "=" * 50)
    
    # 2. ローカルで検索実行するかチェック
    if os.path.exists("run_local_search.py"):
        response = input("\n🔍 ローカル検索を実行しますか？ (y/n): ")
        if response.lower() == 'y':
            print("\n検索を実行中...")
            subprocess.run([sys.executable, "run_local_search.py"])
    
    print("\n" + "=" * 50)
    
    # 3. 更新をプッシュ
    sync_push()

def main():
    """メインメニュー"""
    print("🔄 GitHub同期ツール")
    print("=" * 50)
    print("1. 📥 プル（GitHubから取得）")
    print("2. 📤 プッシュ（GitHubへアップロード）")
    print("3. 🔄 自動同期（プル→検索→プッシュ）")
    print("=" * 50)
    
    choice = input("選択してください (1-3): ")
    
    if choice == "1":
        sync_pull()
    elif choice == "2":
        sync_push()
    elif choice == "3":
        auto_sync()
    else:
        print("無効な選択です")

if __name__ == "__main__":
    main()