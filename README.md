# Hotel Booking (Proyecto)

Repositorio base para la aplicación de reservas de hotel.

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
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
