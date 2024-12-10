'use client'

import { useEffect, useState } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { fetchQAData } from '../lib/fetchQAData'
import { QAData } from '../types/qa'

export default function QA() {
  const [qaData, setQaData] = useState<QAData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadQAData = async () => {
      try {
        setIsLoading(true)
        const data = await fetchQAData()
        if (data) {
          setQaData(data)
        } else {
          setError("データの読み込みに失敗しました")
        }
      } catch (err) {
        setError("エラーが発生しました")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }
    loadQAData()
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <section id="faq" className="py-20 bg-[#1a1a1a]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-[#E70E44] mb-12">
          よくある質問
        </h2>
        <div className="mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {qaData?.items.map((qa, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-[#333333] rounded-lg border-none"
              >
                <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                  <div className="flex items-center gap-4">
                    <span className="text-[#E70E44] font-semibold">Q</span>
                    <span className="text-white">{qa.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <div className="flex items-start gap-4 pt-2">
                    <span className="text-[#E70E44] font-semibold">A</span>
                    <p className="text-gray-300">{qa.answer}</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}

