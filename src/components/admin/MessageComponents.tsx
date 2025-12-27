'use client'

import { motion } from 'framer-motion'
import { Mail, MailOpen, Trash2, X, Clock } from 'lucide-react'

interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string | null
  message: string
  read: boolean
  createdAt: string
  updatedAt: string
}

// Message Card Component
export function MessageCard({ message, onClick, onToggleRead, onDelete }: {
  message: ContactMessage
  onClick: () => void
  onToggleRead: () => void
  onDelete: () => void
}) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 24) {
      return diffInHours < 1 ? 'Just now' : `${diffInHours}h ago`
    } else if (diffInHours < 48) {
      return 'Yesterday'
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    }
  }

  return (
    <div
      className={`bg-white dark:bg-gray-900 rounded-lg p-4 sm:p-6 border transition-all cursor-pointer hover:shadow-md ${
        message.read
          ? 'border-gray-200 dark:border-gray-800'
          : 'border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-900/10'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0" onClick={onClick}>
          <div className="flex items-center gap-2 mb-2">
            {!message.read && (
              <div className="w-2 h-2 bg-blue-500 rounded-full shrink-0" />
            )}
            <h3 className={`text-sm sm:text-base font-semibold truncate ${
              message.read
                ? 'text-gray-900 dark:text-white'
                : 'text-blue-900 dark:text-blue-100'
            }`}>
              {message.name}
            </h3>
            <span className="text-xs text-gray-500 dark:text-gray-400 shrink-0">
              {formatDate(message.createdAt)}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2">
            {message.email}
          </p>

          {message.subject && (
            <p className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {message.subject}
            </p>
          )}

          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {message.message}
          </p>
        </div>

        <div className="flex gap-1 shrink-0">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onToggleRead()
            }}
            className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            title={message.read ? 'Mark as unread' : 'Mark as read'}
          >
            {message.read ? <Mail className="w-4 h-4" /> : <MailOpen className="w-4 h-4" />}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onDelete()
            }}
            className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

// Message Detail Modal
export function MessageDetailModal({ message, onClose, onToggleRead, onDelete }: {
  message: ContactMessage
  onClose: () => void
  onToggleRead: () => void
  onDelete: () => void
}) {
  const formatFullDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-gray-900 rounded-2xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            {!message.read && (
              <div className="w-3 h-3 bg-blue-500 rounded-full shrink-0" />
            )}
            <h2 className="text-xl sm:text-2xl font-bold gradient-text">
              Message from {message.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Message Info */}
          <div className="space-y-3 pb-4 border-b border-gray-200 dark:border-gray-800">
            <div>
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                From
              </label>
              <p className="text-sm sm:text-base text-gray-900 dark:text-white">{message.email}</p>
            </div>

            {message.subject && (
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Subject
                </label>
                <p className="text-sm sm:text-base font-medium text-gray-900 dark:text-white">
                  {message.subject}
                </p>
              </div>
            )}

            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              <Clock className="w-4 h-4" />
              <span>{formatFullDate(message.createdAt)}</span>
            </div>
          </div>

          {/* Message Content */}
          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
              Message
            </label>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 sm:p-6">
              <p className="text-sm sm:text-base text-gray-900 dark:text-white whitespace-pre-wrap">
                {message.message}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={onToggleRead}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-lg font-medium transition-colors"
            >
              {message.read ? (
                <><Mail className="w-4 h-4" /> Mark Unread</>
              ) : (
                <><MailOpen className="w-4 h-4" /> Mark Read</>
              )}
            </button>
            <button
              onClick={onDelete}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
            >
              <Trash2 className="w-4 h-4" /> Delete
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
