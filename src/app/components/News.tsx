'use client'

import { useEffect, useState } from 'react'
import { Button } from "../components/ui/button"
import { fetchNewsData } from '../lib/fetchNewsData'
import { NewsItem } from '../types/news'

export default function News() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showAll, setShowAll] = useState(true) // Update 1: Initial value of showAll is now true

  useEffect(() => {
    const loadNewsData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchNewsData();

        // データが配列か確認
        if (Array.isArray(data)) {
          setNews(data);
        } else {
          throw new Error("ニュースデータの形式が不正です");
        }
      } catch (err) {
        setError("ニュースの取得中にエラーが発生しました。");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    loadNewsData();
  }, []);

  const handleToggleShow = () => { // Update 2: handleShowAll is changed to handleToggleShow and implements toggle functionality
    setShowAll(prev => !prev)
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>エラー: {error}</div>
  }

  return (
    <section id="news" className="py-20 bg-[#1a1a1a]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-16 flex items-center gap-2 text-[#E70E44]">
          NEWS
        </h2>

        <div className="space-y-12">
          {news.slice(0, showAll ? news.length : 3).map((item) => ( // Update 3: News display section is modified
            <div 
              key={item.id}
              className="group border-b border-gray-800 pb-12 px-4 -mx-4 hover:bg-[#333333] transition-all duration-300"
            >
              <div className="py-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-gray-400">{item.date}</span>
                  </div>
                  <h3 className="text-lg group-hover:text-[#E70E44] transition-colors">
                    {item.title}
                  </h3>
                  <p dangerouslySetInnerHTML={{ __html: item.content.replace(/\n/g, "<br />") }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {news.length > 3 && ( // Update 4: Button section is modified
          <div className="mt-16 text-center">
            <Button 
              variant="outline"
              className="min-w-[200px] border-[#E70E44] text-[#E70E44] hover:bg-[#E70E44] hover:text-white"
              onClick={handleToggleShow}
            >
              {showAll ? 'CLOSE POST' : 'ALL POST'}
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}

