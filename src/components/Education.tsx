'use client'

import { motion } from 'framer-motion'
import { GraduationCap, Award, BookOpen } from 'lucide-react'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

interface EducationItem {
  id: string
  institution: string
  degree: string
  field: string | null
  year: string
}

interface EducationProps {
  education: EducationItem[]
}

function EducationCard({ item, index }: { item: EducationItem; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      whileHover={{ scale: 1.03, y: -5 }}
      className="group relative"
    >
      {/* Glow effect */}
      <div className="absolute -inset-1 bg-linear-to-br from-amber-500 via-orange-500 to-red-500 opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-500 rounded-2xl sm:rounded-3xl" />

      <div className="relative bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 border border-gray-200 dark:border-gray-800 shadow-xl overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 sm:w-40 sm:h-40 bg-linear-to-br from-amber-500/5 via-orange-500/5 to-red-500/5 rounded-bl-full" />
        <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-32 sm:h-32 bg-linear-to-tr from-amber-500/5 via-orange-500/5 to-red-500/5 rounded-tr-full" />

        {/* Icon */}
        <motion.div
          className="inline-flex p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-linear-to-br from-amber-500 via-orange-500 to-red-500 mb-4 sm:mb-6 relative z-10"
          whileHover={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 0.5 }}
        >
          <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
        </motion.div>

        {/* Institution badge */}
        <div className="flex items-center gap-2 mb-3 sm:mb-4 relative z-10">
          <Award className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
          <span className="text-xs sm:text-sm font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wide">
            {item.year}
          </span>
        </div>

        {/* Institution */}
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 text-gray-900 dark:text-white gradient-text relative z-10">
          {item.institution}
        </h3>

        {/* Degree */}
        <h4 className="text-base sm:text-lg md:text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2 relative z-10">
          {item.degree}
        </h4>

        {/* Field */}
        {item.field && (
          <div className="flex items-center gap-2 text-sm sm:text-base text-gray-600 dark:text-gray-400 relative z-10">
            <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>{item.field}</span>
          </div>
        )}

        {/* Decorative line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-amber-500 via-orange-500 to-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
      </div>
    </motion.div>
  )
}

export default function Education({ education }: EducationProps) {
  return (
    <section id="education" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50 dark:bg-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.02] dark:opacity-[0.05]" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6 border border-amber-500/20"
            animate={{
              boxShadow: [
                '0 0 0 0 rgba(245, 158, 11, 0)',
                '0 0 0 10px rgba(245, 158, 11, 0.1)',
                '0 0 0 0 rgba(245, 158, 11, 0)'
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
          >
            <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            Academic Excellence
          </motion.div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 md:mb-6">
            <span className="gradient-text">Education</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            World-class education from prestigious institutions
          </p>
        </motion.div>

        {/* Education cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {education.map((item, index) => (
            <EducationCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
