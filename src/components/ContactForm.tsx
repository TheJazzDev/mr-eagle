'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Loader2, CheckCircle, XCircle } from 'lucide-react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        const data = await res.json()
        setStatus('error')
        setErrorMessage(data.error || 'Failed to send message')
      }
    } catch (error) {
      setStatus('error')
      setErrorMessage('Network error. Please try again.')
    }
  }

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-[#2d1810] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-amber-600/10 rounded-full blur-3xl"
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
          className="absolute bottom-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-orange-600/10 rounded-full blur-3xl"
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
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 text-[#d4a574]">
            Get In Touch
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[#f5e6d3]/80 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Drop me a message!
          </p>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm sm:text-base font-medium text-[#f5e6d3] mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-[#3d2415] border border-[#5a3d2b] rounded-lg text-[#f5e6d3] placeholder-[#f5e6d3]/40 focus:ring-2 focus:ring-[#d4a574] focus:border-transparent outline-none transition-all"
                  placeholder="John Doe"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm sm:text-base font-medium text-[#f5e6d3] mb-2">
                  Your Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-[#3d2415] border border-[#5a3d2b] rounded-lg text-[#f5e6d3] placeholder-[#f5e6d3]/40 focus:ring-2 focus:ring-[#d4a574] focus:border-transparent outline-none transition-all"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm sm:text-base font-medium text-[#f5e6d3] mb-2">
                Subject
              </label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-[#3d2415] border border-[#5a3d2b] rounded-lg text-[#f5e6d3] placeholder-[#f5e6d3]/40 focus:ring-2 focus:ring-[#d4a574] focus:border-transparent outline-none transition-all"
                placeholder="Project Collaboration"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm sm:text-base font-medium text-[#f5e6d3] mb-2">
                Message *
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={6}
                className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-[#3d2415] border border-[#5a3d2b] rounded-lg text-[#f5e6d3] placeholder-[#f5e6d3]/40 focus:ring-2 focus:ring-[#d4a574] focus:border-transparent outline-none transition-all resize-y"
                placeholder="Tell me about your project or idea..."
                required
              />
            </div>

            {/* Status Messages */}
            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-3 sm:p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400"
              >
                <CheckCircle className="w-5 h-5 shrink-0" />
                <p className="text-sm sm:text-base">Message sent successfully! I'll get back to you soon.</p>
              </motion.div>
            )}

            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-3 sm:p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400"
              >
                <XCircle className="w-5 h-5 shrink-0" />
                <p className="text-sm sm:text-base">{errorMessage}</p>
              </motion.div>
            )}

            {/* Submit Button */}
            <div className="flex justify-center sm:justify-start">
              <button
                type="submit"
                disabled={status === 'loading'}
                className="flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-[#d4a574] to-[#c9a567] hover:from-[#c9a567] hover:to-[#d4a574] text-[#2d1810] font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span className="text-sm sm:text-base">Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span className="text-sm sm:text-base">Send Message</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
