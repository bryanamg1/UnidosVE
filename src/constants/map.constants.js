export const MAP_DEFAULTS = {
  center: {
    lat: 10.4806,
    lng: -66.9036,
  },
  zoom: 6,
  focusZoom: 12,
  userLocationZoom: 13,
  nearbyRadiusKm: 25,
}

export const MAP_TILE_CONFIG = {
  url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
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
