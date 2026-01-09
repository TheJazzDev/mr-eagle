'use client'

import { motion } from 'framer-motion'
import { Twitter, Send } from 'lucide-react'
import Image from 'next/image'

interface HeroProps {
  profile: {
    name: string
    tagline: string
    bio: string
    location: string
    email: string
    phone?: string | null
    twitter?: string | null
    telegram?: string | null
  }
}

export default function Hero({ profile }: HeroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 10
      }
    }
  }

  const floatingVariants = {
    initial: { y: 0 },
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut' as const
      }
    }
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-br from-gray-900 via-purple-900/20 to-blue-900/20">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-[10%] left-[10%] w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-blue-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
        <motion.div
          className="absolute bottom-[10%] right-[10%] w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-purple-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
        <motion.div
          className="absolute top-[50%] left-[50%] w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-cyan-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.6, 0.4],
            x: [-50, 50, -50],
            y: [-50, 50, -50]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.05]" />

      {/* Main content */}
      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col md:flex-row items-center gap-8 sm:gap-12 md:gap-16">
          {/* Profile Image */}
          <motion.div
            variants={floatingVariants}
            initial="initial"
            animate="animate"
            className="shrink-0"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-br from-blue-500 via-purple-500 to-cyan-500 rounded-full blur-2xl opacity-30 scale-110" />
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden border-4 sm:border-[6px] border-white/10 shadow-2xl glow">
                <Image
                  src="/avatar.jpeg"
                  alt="Mr Eagle"
                  width={512}
                  height={512}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>
          </motion.div>

          {/* Text content */}
          <div className="flex-1 text-center md:text-left">
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 md:mb-8"
            >
              <span className="gradient-text">Mr Eagle</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300 mb-4 sm:mb-6 md:mb-8 font-medium"
            >
              {profile.tagline}
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-base md:text-lg text-gray-400 mb-6 sm:mb-8 md:mb-10 max-w-2xl mx-auto md:mx-0 leading-relaxed"
            >
              {profile.bio.split('\n\n')[0]}
            </motion.p>

            {/* Social links */}
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center md:justify-start gap-3 sm:gap-4"
            >
              {profile.twitter && (
                <motion.a
                  href={`https://twitter.com/${profile.twitter.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-all shadow-lg hover:shadow-xl hover:scale-105"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-xs sm:text-sm md:text-base font-medium">Twitter</span>
                </motion.a>
              )}
              {profile.telegram && (
                <motion.a
                  href={`https://t.me/${profile.telegram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-full transition-all shadow-lg hover:shadow-xl hover:scale-105"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-xs sm:text-sm md:text-base font-medium">Telegram</span>
                </motion.a>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2"
        animate={{
          y: [0, 10, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      >
        <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-gray-600 rounded-full flex items-start justify-center p-1.5 sm:p-2">
          <motion.div
            className="w-1 h-1.5 sm:w-1.5 sm:h-2 bg-gray-600 rounded-full"
            animate={{
              y: [0, 12, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        </div>
      </motion.div>
    </section>
  )
}
