# UnidosVE - Frontend

Frontend de una aplicacion web solidaria desarrollada con React y Vite para conectar centros de acopio, necesidades urgentes y donantes mediante un mapa interactivo y paneles diferenciados por rol.

## 📌 Descripcion del proyecto

UnidosVE busca facilitar la coordinacion de ayuda para Venezuela desde una experiencia web clara, visual y preparada para crecer. El frontend actual permite:

- registrar el flujo de acceso para donantes y centros de acopio
- visualizar centros de ayuda en un mapa interactivo
- publicar y consultar necesidades urgentes con datos mock
- coordinar donaciones y hacer seguimiento de estados
- separar la experiencia publica, la experiencia donor y la experiencia center

Hoy la aplicacion ya tiene una base funcional de producto en frontend y esta preparada para migrar progresivamente desde mocks locales hacia un backend real en Python/Flask.

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
- Autenticacion mock con persistencia local
- Roles `public`, `donor` y `center`
- Guards de rutas por autenticacion y por rol
- Mapa interactivo con Leaflet y OpenStreetMap
- Geolocalizacion del usuario cuando el navegador lo permite
- Centros de acopio implementados con datos mock
- Necesidades implementadas con datos mock
- Donaciones implementadas con datos mock
- Feed del donante con mapa, filtros y cards de progreso
- Modal de donacion con persistencia mock en `localStorage`
- Seguimiento visual de estados de donacion
- Dashboard del centro preparado con rutas protegidas y placeholders
- Diseño responsive en landing, auth, mapa y feed del donante

Notas importantes:

- Auth real aun no existe; hoy el proyecto usa cuentas demo y storage local.
- El dashboard funcional del centro todavia no esta implementado; las rutas existen y quedan listas para la siguiente fase.

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
│   │   ├── mocks/
│   │   └── services/
│   ├── dashboard/
│   ├── donations/
│   │   ├── adapters/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── mocks/
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
│       ├── mocks/
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
- Services preparados para migrar de mocks a llamadas HTTP reales
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

- autenticarse con datos mock
- acceder al feed del donante
- ver centros en el mapa
- filtrar necesidades
- registrar donaciones mock
- ver seguimiento de sus donaciones

### Centro de acopio

Puede:

- autenticarse con datos mock
- acceder a rutas protegidas del espacio center

Estado actual:

- las rutas del centro ya existen y estan protegidas
- el panel funcional del centro todavia esta preparado para integracion posterior

## 🗺️ Mapa interactivo

El mapa ya esta implementado con `react-leaflet` y `Leaflet`, usando OpenStreetMap como proveedor base.

Capacidades actuales:

- visualizacion de centros de acopio mock
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
5. Las donaciones usan estados visuales mock como comprometida, en camino, recibida por el centro y completada.
6. Toda la arquitectura queda preparada para reemplazar mocks por integracion real con backend Python/Flask.

## 🔌 Estado de integracion backend

El frontend actualmente funciona con mocks para los dominios principales que aun no existen en backend real:

- auth
- centers
- needs
- donations

El backend esperado sera Python/Flask. La base del frontend ya esta separada en hooks, services y adapters para que el origen de datos pueda migrar de mocks a HTTP real con el menor impacto posible sobre los componentes visuales.

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
VITE_API_BASE_URL=http://127.0.0.1:5000
```

Estado actual:

- la constante ya existe en el frontend
- se usara plenamente cuando la integracion real con backend este conectada a los servicios del dominio

Si prefieres trabajar con una base URL ya segmentada por API, esa decision sigue pendiente de definicion entre frontend y backend.

## 📜 Scripts disponibles

Scripts reales definidos en `package.json`:

- `npm run dev`
- `npm run build`
- `npm run lint`
- `npm run preview`

## ☁️ Deploy

El frontend puede desplegarse en Vercel, Netlify u otro hosting compatible con Vite.

No hay una configuracion publica de deploy incluida en el repositorio actual, pero la aplicacion ya esta estructurada para un despliegue estatico moderno.

## 🔗 Backend relacionado

El backend esperado sera Python/Flask y debera exponer endpoints para:

- auth
- centers
- needs
- donations
- map / nearby centers

Adicionalmente, debera cubrir autenticacion real por rol, filtros, ownership y persistencia de estados para reemplazar los mocks actuales del frontend.

## 👨‍💻 Autor

Bryan Marquez  
Full Stack Developer
