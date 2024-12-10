'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { fetchServicesData } from '../lib/fetchServicesData'
import { ServicesData } from '../types/services'

export default function Service() {
  const [servicesData, setServicesData] = useState<ServicesData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadServicesData = async () => {
      try {
        setIsLoading(true)
        const data = await fetchServicesData()
        if (data) {
          setServicesData(data)
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
    loadServicesData()
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <section id="service" className="bg-[#1a1a1a] py-20">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold tracking-wider flex items-center gap-4">
            <span className="text-[#E70E44]">SERVICE</span>
            <span className="text-sm font-normal tracking-normal text-gray-400">サービス案内</span>
          </h2>
        </div>

        {/* Main Image */}
        <div className="relative w-full h-[500px] mb-12">
          <Image
            src={servicesData?.kvImage || "/placeholder.svg?height=400&width=1200"}
            alt="Service main image"
            fill
            className="object-cover brightness-75"
          />
        </div>

        {/* Service Items */}
        {servicesData?.items.map((item, index) => (
          <div 
            key={index}
            className={`flex flex-col ${
              index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            } gap-8 ${index !== servicesData.items.length - 1 ? 'mb-12' : ''}`}
          >
            <div className="md:w-2/4 space-y-4">
              <h3 className="text-3xl font-bold text-[#E70E44]">{item.title}</h3>
              <p className="text-sm text-gray-400">{item.subtitle}</p>
            </div>
            <div className="md:w-2/4 relative h-[400px]">
              <Image
                src={item.image || "/placeholder.svg?height=300&width=600"}
                alt={item.title}
                fill
                className="object-cover brightness-75"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

