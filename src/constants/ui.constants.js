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
    background: '#08111f',
    surface: '#132238',
    primary: '#1769ff',
    success: '#29b36a',
    warning: '#f0a43b',
    danger: '#d64545',
    textPrimary: '#f6f8fc',
    textSecondary: '#aab7d1',
  },
  borderRadius: {
    card: 20,
    pill: 999,
  },
}

export const LANDING_CONTENT = {
  badge: 'Red humanitaria en coordinacion',
  title: 'Activa ayuda concreta para Venezuela desde una sola plataforma.',
  description:
    'UnidosVE organiza centros de acopio, necesidades activas y donaciones trazables sin depender todavia de un backend completo. Esta primera etapa prioriza claridad, velocidad y una arquitectura lista para crecer.',
  cta: {
    primaryLabel: 'Explorar flujo de ayuda',
    secondaryLabel: 'Ver futura red de centros',
  },
  highlightChips: [
    'Centros cercanos',
    'Necesidades prioritarias',
    'Donaciones con seguimiento',
  ],
  stats: [
    { value: '24h', label: 'Visibilidad operacional continua' },
    { value: '3 roles', label: 'Donante, centro y usuario publico' },
    { value: 'Mock-first', label: 'Arquitectura lista para backend real' },
  ],
  actions: [
    {
      id: 'center',
      label: 'Soy centro de acopio',
      description: 'Registra tu centro y prepara la publicacion de necesidades.',
      to: `${APP_ROUTES.REGISTER}?${AUTH_QUERY_PARAMS.ROLE}=${AUTH_ROLES.CENTER}`,
      variant: 'contained',
    },
    {
      id: 'login',
      label: 'Login',
      description: 'Acceso preparado para el flujo mock de la siguiente fase.',
      to: APP_ROUTES.LOGIN,
      variant: 'outlined',
    },
    {
      id: 'register',
      label: 'Registrar',
      description: 'Crea una cuenta donor o center cuando la fase de auth este habilitada.',
      to: APP_ROUTES.REGISTER,
      variant: 'outlined',
    },
    {
      id: 'donate',
      label: 'Donar',
      description: 'Explora el recorrido que llevara al feed de necesidades y mapa.',
      to: APP_ROUTES.DONATE,
      variant: 'text',
    },
  ],
  workflowCards: [
    {
      eyebrow: 'Centro operativo',
      title: 'Caracas Oeste',
      detail: 'Solicita medicamentos, agua y kits de higiene con prioridad critica.',
      status: 'Critica',
    },
    {
      eyebrow: 'Donacion en curso',
      title: '12 entregas comprometidas',
      detail: 'Seguimiento planeado por estados: comprometida, en camino y recibida.',
      status: 'En seguimiento',
    },
    {
      eyebrow: 'Mapa de ayuda',
      title: 'Cobertura por proximidad',
      detail: 'Visualiza centros cercanos y filtra por urgencia cuando el mapa se habilite.',
      status: 'Cobertura activa',
    },
  ],
  signalPanel: {
    badge: 'Vista previa operativa',
    title: 'Una landing publica pensada para convertir interes en coordinacion real.',
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
    title: 'Directorio publico de centros',
    description:
      'Explora la red de centros de acopio y su informacion operativa desde una vista publica.',
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
      'La pagina solicitada no existe dentro del alcance actual de UnidosVE.',
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
      'El acceso donor y center mantiene la experiencia rapida, clara y lista para continuar el flujo de ayuda sin friccion.',
    highlights: [
      'Ingreso rapido para donor y center',
      'Sesiones persistidas entre visitas',
      'Redireccion segun el rol asignado',
    ],
  },
  shared: {
    emailLabel: 'Correo electronico',
    passwordLabel: 'Contrasena',
    roleLabel: 'Rol de acceso',
    firstNameLabel: 'Nombre',
    lastNameLabel: 'Apellido',
    submitLoading: 'Procesando...',
    demoTitle: 'Credenciales demo',
    logoutLabel: 'Cerrar sesion',
    backHomeLabel: 'Volver al inicio',
    authenticatedTitle: 'Ya tienes una sesion activa.',
    authenticatedDescription:
      'Tu acceso mock ya esta resuelto. Puedes continuar hacia la vista asignada a tu rol.',
    authenticatedAction: 'Ir a mi espacio',
  },
  login: {
    badge: 'Ingreso',
    title: 'Inicia sesion como donante o centro de acopio',
    description:
      'Usa una cuenta demo o una registrada localmente para probar guards, persistencia y redireccion por rol.',
    submitLabel: 'Entrar',
    secondaryPrompt: 'Aun no tienes acceso mock?',
    secondaryActionLabel: 'Crear cuenta',
    demoAccounts: [
      'donor@unidosve.org / demo123',
      'centro@unidosve.org / demo123',
    ],
  },
  register: {
    badge: 'Registro',
    title: 'Crea una cuenta mock preparada para donor o center',
    description:
      'El registro guarda usuarios localmente y deja la UI lista para sustituir este flujo por servicios backend cuando existan.',
    submitLabel: 'Crear cuenta mock',
    secondaryPrompt: 'Ya tienes una cuenta mock?',
    secondaryActionLabel: 'Ir a login',
  },
  alerts: {
    loginSuccess: 'Sesion iniciada correctamente.',
    registerSuccess: 'Cuenta mock creada y sesion iniciada.',
    logoutSuccess: 'Sesion cerrada.',
    invalidCredentials:
      'No se encontro una cuenta mock compatible con ese correo, contrasena y rol.',
    duplicateEmail: 'Ya existe una cuenta mock registrada con ese correo.',
    genericError: 'No fue posible completar la accion solicitada.',
    authRequired: 'Debes iniciar sesion para acceder a esta vista.',
    unauthorizedDonor:
      'Esta vista esta reservada para el rol donor dentro del flujo actual.',
    unauthorizedCenter:
      'Esta vista esta reservada para el rol center dentro del flujo actual.',
  },
}

