'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import { Button } from "@/components/ui/button"
import MobileMenu from './MobileMenu'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className="bg-[#1a1a1a] fixed top-0 left-0 right-0 z-50 h-16">
      <nav className="container mx-auto flex justify-between items-center h-full px-4">
        <Link href="/" className="text-2xl font-bold text-white">
          ロペスジム
        </Link>
        <div className="hidden md:flex items-center space-x-4">
          <button onClick={() => scrollToSection('about')} className="text-white hover:text-[#E70E44]">ABOUT</button>
          <button onClick={() => scrollToSection('service')} className="text-white hover:text-[#E70E44]">SERVICE</button>
          <button onClick={() => scrollToSection('faq')} className="text-white hover:text-[#E70E44]">FAQ</button>
          <button onClick={() => scrollToSection('news')} className="text-white hover:text-[#E70E44]">NEWS</button>
          <button onClick={() => scrollToSection('contact')} className="bg-[#E70E44] text-white px-4 py-2 rounded hover:bg-[#FF3366]">
            CONTACT
          </button>
        </div>
        <Button
          variant="ghost"
          className="md:hidden text-white hover:text-black transition-colors"
          onClick={toggleMobileMenu}
        >
          <Menu className="h-8 w-8" />
        </Button>
      </nav>
      <MobileMenu isOpen={isMobileMenuOpen} onClose={toggleMobileMenu} />
    </header>
  )
}

