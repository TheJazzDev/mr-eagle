'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, Unlock } from 'lucide-react'
import AdminDashboard from '@/src/components/AdminDashboard'

export default function SecretAdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Initialize state from sessionStorage on mount
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('eagle_admin_auth') === 'true'
    }
    return false
  })
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simple password check - Raymond can change this later
    if (password === 'eagle2025') {
      sessionStorage.setItem('eagle_admin_auth', 'true')
      setIsAuthenticated(true)
      setError('')
    } else {
      setError('Invalid password')
      setPassword('')
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem('eagle_admin_auth')
    setIsAuthenticated(false)
    router.push('/')
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-purple-50 to-cyan-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20 p-4">
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-blue-500/10 rounded-full">
                <Lock className="w-8 h-8 text-blue-500" />
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2 gradient-text">
              Admin Access
            </h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 text-center mb-6">
              Enter password to manage portfolio content
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  autoFocus
                />
              </div>

              {error && (
                <p className="text-sm text-red-500 text-center">{error}</p>
              )}

              <button
                type="submit"
                className="w-full px-4 py-3 bg-linear-to-br from-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all hover:scale-105"
              >
                Unlock Dashboard
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <Unlock className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold gradient-text">Admin Dashboard</h1>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Portfolio Management</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="px-3 py-2 sm:px-4 sm:py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <AdminDashboard />
    </div>
  )
}
