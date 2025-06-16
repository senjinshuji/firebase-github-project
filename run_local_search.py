"""
ローカルで実際の検索を実行してdata.jsonを更新するスクリプト
"""

import json
import os
import sys
from datetime import datetime
import time

# srcディレクトリをパスに追加
sys.path.append(os.path.join(os.path.dirname(__file__), 'src'))

from amazon_scraper import AmazonScraper
# from rakuten_scraper import RakutenScraper  # 後で実装

def load_data():
    """data.jsonを読み込む"""
    if os.path.exists('data.json'):
        with open('data.json', 'r', encoding='utf-8') as f:
            return json.load(f)
    return {"products": [], "rankings": []}

def save_data(data):
    """data.jsonに保存"""
    with open('data.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

def should_update(data):
    """更新が必要かチェック（24時間経過）"""
    rankings = data.get('rankings', [])
    if not rankings:
        return True
    
    # 最新の日付を取得
    dates = [r['date'] for r in rankings if 'date' in r]
    if not dates:
        return True
    
    last_date = max(dates)
    last_datetime = datetime.fromisoformat(last_date)
    now = datetime.now()
    
    # 24時間以上経過していたら更新
    return (now - last_datetime).total_seconds() > 86400

def main():
    print("🔍 検索順位モニタリング - ローカル実行")
    print("=" * 50)
    
    # データ読み込み
    data = load_data()
    products = data.get('products', [])
    
    if not products:
        print("❌ 商品が登録されていません。Webアプリで商品を登録してください。")
        return
    
    # 更新チェック
    if not should_update(data):
        print("✅ 24時間以内に更新済みです。スキップします。")
        return
    
    print(f"📦 {len(products)}個の商品を検索します")
    
    # スクレイパー初期化
    print("\n🌐 ブラウザを起動中...")
    amazon_scraper = AmazonScraper(headless=False)  # デバッグのため表示モード
    # rakuten_scraper = RakutenScraper()  # 後で実装
    
    today = datetime.now().strftime('%Y-%m-%d')
    total_count = 0
    
    try:
        for product in products:
            product_name = product.get('name', '')
            keywords = product.get('keywords', [])
            asin = product.get('asin', '')
            
            print(f"\n📦 商品: {product_name}")
            
            for keyword in keywords:
                print(f"  🔍 キーワード: {keyword}")
                
                # Amazon検索
                amazon_rank = None
                if asin:
                    try:
                        print("    Amazon検索中...", end='', flush=True)
                        amazon_rank = amazon_scraper.search_product_rank(keyword, asin, max_pages=3)
                        
                        if amazon_rank:
                            print(f" {amazon_rank}位")
                        else:
                            print(" 圏外（100位以下）")
                    except Exception as e:
                        print(f" エラー: {str(e)}")
                    
                    time.sleep(2)  # サーバー負荷軽減
                
                # 楽天検索（一旦スキップ）
                rakuten_rank = None
                # if product.get('rakuten_url'):
                #     try:
                #         print("    楽天検索中...", end='', flush=True)
                #         # 楽天検索の実装
                #     except Exception as e:
                #         print(f" エラー: {str(e)}")
                
                # ランキングデータを追加
                ranking_data = {
                    'date': today,
                    'product': product_name,
                    'keyword': keyword,
                    'amazon_rank': amazon_rank,
                    'rakuten_rank': rakuten_rank
                }
                
                data['rankings'].append(ranking_data)
                total_count += 1
        
        # データ保存
        save_data(data)
        print(f"\n✅ 完了！{total_count}件の検索結果を保存しました。")
        
    except KeyboardInterrupt:
        print("\n\n⚠️ 中断されました")
        save_data(data)  # 途中までのデータを保存
    except Exception as e:
        print(f"\n\n❌ エラーが発生しました: {str(e)}")
        save_data(data)  # エラー時も保存
    finally:
        # ブラウザを閉じる
        try:
            amazon_scraper._close_driver()
            # rakuten_scraper.close()
        except:
            pass

if __name__ == "__main__":
    main()