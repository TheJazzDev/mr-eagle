'use client'

import { motion } from 'framer-motion'
import { Briefcase, Calendar, TrendingUp } from 'lucide-react'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

interface Experience {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string | null
  description: string[]
  current: boolean
}

interface ExperienceTimelineProps {
  experiences: Experience[]
}

function ExperienceCard({ experience, index }: { experience: Experience; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`mb-6 sm:mb-8 md:mb-12 flex flex-col ${
        index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
      } gap-4 sm:gap-6 md:gap-8`}
    >
      {/* Timeline dot */}
      <div className="hidden md:flex shrink-0 items-start justify-center relative w-full md:w-1/2">
        <div className="absolute top-0 bottom-0 w-0.5 sm:w-1 bg-linear-to-b from-blue-500 via-purple-500 to-cyan-500" />
        <motion.div
          className="relative z-10 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-linear-to-br from-blue-500 via-purple-500 to-cyan-500 flex items-center justify-center shadow-lg"
          whileHover={{ scale: 1.2, rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          <Briefcase className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
        </motion.div>
      </div>

      {/* Content card */}
      <div className="w-full md:w-1/2">
        <motion.div
          className="relative group"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          {/* Glow effect on hover */}
          <div className="absolute -inset-1 bg-linear-to-br from-blue-500 via-purple-500 to-cyan-500 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />

          <div className="relative bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-linear-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5 rounded-bl-full" />

            {/* Current badge */}
            {experience.current && (
              <motion.div
                className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 bg-green-500/10 text-green-600 dark:text-green-400 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4 border border-green-500/20"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
                Current Role
              </motion.div>
            )}

            {/* Company & Position */}
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 gradient-text">
              {experience.position}
            </h3>
            <h4 className="text-base sm:text-lg md:text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2 sm:mb-3">
              {experience.company}
            </h4>

            {/* Date */}
            <div className="flex items-center gap-2 text-xs sm:text-sm md:text-base text-gray-500 dark:text-gray-400 mb-4 sm:mb-6">
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>
                {experience.startDate} - {experience.endDate || 'Present'}
              </span>
            </div>

            {/* Description */}
            <ul className="space-y-2 sm:space-y-3">
              {experience.description.map((desc, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400"
                >
                  <span className="shrink-0 w-1.5 h-1.5 sm:w-2 sm:h-2 mt-1.5 sm:mt-2 rounded-full bg-linear-to-br from-blue-500 to-purple-500" />
                  <span className="flex-1">{desc}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  const sortedExperiences = [...experiences].sort((a, b) => {
    if (a.current) return -1
    if (b.current) return 1
    return 0
  })

  return (
    <section id="experience" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50 dark:bg-black relative overflow-hidden">
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
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 md:mb-6">
            <span className="gradient-text">Professional Journey</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A timeline of impactful roles across Web3, blockchain, and emerging technologies
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {sortedExperiences.map((experience, index) => (
            <ExperienceCard key={experience.id} experience={experience} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
