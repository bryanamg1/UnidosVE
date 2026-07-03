import {
  API_ENDPOINTS,
  CENTER_STORAGE_KEYS,
  NEED_STATUSES,
  NEED_STORAGE_KEYS,
} from '../../../constants'
import {
  apiClient,
  extractCollection,
  extractEntity,
  shouldFallbackToMock,
} from '../../../services/apiClient'
import { adaptNeed } from '../adapters/needAdapter'
import { needsMock } from '../mocks/needs.mock'

function wait(delayMs = 180) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, delayMs)
  })
}

function readNeedEntries() {
  if (typeof window === 'undefined') {
    return needsMock
  }

  try {
    const rawValue = window.localStorage.getItem(NEED_STORAGE_KEYS.ENTRIES)

    if (!rawValue) {
      window.localStorage.setItem(NEED_STORAGE_KEYS.ENTRIES, JSON.stringify(needsMock))
      return needsMock
    }

    const parsedValue = JSON.parse(rawValue)
    return Array.isArray(parsedValue) ? parsedValue : needsMock
  } catch {
    return needsMock
  }
}

function writeNeedEntries(entries) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(NEED_STORAGE_KEYS.ENTRIES, JSON.stringify(entries))
}

function syncCenterActiveNeeds(centerId, needEntries) {
  if (typeof window === 'undefined') {
    return
  }

  const activeStatuses = [
    NEED_STATUSES.ACTIVE,
    NEED_STATUSES.CRITICAL,
    NEED_STATUSES.PARTIALLY_COVERED,
    NEED_STATUSES.IN_TRANSIT,
  ]

  try {
    const rawCenters = window.localStorage.getItem(CENTER_STORAGE_KEYS.PROFILES)
    const centerEntries = rawCenters ? JSON.parse(rawCenters) : null

    if (!Array.isArray(centerEntries)) {
      return
    }

    const activeNeeds = needEntries
      .filter(
        (need) =>
          need.centerId === centerId &&
          activeStatuses.includes(need.status),
      )
      .map((need) => need.title)

    const nextCenters = centerEntries.map((center) =>
      center.id === centerId
        ? { ...center, activeNeeds }
        : center,
    )

    window.localStorage.setItem(CENTER_STORAGE_KEYS.PROFILES, JSON.stringify(nextCenters))
  } catch {
    return
  }
}

export const needsService = {
  async getPublishedNeeds() {
    try {
      const response = await apiClient.get(API_ENDPOINTS.needs.list)
      return extractCollection(response).map(adaptNeed)
    } catch (error) {
      if (!shouldFallbackToMock(error)) {
        throw error
      }
    }

    await wait()
    return readNeedEntries().map(adaptNeed)
  },

  async getCenterNeeds(centerId) {
    try {
      const response = await apiClient.get(API_ENDPOINTS.centers.needs(centerId), {
        requiresAuth: true,
      })

      return extractCollection(response).map(adaptNeed)
    } catch (error) {
      if (!shouldFallbackToMock(error)) {
        throw error
      }
    }

    await wait()
    return readNeedEntries().filter((need) => need.centerId === centerId).map(adaptNeed)
  },

  async createNeed(payload) {
    const nextNeedPayload = {
      centerId: payload.centerId,
      title: payload.title.trim(),
      summary: payload.summary.trim(),
      category: payload.category,
      urgency: payload.urgency,
      status: payload.status,
      requiredQuantity: Number(payload.requiredQuantity),
      committedQuantity: 0,
      receivedQuantity: 0,
      unit: payload.unit.trim(),
    }

    try {
      const response = await apiClient.post(API_ENDPOINTS.needs.list, nextNeedPayload, {
        requiresAuth: true,
      })

      return adaptNeed(extractEntity(response))
    } catch (error) {
      if (!shouldFallbackToMock(error)) {
        throw error
      }
    }

    await wait()

    const entries = readNeedEntries()
    const nextNeed = {
      id: `need-${payload.centerId}-${Date.now()}`,
      ...nextNeedPayload,
      updatedAt: new Date().toISOString(),
    }

    const nextEntries = [nextNeed, ...entries]
    writeNeedEntries(nextEntries)
    syncCenterActiveNeeds(payload.centerId, nextEntries)
    return adaptNeed(nextNeed)
  },

  async updateNeedStatus(needId, status, options = {}) {
    const body = {
      status,
      ...(typeof options.receivedQuantity === 'number'
        ? { receivedQuantity: options.receivedQuantity }
        : {}),
      ...(options.centerAccessCode
        ? { centerAccessCode: options.centerAccessCode.trim() }
        : {}),
    }

    try {
      const response = await apiClient.patch(API_ENDPOINTS.needs.status(needId), body, {
        requiresAuth: true,
      })

      return adaptNeed(extractEntity(response))
    } catch (error) {
      if (!shouldFallbackToMock(error)) {
        throw error
      }
    }

    await wait()

    const entries = readNeedEntries()
    const nextEntries = entries.map((need) =>
      need.id === needId ? { ...need, status, updatedAt: new Date().toISOString() } : need,
    )
    const updatedNeed = nextEntries.find((need) => need.id === needId)
    writeNeedEntries(nextEntries)

    if (updatedNeed) {
      syncCenterActiveNeeds(updatedNeed.centerId, nextEntries)
      return adaptNeed(updatedNeed)
    }

    return null
  },
}
