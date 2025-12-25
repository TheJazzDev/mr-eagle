'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, Save, X, Briefcase, Award, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Experience {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string | null
  description: string[]
  current: boolean
}

interface Skill {
  id: string
  name: string
  category: string
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'experiences' | 'skills'>('experiences')
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editingExp, setEditingExp] = useState<Experience | null>(null)
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null)
  const [showExpForm, setShowExpForm] = useState(false)
  const [showSkillForm, setShowSkillForm] = useState(false)

  // Fetch data
  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const res = await fetch('/api/admin/data')
      const data = await res.json()
      setExperiences(data.experiences || [])
      setSkills(data.skills || [])
    } catch (error) {
      console.error('Failed to fetch data:', error)
    } finally {
      setLoading(false)
    }
  }

  // Experience handlers
  const handleSaveExperience = async (exp: Experience) => {
    setSaving(true)
    try {
      const res = await fetch('/api/admin/experience', {
        method: exp.id.startsWith('new-') ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(exp)
      })
      if (res.ok) {
        await fetchData()
        setEditingExp(null)
        setShowExpForm(false)
      }
    } catch (error) {
      console.error('Failed to save experience:', error)
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteExperience = async (id: string) => {
    if (!confirm('Are you sure you want to delete this experience?')) return
    setSaving(true)
    try {
      await fetch(`/api/admin/experience?id=${id}`, { method: 'DELETE' })
      await fetchData()
    } catch (error) {
      console.error('Failed to delete experience:', error)
    } finally {
      setSaving(false)
    }
  }

  // Skill handlers
  const handleSaveSkill = async (skill: Skill) => {
    setSaving(true)
    try {
      const res = await fetch('/api/admin/skill', {
        method: skill.id.startsWith('new-') ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(skill)
      })
      if (res.ok) {
        await fetchData()
        setEditingSkill(null)
        setShowSkillForm(false)
      }
    } catch (error) {
      console.error('Failed to save skill:', error)
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteSkill = async (id: string) => {
    if (!confirm('Are you sure you want to delete this skill?')) return
    setSaving(true)
    try {
      await fetch(`/api/admin/skill?id=${id}`, { method: 'DELETE' })
      await fetchData()
    } catch (error) {
      console.error('Failed to delete skill:', error)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Tabs */}
      <div className="flex gap-2 mb-6 sm:mb-8 border-b border-gray-200 dark:border-gray-800">
        <button
          onClick={() => setActiveTab('experiences')}
          className={`px-4 py-2 sm:px-6 sm:py-3 font-medium text-sm sm:text-base transition-colors relative ${
            activeTab === 'experiences'
              ? 'text-blue-500'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 inline mr-2" />
          Experiences
          {activeTab === 'experiences' && (
            <motion.div
              layoutId="activeTab"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
            />
          )}
        </button>
        <button
          onClick={() => setActiveTab('skills')}
          className={`px-4 py-2 sm:px-6 sm:py-3 font-medium text-sm sm:text-base transition-colors relative ${
            activeTab === 'skills'
              ? 'text-blue-500'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          <Award className="w-4 h-4 sm:w-5 sm:h-5 inline mr-2" />
          Skills
          {activeTab === 'skills' && (
            <motion.div
              layoutId="activeTab"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
            />
          )}
        </button>
      </div>

      {/* Experiences Tab */}
      {activeTab === 'experiences' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              Work Experiences
            </h2>
            <button
              onClick={() => {
                setEditingExp({
                  id: `new-${Date.now()}`,
                  company: '',
                  position: '',
                  startDate: '',
                  endDate: null,
                  description: [''],
                  current: false
                })
                setShowExpForm(true)
              }}
              className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium text-sm transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add Experience</span>
              <span className="sm:hidden">Add</span>
            </button>
          </div>

          <div className="space-y-4">
            {experiences.map((exp) => (
              <ExperienceCard
                key={exp.id}
                experience={exp}
                onEdit={() => {
                  setEditingExp(exp)
                  setShowExpForm(true)
                }}
                onDelete={() => handleDeleteExperience(exp.id)}
              />
            ))}
          </div>

          {/* Experience Form Modal */}
          <AnimatePresence>
            {showExpForm && editingExp && (
              <ExperienceForm
                experience={editingExp}
                onSave={handleSaveExperience}
                onCancel={() => {
                  setShowExpForm(false)
                  setEditingExp(null)
                }}
                saving={saving}
              />
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Skills Tab */}
      {activeTab === 'skills' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              Skills & Expertise
            </h2>
            <button
              onClick={() => {
                setEditingSkill({
                  id: `new-${Date.now()}`,
                  name: '',
                  category: 'Leadership'
                })
                setShowSkillForm(true)
              }}
              className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium text-sm transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add Skill</span>
              <span className="sm:hidden">Add</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {skills.map((skill) => (
              <SkillCard
                key={skill.id}
                skill={skill}
                onEdit={() => {
                  setEditingSkill(skill)
                  setShowSkillForm(true)
                }}
                onDelete={() => handleDeleteSkill(skill.id)}
              />
            ))}
          </div>

          {/* Skill Form Modal */}
          <AnimatePresence>
            {showSkillForm && editingSkill && (
              <SkillForm
                skill={editingSkill}
                onSave={handleSaveSkill}
                onCancel={() => {
                  setShowSkillForm(false)
                  setEditingSkill(null)
                }}
                saving={saving}
              />
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}

// Experience Card Component
function ExperienceCard({ experience, onEdit, onDelete }: {
  experience: Experience
  onEdit: () => void
  onDelete: () => void
}) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg p-4 sm:p-6 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
            {experience.position}
          </h3>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">{experience.company}</p>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-500 mt-1">
            {experience.startDate} - {experience.endDate || 'Present'}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={onDelete}
            className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      <ul className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 space-y-1">
        {experience.description.slice(0, 2).map((desc, i) => (
          <li key={i} className="line-clamp-1">• {desc}</li>
        ))}
        {experience.description.length > 2 && (
          <li className="text-gray-500">+ {experience.description.length - 2} more...</li>
        )}
      </ul>
    </div>
  )
}

// Skill Card Component
function SkillCard({ skill, onEdit, onDelete }: {
  skill: Skill
  onEdit: () => void
  onDelete: () => void
}) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg p-3 sm:p-4 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow group">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
            {skill.name}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{skill.category}</p>
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={onEdit}
            className="p-1.5 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onDelete}
            className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  )
}

// Experience Form Component
function ExperienceForm({ experience, onSave, onCancel, saving }: {
  experience: Experience
  onSave: (exp: Experience) => void
  onCancel: () => void
  saving: boolean
}) {
  const [formData, setFormData] = useState(experience)
  const [descText, setDescText] = useState(experience.description.join('\n'))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      ...formData,
      description: descText.split('\n').filter(line => line.trim())
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onCancel}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-gray-900 rounded-2xl p-6 sm:p-8 max-w-2xl lg:max-w-5xl w-full max-h-[90vh] overflow-y-auto"
      >
        <h2 className="text-xl sm:text-2xl font-bold mb-6 gradient-text">
          {experience.id.startsWith('new-') ? 'Add Experience' : 'Edit Experience'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Company *
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Position *
              </label>
              <input
                type="text"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Start Date *
              </label>
              <input
                type="text"
                placeholder="e.g. Jan 2024"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                End Date
              </label>
              <input
                type="text"
                placeholder="Leave empty if current"
                value={formData.endDate || ''}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value || null })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <input
                type="checkbox"
                checked={formData.current}
                onChange={(e) => setFormData({ ...formData, current: e.target.checked })}
                className="rounded border-gray-300 dark:border-gray-700"
              />
              Current Position
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description (one per line) *
            </label>
            <textarea
              value={descText}
              onChange={(e) => setDescText(e.target.value)}
              rows={10}
              className="w-full min-h-[200px] lg:min-h-[400px] px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none resize-y"
              placeholder="Enter each responsibility on a new line..."
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-400 text-white rounded-lg font-medium transition-colors"
            >
              {saving ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
              ) : (
                <><Save className="w-4 h-4" /> Save</>
              )}
            </button>
            <button
              type="button"
              onClick={onCancel}
              disabled={saving}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-lg font-medium transition-colors"
            >
              <X className="w-4 h-4" /> Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

// Skill Form Component
function SkillForm({ skill, onSave, onCancel, saving }: {
  skill: Skill
  onSave: (skill: Skill) => void
  onCancel: () => void
  saving: boolean
}) {
  const [formData, setFormData] = useState(skill)

  const categories = [
    'Leadership',
    'Communication',
    'Operations',
    'Marketing',
    'Product',
    'Business',
    'Technical',
    'Research'
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onCancel}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-gray-900 rounded-2xl p-6 sm:p-8 max-w-md lg:max-w-xl w-full"
      >
        <h2 className="text-xl sm:text-2xl font-bold mb-6 gradient-text">
          {skill.id.startsWith('new-') ? 'Add Skill' : 'Edit Skill'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Skill Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category *
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              required
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-400 text-white rounded-lg font-medium transition-colors"
            >
              {saving ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
              ) : (
                <><Save className="w-4 h-4" /> Save</>
              )}
            </button>
            <button
              type="button"
              onClick={onCancel}
              disabled={saving}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-lg font-medium transition-colors"
            >
              <X className="w-4 h-4" /> Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}
