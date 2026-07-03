import { APP_ROUTES } from './routes.constants'
import { AUTH_QUERY_PARAMS, AUTH_ROLES } from './auth.constants'

export const UI_COPY = {
  appName: 'UnidosVE',
  heroTitle: 'Unidos por Venezuela',
  heroDescription:
    'Conecta donantes y centros de acopio para responder a necesidades activas con rapidez y trazabilidad.',
}

export const UI_THEME_TOKENS = {
  colors: {
    background: '#f8fafc',
    surface: '#ffffff',
    primary: '#1769ff',
    success: '#29b36a',
    warning: '#f0a43b',
    danger: '#d64545',
    textPrimary: '#0f172a',
    textSecondary: '#475569',
  },
  borderRadius: {
    card: 20,
    pill: 999,
  },
}

export const LANDING_CONTENT = {
  badge: 'Coordinación Humanitaria Transparente',
  title: 'Transforma tu solidaridad por Venezuela en acción directa.',
  description:
    'UnidosVE es el puente en tiempo real entre donantes y centros de acopio. Descubre carencias críticas, ubica puntos de entrega cercanos y haz el seguimiento seguro de tu aporte desde el primer instante.',
  highlightChips: [
    '📍 Mapa de ayuda interactivo',
    '⚡ Alertas de urgencia crítica',
    '📦 Trazabilidad de envíos',
  ],
  actions: [
    {
      id: 'donor',
      label: 'Quiero Ayudar',
      buttonLabel: 'Iniciar un Aporte',
      description: 'Explora carencias en el mapa, compromete insumos específicos y monitorea tu envío paso a paso.',
      to: `${APP_ROUTES.REGISTER}?${AUTH_QUERY_PARAMS.ROLE}=${AUTH_ROLES.DONOR}`,
      variant: 'contained',
    },
    {
      id: 'center',
      label: 'Gestionar Centro',
      buttonLabel: 'Unirme como Centro',
      description: 'Da de alta tu centro de acopio, publica necesidades urgentes y coordina los insumos recibidos.',
      to: `${APP_ROUTES.REGISTER}?${AUTH_QUERY_PARAMS.ROLE}=${AUTH_ROLES.CENTER}`,
      variant: 'outlined',
    },
  ],
  workflowCards: [
    {
      eyebrow: 'Red Activa',
      title: 'Puntos de Acopio Verificados',
      detail: 'Accede a ubicaciones geolocalizadas exactas, horarios de atención y capacidades de almacenamiento.',
      status: 'Verificados',
    },
    {
      eyebrow: 'Urgencia Prioritaria',
      title: 'Necesidades Críticas en Tiempo Real',
      detail: 'Identifica rápidamente qué insumos hacen falta (médicos, alimentos, ropa) y su nivel de urgencia.',
      status: 'Al día',
    },
    {
      eyebrow: 'Transparencia de Extremo a Extremo',
      title: 'Trazabilidad de la Donación',
      detail: 'Acompaña tu aporte en cada fase: desde la preparación del envío hasta la confirmación de recepción en el destino.',
      status: 'Seguro',
    },
  ],
  signalPanel: {
    badge: 'Monitoreo Activo',
    title: 'Monitorea prioridades y coordina donaciones desde un panel intuitivo.',
  },
}

export const PUBLIC_PAGE_CONTENT = {
  donate: {
    badge: 'Donaciones',
    title: 'Feed de ayuda disponible',
    description:
      'Consulta necesidades activas, filtra por prioridad y registra aportes desde una experiencia unificada.',
  },
  centers: {
    badge: 'Centros',
    title: 'Directorio público de centros',
    description:
      'Explora la red de centros de acopio y su información operativa desde una vista pública.',
  },
  centerRegister: {
    badge: 'Centro',
    title: 'Registro operativo del centro',
    description:
      'El formulario del centro vive dentro del panel operativo para mantener los datos organizados.',
  },
  notFound: {
    badge: '404',
    title: 'Ruta no disponible',
    description:
      'La página solicitada no existe dentro del alcance actual de UnidosVE.',
  },
}