export const PROTECTED_PAGE_CONTENT = {
  centerDashboard: {
    badge: 'Centro',
    title: 'Panel operativo del centro',
    description:
      'Aqui se concentra la operacion del centro, desde su perfil hasta el seguimiento de necesidades y donaciones.',
  },
  centerNeeds: {
    badge: 'Necesidades',
    title: 'Gestion de necesidades del centro',
    description:
      'El centro puede revisar sus publicaciones y actualizar el estado de cada necesidad segun su cobertura.',
  },
  centerDonations: {
    badge: 'Donaciones',
    title: 'Seguimiento de donaciones del centro',
    description:
      'Revisa aportes asociados al centro y confirma su avance hasta la recepcion final.',
  },
}

export const DONOR_MAP_CONTENT = {
  header: {
    badge: 'Mapa de ayuda',
    title: 'Encuentra centros de acopio y necesidades cercanas',
    description:
      'Explora centros activos, compara distancias reales y detecta rapidamente donde hace mas falta ayuda.',
    backHomeLabel: 'Volver al inicio',
    logoutLabel: 'Cerrar sesion',
    loadingCentersLabel: 'Cargando centros disponibles.',
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
      'Activa tu ubicacion para ordenar centros y necesidades por distancia real sin salir del mapa.',
  },
  mapControls: {
    centerUserLabel: 'Centrar mi ubicacion',
    centerUserAriaLabel: 'Centrar el mapa en mi ubicacion actual',
  },
  geolocation: {
    actionLabel: 'Usar mi ubicacion',
    activeLabel: 'Ubicacion aplicada',
    idleMessage: 'Activa tu ubicacion para ordenar centros y necesidades por cercania.',
    loadingMessage: 'Solicitando permiso y coordenadas del navegador.',
    deniedMessage: 'El permiso de geolocalizacion fue denegado. Puedes seguir usando el mapa manualmente.',
    unavailableMessage:
      'Tu navegador no expone geolocalizacion disponible en este entorno.',
    errorMessage: 'No fue posible obtener tu ubicacion en este intento.',
  },
  userMarker: {
    title: 'Tu ubicacion aproximada',
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
      'Revisa direccion, tipo de centro y necesidades activas antes de elegir donde donar.',
    selectActionLabel: 'Ver en mapa',
    noDistanceLabel: 'Activa ubicacion para ordenar por distancia',
    activeNeedsSuffix: 'necesidades activas',
  },
}

