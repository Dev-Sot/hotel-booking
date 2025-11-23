# Hotel Booking (Proyecto)

Repositorio base para la aplicación de reservas de hotel.

## Tecnologías utilizadas

- **Next.js 16** - Framework de React
- **Supabase** - Base de datos y autenticación
- **Framer Motion** - Animaciones
- **Tailwind CSS** - Estilos
- **TypeScript** - Tipado estático

## Estructura principal

- `src/app/` - Rutas de Next.js (app router)
- `src/components/` - Componentes reutilizables (shared, ui, forms, features)
- `src/lib/` - Clientes y utilidades (supabaseClient, api, utils)
- `src/context/` - Providers de React
- `src/hooks/` - Custom hooks
- `src/types/` - Tipos TypeScript centralizados

## Inicio rápido

1. Copia el `.env.example` a `.env.local` y completa las variables.
2. Instala dependencias:

```bash
npm install
```

3. Ejecuta en modo desarrollo:

```bash
npm run dev
```

Abre `http://localhost:3000`.

## Flujos comunes

- Desarrollo: trabajar en ramas `feature/*`, abrir PRs hacia `feature/project-restructure`.
- Producción: `main` contiene la versión estable.

## Contribuir

1. Crea una rama descriptiva: `git checkout -b feature/nombre-feature`.
2. Haz cambios pequeños y commits atómicos.
3. Abre un Pull Request hacia `feature/project-restructure`.

Para más detalles sobre cómo contribuir, revisa `CONTRIBUTING.md`.

## Variables de entorno

Copia `.env.example` a `.env.local` y completa las claves necesarias (Supabase, Google OAuth, URL de la app).

---

_Archivo generado y simplificado para onboarding rápido._