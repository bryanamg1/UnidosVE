import {
  DONATION_STATUSES,
  DONATION_STORAGE_KEYS,
} from '../../../constants'
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
  async getDonations() {
    await wait()
    return readDonationEntries().map(adaptDonation)
  },

  async createDonation(payload) {
    await wait()

    const entries = readDonationEntries()
    const nextEntry = {
      id: `donation-${Date.now()}`,
      needId: payload.needId,
      centerId: payload.centerId,
      donorId: payload.donorId,
      donorName: payload.donorName,
      amount: Number(payload.amount),
      unit: payload.unit,
      status: DONATION_STATUSES.COMMITTED,
      note: payload.note.trim(),
      createdAt: new Date().toISOString(),
    }

    writeDonationEntries([nextEntry, ...entries])

    return adaptDonation(nextEntry)
  },
}