export const DONOR_FEED_CONTENT = {
  section: {
    badge: 'Donaciones activas',
    title: 'Necesidades activas y seguimiento de aportes',
    description:
      'Filtra por estado, ciudad, categoria, urgencia o cercania y registra aportes sin perder trazabilidad.',
  },
  filters: {
    title: 'Filtros del feed',
    subtitle:
      'Si eliges "Cerca de mi", el listado se ordena por distancia real segun tu ubicacion.',
    resetLabel: 'Limpiar filtros',
    allOptionLabel: 'Todas',
    nearbyOptionLabel: 'Cerca de mi',
  },
  needsList: {
    title: 'Necesidades publicadas',
    subtitle:
      'Cada card resume cobertura actual, centro asociado y distancia estimada antes de confirmar tu donacion.',
    emptyTitle: 'No hay necesidades que coincidan con los filtros.',
    emptyDescription:
      'Prueba otro estado, otra ciudad o desactiva el filtro de cercania para ampliar resultados.',
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
      'Confirma una cantidad estimada para que el centro pueda reflejar tu compromiso en el seguimiento mock.',
    amountLabel: 'Cantidad comprometida',
    noteLabel: 'Nota para el centro',
    notePlaceholder: 'Ejemplo: entrega prevista para el fin de semana.',
    submitLabel: 'Confirmar donacion',
    cancelLabel: 'Cancelar',
    helperSuffix: 'La nueva donacion iniciara en estado comprometida.',
  },
  donorTracking: {
    title: 'Mis donaciones',
    subtitle:
      'Aqui ves el estado actual de tus compromisos mock: comprometida, preparando, en camino, recibida o completada.',
    emptyLabel: 'Todavia no has registrado donaciones mock en esta sesion.',
    amountLabel: 'Monto comprometido',
  },
  alerts: {
    donationSuccess: 'La donacion mock se registro correctamente.',
    donationError: 'No fue posible registrar la donacion mock.',
    needsError: 'No fue posible cargar las necesidades mock del feed.',
  },
}

export const CENTER_DASHBOARD_CONTENT = {
  shell: {
    badge: 'Centro operativo',
    title: 'Panel operativo del centro de acopio',
    description:
      'Administra el perfil del centro, publica necesidades y confirma donaciones desde un flujo mock listo para migrar a backend real.',
    backHomeLabel: 'Volver al inicio',
    logoutLabel: 'Cerrar sesion',
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
      'Completa o actualiza la informacion operativa del centro para que donor y mapa consuman un contrato estable.',
    saveLabel: 'Guardar centro',
    successMessage: 'Perfil del centro guardado correctamente.',
    emptyMessage:
      'Todavia no hay un centro asociado a este usuario mock. Completa el formulario para crearlo.',
    fields: {
      name: 'Nombre del centro',
      type: 'Tipo de centro',
      description: 'Descripcion operativa',
      address: 'Direccion',
      city: 'Ciudad',
      latitude: 'Latitud',
      longitude: 'Longitud',
      contactPhone: 'Telefono de contacto',
      contactEmail: 'Email de contacto',
      managerName: 'Responsable',
      authorizationProfile: 'Perfil autorizado',
      privateCode: 'Codigo privado',
      schedule: 'Horario',
    },
  },
  needs: {
    title: 'Necesidades del centro',
    description:
      'Publica necesidades nuevas, revisa las existentes y cambia su estado segun cobertura real o recepcion de donaciones.',
    createLabel: 'Publicar necesidad',
    emptyMessage: 'Este centro aun no tiene necesidades registradas.',
    successCreateMessage: 'Necesidad publicada correctamente.',
    successStatusMessage: 'Estado de necesidad actualizado.',
    fields: {
      title: 'Titulo de la necesidad',
      summary: 'Descripcion breve',
      category: 'Categoria',
      urgency: 'Urgencia',
      status: 'Estado',
      requiredQuantity: 'Cantidad requerida',
      unit: 'Unidad',
    },
  },
  donations: {
    title: 'Donaciones recibidas o en camino',
    description:
      'Revisa compromisos asociados a las necesidades del centro y confirma su avance hasta la recepcion final.',
    emptyMessage: 'Aun no hay donaciones asociadas a este centro.',
    successStatusMessage: 'Estado de donacion actualizado.',
    saveStatusLabel: 'Actualizar estado',
    statusLabel: 'Estado de donacion',
    donorLabel: 'Donante',
    noteLabel: 'Nota',
  },
  alerts: {
    genericError: 'No fue posible completar la accion solicitada en el dashboard del centro.',
    centerRequired:
      'Necesitas guardar el perfil del centro antes de publicar necesidades o revisar donaciones.',
  },
}
