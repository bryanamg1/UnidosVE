import {
  API_ENDPOINTS,
} from '../../../constants'
import {
  apiClient,
  extractCollection,
  extractEntity,
} from '../../../services/apiClient'
import { adaptDonation } from '../adapters/donationAdapter'

export const donationsService = {
  async getDonations(options = {}) {
    const response = await apiClient.get(
      options.userId
        ? API_ENDPOINTS.donations.byUser(options.userId)
        : API_ENDPOINTS.donations.list,
      {
        requiresAuth: true,
      },
    )

    return extractCollection(response).map(adaptDonation)
  },

  async getCenterDonations(centerId) {
    const response = await apiClient.get(API_ENDPOINTS.centers.donations(centerId), {
      requiresAuth: true,
    })

    return extractCollection(response).map(adaptDonation)
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

    const response = await apiClient.post(API_ENDPOINTS.donations.list, nextDonationPayload, {
      requiresAuth: true,
    })

    return adaptDonation(extractEntity(response))
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

    const response = await apiClient.patch(API_ENDPOINTS.donations.status(donationId), body, {
      requiresAuth: true,
    })

    return adaptDonation(extractEntity(response))
  },
}
