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
