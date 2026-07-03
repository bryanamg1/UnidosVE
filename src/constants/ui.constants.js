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
  badge: 'Ayuda coordinada para Venezuela',
  title: 'Activa ayuda concreta para Venezuela desde una sola plataforma.',
  description:
    'UnidosVE conecta centros de acopio, necesidades activas y donaciones con seguimiento claro para responder mas rapido donde la ayuda hace falta.',
  highlightChips: [
    'Centros cercanos',
    'Necesidades prioritarias',
    'Donaciones con seguimiento',
  ],
  actions: [
    {
      id: 'center',
      label: 'Soy centro de acopio',
      description: 'Registra tu centro y publica necesidades para recibir apoyo organizado.',
      to: `${APP_ROUTES.REGISTER}?${AUTH_QUERY_PARAMS.ROLE}=${AUTH_ROLES.CENTER}`,
      variant: 'contained',
    },
    {
      id: 'login',
      label: 'Login',
      description: 'Ingresa a tu cuenta para continuar coordinando ayuda.',
      to: APP_ROUTES.LOGIN,
      variant: 'outlined',
    },
    {
      id: 'register',
      label: 'Registrar',
      description: 'Crea una cuenta donor o center para participar en la red de ayuda.',
      to: APP_ROUTES.REGISTER,
      variant: 'outlined',
    },
  ],
  workflowCards: [
    {
      eyebrow: 'Centro activo',
      title: 'Centros listos para recibir apoyo',
      detail: 'Consulta direccion, horario y capacidad operativa antes de coordinar tu entrega.',
      status: 'En operacion',
    },
    {
      eyebrow: 'Necesidades visibles',
      title: 'Prioridades claras por categoria y urgencia',
      detail: 'Identifica rapidamente que hace falta, en que ciudad y con que nivel de urgencia.',
      status: 'Actualizadas',
    },
    {
      eyebrow: 'Donaciones trazables',
      title: 'Seguimiento del aporte hasta su recepcion',
      detail: 'Mantiene visibilidad del compromiso, traslado y recepcion para cada donacion.',
      status: 'Seguimiento activo',
    },
  ],
  signalPanel: {
    badge: 'Coordinacion activa',
    title: 'Prioriza centros, necesidades y donaciones desde una vista clara y accionable.',
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
      'Accede como donor o center para continuar con el flujo de ayuda sin perder trazabilidad.',
    highlights: [
      'Ingreso para donor y center',
      'Sesion persistida entre visitas',
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
    logoutLabel: 'Cerrar sesion',
    backHomeLabel: 'Volver al inicio',
    authenticatedTitle: 'Ya tienes una sesion activa.',
    authenticatedDescription:
      'Puedes continuar directamente hacia la vista asignada a tu rol.',
    authenticatedAction: 'Ir a mi espacio',
  },
  login: {
    badge: 'Ingreso',
    title: 'Inicia sesion como donante o centro de acopio',
    description:
      'Ingresa con tu cuenta para acceder al mapa, las necesidades publicadas o el panel del centro.',
    submitLabel: 'Entrar',
    secondaryPrompt: 'Aun no tienes una cuenta?',
    secondaryActionLabel: 'Crear cuenta',
  },
  register: {
    badge: 'Registro',
    title: 'Crea una cuenta para donor o center',
    description:
      'Registra tus datos para comenzar a donar o administrar un centro dentro de UnidosVE.',
    submitLabel: 'Crear cuenta',
    secondaryPrompt: 'Ya tienes una cuenta?',
    secondaryActionLabel: 'Ir a login',
  },
  alerts: {
    loginSuccess: 'Sesion iniciada correctamente.',
    registerSuccess: 'Cuenta creada y sesion iniciada.',
    logoutSuccess: 'Sesion cerrada.',
    invalidCredentials:
      'No se encontro una cuenta compatible con ese correo, contrasena y rol.',
    duplicateEmail: 'Ya existe una cuenta registrada con ese correo.',
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
    fieldLabels: {
      status: 'Estado',
      city: 'Ciudad',
      category: 'Categoria',
      urgency: 'Urgencia',
      proximity: 'Cercania',
    },
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
      'Confirma una cantidad estimada para que el centro pueda reflejar tu compromiso en el seguimiento.',
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
      'Aqui ves el estado actual de tus compromisos: comprometida, preparando, en camino, recibida o completada.',
    emptyLabel: 'Todavia no has registrado donaciones en esta cuenta.',
    amountLabel: 'Monto comprometido',
  },
  alerts: {
    donationSuccess: 'La donacion se registro correctamente.',
    donationError: 'No fue posible registrar la donacion.',
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
      'Todavia no hay un centro asociado a este usuario. Completa el formulario para crearlo.',
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
