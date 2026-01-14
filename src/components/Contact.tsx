'use client'

import { motion } from 'framer-motion'
import { Mail, Twitter, Send } from 'lucide-react'

interface ContactProps {
  profile: {
    name: string
    email: string
    phone?: string | null
    twitter?: string | null
    telegram?: string | null
    location: string
  }
}

export default function Contact({ profile }: ContactProps) {
  return (
    <section id="contact" className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-linear-to-br from-blue-900 via-purple-900 to-cyan-900 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-[20%] left-[10%] w-48 h-48 sm:w-64 sm:h-64 bg-blue-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
        <motion.div
          className="absolute bottom-[20%] right-[10%] w-48 h-48 sm:w-64 sm:h-64 bg-purple-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.4, 0.2, 0.4]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 md:mb-6">
            Let's Connect
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-blue-100 max-w-2xl mx-auto">
            Open to exciting opportunities in Web3, product management, and growth strategy
          </p>
        </motion.div>

        {/* Availability Status Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mb-8 sm:mb-12"
        >
          <div className="inline-flex items-center gap-2 sm:gap-3 bg-green-500/20 backdrop-blur-sm border border-green-400/50 rounded-full px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4">
            <motion.div
              className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [1, 0.7, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
            <span className="text-sm sm:text-base md:text-lg font-semibold text-green-300">
              Available for new projects
            </span>
          </div>
        </motion.div>

        {/* Contact cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16 justify-items-center max-w-4xl mx-auto">
          {/* Email */}
          <motion.a
            href={`mailto:${profile.email}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="group relative bg-white/10 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20 hover:bg-white/20 transition-all"
          >
            <div className="flex flex-col items-center text-center gap-3 sm:gap-4">
              <div className="p-3 sm:p-4 bg-blue-500 rounded-xl sm:rounded-2xl group-hover:scale-110 transition-transform">
                <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-semibold mb-1 text-blue-100">Email</h3>
                <p className="text-xs sm:text-sm text-white break-all">{profile.email}</p>
              </div>
            </div>
          </motion.a>

          {/* Twitter */}
          {profile.twitter && (
            <motion.a
              href={`https://twitter.com/${profile.twitter.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group relative bg-white/10 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20 hover:bg-white/20 transition-all"
            >
              <div className="flex flex-col items-center text-center gap-3 sm:gap-4">
                <div className="p-3 sm:p-4 bg-blue-400 rounded-xl sm:rounded-2xl group-hover:scale-110 transition-transform">
                  <Twitter className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-semibold mb-1 text-blue-100">Twitter</h3>
                  <p className="text-xs sm:text-sm text-white">{profile.twitter}</p>
                </div>
              </div>
            </motion.a>
          )}

          {/* Telegram */}
          {profile.telegram && (
            <motion.a
              href={`https://t.me/${profile.telegram.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group relative bg-white/10 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20 hover:bg-white/20 transition-all"
            >
              <div className="flex flex-col items-center text-center gap-3 sm:gap-4">
                <div className="p-3 sm:p-4 bg-purple-500 rounded-xl sm:rounded-2xl group-hover:scale-110 transition-transform">
                  <Send className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-semibold mb-1 text-blue-100">Telegram</h3>
                  <p className="text-xs sm:text-sm text-white">{profile.telegram}</p>
                </div>
              </div>
            </motion.a>
          )}

        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center pt-8 sm:pt-12 border-t border-white/10"
        >
          <p className="text-xs sm:text-sm text-blue-100 mb-2 sm:mb-3">
            © {new Date().getFullYear()} Mr Eagle. All rights reserved.
          </p>
          <p className="text-xs sm:text-sm text-blue-200">
            Made by{' '}
            <a
              href="https://www.jazzdev.xyz/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-300 hover:text-white transition-colors underline"
            >
              JazzDev
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
