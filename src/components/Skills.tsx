'use client'

import { motion } from 'framer-motion'
import { Sparkles, Brain, Users, Rocket, LineChart, Target } from 'lucide-react'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

interface Skill {
  id: string
  name: string
  category: string
}

interface SkillsProps {
  skills: Skill[]
}

const categoryIcons: Record<string, any> = {
  Leadership: Users,
  Communication: Sparkles,
  Operations: Target,
  Marketing: Rocket,
  Product: Brain,
  Business: LineChart,
  Technical: Brain,
  Research: Target
}

const categoryColors: Record<string, string> = {
  Leadership: 'from-blue-500 to-cyan-500',
  Communication: 'from-purple-500 to-pink-500',
  Operations: 'from-green-500 to-emerald-500',
  Marketing: 'from-orange-500 to-red-500',
  Product: 'from-indigo-500 to-purple-500',
  Business: 'from-yellow-500 to-orange-500',
  Technical: 'from-cyan-500 to-blue-500',
  Research: 'from-pink-500 to-rose-500'
}

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const colorClass = categoryColors[skill.category] || 'from-gray-500 to-gray-700'

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3, delay: index * 0.02 }}
      whileHover={{ scale: 1.03, y: -2 }}
      className="group relative"
    >
      {/* Glow effect */}
      <div className={`absolute -inset-0.5 bg-linear-to-br ${colorClass} opacity-0 group-hover:opacity-20 blur-lg transition-all duration-300 rounded-lg`} />

      <div className="relative bg-white dark:bg-gray-900 rounded-lg p-2.5 sm:p-3 md:p-4 border border-gray-200 dark:border-gray-800 shadow-md group-hover:shadow-xl group-hover:border-gray-300 dark:group-hover:border-gray-700 transition-all duration-300">
        <h3 className="text-xs sm:text-sm md:text-base font-semibold text-gray-900 dark:text-white text-center">
          {skill.name}
        </h3>
      </div>
    </motion.div>
  )
}

function CategorySection({ category, skills }: { category: string; skills: Skill[] }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const Icon = categoryIcons[category] || Sparkles
  const colorClass = categoryColors[category] || 'from-gray-500 to-gray-700'

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="mb-8 sm:mb-10 md:mb-12"
    >
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <div className={`p-2 sm:p-2.5 md:p-3 rounded-lg sm:rounded-xl bg-linear-to-br ${colorClass}`}>
          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </div>
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-200">
          {category}
        </h3>
        <div className="flex-1 h-px bg-linear-to-r from-gray-300 dark:from-gray-700 to-transparent ml-4" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3 md:gap-4">
        {skills.map((skill, index) => (
          <SkillCard key={skill.id} skill={skill} index={index} />
        ))}
      </div>
    </motion.div>
  )
}

export default function Skills({ skills }: SkillsProps) {
  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = []
    }
    acc[skill.category].push(skill)
    return acc
  }, {} as Record<string, Skill[]>)

  return (
    <section id="skills" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white dark:bg-gray-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-purple-400/5 rounded-full blur-3xl"
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
          className="absolute bottom-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-blue-400/5 rounded-full blur-3xl"
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
            className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6 border border-purple-500/20"
            animate={{
              boxShadow: [
                '0 0 0 0 rgba(168, 85, 247, 0)',
                '0 0 0 10px rgba(168, 85, 247, 0.1)',
                '0 0 0 0 rgba(168, 85, 247, 0)'
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
          >
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            Core Competencies
          </motion.div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 md:mb-6">
            <span className="gradient-text">Skills & Expertise</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A comprehensive toolkit built through years of hands-on experience in Web3, product management, and growth strategy
          </p>
        </motion.div>

        {/* Skills by category */}
        <div>
          {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
            <CategorySection key={category} category={category} skills={categorySkills} />
          ))}
        </div>
      </div>
    </section>
  )
}
