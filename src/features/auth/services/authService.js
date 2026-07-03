import { API_ENDPOINTS, AUTH_STORAGE_KEYS } from '../../../constants'
import {
  readStorageItem,
  removeStorageItem,
  writeStorageItem,
} from '../utils/authStorage'
import { apiClient, extractEntity, isApiError } from '../../../services/apiClient'

const LEGACY_AUTH_STORAGE_KEYS = [
  'unidosve.auth.users',
  'unidosve.auth.source',
]

function createAuthFlowError(code, message = code) {
  const error = new Error(message)
  error.code = code
  return error
}

function sanitizeUser(user) {
  if (!user) {
    return null
  }

  const safeUser = { ...user }
  delete safeUser.password
  return safeUser
}

function getAccessToken() {
  return readStorageItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN, null)
}

function buildSessionFromStorage() {
  const session = readStorageItem(AUTH_STORAGE_KEYS.SESSION, null)
  return sanitizeUser(session)
}

function persistApiSession(payload) {
  const responseUser = extractEntity(payload?.user ?? payload)
  const safeUser = sanitizeUser(responseUser)

  writeStorageItem(AUTH_STORAGE_KEYS.SESSION, safeUser)
  writeStorageItem(AUTH_STORAGE_KEYS.ROLE, safeUser?.role ?? null)
  writeStorageItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN, payload?.accessToken ?? null)
  writeStorageItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN, payload?.refreshToken ?? null)

  return safeUser
}

function clearPersistedSession() {
  removeStorageItem(AUTH_STORAGE_KEYS.SESSION)
  removeStorageItem(AUTH_STORAGE_KEYS.ROLE)
  removeStorageItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN)
  removeStorageItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN)

  LEGACY_AUTH_STORAGE_KEYS.forEach((storageKey) => {
    removeStorageItem(storageKey)
  })
}

function normalizeAuthError(error, fallbackCode) {
  if (!isApiError(error)) {
    return error
  }

  const fieldMessages = error.fields && typeof error.fields === 'object'
    ? Object.values(error.fields)
        .flatMap((value) => (Array.isArray(value) ? value : [value]))
        .filter(Boolean)
    : []

  if (error.status === 401) {
    return createAuthFlowError('INVALID_CREDENTIALS')
  }

  if (error.status === 409) {
    return createAuthFlowError('DUPLICATE_EMAIL')
  }

  if (error.status === 403) {
    return createAuthFlowError(
      'AUTH_FORBIDDEN',
      error.message || 'No tienes permisos para completar esta accion.',
    )
  }

  if (error.status === 400) {
    const validationMessage = fieldMessages.length
      ? fieldMessages.join(' ')
      : error.message || 'Datos invalidos.'

    return createAuthFlowError('AUTH_VALIDATION_ERROR', validationMessage)
  }

  if (error.status === 0) {
    return createAuthFlowError('AUTH_NETWORK_ERROR', error.message)
  }

  if (error.status >= 500) {
    return createAuthFlowError('AUTH_SERVER_ERROR', error.message)
  }

  return createAuthFlowError(fallbackCode, error.message || fallbackCode)
}

async function loginWithApi(credentials) {
  const loginPayload = {
    email: credentials.email.trim().toLowerCase(),
    password: credentials.password,
  }

  const response = await apiClient.post(API_ENDPOINTS.auth.login, loginPayload)

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
  const accessToken = getAccessToken()

  if (!accessToken) {
    clearPersistedSession()
    return null
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
    return getAccessToken() ? buildSessionFromStorage() : null
  },

  async restoreSession() {
    try {
      return await restoreApiSession()
    } catch {
      clearPersistedSession()
      return null
    }
  },

  async login(credentials) {
    try {
      return await loginWithApi(credentials)
    } catch (error) {
      throw normalizeAuthError(error, 'AUTH_LOGIN_FAILED')
    }
  },

  async register(payload) {
    try {
      return await registerWithApi(payload)
    } catch (error) {
      throw normalizeAuthError(error, 'AUTH_REGISTER_FAILED')
    }
  },

  async logout() {
    const accessToken = getAccessToken()

    try {
      if (accessToken) {
        await apiClient.post(
          API_ENDPOINTS.auth.logout,
          {},
          {
            requiresAuth: true,
          },
        )
      }
    } catch (error) {
      throw normalizeAuthError(error, 'AUTH_LOGOUT_FAILED')
    } finally {
      clearPersistedSession()
    }
  },
}