export const PUBLIC_PAGE_ACTIONS = {
  backHomeLabel: 'Volver al inicio',
}

export const AUTH_VIEW_CONTENT = {
  shell: {
    badge: 'Acceso seguro',
    title: 'Ingresa para coordinar ayuda desde tu espacio de trabajo.',
    description:
      'Accede como donante o centro para continuar con el flujo de ayuda sin perder trazabilidad.',
    highlights: [
      'Ingreso para donantes y centros',
      'Sesión persistida entre visitas',
      'Redirección según el rol asignado',
    ],
  },
  shared: {
    emailLabel: 'Correo electrónico',
    passwordLabel: 'Contraseña',
    roleLabel: 'Rol de acceso',
    firstNameLabel: 'Nombre',
    lastNameLabel: 'Apellido',
    submitLoading: 'Procesando...',
    logoutLabel: 'Cerrar sesión',
    backHomeLabel: 'Volver al inicio',
    authenticatedTitle: 'Ya tienes una sesión activa.',
    authenticatedDescription:
      'Puedes continuar directamente hacia la vista asignada a tu rol.',
    authenticatedAction: 'Ir a mi espacio',
  },
  login: {
    badge: 'Ingreso',
    title: 'Inicia sesión como donante o centro de acopio',
    description:
      'Ingresa con tu cuenta para acceder al mapa, las necesidades publicadas o el panel del centro.',
    submitLabel: 'Entrar',
    secondaryPrompt: '¿Aún no tienes una cuenta?',
    secondaryActionLabel: 'Crear cuenta',
  },
  register: {
    badge: 'Registro',
    title: 'Crea una cuenta para donante o centro',
    description:
      'Registra tus datos para comenzar a donar o administrar un centro dentro de UnidosVE.',
    submitLabel: 'Crear cuenta',
    secondaryPrompt: '¿Ya tienes una cuenta?',
    secondaryActionLabel: 'Ir a login',
  },
  alerts: {
    loginSuccess: 'Sesión iniciada correctamente.',
    registerSuccess: 'Cuenta creada y sesión iniciada.',
    logoutSuccess: 'Sesión cerrada.',
    invalidCredentials: 'No se pudo iniciar sesión con el correo y la contraseña ingresados.',
    duplicateEmail: 'Ya existe una cuenta registrada con ese correo.',
    networkError: 'No fue posible conectar con el servidor.',
    serverError: 'El servidor no pudo completar la solicitud en este momento.',
    genericError: 'No fue posible completar la acción solicitada.',
    authRequired: 'Debes iniciar sesión para acceder a esta vista.',
    unauthorizedDonor:
      'Esta vista está reservada para el rol donante dentro del flujo actual.',
    unauthorizedCenter:
      'Esta vista está reservada para el rol centro de acopio dentro del flujo actual.',
  },
}

export const PROTECTED_PAGE_CONTENT = {
  centerDashboard: {
    badge: 'Centro',
    title: 'Panel operativo del centro',
    description:
      'Aquí se concentra la operación del centro, desde su perfil hasta el seguimiento de necesidades y donaciones.',
  },
  centerNeeds: {
    badge: 'Necesidades',
    title: 'Gestión de necesidades del centro',
    description:
      'El centro puede revisar sus publicaciones y actualizar el estado de cada necesidad según su cobertura.',
  },
  centerDonations: {
    badge: 'Donaciones',
    title: 'Seguimiento de donaciones del centro',
    description:
      'Revisa aportes asociados al centro y confirma su avance hasta la recepción final.',
  },
}

