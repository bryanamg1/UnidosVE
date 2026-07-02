import { useState } from 'react'
import {
  AUTH_SESSION_STATUS,
  AUTH_VIEW_CONTENT,
} from '../constants'
import { authService } from '../features/auth/services/authService'
import { AuthContext } from './AuthContextInstance'

function mapAuthErrorToMessage(error) {
  if (error instanceof Error) {
    if (error.message === 'INVALID_CREDENTIALS') {
      return AUTH_VIEW_CONTENT.alerts.invalidCredentials
    }

    if (error.message === 'DUPLICATE_EMAIL') {
      return AUTH_VIEW_CONTENT.alerts.duplicateEmail
    }
  }

  return AUTH_VIEW_CONTENT.alerts.genericError
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => authService.bootstrap())
  const [status, setStatus] = useState(AUTH_SESSION_STATUS.READY)
  const [error, setError] = useState('')

  async function login(credentials) {
    setStatus(AUTH_SESSION_STATUS.LOADING)
    setError('')

    try {
      const nextUser = await authService.login(credentials)
      setUser(nextUser)
      setStatus(AUTH_SESSION_STATUS.READY)
      return nextUser
    } catch (authError) {
      setStatus(AUTH_SESSION_STATUS.ERROR)
      setError(mapAuthErrorToMessage(authError))
      throw authError
    }
  }

  async function register(payload) {
    setStatus(AUTH_SESSION_STATUS.LOADING)
    setError('')

    try {
      const nextUser = await authService.register(payload)
      setUser(nextUser)
      setStatus(AUTH_SESSION_STATUS.READY)
      return nextUser
    } catch (authError) {
      setStatus(AUTH_SESSION_STATUS.ERROR)
      setError(mapAuthErrorToMessage(authError))
      throw authError
    }
  }

  function logout() {
    authService.logout()
    setUser(null)
    setError('')
    setStatus(AUTH_SESSION_STATUS.READY)
  }

  function clearError() {
    setError('')

    if (status === AUTH_SESSION_STATUS.ERROR) {
      setStatus(AUTH_SESSION_STATUS.READY)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role ?? null,
        isAuthenticated: Boolean(user),
        status,
        error,
        login,
        register,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
