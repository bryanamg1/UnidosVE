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
      status: 'Fase 3',
    },
  ],
  signalPanel: {
    badge: 'Vista previa operativa',
    title: 'Una landing publica pensada para convertir interes en coordinacion real.',
  },
}

export const PUBLIC_PAGE_CONTENT = {
  donate: {
    badge: 'Fase 4',
    title: 'Feed de donaciones en preparacion',
    description:
      'Aqui vivira el listado de necesidades, filtros y el flujo para comprometer donaciones desde datos mock.',
  },
  centers: {
    badge: 'Fase 5',
    title: 'Directorio publico de centros en construccion',
    description:
      'La navegacion publica hacia centros de acopio quedara conectada al mapa y a los detalles operativos en fases posteriores.',
  },
  centerRegister: {
    badge: 'Fase 5',
    title: 'Registro de centro reservado para el dashboard',
    description:
      'El formulario completo de centro de acopio se implementara cuando se habilite el panel del rol center.',
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
    badge: 'Acceso mock preparado para migracion futura',
    title: 'Coordina ayuda con un acceso temporal listo para backend real.',
    description:
      'Esta fase conecta contexto, storage y guards por rol sin inventar endpoints. La UI queda desacoplada para migrar a servicios reales cuando Flask exponga auth.',
    highlights: [
      'Sesiones persistidas en localStorage',
      'Roles donor y center con redireccion por permiso',
      'Contratos aislados en context, hooks y service',
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
    badge: 'Fase 2',
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
    badge: 'Fase 2',
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
    badge: 'Fase 5',
    title: 'Dashboard del centro listo para recibir su logica',
    description:
      'El acceso del rol center ya esta protegido. El registro del centro, necesidades y donaciones llegaran en la Fase 5.',
  },
  centerNeeds: {
    badge: 'Fase 5',
    title: 'Gestion de necesidades aun no habilitada',
    description:
      'La ruta ya existe y esta protegida por rol. La tabla y los cambios de estado se implementaran en la Fase 5.',
  },
  centerDonations: {
    badge: 'Fase 5',
    title: 'Seguimiento de donaciones del centro en preparacion',
    description:
      'Esta vista quedo reservada para confirmar recepciones y revisar aportes asociados a necesidades del centro.',
  },
}

export const DONOR_MAP_CONTENT = {
  header: {
    badge: 'Fase 3',
    title: 'Mapa operativo de centros de acopio',
    description:
      'Visualiza centros mock en OpenStreetMap, prioriza cercania y prepara el terreno para el feed completo de necesidades de la Fase 4.',
    backHomeLabel: 'Volver al inicio',
    logoutLabel: 'Cerrar sesion',
    loadingCentersLabel: 'Cargando centros mock para el mapa.',
    summaryCards: [
      {
        value: 'Leaflet',
        label: 'Mapa interactivo desacoplado del backend',
      },
      {
        value: '5 centros',
        label: 'Cobertura mock inicial para pruebas de proximidad',
      },
      {
        value: 'Geo opcional',
        label: 'La experiencia no se rompe si el permiso es denegado',
      },
    ],
  },
  mapCard: {
    badge: 'OpenStreetMap',
    title: 'Centros visibles y listos para filtrar por cercania',
    description:
      'Selecciona un centro desde la lista o acepta geolocalizacion para recentrar el mapa en tu ubicacion.',
  },
  geolocation: {
    actionLabel: 'Usar mi ubicacion',
    activeLabel: 'Ubicacion aplicada',
    idleMessage: 'Puedes habilitar tu ubicacion para priorizar centros cercanos.',
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
      'La lista usa datos mock adaptados desde servicios para facilitar el reemplazo por backend real.',
    selectActionLabel: 'Ver en mapa',
    nearbyLabel: 'cerca de ti',
    noDistanceLabel: 'sin distancia calculada',
    activeNeedsSuffix: 'necesidades activas',
  },
  phaseNote: {
    badge: 'Fase 5',
    title: 'El siguiente bloque pertenece al dashboard del centro',
    description:
      'La siguiente fase reutilizara este estado de donaciones y necesidades para que el centro gestione publicaciones, estados y recepciones.',
  },
}

export const DONOR_FEED_CONTENT = {
  section: {
    badge: 'Fase 4',
    title: 'Necesidades activas y donaciones en seguimiento',
    description:
      'Esta vista mezcla mapa, filtros y cards de progreso sin acoplarse al backend real. Las donaciones quedan persistidas en storage mock para sostener el flujo del donante.',
  },
  filters: {
    title: 'Filtros del feed',
    subtitle:
      'Filtra por estado, ciudad, categoria, urgencia y cercania usando datos enriquecidos desde centers y needs.',
    resetLabel: 'Limpiar filtros',
    allOptionLabel: 'Todas',
    nearbyOptionLabel: 'Cerca de mi',
  },
  needsList: {
    title: 'Necesidades publicadas',
    subtitle:
      'Cada card resume requerimiento, comprometido, recibido y restante antes de abrir el modal de donacion.',
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
    badge: 'Fase 5',
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