export const DONOR_MAP_CONTENT = {
  header: {
    badge: 'Mapa de ayuda',
    title: 'Encuentra centros de acopio y necesidades cercanas',
    description:
      'Explora centros activos, compara distancias reales y detecta rápidamente dónde hace más falta ayuda.',
    backHomeLabel: 'Volver al inicio',
    logoutLabel: 'Cerrar sesión',
    loadingCentersLabel: 'Cargando centros disponibles...',
    summaryCards: [
      {
        id: 'activeCenters',
        label: 'Centros activos',
      },
      {
        id: 'activeNeeds',
        label: 'Necesidades activas',
      },
      {
        id: 'inTransitDonations',
        label: 'Donaciones en camino',
      },
      {
        id: 'coveredNeeds',
        label: 'Necesidades cubiertas',
      },
    ],
  },
  mapCard: {
    badge: 'Centros activos',
    title: 'Ubica el mejor punto de entrega',
    description:
      'Activa tu ubicación para ordenar centros y necesidades por distancia real sin salir del mapa.',
  },
  mapControls: {
    centerUserLabel: 'Centrar mi ubicación',
    centerUserAriaLabel: 'Centrar el mapa en mi ubicación actual',
  },
  geolocation: {
    actionLabel: 'Usar mi ubicación',
    activeLabel: 'Ubicación aplicada',
    idleMessage: 'Activa tu ubicación para ordenar centros y necesidades por cercanía.',
    loadingMessage: 'Solicitando permiso y coordenadas del navegador.',
    deniedMessage: 'El permiso de geolocalización fue denegado. Puedes seguir usando el mapa manualmente.',
    unavailableMessage:
      'Tu navegador no expone geolocalización disponible en este entorno.',
    errorMessage: 'No fue posible obtener tu ubicación en este intento.',
  },
  userMarker: {
    title: 'Tu ubicación aproximada',
    description: 'Se usa solo para centrar el mapa y ordenar centros cercanos.',
  },
  popup: {
    activeNeedsLabel: 'Necesidades activas',
    detailActionLabel: 'Ver detalle',
    routeHintLabel: 'Ruta sugerida',
    scheduleLabel: 'Horario',
  },
  centerList: {
    title: 'Centros visibles',
    subtitle:
      'Revisa dirección, tipo de centro y necesidades activas antes de elegir dónde donar.',
    loadingLabel: 'Cargando centros visibles.',
    errorLabel: 'No fue posible cargar los centros visibles en este momento.',
    emptyLabel: 'No hay centros disponibles para mostrar en este momento.',
    selectActionLabel: 'Ver en mapa',
    noDistanceLabel: 'Activa tu ubicación para ordenar por distancia',
    activeNeedsSuffix: 'necesidades activas',
  },
}

export const DONOR_FEED_CONTENT = {
  section: {
    badge: 'Donaciones activas',
    title: 'Necesidades activas y seguimiento de aportes',
    description:
      'Filtra por estado, ciudad, categoría, urgencia o cercanía y registra aportes sin perder trazabilidad.',
  },
  filters: {
    title: 'Filtros del feed',
    subtitle:
      'Si eliges "Cerca de mí", el listado se ordena por distancia real según tu ubicación.',
    fieldLabels: {
      status: 'Estado',
      city: 'Ciudad',
      category: 'Categoría',
      urgency: 'Urgencia',
      proximity: 'Cercanía',
    },
    resetLabel: 'Limpiar filtros',
    allOptionLabel: 'Todas',
    nearbyOptionLabel: 'Cerca de mí',
  },
  needsList: {
    title: 'Necesidades publicadas',
    subtitle:
      'Cada card resume cobertura actual, centro asociado y distancia estimada antes de confirmar tu donación.',
    emptyTitle: 'No hay necesidades que coincidan con los filtros.',
    emptyDescription:
      'Prueba otro estado, otra ciudad o desactiva el filtro de cercanía para ampliar resultados.',
    resultsLabelSuffix: 'resultados',
  },
  needCard: {
    requiredLabel: 'Requerido',
    committedLabel: 'Comprometido',
    receivedLabel: 'Recibido',
    remainingLabel: 'Restante',
    donateLabel: 'Donar',
    distanceLabel: 'Distancia',
    unknownDistanceLabel: 'Sin distancia',
    centerLabel: 'Centro',
    updatedLabel: 'Actualizado',
    progressLabel: 'Cobertura estimada',
  },
  donationDialog: {
    titlePrefix: 'Donar a',
    description:
      'Confirma una cantidad estimada para que el centro pueda reflejar tu compromiso en el seguimiento.',
    amountLabel: 'Cantidad comprometida',
    noteLabel: 'Nota para el centro',
    notePlaceholder: 'Ejemplo: entrega prevista para el fin de semana.',
    submitLabel: 'Confirmar donación',
    cancelLabel: 'Cancelar',
    helperSuffix: 'La nueva donación iniciará en estado comprometida.',
  },
  donorTracking: {
    title: 'Mis donaciones',
    subtitle:
      'Aquí ves el estado actual de tus compromisos: comprometida, preparando, en camino, recibida o completada.',
    emptyLabel: 'Todavía no has registrado donaciones en esta cuenta.',
    amountLabel: 'Monto comprometido',
  },
  alerts: {
    donationSuccess: 'La donación se registró correctamente.',
    donationError: 'No fue posible registrar la donación.',
    needsError: 'No fue posible cargar las necesidades del feed.',
  },
}

