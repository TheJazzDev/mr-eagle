'use client'

import { motion } from 'framer-motion'
import { Home, Briefcase, Award, Mail, Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', icon: Home, href: '#hero' },
    { name: 'Experience', icon: Briefcase, href: '#experience' },
    { name: 'Skills', icon: Award, href: '#skills' },
    { name: 'Contact', icon: Mail, href: '#contact' }
  ]

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setIsOpen(false)
    }
  }

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-gray-900/95 backdrop-blur-lg shadow-lg border-b border-gray-700/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
            {/* Logo */}
            <motion.button
              onClick={() => scrollToSection('#hero')}
              className="text-lg sm:text-xl md:text-2xl font-bold gradient-text cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Mr Eagle
            </motion.button>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-2 lg:gap-4">
              {navItems.map((item) => (
                <motion.button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="flex items-center gap-2 px-3 py-2 lg:px-4 lg:py-2.5 text-sm lg:text-base text-gray-300 hover:text-blue-400 transition-colors rounded-lg hover:bg-gray-800"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <item.icon className="w-4 h-4 lg:w-5 lg:h-5" />
                  <span className="hidden lg:inline">{item.name}</span>
                </motion.button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-gray-300"
              whileTap={{ scale: 0.95 }}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{
          x: isOpen ? 0 : '100%'
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed top-14 sm:top-16 right-0 bottom-0 w-64 bg-gray-900 shadow-2xl z-40 md:hidden"
      >
        <div className="flex flex-col gap-2 p-4">
          {navItems.map((item, index) => (
            <motion.button
              key={item.name}
              onClick={() => scrollToSection(item.href)}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : 20 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-blue-400 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <item.icon className="w-5 h-5" />
              <span className="text-base font-medium">{item.name}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
        />
      )}
    </>
  )
}
