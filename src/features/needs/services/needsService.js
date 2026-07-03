import {
  API_ENDPOINTS,
} from '../../../constants'
import {
  apiClient,
  extractCollection,
  extractEntity,
} from '../../../services/apiClient'
import { adaptNeed } from '../adapters/needAdapter'

export const needsService = {
  async getPublishedNeeds() {
    const response = await apiClient.get(API_ENDPOINTS.needs.list)
    return extractCollection(response).map(adaptNeed)
  },

  async getCenterNeeds(centerId) {
    const response = await apiClient.get(API_ENDPOINTS.centers.needs(centerId), {
      requiresAuth: true,
    })

    return extractCollection(response).map(adaptNeed)
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

    const response = await apiClient.post(API_ENDPOINTS.needs.list, nextNeedPayload, {
      requiresAuth: true,
    })

    return adaptNeed(extractEntity(response))
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

    const response = await apiClient.patch(API_ENDPOINTS.needs.status(needId), body, {
      requiresAuth: true,
    })

    return adaptNeed(extractEntity(response))
  },
}