export const CENTER_DASHBOARD_CONTENT = {
  shell: {
    badge: 'Centro operativo',
    title: 'Panel operativo del centro de acopio',
    description:
      'Administra el perfil del centro, publica necesidades y confirma donaciones desde un flujo operativo unificado.',
    backHomeLabel: 'Volver al inicio',
    logoutLabel: 'Cerrar sesión',
    loadingLabel: 'Cargando panel del centro.',
    summary: {
      profileLabel: 'Perfil del centro',
      needsLabel: 'Necesidades propias',
      donationsLabel: 'Donaciones asociadas',
    },
    tabs: {
      profile: 'Centro',
      needs: 'Necesidades',
      donations: 'Donaciones',
    },
  },
  profile: {
    title: 'Perfil del centro',
    description:
      'Completa o actualiza la información operativa del centro para que donantes y mapa consuman un contrato estable.',
    saveLabel: 'Guardar centro',
    successMessage: 'Perfil del centro guardado correctamente.',
    emptyMessage:
      'Todavía no hay un centro asociado a este usuario. Completa el formulario para crearlo.',
    fields: {
      name: 'Nombre del centro',
      type: 'Tipo de centro',
      description: 'Descripción operativa',
      address: 'Dirección',
      city: 'Ciudad',
      latitude: 'Latitud',
      longitude: 'Longitud',
      contactPhone: 'Teléfono de contacto',
      contactEmail: 'Email de contacto',
      managerName: 'Responsable',
      authorizationProfile: 'Perfil autorizado',
      privateCode: 'Código privado',
      schedule: 'Horario',
    },
  },
  needs: {
    title: 'Necesidades del centro',
    description:
      'Publica necesidades nuevas, revisa las existentes y cambia su estado según cobertura real o recepción de donaciones.',
    createLabel: 'Publicar necesidad',
    emptyMessage: 'Este centro aún no tiene necesidades registradas.',
    successCreateMessage: 'Necesidad publicada correctamente.',
    successStatusMessage: 'Estado de necesidad actualizado.',
    fields: {
      title: 'Título de la necesidad',
      summary: 'Descripción breve',
      category: 'Categoría',
      urgency: 'Urgencia',
      status: 'Estado',
      requiredQuantity: 'Cantidad requerida',
      unit: 'Unidad',
    },
  },
  donations: {
    title: 'Donaciones recibidas o en camino',
    description:
      'Revisa compromisos asociados a las necesidades del centro y confirma su avance hasta la recepción final.',
    emptyMessage: 'Aún no hay donaciones asociadas a este centro.',
    successStatusMessage: 'Estado de donación actualizado.',
    saveStatusLabel: 'Actualizar estado',
    statusLabel: 'Estado de donación',
    donorLabel: 'Donante',
    noteLabel: 'Nota',
  },
  alerts: {
    genericError: 'No fue posible completar la acción solicitada en el dashboard del centro.',
    centerRequired:
      'Necesitas guardar el perfil del centro antes de publicar necesidades o revisar donaciones.',
  },
}
