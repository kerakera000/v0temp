'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { fetchCampaignData } from '../lib/fetchCampaignData'
import { CampaignItem } from '../types/campaign'

export default function Campaign() {
  const [campaignData, setCampaignData] = useState<CampaignItem | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadCampaignData = async () => {
      try {
        setIsLoading(true)
        const data = await fetchCampaignData()
        if (data) {
          setCampaignData(data)
        } else {
          setError("キャンペーンデータが見つかりません")
        }
      } catch (err) {
        setError("データの取得中にエラーが発生しました")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }
    loadCampaignData()
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <section className="bg-[#1a1a1a]">
      <div className="relative w-full h-[600px] overflow-hidden">
        <Image
          src={campaignData?.backgroundImage || "/placeholder.svg?height=800&width=1920"}
          alt="キャンペーン背景"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">CAMPAIGN</h2>
          <p className="text-lg mb-6">{campaignData?.name || "キャンペーン名"}</p>
          <p className="text-lg mb-6">{campaignData?.description || "キャンペーンの説明"}</p>
          
        </div>
      </div>
    </section>
  )
}

