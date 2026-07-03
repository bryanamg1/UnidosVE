import { useEffect, useState } from 'react'
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

    if (error.message === 'AUTH_FORBIDDEN') {
      return AUTH_VIEW_CONTENT.alerts.genericError
    }

    if (error.message === 'AUTH_LOGIN_FAILED' || error.message === 'AUTH_REGISTER_FAILED') {
      return AUTH_VIEW_CONTENT.alerts.genericError
    }

    if (!['INVALID_CREDENTIALS', 'DUPLICATE_EMAIL'].includes(error.message)) {
      return error.message
    }
  }

  return AUTH_VIEW_CONTENT.alerts.genericError
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => authService.bootstrap())
  const [status, setStatus] = useState(AUTH_SESSION_STATUS.IDLE)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function restoreSession() {
      setStatus(AUTH_SESSION_STATUS.LOADING)

      try {
        const restoredUser = await authService.restoreSession()

        if (!isMounted) {
          return
        }

        setUser(restoredUser)
        setStatus(AUTH_SESSION_STATUS.READY)
      } catch {
        if (!isMounted) {
          return
        }

        setUser(null)
        setStatus(AUTH_SESSION_STATUS.READY)
      }
    }

    restoreSession()

    return () => {
      isMounted = false
    }
  }, [])

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

  async function logout() {
    setStatus(AUTH_SESSION_STATUS.LOADING)

    try {
      await authService.logout()
    } finally {
      setUser(null)
      setError('')
      setStatus(AUTH_SESSION_STATUS.READY)
    }
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
