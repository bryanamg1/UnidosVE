import { API_ENDPOINTS } from '../../../constants'
import {
  apiClient,
  extractCollection,
  extractEntity,
} from '../../../services/apiClient'
import { adaptCenter } from '../adapters/centerAdapter'

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
    const response = await apiClient.get(API_ENDPOINTS.centers.list)
    return extractCollection(response).map(adaptCenter)
  },

  async getCenterByOwner(userContext) {
    const response = await apiClient.get(API_ENDPOINTS.centers.list, {
      requiresAuth: true,
    })
    const center = extractCollection(response).find((entry) =>
      resolveCenterOwner(entry, userContext),
    )

    return center ? adaptCenter(center) : null
  },

  async saveCenterProfile(payload, currentCenterId = null) {
    const normalizedPayload = normalizeCenterPayload(payload)

    const response = currentCenterId
      ? await apiClient.patch(API_ENDPOINTS.centers.byId(currentCenterId), normalizedPayload, {
          requiresAuth: true,
        })
      : await apiClient.post(API_ENDPOINTS.centers.list, normalizedPayload, {
          requiresAuth: true,
        })

    return adaptCenter(extractEntity(response))
  },
}
