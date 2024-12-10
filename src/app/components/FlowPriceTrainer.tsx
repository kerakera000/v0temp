'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { fetchFlowItemsData } from '../lib/fetchFlowItemsData'
import { fetchPricingData } from '../lib/fetchPricingData'
import { FlowData, FlowItem } from '../types/flow'
import { PricingData } from '../types/pricing'

export default function FlowPriceTrainer() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null)
  const [flowData, setFlowData] = useState<FlowData | null>(null)
  const [pricingData, setPricingData] = useState<PricingData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true)
        const [flowResult, pricingResult] = await Promise.all([
          fetchFlowItemsData(),
          fetchPricingData()
        ])
        
        if (flowResult) {
          setFlowData(flowResult)
        }
        if (pricingResult) {
          setPricingData(pricingResult)
        }
        if (!flowResult || !pricingResult) {
          setError("Failed to load data")
        }
      } catch (err) {
        setError("An error occurred while fetching data")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [])

  const cards = [
    {
      id: 'flow',
      title: 'FLOW',
      subtitle: '入会の流れ',
      description: 'ウェルカルボクシングへの入会をご検討の方は、まずこちらをご覧ください。',
      image: '/placeholder.svg?height=400&width=600',
      details: flowData?.flowItems || []
    },
    {
      id: 'price',
      title: 'PRICE',
      subtitle: '料金案内',
      description: '初回ビギナーコースからレギュラーコースまで、目的に合わせてご利用いただけます。',
      image: '/placeholder.svg?height=400&width=600',
      details: pricingData?.pricingPlans || []
    }
  ]

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <section className="py-20 bg-[#1a1a1a]">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          {cards.map((card) => (
            <div key={card.id} className="relative group overflow-hidden">
              <div className="relative h-[400px] w-full">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover brightness-50 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/50"></div>
                <AnimatePresence mode="wait">
                  {!expandedCard || expandedCard !== card.id ? (
                    // Default View
                    <motion.div
                      key="default"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 p-8 flex flex-col"
                    >
                      <div className="flex-1">
                        <h2 className="text-3xl font-bold mb-2 text-[#E70E44]">{card.title}</h2>
                        <p className="text-lg mb-4 text-gray-300">{card.subtitle}</p>
                        <p className="text-sm text-gray-400">{card.description}</p>
                      </div>
                      <button 
                        onClick={() => setExpandedCard(card.id)}
                        className="inline-flex items-center text-sm hover:text-[#E70E44] transition-colors"
                      >
                        <span className="border-b border-current pb-1">VIEW MORE</span>
                      </button>
                    </motion.div>
                  ) : (
                    // Expanded View
                    <motion.div
                      key="expanded"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 p-8 bg-black/90"
                    >
                      <div className="h-full flex flex-col">
                        <div className="flex justify-between items-center mb-6">
                          <h2 className="text-3xl font-bold text-[#E70E44]">{card.title}</h2>
                          <button 
                            onClick={() => setExpandedCard(null)}
                            className="flex items-center gap-2 text-white hover:text-[#E70E44] transition-colors"
                          >
                            <ArrowLeft className="w-4 h-4" />
                            <span>戻る</span>
                          </button>
                        </div>
                        
                        <div className="flex-1 overflow-y-auto">
                          {card.id === 'flow' ? (
                            // Flow Details
                            <div className="space-y-8">
                              {(card.details as FlowItem[]).map((item, index) => (
                                <div key={index} className="border-l-2 border-[#E70E44] pl-4">
                                  <div className="text-sm text-[#E70E44] mb-2">STEP {index + 1}</div>
                                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                                  <p className="text-gray-400">{item.text}</p>
                                </div>
                              ))}
                            </div>
                          ) : (
                            // Price Details
                            <div className="space-y-8">
                              {(card.details as PricingPlan[]).map((plan, index) => (
                                <div key={plan.id} className="bg-zinc-900/50 p-6 rounded-lg">
                                  <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                                  <div className="text-2xl font-bold text-[#E70E44] mb-4">¥{plan.monthlyFee}/月</div>
                                  <ul className="space-y-2">
                                    {plan.listItems.map((item, itemIndex) => (
                                      <li key={itemIndex} className="text-gray-400 flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-[#E70E44] rounded-full"></span>
                                        {item}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

