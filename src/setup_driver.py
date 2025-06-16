"""
ChromeDriverの自動セットアップスクリプト
"""

from webdriver_manager.chrome import ChromeDriverManager
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
import os

def setup_driver():
    """ChromeDriverをダウンロード・セットアップ"""
    print("🌐 ChromeDriverをセットアップ中...")
    
    try:
        # ChromeDriverManagerが自動的に適切なバージョンをダウンロード
        driver_path = ChromeDriverManager().install()
        print(f"✅ ChromeDriverをダウンロードしました: {driver_path}")
        
        # テスト実行
        print("\n🧪 テスト実行中...")
        options = webdriver.ChromeOptions()
        options.add_argument('--headless')  # ヘッドレスモードでテスト
        
        service = Service(driver_path)
        driver = webdriver.Chrome(service=service, options=options)
        
        driver.get("https://www.google.com")
        print(f"✅ テスト成功！タイトル: {driver.title}")
        
        driver.quit()
        
        print("\n✨ セットアップ完了！")
        print("run_local_search.pyを実行して検索を開始できます。")
        
    except Exception as e:
        print(f"❌ エラーが発生しました: {str(e)}")
        print("\n対処法:")
        print("1. Google Chromeがインストールされているか確認")
        print("2. 最新版のChromeに更新")
        print("3. それでもダメなら手動でChromeDriverをダウンロード:")
        print("   https://chromedriver.chromium.org/")

if __name__ == "__main__":
    setup_driver()