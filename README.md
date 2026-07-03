# UnidosVE - Frontend

Frontend de una aplicacion web solidaria desarrollada con React y Vite para conectar centros de acopio, necesidades urgentes y donantes mediante un mapa interactivo y paneles diferenciados por rol.

## 📌 Descripcion del proyecto

UnidosVE busca facilitar la coordinacion de ayuda para Venezuela desde una experiencia web clara, visual y preparada para crecer. El frontend actual permite:

- registrar el flujo de acceso para donantes y centros de acopio
- visualizar centros de ayuda en un mapa interactivo
- publicar y consultar necesidades urgentes con datos del backend
- coordinar donaciones y hacer seguimiento de estados
- separar la experiencia publica, la experiencia donor y la experiencia center

Hoy la aplicacion ya consume el backend real para auth, centers, needs y donations, manteniendo una arquitectura lista para evolucionar sin duplicar logica en la UI.

## 🚀 Tecnologias utilizadas

Tecnologias detectadas en el proyecto actual:

- React 19
- Vite
- JavaScript
- React Router DOM
- Material UI
- MUI Icons
- CSS Modules
- Leaflet
- React Leaflet
- Context API
- ESLint

## ✅ Funcionalidades implementadas

Estado actual del frontend:

- Landing publica responsive
- Navegacion basada en rutas con React Router
- Autenticacion real contra backend
- Roles `public`, `donor` y `center`
- Guards de rutas por autenticacion y por rol
- Mapa interactivo con Leaflet y OpenStreetMap
- Geolocalizacion del usuario cuando el navegador lo permite
- Centros de acopio cargados desde backend
- Necesidades cargadas desde backend
- Donaciones cargadas desde backend
- Feed del donante con mapa, filtros y cards de progreso
- Modal de donacion conectado al backend
- Seguimiento visual de estados de donacion
- Dashboard del centro conectado a servicios reales
- Diseño responsive en landing, auth, mapa y feed del donante

Notas importantes:

- `accessToken` es el token principal para endpoints protegidos.
- Si la API falla, la UI muestra estados reales de error o listas vacias, sin fallback mock.

## 🧱 Arquitectura del proyecto

El proyecto esta organizado por features, con separacion clara entre presentacion, logica, contratos de datos y configuracion compartida.

Estructura actual aproximada:

```text
src/
├── assets/
├── components/
│   └── layout/
├── constants/
├── context/
├── features/
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   └── utils/
│   ├── centers/
│   │   ├── adapters/
│   │   ├── hooks/
│   │   └── services/
│   ├── dashboard/
│   ├── donations/
│   │   ├── adapters/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── services/
│   ├── landing/
│   │   ├── components/
│   │   ├── pages/
│   │   └── styles/
│   ├── map/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── styles/
│   │   └── utils/
│   └── needs/
│       ├── adapters/
│       ├── components/
│       ├── hooks/
│       └── services/
├── hooks/
├── routes/
├── services/
├── styles/
└── utils/
```

## 🧩 Arquitectura aplicada

El frontend sigue una arquitectura orientada a evolucionar sin reescribir vistas al integrar backend real.

- Organizacion por features para aislar dominios como `auth`, `centers`, `needs`, `donations` y `map`
- Separacion de logica y presentacion
- Textos, rutas, estados y configuracion centralizados en `src/constants`
- Services centralizados para llamadas HTTP reales
- Adapters para normalizar estructuras de datos antes de llegar a la UI
- Context API para auth y estado global basico
- CSS Modules para estilos encapsulados
- Material UI para componentes reutilizables y consistentes

## 👥 Roles de usuario

### Usuario publico

Puede:

- ver la landing
- acceder a login y registro
- navegar por la experiencia publica base

### Donante

Puede:

- autenticarse con backend real
- acceder al feed del donante
- ver centros en el mapa
- filtrar necesidades
- registrar donaciones
- ver seguimiento de sus donaciones

### Centro de acopio

Puede:

- autenticarse con backend real
- acceder a rutas protegidas del espacio center

Estado actual:

- las rutas del centro ya existen y estan protegidas
- el panel funcional del centro todavia esta preparado para integracion posterior

## 🗺️ Mapa interactivo

El mapa ya esta implementado con `react-leaflet` y `Leaflet`, usando OpenStreetMap como proveedor base.

Capacidades actuales:

- visualizacion de centros de acopio reales
- marcadores con popup informativo
- centrado dinamico por seleccion de centro
- geolocalizacion del usuario si concede permiso
- ordenamiento de centros por cercania
- vista integrada dentro del feed del donante

## 🔄 Flujo principal de la aplicacion

1. El usuario entra a la landing publica.
2. Desde la landing puede donar, iniciar sesion o registrarse como donante o centro de acopio.
3. Los donantes autenticados acceden a `/donar`, donde ven mapa, centros, necesidades y seguimiento de donaciones.
4. Los centros autenticados acceden a rutas protegidas preparadas para registrar su informacion y administrar necesidades.
5. Las donaciones usan estados visuales conectados al backend como comprometida, en camino, recibida por el centro y completada.
6. Toda la arquitectura mantiene integracion real con backend Python/Flask mediante `apiClient`, services y adapters.

## 🔌 Estado de integracion backend

El frontend consume el backend real en Railway para los dominios principales:

- auth
- centers
- needs
- donations

La base del frontend se apoya en `apiClient`, hooks, services y adapters para mantener un contrato estable sin mezclar HTTP dentro de componentes visuales.

## ⚙️ Instalacion

```bash
npm install
```

## ▶️ Ejecutar proyecto

Desarrollo:

```bash
npm run dev
```

Build:

```bash
npm run build
```

Preview:

```bash
npm run preview
```

## 🔐 Variables de entorno

Variable real detectada en el proyecto:

```env
VITE_API_BASE_URL=https://venezuela-sos-production-03b8.up.railway.app
```

Estado actual:

- la constante ya existe en el frontend
- la base URL no debe incluir `/api`
- los services agregan las rutas `/api/...` desde `src/constants/http.constants.js`

## 📜 Scripts disponibles

Scripts reales definidos en `package.json`:

- `npm run dev`
- `npm run build`
- `npm run lint`
- `npm run preview`

## ☁️ Deploy

El frontend puede desplegarse en Vercel, Netlify u otro hosting compatible con Vite.

No hay una configuracion publica de deploy incluida en el repositorio actual, pero la aplicacion ya esta estructurada para un despliegue estatico moderno.

Importante para produccion:

- el backend Railway ya responde CORS para `http://localhost:5173`
- el origin real del frontend desplegado en Vercel debe agregarse tambien en `CORS_ORIGINS` del backend Railway

## 🔗 Backend relacionado

El backend esperado sera Python/Flask y debera exponer endpoints para:

- auth
- centers
- needs
- donations
- map / nearby centers

Adicionalmente, debe mantener autenticacion real por rol, filtros, ownership y persistencia de estados para la operacion del frontend.

## 👨‍💻 Autor

Bryan Marquez  
Full Stack Developer
