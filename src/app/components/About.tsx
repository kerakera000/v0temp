'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { fetchAboutData } from '../lib/fetchAboutData'
import { AboutData } from '../types/about'

export default function About() {
  const [aboutData, setAboutData] = useState<AboutData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadAboutData = async () => {
      try {
        setIsLoading(true)
        const data = await fetchAboutData()
        if (data) {
          setAboutData(data)
        } else {
          setError("Failed to load data")
        }
      } catch (err) {
        setError("An error occurred while fetching data")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }
    loadAboutData()
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <section id="about" className="py-20 bg-[#1a1a1a]">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Image Section */}
          <div className="relative h-[400px] md:h-[500px]">
            <Image
              src={aboutData?.image || "/placeholder.svg?height=600&width=600"}
              alt="ジムの内装"
              fill
              className="object-cover"
            />
          </div>

          {/* Content Section */}
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl font-bold mb-8 text-[#E70E44]">{aboutData?.title || "ABOUT US"}</h2>
            <p className="text-gray-300 leading-relaxed mb-8">
              {aboutData?.text || "ロペスジムは、心身ともに健康的な生活を実現するためのプライベートジムです。経験豊富なトレーナーが、一人ひとりの目標や生活スタイルに合わせたオーダーメイドのトレーニングプログラムを提供します。充実した設備と快適な空間で、あなたの理想の体づくりをサポートします。"}
            </p>
            <div className="flex gap-2">
              <span className="w-2 h-2 bg-[#E70E44] rounded-full"></span>
              <span className="w-2 h-2 bg-[#E70E44] rounded-full"></span>
              <span className="w-2 h-2 bg-[#E70E44] rounded-full"></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

