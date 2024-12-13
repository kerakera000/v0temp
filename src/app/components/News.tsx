'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/app/components/ui/button"
import { fetchNewsData } from '../lib/fetchNewsData'
import { NewsData } from '../types/news'

export default function News() {
  const [newsData, setNewsData] = useState<NewsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadNewsData = async () => {
      try {
        setIsLoading(true)
        const data = await fetchNewsData()
        if (data) {
          setNewsData(data)
        } else {
          setError("ニュースデータの読み込みに失敗しました")
        }
      } catch (err) {
        setError("エラーが発生しました")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }
    loadNewsData()
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <section id="news" className="py-20 bg-[#1a1a1a]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-16 flex items-center gap-2 text-[#E70E44]">
          NEWS
        </h2>

        <div className="space-y-12">
          {newsData?.items.map((item) => (
            <div 
              key={item.id}
              className="group border-b border-gray-800 pb-12 px-4 -mx-4 hover:bg-[#333333] transition-all duration-300"
            >
              <div className="py-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-gray-400">NEWS</span>
                    <span className="text-xs text-gray-400">{item.date}</span>
                  </div>
                  <h3 className="text-lg group-hover:text-[#E70E44] transition-colors">
                    {item.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button 
            variant="outline"
            className="min-w-[200px] border-[#E70E44] text-[#E70E44] hover:bg-[#E70E44] hover:text-white"
          >
            ALL POST
          </Button>
        </div>
      </div>
    </section>
  )
}

