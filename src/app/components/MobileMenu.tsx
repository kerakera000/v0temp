'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronRight } from 'lucide-react'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
      onClose()
    }
  }

  if (!isMounted) {
    return null
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-[#1a1a1a] z-50 md:hidden"
        >
          <div className="flex flex-col h-full">
            <div className="flex justify-end p-4">
              <button onClick={onClose} className="text-white">
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex flex-col px-8 mt-16 space-y-8">
              {[
                { id: 'about', label: 'ABOUT' },
                { id: 'service', label: 'SERVICE' },
                { id: 'faq', label: 'FAQ' },
                { id: 'news', label: 'NEWS' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="flex justify-between items-center text-white text-xl hover:text-[#E70E44] transition-colors"
                >
                  {item.label}
                  <ChevronRight className="h-5 w-5" />
                </button>
              ))}
              <button
                onClick={() => scrollToSection('contact')}
                className="inline-block bg-[#E70E44] text-white px-6 py-3 text-xl hover:bg-[#FF3366] transition-colors text-center mt-4"
              >
                CONTACT
              </button>
            </nav>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

