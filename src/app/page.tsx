'use client'

import { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Service from './components/Service'
import Campaign from './components/Campaign'
import FlowPriceTrainer from './components/FlowPriceTrainer'
import QA from './components/QA'
import News from './components/News'
import Contact from './components/Contact'
import Map from './components/Map'
import Footer from './components/Footer'
import LoadingAnimation from './components/LoadingAnimation'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000) // ローディングアニメーションの後、コンテンツを表示

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <LoadingAnimation />
      {!isLoading && (
        <main className="min-h-screen bg-black text-white pt-16">
          <Header />
          <Hero />
          <About />
          <Service />
          <Campaign />
          <FlowPriceTrainer />
          <QA />
          <News />
          <Map />
          <Contact />
          <Footer />
        </main>
      )}
    </>
  )
}

