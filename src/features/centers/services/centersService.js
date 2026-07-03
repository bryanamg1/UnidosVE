import { API_ENDPOINTS, CENTER_STORAGE_KEYS } from '../../../constants'
import {
  apiClient,
  extractCollection,
  extractEntity,
  shouldFallbackToMock,
} from '../../../services/apiClient'
import { adaptCenter } from '../adapters/centerAdapter'
import { centersMock } from '../mocks/centers.mock'

function wait(delayMs = 220) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, delayMs)
  })
}

function readCenterEntries() {
  // Temporary local fallback while the live centers API can be unavailable.
  if (typeof window === 'undefined') {
    return centersMock
  }

  try {
    const rawValue = window.localStorage.getItem(CENTER_STORAGE_KEYS.PROFILES)

    if (!rawValue) {
      window.localStorage.setItem(
        CENTER_STORAGE_KEYS.PROFILES,
        JSON.stringify(centersMock),
      )
      return centersMock
    }

    const parsedValue = JSON.parse(rawValue)
    return Array.isArray(parsedValue) ? parsedValue : centersMock
  } catch {
    return centersMock
  }
}

function writeCenterEntries(entries) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(
    CENTER_STORAGE_KEYS.PROFILES,
    JSON.stringify(entries),
  )
}

function normalizeCenterPayload(payload) {
  return {
    name: payload.name.trim(),
    type: payload.type,
    description: payload.description.trim(),
    address: payload.address.trim(),
    city: payload.city.trim(),
    latitude: Number(payload.latitude),
    longitude: Number(payload.longitude),
    contactPhone: payload.contactPhone.trim(),
    contactEmail: payload.contactEmail.trim().toLowerCase(),
    managerName: payload.managerName.trim(),
    authorizationProfile: payload.authorizationProfile.trim(),
    privateCode: payload.privateCode.trim(),
    schedule: payload.schedule.trim(),
    status: 'active',
  }
}

function resolveCenterOwner(center, userContext) {
  if (!userContext) {
    return false
  }

  const userId = typeof userContext === 'string' ? userContext : userContext.id
  const userEmail =
    typeof userContext === 'object' ? userContext.email?.trim().toLowerCase() : ''
  const fullName =
    typeof userContext === 'object'
      ? `${userContext.firstName ?? ''} ${userContext.lastName ?? ''}`.trim().toLowerCase()
      : ''

  return [
    center.ownerUserId,
    center.ownerId,
    center.userId,
  ].includes(userId) ||
    [
      center.contactEmail,
      center.managerEmail,
      center.email,
    ]
      .filter(Boolean)
      .map((value) => value.trim().toLowerCase())
      .includes(userEmail) ||
    (center.managerName?.trim().toLowerCase() ?? '') === fullName
}

export const centersService = {
  async getPublicCenters() {
    try {
      const response = await apiClient.get(API_ENDPOINTS.centers.list)
      return extractCollection(response).map(adaptCenter)
    } catch (error) {
      if (!shouldFallbackToMock(error)) {
        throw error
      }
    }

    await wait()
    return readCenterEntries().map(adaptCenter)
  },

  async getCenterByOwner(userContext) {
    try {
      const response = await apiClient.get(API_ENDPOINTS.centers.list, {
        requiresAuth: true,
      })
      const center = extractCollection(response).find((entry) =>
        resolveCenterOwner(entry, userContext),
      )

      return center ? adaptCenter(center) : null
    } catch (error) {
      if (!shouldFallbackToMock(error)) {
        throw error
      }
    }

    await wait()
    const ownerUserId = typeof userContext === 'string' ? userContext : userContext?.id
    const center = readCenterEntries().find((entry) => entry.ownerUserId === ownerUserId)
    return center ? adaptCenter(center) : null
  },

  async saveCenterProfile(userContext, payload, currentCenterId = null) {
    const normalizedPayload = normalizeCenterPayload(payload)

    try {
      const response = currentCenterId
        ? await apiClient.patch(API_ENDPOINTS.centers.byId(currentCenterId), normalizedPayload, {
            requiresAuth: true,
          })
        : await apiClient.post(API_ENDPOINTS.centers.list, normalizedPayload, {
            requiresAuth: true,
          })

      return adaptCenter(extractEntity(response))
    } catch (error) {
      if (!shouldFallbackToMock(error)) {
        throw error
      }
    }

    await wait()

    const ownerUserId = typeof userContext === 'string' ? userContext : userContext?.id
    const entries = readCenterEntries()
    const existingIndex = entries.findIndex((entry) => entry.ownerUserId === ownerUserId)
    const nextCenter = {
      id:
        existingIndex >= 0
          ? entries[existingIndex].id
          : `center-${payload.city.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
      ownerUserId,
      ...normalizedPayload,
      activeNeeds: existingIndex >= 0 ? entries[existingIndex].activeNeeds ?? [] : [],
    }

    const nextEntries =
      existingIndex >= 0
        ? entries.map((entry, index) => (index === existingIndex ? nextCenter : entry))
        : [nextCenter, ...entries]

    writeCenterEntries(nextEntries)
    return adaptCenter(nextCenter)
  },
}
