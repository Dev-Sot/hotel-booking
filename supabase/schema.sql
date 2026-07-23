-- Hotel Booking — esquema y políticas RLS
--
-- Cómo usarlo: Supabase Dashboard -> SQL Editor -> pegar y ejecutar
-- (proyecto nuevo, una sola vez). Requiere que la autenticación con Google
-- esté habilitada en Authentication -> Providers.
--
-- Las columnas usan camelCase entre comillas para coincidir exactamente
-- con las propiedades de los tipos TypeScript (src/types/models.ts) que ya
-- usa el código de la app (lib/api/*.ts) — evita tener que traducir
-- snake_case <-> camelCase en cada consulta.

create extension if not exists "pgcrypto";
create extension if not exists "btree_gist";

-- ─────────────────────────────────────────────────────────────
-- Tablas
-- ─────────────────────────────────────────────────────────────

create table if not exists public.habitaciones (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  descripcion text not null default '',
  precio numeric not null check (precio >= 0),
  imagen text not null default '',
  tipo text not null check (tipo in ('suite', 'doble', 'sencilla')),
  activa boolean not null default true
);

create table if not exists public.reservas (
  id uuid primary key default gen_random_uuid(),
  "usuarioId" uuid not null references auth.users (id) on delete cascade,
  "habitacionId" uuid references public.habitaciones (id) on delete set null,
  nombre text not null,
  tipo text not null,
  "fechaInicio" date not null,
  "fechaFin" date not null,
  estado text not null default 'pendiente' check (estado in ('pendiente', 'confirmada', 'cancelada')),
  "createdAt" timestamptz not null default now(),
  constraint fechas_validas check ("fechaFin" > "fechaInicio"),
  -- Nadie puede quedar con dos reservas activas solapadas en la misma
  -- habitación, ni siquiera con dos escrituras concurrentes: esta es la
  -- garantía real, no solo la validación de checkDisponibilidad() en la app.
  constraint reservas_no_solape exclude using gist (
    "habitacionId" with =,
    daterange("fechaInicio", "fechaFin") with &&
  ) where (estado <> 'cancelada')
);

create index if not exists reservas_usuario_idx on public.reservas ("usuarioId");
create index if not exists reservas_habitacion_idx on public.reservas ("habitacionId");

-- Rol de cada usuario. Se crea automáticamente (trigger) al registrarse,
-- siempre como 'user'. Para promover a alguien a admin: editar la fila
-- manualmente en Table Editor o con la service_role key — nunca se expone
-- esa escritura al cliente (no hay policy de UPDATE para usuarios normales).
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, role) values (new.id, 'user');
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ─────────────────────────────────────────────────────────────
-- Row Level Security
-- ─────────────────────────────────────────────────────────────

alter table public.habitaciones enable row level security;
alter table public.reservas enable row level security;
alter table public.profiles enable row level security;

-- habitaciones: cualquiera (incluso anónimo) puede leer las activas;
-- solo un admin puede crear/editar/borrar.
create policy "habitaciones_select_public" on public.habitaciones
  for select using (activa = true);

create policy "habitaciones_admin_write" on public.habitaciones
  for all using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  ) with check (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- reservas: un usuario solo ve/crea/edita/cancela las suyas; un admin ve y
-- gestiona todas (panel de administración).
create policy "reservas_select_own_or_admin" on public.reservas
  for select using (
    auth.uid() = "usuarioId"
    or exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

create policy "reservas_insert_own" on public.reservas
  for insert with check (auth.uid() = "usuarioId");

create policy "reservas_update_own_or_admin" on public.reservas
  for update using (
    auth.uid() = "usuarioId"
    or exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

create policy "reservas_delete_own_or_admin" on public.reservas
  for delete using (
    auth.uid() = "usuarioId"
    or exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- profiles: cada usuario solo puede leer su propio rol (para decidir si
-- mostrarle el panel de admin). No hay policy de INSERT/UPDATE/DELETE para
-- clientes: los roles solo se cambian desde el dashboard.
create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);

-- ─────────────────────────────────────────────────────────────
-- Datos de ejemplo (opcional, cómodo para probar la demo)
-- ─────────────────────────────────────────────────────────────

insert into public.habitaciones (titulo, descripcion, precio, imagen, tipo, activa) values
  ('Suite Presidencial', 'Amplia suite con vista panorámica, cama king y salón privado.', 950, '/habitacion1.jpg', 'suite', true),
  ('Suite Deluxe', 'Diseño contemporáneo, balcón y servicios premium.', 620, '/habitacion2.jpg', 'suite', true),
  ('Doble Ejecutiva', 'Cómoda, funcional y perfecta para viajes de negocios.', 420, '/habitacion3.jpg', 'doble', true)
on conflict do nothing;
