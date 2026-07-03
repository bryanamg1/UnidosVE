import {
  API_ENDPOINTS,
  DONATION_STATUSES,
  DONATION_STORAGE_KEYS,
} from '../../../constants'
import {
  apiClient,
  extractCollection,
  extractEntity,
  shouldFallbackToMock,
} from '../../../services/apiClient'
import { adaptDonation } from '../adapters/donationAdapter'
import { donationsMock } from '../mocks/donations.mock'

function wait(delayMs = 180) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, delayMs)
  })
}

function readDonationEntries() {
  if (typeof window === 'undefined') {
    return donationsMock
  }

  try {
    const rawValue = window.localStorage.getItem(DONATION_STORAGE_KEYS.ENTRIES)

    if (!rawValue) {
      window.localStorage.setItem(
        DONATION_STORAGE_KEYS.ENTRIES,
        JSON.stringify(donationsMock),
      )
      return donationsMock
    }

    const parsedValue = JSON.parse(rawValue)
    return Array.isArray(parsedValue) ? parsedValue : donationsMock
  } catch {
    return donationsMock
  }
}

function writeDonationEntries(entries) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(
    DONATION_STORAGE_KEYS.ENTRIES,
    JSON.stringify(entries),
  )
}

export const donationsService = {
  async getDonations(options = {}) {
    try {
      const response = await apiClient.get(
        options.userId
          ? API_ENDPOINTS.donations.byUser(options.userId)
          : API_ENDPOINTS.donations.list,
        {
          requiresAuth: true,
        },
      )

      return extractCollection(response).map(adaptDonation)
    } catch (error) {
      if (!shouldFallbackToMock(error)) {
        throw error
      }
    }

    await wait()
    return readDonationEntries().map(adaptDonation)
  },

  async getCenterDonations(centerId) {
    try {
      const response = await apiClient.get(API_ENDPOINTS.centers.donations(centerId), {
        requiresAuth: true,
      })

      return extractCollection(response).map(adaptDonation)
    } catch (error) {
      if (!shouldFallbackToMock(error)) {
        throw error
      }
    }

    await wait()
    return readDonationEntries().filter((donation) => donation.centerId === centerId).map(adaptDonation)
  },

  async createDonation(payload) {
    const nextDonationPayload = {
      needId: payload.needId,
      centerId: payload.centerId,
      donorId: payload.donorId,
      donorName: payload.donorName,
      amount: Number(payload.amount),
      unit: payload.unit,
      note: payload.note.trim(),
    }

    try {
      const response = await apiClient.post(API_ENDPOINTS.donations.list, nextDonationPayload, {
        requiresAuth: true,
      })

      return adaptDonation(extractEntity(response))
    } catch (error) {
      if (!shouldFallbackToMock(error)) {
        throw error
      }
    }

    await wait()

    const entries = readDonationEntries()
    const nextEntry = {
      id: `donation-${Date.now()}`,
      ...nextDonationPayload,
      status: DONATION_STATUSES.COMMITTED,
      createdAt: new Date().toISOString(),
    }

    writeDonationEntries([nextEntry, ...entries])
    return adaptDonation(nextEntry)
  },

  async updateDonationStatus(donationId, status, options = {}) {
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
      const response = await apiClient.patch(API_ENDPOINTS.donations.status(donationId), body, {
        requiresAuth: true,
      })

      return adaptDonation(extractEntity(response))
    } catch (error) {
      if (!shouldFallbackToMock(error)) {
        throw error
      }
    }

    await wait()

    const entries = readDonationEntries()
    const nextEntries = entries.map((donation) =>
      donation.id === donationId ? { ...donation, status } : donation,
    )
    const updatedDonation = nextEntries.find((donation) => donation.id === donationId)
    writeDonationEntries(nextEntries)
    return updatedDonation ? adaptDonation(updatedDonation) : null
  },
}
