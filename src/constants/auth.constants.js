import { APP_ROUTES } from './routes.constants'

export const AUTH_ROLES = {
  DONOR: 'donor',
  CENTER: 'center',
  PUBLIC: 'public',
}

export const AUTH_ROLE_OPTIONS = [
  { value: AUTH_ROLES.DONOR, label: 'Donante' },
  { value: AUTH_ROLES.CENTER, label: 'Centro de acopio' },
]

export const AUTH_SUPPORTED_ROLES = [AUTH_ROLES.DONOR, AUTH_ROLES.CENTER]

export const AUTH_QUERY_PARAMS = {
  ROLE: 'role',
}

export const AUTH_STORAGE_KEYS = {
  SESSION: 'unidosve.auth.session',
  ROLE: 'unidosve.auth.role',
  USERS: 'unidosve.auth.users',
  ACCESS_TOKEN: 'unidosve.auth.accessToken',
  REFRESH_TOKEN: 'unidosve.auth.refreshToken',
  SOURCE: 'unidosve.auth.source',
}

export const AUTH_PERMISSION_MATRIX = {
  [AUTH_ROLES.PUBLIC]: ['landing:view'],
  [AUTH_ROLES.DONOR]: [
    'landing:view',
    'feed:view',
    'map:view',
    'needs:view',
    'donations:create',
    'donations:track',
  ],
  [AUTH_ROLES.CENTER]: [
    'landing:view',
    'dashboard:view',
    'center:manage',
    'needs:create',
    'needs:update',
    'donations:view',
    'donations:receive',
  ],
}

export const AUTH_REDIRECT_BY_ROLE = {
  [AUTH_ROLES.DONOR]: APP_ROUTES.DONATE,
  [AUTH_ROLES.CENTER]: APP_ROUTES.CENTER_DASHBOARD,
}

export const AUTH_MOCK_SEED_USERS = [
  {
    id: 'mock-donor-001',
    firstName: 'Lucia',
    lastName: 'Gomez',
    email: 'donor@unidosve.org',
    password: 'demo123',
    role: AUTH_ROLES.DONOR,
  },
  {
    id: 'mock-center-001',
    firstName: 'Centro',
    lastName: 'Caracas Oeste',
    email: 'centro@unidosve.org',
    password: 'demo123',
    role: AUTH_ROLES.CENTER,
  },
]

export const AUTH_SESSION_STATUS = {
  IDLE: 'idle',
  READY: 'ready',
  LOADING: 'loading',
  ERROR: 'error',
}
