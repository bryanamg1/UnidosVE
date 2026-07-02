import {
  AUTH_MOCK_SEED_USERS,
  AUTH_STORAGE_KEYS,
} from '../../../constants'
import {
  readStorageItem,
  removeStorageItem,
  writeStorageItem,
} from '../utils/authStorage'

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

function buildSessionFromStorage() {
  const session = readStorageItem(AUTH_STORAGE_KEYS.SESSION, null)

  if (!session) {
    return null
  }

  return session
}

export const authService = {
  bootstrap() {
    getStoredUsers()
    return buildSessionFromStorage()
  },

  async login(credentials) {
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

    return persistSession(user)
  },

  async register(payload) {
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

    return persistSession(newUser)
  },

  logout() {
    removeStorageItem(AUTH_STORAGE_KEYS.SESSION)
    removeStorageItem(AUTH_STORAGE_KEYS.ROLE)
  },
}
