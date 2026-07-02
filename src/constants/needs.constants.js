export const NEED_STATUSES = {
  ACTIVE: 'activa',
  CRITICAL: 'critica',
  PARTIALLY_COVERED: 'parcialmente_cubierta',
  COVERED: 'cubierta',
  IN_TRANSIT: 'en_camino',
  CANCELED: 'cancelada',
}

export const NEED_CATEGORIES = [
  'alimentos',
  'agua',
  'medicinas',
  'higiene',
  'ropa',
  'refugio',
  'logistica',
]

export const NEED_URGENCY_LEVELS = ['baja', 'media', 'alta', 'critica']

export const NEED_STATUS_LABELS = {
  [NEED_STATUSES.ACTIVE]: 'Activa',
  [NEED_STATUSES.CRITICAL]: 'Critica',
  [NEED_STATUSES.PARTIALLY_COVERED]: 'Parcialmente cubierta',
  [NEED_STATUSES.COVERED]: 'Cubierta',
  [NEED_STATUSES.IN_TRANSIT]: 'En camino',
  [NEED_STATUSES.CANCELED]: 'Cancelada',
}

export const NEED_STATUS_COLORS = {
  [NEED_STATUSES.ACTIVE]: 'primary',
  [NEED_STATUSES.CRITICAL]: 'error',
  [NEED_STATUSES.PARTIALLY_COVERED]: 'warning',
  [NEED_STATUSES.COVERED]: 'success',
  [NEED_STATUSES.IN_TRANSIT]: 'warning',
  [NEED_STATUSES.CANCELED]: 'default',
}

export const NEED_FILTER_VALUES = {
  ALL: 'all',
  NEARBY: 'nearby',
}

export const NEED_STORAGE_KEYS = {
  ENTRIES: 'unidosve.needs.entries',
}
