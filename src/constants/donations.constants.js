export const DONATION_STATUSES = {
  COMMITTED: 'comprometida',
  PREPARING: 'preparando_donacion',
  IN_TRANSIT: 'en_camino',
  RECEIVED: 'recibida_por_el_centro',
  COMPLETED: 'completada',
  CANCELED: 'cancelada',
}

export const DONATION_PROGRESS_FIELDS = [
  'required',
  'committed',
  'received',
  'remaining',
]

export const DONATION_STORAGE_KEYS = {
  ENTRIES: 'unidosve.donations.entries',
}

export const DONATION_STATUS_LABELS = {
  [DONATION_STATUSES.COMMITTED]: 'Comprometida',
  [DONATION_STATUSES.PREPARING]: 'Preparando donacion',
  [DONATION_STATUSES.IN_TRANSIT]: 'En camino',
  [DONATION_STATUSES.RECEIVED]: 'Recibida por el centro',
  [DONATION_STATUSES.COMPLETED]: 'Completada',
  [DONATION_STATUSES.CANCELED]: 'Cancelada',
}

export const DONATION_STATUS_COLORS = {
  [DONATION_STATUSES.COMMITTED]: 'primary',
  [DONATION_STATUSES.PREPARING]: 'warning',
  [DONATION_STATUSES.IN_TRANSIT]: 'warning',
  [DONATION_STATUSES.RECEIVED]: 'success',
  [DONATION_STATUSES.COMPLETED]: 'success',
  [DONATION_STATUSES.CANCELED]: 'default',
}

export const DONATION_COMMITTED_STATUSES = [
  DONATION_STATUSES.COMMITTED,
  DONATION_STATUSES.PREPARING,
  DONATION_STATUSES.IN_TRANSIT,
]

export const DONATION_RECEIVED_STATUSES = [
  DONATION_STATUSES.RECEIVED,
  DONATION_STATUSES.COMPLETED,
]
