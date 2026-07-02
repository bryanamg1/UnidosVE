export const API_CONFIG = {
  baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:5000',
  timeoutMs: 10000,
}

export const API_ENDPOINTS = {
  health: '/api/health',
  messages: '/api/mensajes',
  safeUsers: '/api/usuarios-salvo',
}

export const BACKEND_CAPABILITIES = {
  centers: false,
  needs: false,
  donations: false,
  auth: false,
  roles: false,
}
