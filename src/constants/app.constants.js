export const APP_CONFIG = {
  name: 'UnidosVE',
  shortName: 'UnidosVE',
  tagline: 'Unidos por Venezuela',
  locale: 'es-VE',
  defaultDataSource: 'mock',
}

export const DATA_SOURCES = {
  MOCK: 'mock',
  API: 'api',
}

export const APP_PHASES = {
  SETUP: 'phase_0_setup',
  LANDING: 'phase_1_landing',
  AUTH: 'phase_2_auth',
  MAP: 'phase_3_map',
  DONOR_FEED: 'phase_4_donor_feed',
  CENTER_DASHBOARD: 'phase_5_center_dashboard',
  BACKEND_READY: 'phase_6_backend_ready',
}

export const PROJECT_STATUS = {
  backend: 'partial',
  ui: 'setup_in_progress',
  mocksRequired: true,
}
