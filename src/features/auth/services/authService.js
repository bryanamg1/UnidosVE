import {
  API_ENDPOINTS,
  AUTH_MOCK_SEED_USERS,
  AUTH_STORAGE_KEYS,
} from '../../../constants'
import {
  readStorageItem,
  removeStorageItem,
  writeStorageItem,
} from '../utils/authStorage'
import {
  apiClient,
  extractEntity,
  isApiError,
  shouldFallbackToMock,
} from '../../../services/apiClient'

function wait(delayMs = 250) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, delayMs)
  })
}

function sanitizeUser(user) {
  if (!user) {
    return null
  }

  const safeUser = { ...user }
  delete safeUser.password
  return safeUser
}

function getStoredUsers() {
  // Temporary local fallback while the live auth flow can be unavailable.
  const storedUsers = readStorageItem(AUTH_STORAGE_KEYS.USERS, null)

  if (Array.isArray(storedUsers) && storedUsers.length > 0) {
    return storedUsers
  }

  writeStorageItem(AUTH_STORAGE_KEYS.USERS, AUTH_MOCK_SEED_USERS)
  return AUTH_MOCK_SEED_USERS
}

function persistSession(user) {
  const safeUser = sanitizeUser(user)

  writeStorageItem(AUTH_STORAGE_KEYS.SESSION, safeUser)
  writeStorageItem(AUTH_STORAGE_KEYS.ROLE, safeUser?.role ?? null)

  return safeUser
}

function persistApiSession(payload) {
  const responseUser = extractEntity(payload?.user ?? payload)
  const safeUser = sanitizeUser(responseUser)

  writeStorageItem(AUTH_STORAGE_KEYS.SESSION, safeUser)
  writeStorageItem(AUTH_STORAGE_KEYS.ROLE, safeUser?.role ?? null)
  writeStorageItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN, payload?.accessToken ?? null)
  writeStorageItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN, payload?.refreshToken ?? null)
  writeStorageItem(AUTH_STORAGE_KEYS.SOURCE, 'api')

  return safeUser
}

function buildSessionFromStorage() {
  const session = readStorageItem(AUTH_STORAGE_KEYS.SESSION, null)

  if (!session) {
    return null
  }

  return session
}

function clearPersistedSession() {
  removeStorageItem(AUTH_STORAGE_KEYS.SESSION)
  removeStorageItem(AUTH_STORAGE_KEYS.ROLE)
  removeStorageItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN)
  removeStorageItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN)
  removeStorageItem(AUTH_STORAGE_KEYS.SOURCE)
}

function normalizeAuthError(error, fallbackCode) {
  if (!isApiError(error)) {
    return error
  }

  if (error.status === 401) {
    return new Error('INVALID_CREDENTIALS')
  }

  if (error.status === 409) {
    return new Error('DUPLICATE_EMAIL')
  }

  if (error.status === 403) {
    return new Error('AUTH_FORBIDDEN')
  }

  if (error.status === 400 && error.message) {
    return new Error(error.message)
  }

  return new Error(fallbackCode)
}

async function loginWithApi(credentials) {
  const response = await apiClient.post(API_ENDPOINTS.auth.login, {
    email: credentials.email.trim().toLowerCase(),
    password: credentials.password,
    role: credentials.role,
  })

  return persistApiSession(response)
}

async function registerWithApi(payload) {
  const response = await apiClient.post(API_ENDPOINTS.auth.register, {
    firstName: payload.firstName.trim(),
    lastName: payload.lastName.trim(),
    email: payload.email.trim().toLowerCase(),
    password: payload.password,
    role: payload.role,
  })

  return persistApiSession(response)
}

async function restoreApiSession() {
  const accessToken = readStorageItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN, null)

  if (!accessToken) {
    return buildSessionFromStorage()
  }

  const response = await apiClient.get(API_ENDPOINTS.auth.me, {
    requiresAuth: true,
  })

  return persistApiSession({
    accessToken,
    refreshToken: readStorageItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN, null),
    user: extractEntity(response?.user ?? response),
  })
}

export const authService = {
  bootstrap() {
    return buildSessionFromStorage()
  },

  async restoreSession() {
    const source = readStorageItem(AUTH_STORAGE_KEYS.SOURCE, null)

    if (source !== 'api') {
      getStoredUsers()
      return buildSessionFromStorage()
    }

    try {
      return await restoreApiSession()
    } catch (error) {
      if (shouldFallbackToMock(error)) {
        return buildSessionFromStorage()
      }

      clearPersistedSession()
      return null
    }
  },

  async login(credentials) {
    try {
      return await loginWithApi(credentials)
    } catch (error) {
      if (!shouldFallbackToMock(error)) {
        throw normalizeAuthError(error, 'AUTH_LOGIN_FAILED')
      }
    }

    await wait()

    const users = getStoredUsers()
    const normalizedEmail = credentials.email.trim().toLowerCase()
    const user = users.find(
      (candidate) =>
        candidate.email.toLowerCase() === normalizedEmail &&
        candidate.password === credentials.password &&
        candidate.role === credentials.role,
    )

    if (!user) {
      throw new Error('INVALID_CREDENTIALS')
    }

    writeStorageItem(AUTH_STORAGE_KEYS.SOURCE, 'mock')
    return persistSession(user)
  },

  async register(payload) {
    try {
      return await registerWithApi(payload)
    } catch (error) {
      if (!shouldFallbackToMock(error)) {
        throw normalizeAuthError(error, 'AUTH_REGISTER_FAILED')
      }
    }

    await wait()

    const users = getStoredUsers()
    const normalizedEmail = payload.email.trim().toLowerCase()
    const duplicateUser = users.find(
      (candidate) => candidate.email.toLowerCase() === normalizedEmail,
    )

    if (duplicateUser) {
      throw new Error('DUPLICATE_EMAIL')
    }

    const newUser = {
      id: `mock-${payload.role}-${Date.now()}`,
      firstName: payload.firstName.trim(),
      lastName: payload.lastName.trim(),
      email: normalizedEmail,
      password: payload.password,
      role: payload.role,
    }

    writeStorageItem(AUTH_STORAGE_KEYS.USERS, [...users, newUser])
    writeStorageItem(AUTH_STORAGE_KEYS.SOURCE, 'mock')

    return persistSession(newUser)
  },

  async logout() {
    const source = readStorageItem(AUTH_STORAGE_KEYS.SOURCE, null)

    if (source === 'api') {
      try {
        await apiClient.post(
          API_ENDPOINTS.auth.logout,
          {},
          {
            requiresAuth: true,
          },
        )
      } catch (error) {
        if (!shouldFallbackToMock(error)) {
          throw normalizeAuthError(error, 'AUTH_LOGOUT_FAILED')
        }
      }
    }

    clearPersistedSession()
  },
}
