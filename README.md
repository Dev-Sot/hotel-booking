<div align="center">

# Hotel Booking

**Aplicación full-stack de reservas de hotel** — Next.js · TypeScript · Supabase

[![CI](https://github.com/Dev-Sot/hotel-booking/actions/workflows/ci.yml/badge.svg)](https://github.com/Dev-Sot/hotel-booking/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Postgres%20%2B%20Auth-3ECF8E)](https://supabase.com/)

</div>

## Descripción

Un hotel que gestiona reservas manualmente (o con hojas de cálculo y llamadas telefónicas) pierde tiempo, comete errores de doble reserva y no puede ofrecer autoservicio a sus huéspedes. **Hotel Booking** resuelve esto con una aplicación web donde el huésped se autentica, consulta habitaciones disponibles y reserva en tiempo real, mientras el hotel administra su catálogo desde un panel propio — con la disponibilidad garantizada a nivel de base de datos, no solo por confianza en el frontend.

Construido como proyecto de portafolio full-stack: cubre autenticación real, autorización por roles, seguridad a nivel de fila (RLS), tests automatizados y CI, no solo una interfaz bonita.

## Características principales

- 🔐 **Autenticación real** con Google OAuth y magic link (Supabase Auth)
- 🛡️ **Rutas protegidas en el servidor** vía middleware — no solo ocultas en el cliente
- 🏨 **Catálogo de habitaciones** dinámico, con imágenes optimizadas (`next/image`)
- 📅 **Reservas con validación de disponibilidad real**: no se puede reservar una habitación en fechas ya ocupadas, garantizado con una restricción `EXCLUDE` a nivel de Postgres
- 👤 **Panel de administración** con CRUD de habitaciones, protegido por rol (`profiles.role = 'admin'`)
- 📱 **Responsive** con menú móvil funcional
- 🧪 **Tests automatizados**: unitarios (Vitest + Testing Library) y end-to-end (Playwright)
- ⚙️ **CI en GitHub Actions**: lint, typecheck, tests y build en cada Pull Request
- 🧭 **Modo demo**: navegable sin backend configurado, con datos de ejemplo claramente identificados — nunca simula una sesión falsa

## Screenshots

<!--
  Reemplaza estos placeholders con capturas reales antes de publicar:
  - Home (hero + habitaciones destacadas)
  - Catálogo de Habitaciones
  - Modal de reserva
  - Mis Reservas
  - Panel de Administración (CRUD de habitaciones)
-->

| Home | Habitaciones |
|---|---|
| _`docs/screenshots/home.png`_ | _`docs/screenshots/habitaciones.png`_ |

| Mis Reservas | Panel de Admin |
|---|---|
| _`docs/screenshots/reservas.png`_ | _`docs/screenshots/admin.png`_ |

## Tecnologías utilizadas

**Frontend:**
Next.js 16 (App Router, Turbopack, React Compiler) · React 19 · TypeScript · Tailwind CSS · Framer Motion

**Backend:**
Next.js Route Handlers · Next.js Middleware · Supabase Auth (Google OAuth / magic link)

**Base de datos:**
Supabase (PostgreSQL) · Row Level Security · restricciones `EXCLUDE`/`CHECK` a nivel de esquema

**Herramientas:**
Vitest · Testing Library · Playwright · ESLint · GitHub Actions · npm

## Arquitectura

```
src/
├── app/
│   ├── (public)/       # Home, Habitaciones, Servicios, Contacto, Reservas
│   ├── (auth)/         # Login
│   ├── (admin)/        # Panel de administración (CRUD habitaciones)
│   ├── api/mock-auth/  # Endpoint del modo demo (cookie de sesión simulada)
│   ├── sitemap.ts, robots.ts
│   └── layout.tsx
├── components/
│   ├── ui/             # Button, Input, Modal — componentes base reutilizables
│   ├── shared/          # Navbar, Footer, AuthGuard
│   └── forms/           # ReservaForm
├── context/             # AuthContext, ReservaContext (estado global de React)
├── hooks/                # Hooks reutilizables (useFetch)
├── lib/
│   ├── supabase/         # Clientes de Supabase: browser, server (SSR), middleware
│   ├── api/               # Capa de acceso a datos: auth, reservas, habitaciones, profile
│   ├── data/               # Datos de ejemplo (solo modo demo)
│   └── utils/               # validators, formatters, dateHelpers, constants, logger
└── types/                    # Tipos TypeScript centralizados (models, forms, ui)

middleware.ts              # Protege /admin y /reservas a nivel de servidor
supabase/schema.sql         # Esquema, políticas RLS y restricción anti-doble-reserva
tests/e2e/                   # Smoke tests de Playwright
```

**Decisiones clave:**
- La sesión de Supabase vive en **cookies** (`@supabase/ssr`), no en `localStorage`, para que el middleware pueda verificarla en el servidor antes de renderizar una ruta protegida.
- La disponibilidad de una habitación se valida dos veces: en la aplicación (mensaje de error claro) y en la base de datos (restricción `EXCLUDE`, a prueba de condiciones de carrera).
- Sin Supabase configurado, la app no falla ni finge: cae a datos de ejemplo explícitamente marcados como demo.

## Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/Dev-Sot/hotel-booking.git
cd hotel-booking

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env.local
# completa .env.local con tus credenciales (ver siguiente sección)

# 4. (Opcional) Crear el esquema en tu proyecto Supabase
# Supabase Dashboard → SQL Editor → pegar y ejecutar supabase/schema.sql

# 5. Ejecutar en modo desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Variables de entorno

Copia `.env.example` a `.env.local`:

```bash
# Supabase (https://app.supabase.com → Project Settings → API)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# URL pública de la app (redirectTo del login OAuth)
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Modo demo — SOLO desarrollo local. Simula una sesión sin backend real.
# Debe estar en "false" (o ausente) en cualquier entorno público.
NEXT_PUBLIC_USE_MOCK_AUTH=false
```

Sin `NEXT_PUBLIC_SUPABASE_URL`/`NEXT_PUBLIC_SUPABASE_ANON_KEY`, la app funciona en modo demo de solo lectura con datos de ejemplo. Con `NEXT_PUBLIC_USE_MOCK_AUTH=true` puedes navegar `/admin` y `/reservas` sin un proyecto Supabase real.

## Uso

```bash
npm run dev         # servidor de desarrollo (http://localhost:3000)
npm run build       # build de producción
npm run start       # sirve el build de producción
npm run lint        # ESLint
npm run typecheck   # tsc --noEmit
npm run test        # tests unitarios (Vitest)
npm run test:e2e    # tests end-to-end (Playwright)
```

Para dar permisos de administrador a un usuario real, edita su fila en la tabla `profiles` desde el dashboard de Supabase y cambia `role` a `admin` — no existe (a propósito) una forma de hacerlo desde el cliente.

## Roadmap

- [ ] Formulario de contacto conectado a un endpoint real (email o tabla en Supabase)
- [ ] React Hook Form + Zod para validación de formularios
- [ ] Subida de imágenes a Supabase Storage desde el panel de administración
- [ ] Auditoría de accesibilidad con axe-core
- [ ] Internacionalización (i18n)
- [ ] Pasarela de pagos (Stripe) para confirmar reservas

## Autor

**Dev-Sot**
GitHub: [@Dev-Sot](https://github.com/Dev-Sot)

## Licencia

Distribuido bajo la licencia MIT. Ver [`LICENSE`](LICENSE) para más información.
