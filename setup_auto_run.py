"""
自動実行の設定スクリプト（Mac/Linux/Windows対応）
"""

import os
import sys
import platform
import subprocess
from pathlib import Path

def setup_macos():
    """macOSでの自動実行設定（launchd使用）"""
    plist_content = f"""<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.searchranking.monitor</string>
    <key>ProgramArguments</key>
    <array>
        <string>{sys.executable}</string>
        <string>{os.path.abspath('run_local_search.py')}</string>
    </array>
    <key>StartCalendarInterval</key>
    <dict>
        <key>Hour</key>
        <integer>9</integer>
        <key>Minute</key>
        <integer>0</integer>
    </dict>
    <key>WorkingDirectory</key>
    <string>{os.path.abspath('.')}</string>
    <key>StandardOutPath</key>
    <string>{os.path.abspath('search_log.txt')}</string>
    <key>StandardErrorPath</key>
    <string>{os.path.abspath('search_error.txt')}</string>
</dict>
</plist>"""
    
    plist_path = Path.home() / "Library/LaunchAgents/com.searchranking.monitor.plist"
    
    print("📝 macOS用の自動実行設定を作成します")
    
    # plistファイルを作成
    with open(plist_path, 'w') as f:
        f.write(plist_content)
    
    # 登録
    subprocess.run(['launchctl', 'load', str(plist_path)])
    
    print(f"✅ 設定完了！毎日9:00に自動実行されます")
    print(f"📄 ログファイル: {os.path.abspath('search_log.txt')}")
    print("\n削除する場合:")
    print(f"launchctl unload ~/Library/LaunchAgents/com.searchranking.monitor.plist")
    print(f"rm ~/Library/LaunchAgents/com.searchranking.monitor.plist")

def setup_windows():
    """Windowsでの自動実行設定（タスクスケジューラ使用）"""
    batch_content = f"""@echo off
cd /d "{os.path.abspath('.')}"
"{sys.executable}" run_local_search.py >> search_log.txt 2>&1
"""
    
    batch_path = "run_search.bat"
    with open(batch_path, 'w') as f:
        f.write(batch_content)
    
    print("📝 Windows用のバッチファイルを作成しました")
    print("\n手動でタスクスケジューラに登録してください:")
    print("1. Windowsキー + R → taskschd.msc")
    print("2. 「タスクの作成」をクリック")
    print("3. 全般タブ: 名前「検索順位モニタリング」")
    print("4. トリガータブ: 「新規」→ 毎日 9:00")
    print(f"5. 操作タブ: 「新規」→ プログラム「{os.path.abspath(batch_path)}」")
    print("6. 「OK」で保存")

def setup_linux():
    """Linuxでの自動実行設定（cron使用）"""
    cron_line = f"0 9 * * * cd {os.path.abspath('.')} && {sys.executable} run_local_search.py >> search_log.txt 2>&1"
    
    print("📝 Linux用のcron設定")
    print("\n以下のコマンドを実行してcrontabを編集:")
    print("crontab -e")
    print("\n以下の行を追加:")
    print(cron_line)
    print("\n✅ 毎日9:00に自動実行されます")

def main():
    print("🔧 検索順位モニタリング - 自動実行設定")
    print("=" * 50)
    
    system = platform.system()
    
    if system == "Darwin":
        setup_macos()
    elif system == "Windows":
        setup_windows()
    elif system == "Linux":
        setup_linux()
    else:
        print(f"❌ 未対応のOS: {system}")
        print("手動で定期実行を設定してください")

if __name__ == "__main__":
    main()