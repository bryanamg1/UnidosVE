export const AUTH_ROLES = {
  DONOR: 'donor',
  CENTER: 'center',
  PUBLIC: 'public',
}

export const AUTH_ROLE_OPTIONS = [
  { value: AUTH_ROLES.DONOR, label: 'Donante' },
  { value: AUTH_ROLES.CENTER, label: 'Centro de acopio' },
]

export const AUTH_STORAGE_KEYS = {
  SESSION: 'unidosve.auth.session',
  ROLE: 'unidosve.auth.role',
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
