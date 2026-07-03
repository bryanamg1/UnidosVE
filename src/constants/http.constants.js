export const API_CONFIG = {
  baseUrl:
    import.meta.env.VITE_API_BASE_URL ||
    'https://venezuela-sos-production-03b8.up.railway.app',
  timeoutMs: 10000,
}

export const API_ENDPOINTS = {
  health: '/api/health',
  messages: '/api/mensajes',
  safeUsers: '/api/usuarios-salvo',
  auth: {
    register: '/api/auth/register',
    login: '/api/auth/login',
    me: '/api/auth/me',
    logout: '/api/auth/logout',
  },
  centers: {
    list: '/api/centers',
    nearby: '/api/centers/nearby',
    byId: (centerId) => `/api/centers/${centerId}`,
    needs: (centerId) => `/api/centers/${centerId}/needs`,
    donations: (centerId) => `/api/centers/${centerId}/donations`,
  },
  needs: {
    list: '/api/needs',
    byId: (needId) => `/api/needs/${needId}`,
    status: (needId) => `/api/needs/${needId}/status`,
  },
  donations: {
    list: '/api/donations',
    byId: (donationId) => `/api/donations/${donationId}`,
    status: (donationId) => `/api/donations/${donationId}/status`,
    byUser: (userId) => `/api/users/${userId}/donations`,
  },
}

export const BACKEND_CAPABILITIES = {
  centers: true,
  needs: true,
  donations: true,
  auth: true,
  roles: true,
}

export const API_ERROR_CODES = {
  NETWORK: 'network_error',
  TIMEOUT: 'timeout_error',
  UNAUTHORIZED: 'unauthorized',
  FORBIDDEN: 'forbidden',
  NOT_FOUND: 'not_found',
  VALIDATION: 'validation_error',
  CONFLICT: 'conflict',
  SERVER: 'server_error',
}
