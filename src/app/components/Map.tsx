'use client'

import { useEffect, useState } from 'react'
import { fetchAddressData } from '../lib/fetchAddressData'
import { AddressData } from '../types/address'

export default function Map() {
  const [addressData, setAddressData] = useState<AddressData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadAddressData = async () => {
      try {
        setIsLoading(true)
        const data = await fetchAddressData()
        if (data) {
          setAddressData(data)
        } else {
          setError("住所データの読み込みに失敗しました")
        }
      } catch (err) {
        setError("エラーが発生しました")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }
    loadAddressData()
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <section className="bg-[#1a1a1a] py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {/* Map Section */}
          <div className="w-full h-[400px] bg-gray-800">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.8280303808788!2d139.7671248!3d35.6811673!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188bfbd89f700b%3A0x277c49ba34ed38!2z5p2x5Lqs6aeF!5e0!3m2!1sja!2sjp!4v1659436429111!5m2!1sja!2sjp"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="filter grayscale"
            ></iframe>
          </div>

          {/* Information Section */}
          <div className="flex flex-col justify-center space-y-6 p-8 bg-[#333333]">
            <h2 className="text-4xl font-bold tracking-wider text-[#E70E44]">INFORMATION</h2>
            <div className="space-y-4">
              <p className="text-sm text-gray-300">
                〒{addressData?.zipCode} {addressData?.prefecture}{addressData?.city}<br />
                {addressData?.buildingName}
              </p>
              <p className="text-2xl font-bold">03-5927-9655</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

