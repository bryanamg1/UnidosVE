export const MAP_DEFAULTS = {
  center: {
    lat: 10.4806,
    lng: -66.9036,
  },
  zoom: 6,
  focusZoom: 12,
  nearbyRadiusKm: 25,
}

export const MAP_TILE_CONFIG = {
  url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  attribution: '&copy; OpenStreetMap contributors',
}

export const GEOLOCATION_STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  DENIED: 'denied',
  UNAVAILABLE: 'unavailable',
  ERROR: 'error',
}

export const MAP_INTERACTION = {
  userMarkerRadius: 12,
  centerMarkerRadius: 10,
}

export const MAP_NOTIFICATION_TIMEOUT_MS = 3500
