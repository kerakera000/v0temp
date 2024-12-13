'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { fetchKvData } from '../lib/fetchKvData'
import { KVData } from '../types/kv'

export default function Hero() {
  const [kvData, setKvData] = useState<KVData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadKvData = async () => {
      try {
        setIsLoading(true)
        const data = await fetchKvData()
        if (data) {
          setKvData(data)
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
    loadKvData()
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <section className="relative h-screen flex items-center justify-center">
      <Image
        src={kvData?.image || "/placeholder.svg?height=1080&width=1920"}
        alt="ロペスジムの内装"
        layout="fill"
        objectFit="cover"
        className="brightness-50"
      />
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          {kvData?.title || "あなたの限界を超える場所"}
        </h1>
        <p className="text-xl md:text-2xl mb-8">
          {kvData?.text || "パーソナルジムで、プロフェッショナルな指導と最新の設備を活用し、あなただけの理想の体を手に入れましょう"}
        </p>
      </div>
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-full px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <div className="bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-full px-4 py-2 text-white text-sm flex items-center justify-center">
            {kvData?.strength1 || "プロのトレーナーが指導"}
          </div>
          <div className="bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-full px-4 py-2 text-white text-sm flex items-center justify-center">
            {kvData?.strength2 || "最新のトレーニング設備"}
          </div>
          <div className="col-span-2 md:col-span-1 bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-full px-4 py-2 text-white text-sm flex items-center justify-center">
            {kvData?.strength3 || "個別カスタマイズプラン"}
          </div>
        </div>
      </div>
    </section>
  )
}

