'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function LoadingAnimation() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000) // 3秒後にローディングを終了

    return () => clearTimeout(timer)
  }, [])

  if (!isLoading) return null

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1a1a1a]"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1, delay: 2, ease: "easeInOut" }}
    >
      <motion.div
        className="text-3xl md:text-6xl font-bold text-[#E70E44] whitespace-nowrap"
        initial={{ scale: 1, opacity: 1 }}
        animate={{ scale: 0.5, opacity: 0 }}
        transition={{ duration: 1, delay: 2, ease: "easeInOut" }}
      >
        PERSONAL GYM
      </motion.div>
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ width: 0 }}
        animate={{ width: '60vw' }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        <motion.div 
          className="h-1 bg-[#E70E44]"
          initial={{ width: '100%' }}
          animate={{ 
            clipPath: ['inset(0 0% 0 0%)', 'inset(0 50% 0 50%)']
          }}
          transition={{ duration: 1, delay: 2, ease: "easeInOut" }}
        ></motion.div>
      </motion.div>
    </motion.div>
  )
}

