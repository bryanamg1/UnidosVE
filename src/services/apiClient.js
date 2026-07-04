import { API_CONFIG, API_ERROR_CODES } from '../constants'
import { readStorageItem } from '../features/auth/utils/authStorage'
import { AUTH_STORAGE_KEYS } from '../constants'

function normalizeBaseUrl(baseUrl) {
  const normalizedUrl = baseUrl.trim().replace(/\/+$/, '').replace(/\/api$/, '')

  if (/^https?:\/\//i.test(normalizedUrl)) {
    return normalizedUrl
  }

  return `https://${normalizedUrl}`
}

function buildUrl(pathname, query = {}) {
  const url = new URL(`${normalizeBaseUrl(API_CONFIG.baseUrl)}${pathname}`)

  Object.entries(query).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') {
      return
    }

    url.searchParams.set(key, String(value))
  })

  return url.toString()
}

function createApiError({
  code = API_ERROR_CODES.SERVER,
  message = 'No fue posible completar la solicitud.',
  status = 500,
  fields = null,
  payload = null,
}) {
  const error = new Error(message)
  error.name = 'ApiError'
  error.code = code
  error.status = status
  error.fields = fields
  error.payload = payload
  return error
}

function normalizeErrorPayload(status, payload) {
  if (payload && typeof payload === 'object') {
    return createApiError({
      code: payload.error ?? payload.code ?? API_ERROR_CODES.SERVER,
      message: payload.message ?? 'No fue posible completar la solicitud.',
      status,
      fields: payload.fields ?? null,
      payload,
    })
  }

  return createApiError({ status })
}

function getAccessToken() {
  return readStorageItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN, null)
}

async function parseResponse(response) {
  const rawText = await response.text()

  if (!rawText) {
    return null
  }

  try {
    return JSON.parse(rawText)
  } catch {
    return rawText
  }
}

export function isApiError(error) {
  return error?.name === 'ApiError'
}

export function extractCollection(responsePayload) {
  if (Array.isArray(responsePayload)) {
    return responsePayload
  }

  if (Array.isArray(responsePayload?.data)) {
    return responsePayload.data
  }

  return []
}

export function extractEntity(responsePayload) {
  if (!responsePayload || typeof responsePayload !== 'object') {
    return responsePayload
  }

  if (responsePayload.data && !Array.isArray(responsePayload.data)) {
    return responsePayload.data
  }

  return responsePayload
}

export const apiClient = {
  async request(pathname, options = {}) {
    const {
      body,
      headers = {},
      method = 'GET',
      query,
      requiresAuth = false,
    } = options

    const controller = new AbortController()
    const timeoutId = window.setTimeout(() => {
      controller.abort()
    }, API_CONFIG.timeoutMs)

    try {
      const requestHeaders = new Headers(headers)

      if (body !== undefined) {
        requestHeaders.set('Content-Type', 'application/json')
      }

      if (requiresAuth) {
        const accessToken = getAccessToken()

        if (accessToken) {
          requestHeaders.set('Authorization', `Bearer ${accessToken}`)
        }
      }

      const response = await fetch(buildUrl(pathname, query), {
        method,
        headers: requestHeaders,
        body: body !== undefined ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      })

      const payload = await parseResponse(response)

      if (!response.ok) {
        throw normalizeErrorPayload(response.status, payload)
      }

      return payload
    } catch (error) {
      if (isApiError(error)) {
        throw error
      }

      if (error?.name === 'AbortError') {
        throw createApiError({
          code: API_ERROR_CODES.TIMEOUT,
          message: 'La solicitud tardo demasiado en responder.',
          status: 0,
        })
      }

      throw createApiError({
        code: API_ERROR_CODES.NETWORK,
        message: 'No fue posible conectar con el backend.',
        status: 0,
      })
    } finally {
      window.clearTimeout(timeoutId)
    }
  },

  get(pathname, options = {}) {
    return this.request(pathname, {
      ...options,
      method: 'GET',
    })
  },

  post(pathname, body, options = {}) {
    return this.request(pathname, {
      ...options,
      method: 'POST',
      body,
    })
  },

  patch(pathname, body, options = {}) {
    return this.request(pathname, {
      ...options,
      method: 'PATCH',
      body,
    })
  },
}
