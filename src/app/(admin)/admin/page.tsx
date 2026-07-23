"use client";

import { useEffect, useState } from "react";
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
import { formatPrice } from "@/lib/utils/formatters";

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

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Panel de Administración</h1>

        {authLoading ? (
          <p className="text-gray-400">Cargando usuario...</p>
        ) : (
          <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-8">
            <p className="text-lg">Bienvenido{user?.nombre ? `, ${user.nombre}` : ""}.</p>
            <p className="text-sm text-gray-400 mb-4">Gestiona reservas y contenido desde aquí.</p>

            <div className="flex gap-3 flex-wrap">
              <button
                onClick={handleGoToReservations}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-black rounded-md font-medium"
              >
                Mis Reservas
              </button>

              <button
                onClick={() => router.push("/habitaciones")}
                className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-md font-medium"
              >
                Ver Habitaciones
              </button>

              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md font-medium ml-auto"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        )}

        {!authLoading && role === null && (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-amber-500" />
          </div>
        )}

        {!authLoading && role === "user" && (
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-6">
            <p className="text-yellow-300 font-semibold">No tienes permisos de administrador</p>
            <p className="text-yellow-200/80 text-sm mt-1">
              Tu cuenta puede ver reservas y habitaciones, pero la gestión del catálogo está
              reservada a usuarios con rol &quot;admin&quot; (tabla <code>profiles</code> en Supabase).
            </p>
          </div>
        )}

        {!authLoading && role === "admin" && (
          <div className="bg-gray-800 rounded-lg shadow-md">
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h2 className="text-2xl font-semibold">Habitaciones</h2>
              {editingId === null && (
                <button
                  onClick={startCreate}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-black rounded-md font-medium"
                >
                  + Nueva habitación
                </button>
              )}
            </div>

            {editingId !== null && (
              <form onSubmit={handleSubmit} className="p-6 border-b border-gray-700 space-y-4">
                <h3 className="font-semibold text-amber-400">
                  {editingId === "new" ? "Nueva habitación" : "Editar habitación"}
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="admin-titulo" className="block text-sm text-gray-400 mb-1">
                      Título
                    </label>
                    <input
                      id="admin-titulo"
                      value={form.titulo}
                      onChange={(e) => setForm({ ...form, titulo: e.target.value })}
                      className="w-full bg-gray-900 border border-gray-700 rounded-md p-2"
                    />
                  </div>
                  <div>
                    <label htmlFor="admin-precio" className="block text-sm text-gray-400 mb-1">
                      Precio por noche
                    </label>
                    <input
                      id="admin-precio"
                      type="number"
                      min={0}
                      value={form.precio}
                      onChange={(e) => setForm({ ...form, precio: e.target.value })}
                      className="w-full bg-gray-900 border border-gray-700 rounded-md p-2"
                    />
                  </div>
                  <div>
                    <label htmlFor="admin-tipo" className="block text-sm text-gray-400 mb-1">
                      Tipo
                    </label>
                    <select
                      id="admin-tipo"
                      value={form.tipo}
                      onChange={(e) => setForm({ ...form, tipo: e.target.value })}
                      className="w-full bg-gray-900 border border-gray-700 rounded-md p-2"
                    >
                      {Object.values(ROOM_TYPES).map((value) => (
                        <option key={value} value={value}>
                          {ROOM_TYPE_LABELS[value]}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="admin-imagen" className="block text-sm text-gray-400 mb-1">
                      Imagen (ruta o URL)
                    </label>
                    <input
                      id="admin-imagen"
                      value={form.imagen}
                      onChange={(e) => setForm({ ...form, imagen: e.target.value })}
                      placeholder="/habitacion1.jpg"
                      className="w-full bg-gray-900 border border-gray-700 rounded-md p-2"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="admin-descripcion" className="block text-sm text-gray-400 mb-1">
                    Descripción
                  </label>
                  <textarea
                    id="admin-descripcion"
                    value={form.descripcion}
                    onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
                    rows={3}
                    className="w-full bg-gray-900 border border-gray-700 rounded-md p-2"
                  />
                </div>

                <label className="flex items-center gap-2 text-sm text-gray-300">
                  <input
                    type="checkbox"
                    checked={form.activa}
                    onChange={(e) => setForm({ ...form, activa: e.target.checked })}
                  />
                  Publicada (visible para clientes)
                </label>

                {formError && <p className="text-sm text-red-400">{formError}</p>}

                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-black rounded-md font-medium disabled:opacity-50"
                  >
                    {saving ? "Guardando..." : "Guardar"}
                  </button>
                  <button
                    type="button"
                    onClick={cancelForm}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md font-medium"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            )}

            <div className="p-6">
              {loadingList ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-amber-500" />
                </div>
              ) : listError ? (
                <p className="text-red-400">{listError}</p>
              ) : habitaciones.length === 0 ? (
                <p className="text-gray-400">Todavía no hay habitaciones. Crea la primera.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-gray-400 border-b border-gray-700">
                        <th className="py-2 pr-4">Título</th>
                        <th className="py-2 pr-4">Tipo</th>
                        <th className="py-2 pr-4">Precio</th>
                        <th className="py-2 pr-4">Estado</th>
                        <th className="py-2 pr-4 text-right">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {habitaciones.map((room) => (
                        <tr key={room.id} className="border-b border-gray-800">
                          <td className="py-3 pr-4 font-medium">{room.titulo}</td>
                          <td className="py-3 pr-4 text-gray-400">{ROOM_TYPE_LABELS[room.tipo] ?? room.tipo}</td>
                          <td className="py-3 pr-4 text-amber-400">{formatPrice(room.precio)}</td>
                          <td className="py-3 pr-4">
                            {room.activa ? (
                              <span className="text-green-400">Publicada</span>
                            ) : (
                              <span className="text-gray-500">Oculta</span>
                            )}
                          </td>
                          <td className="py-3 pr-4 text-right space-x-2">
                            <button
                              onClick={() => startEdit(room)}
                              className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-md"
                            >
                              Editar
                            </button>
                            <button
                              onClick={() => handleDelete(room.id)}
                              disabled={deletingId === room.id}
                              className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded-md disabled:opacity-50"
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
          </div>
        )}
      </div>
    </div>
  );
}
