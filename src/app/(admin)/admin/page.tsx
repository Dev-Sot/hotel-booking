"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";
import { getMyRole } from "@/lib/api/profile";
import {
  createHabitacion,
  deleteHabitacion,
  getHabitaciones,
  updateHabitacion,
} from "@/lib/api/habitaciones";
import { Habitacion } from "@/types";
import { ROOM_TYPES, ROOM_TYPE_LABELS } from "@/lib/utils/constants";
import { capitalize, formatPrice } from "@/lib/utils/formatters";
import { Logo } from "@/components/shared/Navbar";
import Icon from "@/components/ui/Icon";

const EMPTY_FORM = {
  titulo: "",
  descripcion: "",
  precio: "",
  imagen: "",
  tipo: ROOM_TYPES.SUITE as string,
  activa: true,
};

export default function AdminPage() {
  const { user, loading: authLoading, logout } = useAuthContext();
  const router = useRouter();

  const [role, setRole] = useState<"admin" | "user" | null>(null);
  const [habitaciones, setHabitaciones] = useState<Habitacion[]>([]);
  const [loadingList, setLoadingList] = useState(true);
  const [listError, setListError] = useState<string | null>(null);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const r = await getMyRole(user.id);
      setRole(r);
    })();
  }, [user]);

  const loadHabitaciones = async () => {
    setLoadingList(true);
    setListError(null);
    const result = await getHabitaciones();
    if (result.success) {
      setHabitaciones(result.data || []);
    } else {
      setListError(result.error || "Error al cargar habitaciones");
    }
    setLoadingList(false);
  };

  useEffect(() => {
    if (role !== "admin") return;
    (async () => {
      setLoadingList(true);
      setListError(null);
      const result = await getHabitaciones();
      if (result.success) {
        setHabitaciones(result.data || []);
      } else {
        setListError(result.error || "Error al cargar habitaciones");
      }
      setLoadingList(false);
    })();
  }, [role]);

  const handleGoToReservations = () => router.push("/reservas");
  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const startCreate = () => {
    setEditingId("new");
    setForm(EMPTY_FORM);
    setFormError(null);
  };

  const startEdit = (room: Habitacion) => {
    setEditingId(room.id);
    setForm({
      titulo: room.titulo,
      descripcion: room.descripcion,
      precio: String(room.precio),
      imagen: room.imagen,
      tipo: room.tipo,
      activa: room.activa,
    });
    setFormError(null);
  };

  const cancelForm = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setFormError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const precio = Number(form.precio);
    if (!form.titulo.trim()) {
      setFormError("El título es obligatorio.");
      return;
    }
    if (!Number.isFinite(precio) || precio < 0) {
      setFormError("El precio debe ser un número mayor o igual a 0.");
      return;
    }

    setSaving(true);
    const payload = {
      titulo: form.titulo.trim(),
      descripcion: form.descripcion.trim(),
      precio,
      imagen: form.imagen.trim() || "/habitacion1.jpg",
      tipo: form.tipo as Habitacion["tipo"],
      activa: form.activa,
    };

    const result =
      editingId && editingId !== "new"
        ? await updateHabitacion(editingId, payload)
        : await createHabitacion(payload);

    setSaving(false);

    if (result.success) {
      cancelForm();
      loadHabitaciones();
    } else {
      setFormError(result.error || "No se pudo guardar la habitación.");
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    const result = await deleteHabitacion(id);
    setDeletingId(null);
    if (result.success) loadHabitaciones();
  };

  const stats = [
    { label: "Habitaciones", value: habitaciones.length },
    { label: "Publicadas", value: habitaciones.filter((h) => h.activa).length },
    {
      label: "Tarifa media",
      value: habitaciones.length
        ? formatPrice(habitaciones.reduce((acc, h) => acc + h.precio, 0) / habitaciones.length)
        : "—",
    },
  ];

  return (
    <div className="min-h-screen bg-ink">
      <header className="border-b border-white/[0.06] bg-ink-800">
        <div className="container-site flex h-20 items-center justify-between">
          <Logo />
          <div className="flex items-center gap-6">
            <Link href="/" className="hidden text-[11px] uppercase tracking-[0.2em] text-sand-muted transition hover:text-gold sm:block">
              Ver sitio
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-sand-muted transition hover:text-white"
            >
              <Icon name="logout" className="h-4 w-4" />
              Salir
            </button>
          </div>
        </div>
      </header>

      <main className="container-site py-14">
        <p className="eyebrow">Administración</p>
        <h1 className="mt-3 text-4xl md:text-5xl">Panel de Administración</h1>

        {authLoading ? (
          <p className="mt-6 text-sand-muted">Cargando usuario...</p>
        ) : (
          <div className="mt-6 flex flex-wrap items-center justify-between gap-6">
            <p className="text-sand-muted">
              Bienvenido{user?.nombre ? `, ${user.nombre}` : ""}. Gestiona el catálogo y las reservas desde aquí.
            </p>
            <div className="flex gap-3">
              <button onClick={handleGoToReservations} className="btn-outline !px-5 !py-2.5">
                Mis reservas
              </button>
              <button onClick={() => router.push("/habitaciones")} className="btn-outline !px-5 !py-2.5">
                Ver habitaciones
              </button>
            </div>
          </div>
        )}

        {!authLoading && role === null && (
          <div className="flex justify-center py-16">
            <div className="h-8 w-8 animate-spin rounded-full border border-gold/30 border-t-gold" />
          </div>
        )}

        {!authLoading && role === "user" && (
          <div className="mt-10 flex gap-4 border border-gold/30 bg-gold/[0.04] p-6">
            <Icon name="shield" className="h-6 w-6 shrink-0 text-gold" />
            <div>
              <p className="text-white">No tienes permisos de administrador</p>
              <p className="mt-1 text-sm text-sand-muted">
                Tu cuenta puede ver reservas y habitaciones, pero la gestión del catálogo está reservada a usuarios
                con rol &quot;admin&quot; (tabla <code className="text-gold">profiles</code> en Supabase).
              </p>
            </div>
          </div>
        )}

        {!authLoading && role === "admin" && (
          <>
            <dl className="mt-10 grid gap-px border border-white/[0.07] bg-white/[0.07] sm:grid-cols-3">
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col-reverse bg-ink-800 p-7">
                  <dt className="mt-2 text-[10px] uppercase tracking-[0.22em] text-sand-dim">{s.label}</dt>
                  <dd className="font-display text-4xl text-white">{s.value}</dd>
                </div>
              ))}
            </dl>

            <section className="mt-10 border border-white/10 bg-ink-800">
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-5 md:px-8">
                <h2 className="text-2xl">Habitaciones</h2>
                {editingId === null && (
                  <button onClick={startCreate} className="btn-gold !px-5 !py-2.5">
                    + Nueva habitación
                  </button>
                )}
              </div>

              {editingId !== null && (
                <form onSubmit={handleSubmit} className="space-y-6 border-b border-white/10 bg-ink-700/40 p-6 md:p-8">
                  <h3 className="text-xl text-gold">
                    {editingId === "new" ? "Nueva habitación" : "Editar habitación"}
                  </h3>

                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <label htmlFor="admin-titulo" className="field-label">Título</label>
                      <input
                        id="admin-titulo"
                        value={form.titulo}
                        onChange={(e) => setForm({ ...form, titulo: e.target.value })}
                        className="field"
                      />
                    </div>
                    <div>
                      <label htmlFor="admin-precio" className="field-label">Precio por noche</label>
                      <input
                        id="admin-precio"
                        type="number"
                        min={0}
                        value={form.precio}
                        onChange={(e) => setForm({ ...form, precio: e.target.value })}
                        className="field"
                      />
                    </div>
                    <div>
                      <label htmlFor="admin-tipo" className="field-label">Tipo</label>
                      <select
                        id="admin-tipo"
                        value={form.tipo}
                        onChange={(e) => setForm({ ...form, tipo: e.target.value })}
                        className="field bg-ink-800"
                      >
                        {Object.values(ROOM_TYPES).map((value) => (
                          <option key={value} value={value}>
                            {ROOM_TYPE_LABELS[value]}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="admin-imagen" className="field-label">Imagen (ruta o URL)</label>
                      <input
                        id="admin-imagen"
                        value={form.imagen}
                        onChange={(e) => setForm({ ...form, imagen: e.target.value })}
                        placeholder="/habitacion1.jpg"
                        className="field"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="admin-descripcion" className="field-label">Descripción</label>
                    <textarea
                      id="admin-descripcion"
                      value={form.descripcion}
                      onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
                      rows={3}
                      className="field resize-none"
                    />
                  </div>

                  <label className="flex items-center gap-3 text-sm text-sand">
                    <input
                      type="checkbox"
                      checked={form.activa}
                      onChange={(e) => setForm({ ...form, activa: e.target.checked })}
                      className="h-4 w-4 accent-[#c9a96e]"
                    />
                    Publicada (visible para clientes)
                  </label>

                  {formError && <p className="text-sm text-red-300">{formError}</p>}

                  <div className="flex gap-3">
                    <button type="submit" disabled={saving} className="btn-gold !px-6 !py-3">
                      {saving ? "Guardando..." : "Guardar"}
                    </button>
                    <button type="button" onClick={cancelForm} className="btn-outline !px-6 !py-3">
                      Cancelar
                    </button>
                  </div>
                </form>
              )}

              <div className="p-6 md:p-8">
                {loadingList ? (
                  <div className="flex justify-center py-10">
                    <div className="h-8 w-8 animate-spin rounded-full border border-gold/30 border-t-gold" />
                  </div>
                ) : listError ? (
                  <p className="text-red-300">{listError}</p>
                ) : habitaciones.length === 0 ? (
                  <p className="text-sand-muted">Todavía no hay habitaciones. Crea la primera.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[640px] text-sm">
                      <thead>
                        <tr className="border-b border-white/10 text-left text-[10px] uppercase tracking-[0.2em] text-sand-dim">
                          <th className="pb-4 pr-4 font-normal">Habitación</th>
                          <th className="pb-4 pr-4 font-normal">Tipo</th>
                          <th className="pb-4 pr-4 font-normal">Precio</th>
                          <th className="pb-4 pr-4 font-normal">Estado</th>
                          <th className="pb-4 text-right font-normal">Acciones</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/[0.06]">
                        {habitaciones.map((room) => (
                          <tr key={room.id}>
                            <td className="py-4 pr-4">
                              <div className="flex items-center gap-4">
                                <div className="relative h-12 w-16 shrink-0 overflow-hidden">
                                  <Image src={room.imagen} alt="" fill sizes="64px" className="object-cover" />
                                </div>
                                <span className="text-white">{room.titulo}</span>
                              </div>
                            </td>
                            <td className="py-4 pr-4 text-sand-muted">{capitalize(room.tipo)}</td>
                            <td className="py-4 pr-4 text-gold">{formatPrice(room.precio)}</td>
                            <td className="py-4 pr-4">
                              <span
                                className={`inline-flex items-center gap-2 text-xs ${
                                  room.activa ? "text-emerald-300" : "text-sand-dim"
                                }`}
                              >
                                <span className={`h-1.5 w-1.5 rounded-full ${room.activa ? "bg-emerald-400" : "bg-sand-dim"}`} />
                                {room.activa ? "Publicada" : "Oculta"}
                              </span>
                            </td>
                            <td className="space-x-5 py-4 text-right">
                              <button
                                onClick={() => startEdit(room)}
                                className="text-[11px] uppercase tracking-[0.18em] text-sand transition hover:text-gold"
                              >
                                Editar
                              </button>
                              <button
                                onClick={() => handleDelete(room.id)}
                                disabled={deletingId === room.id}
                                className="text-[11px] uppercase tracking-[0.18em] text-red-300/80 transition hover:text-red-300 disabled:opacity-50"
                              >
                                {deletingId === room.id ? "Eliminando..." : "Eliminar"}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
