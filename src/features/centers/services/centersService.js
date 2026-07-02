import { CENTER_STORAGE_KEYS } from '../../../constants'
import { adaptCenter } from '../adapters/centerAdapter'
import { centersMock } from '../mocks/centers.mock'

function wait(delayMs = 220) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, delayMs)
  })
}

function readCenterEntries() {
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

export const centersService = {
  async getPublicCenters() {
    await wait()
    return readCenterEntries().map(adaptCenter)
  },

  async getCenterByOwner(ownerUserId) {
    await wait()
    const center = readCenterEntries().find((entry) => entry.ownerUserId === ownerUserId)
    return center ? adaptCenter(center) : null
  },

  async saveCenterProfile(ownerUserId, payload) {
    await wait()

    const entries = readCenterEntries()
    const existingIndex = entries.findIndex((entry) => entry.ownerUserId === ownerUserId)

    const nextCenter = {
      id:
        existingIndex >= 0
          ? entries[existingIndex].id
          : `center-${payload.city.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
      ownerUserId,
      name: payload.name.trim(),
      type: payload.type,
      description: payload.description.trim(),
      address: payload.address.trim(),
      city: payload.city.trim(),
      latitude: Number(payload.latitude),
      longitude: Number(payload.longitude),
      contactPhone: payload.contactPhone.trim(),
      contactEmail: payload.contactEmail.trim(),
      managerName: payload.managerName.trim(),
      authorizationProfile: payload.authorizationProfile.trim(),
      privateCode: payload.privateCode.trim(),
      schedule: payload.schedule.trim(),
      activeNeeds:
        existingIndex >= 0
          ? entries[existingIndex].activeNeeds ?? []
          : [],
    }

    const nextEntries =
      existingIndex >= 0
        ? entries.map((entry, index) => (index === existingIndex ? nextCenter : entry))
        : [nextCenter, ...entries]

    writeCenterEntries(nextEntries)

    return adaptCenter(nextCenter)
  },
}
