// src/assets/views/UsersAdmin.jsx
import "@/styles/UsersAdmin.css";

import { useEffect, useMemo, useState } from "react";
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  softDeleteUser,
  restoreUser,
} from "@/assets/services/api";

const emptyForm = {
  NombreUsuario: "",
  Nombre: "",
  PrimerApellido: "",
  SegundoApellido: "",
  Correo: "",
  Telefono: "",
  ImagenPerfil: "",
  Id_Rol: 2,        // Creador por defecto
  Contrasenia: "",  // <- necesario por NOT NULL en la BD
};

export default function UsersAdmin() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDeleted, setShowDeleted] = useState(false);
  const [q, setQ] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [showPwd, setShowPwd] = useState(false);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getUsers({ includeDeleted: showDeleted ? 1 : 0 });
      setList(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e.message || "Error al cargar usuarios");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showDeleted]);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    const visibles = list.filter((u) => u.Id_Rol !== 3);

    if (!term) return visibles;

    return visibles.filter(
      (u) =>
        u.NombreUsuario?.toLowerCase().includes(term) ||
        u.Nombre?.toLowerCase().includes(term) ||
        u.PrimerApellido?.toLowerCase().includes(term) ||
        u.SegundoApellido?.toLowerCase().includes(term) ||
        u.Correo?.toLowerCase().includes(term)
    );
  }, [list, q]);

  const startCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowPwd(false);
  };

  const startEdit = async (id) => {
    try {
      setSaving(true);
      const u = await getUser(id);
      setEditingId(id);
      setForm({
        NombreUsuario: u.NombreUsuario ?? "",
        Nombre: u.Nombre ?? "",
        PrimerApellido: u.PrimerApellido ?? "",
        SegundoApellido: u.SegundoApellido ?? "",
        Correo: u.Correo ?? "",
        Telefono: u.Telefono ?? "",
        ImagenPerfil: u.ImagenPerfil ?? "",
        Id_Rol: u.Id_Rol ?? 2,
        Contrasenia: "",
      });
      setShowPwd(false);
    } catch (e) {
      alert(e.message || "No se pudo cargar el usuario");
    } finally {
      setSaving(false);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const payload = {
        ...form,
        Id_Rol: Number(form.Id_Rol) || 2,
      };

      if (editingId) {
        if (!payload.Contrasenia) delete payload.Contrasenia;
        await updateUser(editingId, payload);
      } else {
        if (!payload.Contrasenia || payload.Contrasenia.length < 6) {
          throw new Error("La contraseña es obligatoria (mínimo 6 caracteres).");
        }
        await createUser(payload);
      }

      await load();
      startCreate();
    } catch (e2) {
      setError(e2.message || "No se pudo guardar");
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async (id) => {
    if (!confirm("¿Eliminar (lógico) este usuario?")) return;
    try {
      await softDeleteUser(id);
      await load();
    } catch (e) {
      alert(e.message || "No se pudo eliminar");
    }
  };

  const onRestore = async (id) => {
    try {
      await restoreUser(id);
      await load();
    } catch (e) {
      alert(e.message || "No se pudo restaurar");
    }
  };

  return (
    <div className="users-admin">
      <header className="ua-header">
        <div>
          <h1>Administración de Usuarios</h1>
        </div>
        <div className="ua-controls">
          <input
            type="search"
            placeholder="Buscar…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <label className="ua-check">
            <input
              type="checkbox"
              checked={showDeleted}
              onChange={(e) => setShowDeleted(e.target.checked)}
            />
            Mostrar eliminados
          </label>
        </div>
      </header>

      {error && <div className="ua-error">{error}</div>}

      <section className="ua-grid">
        <div className="ua-list">
          {loading ? (
            <div className="ua-empty">Cargando…</div>
          ) : filtered.length === 0 ? (
            <div className="ua-empty">Sin resultados</div>
          ) : (
            filtered.map((u) => (
              <article
                key={u.IdUser}
                className={`ua-card ${u.Estado === 0 ? "is-deleted" : ""}`}
              >
                <div className="ua-card-body">
                  <div className="ua-avatar">
                    <img
                      src={u.ImagenPerfil || `https://i.pravatar.cc/80?u=${u.IdUser}`}
                      onError={(e) => {
                        e.currentTarget.src = "https://placehold.co/80x80?text=%F0%9F%91%A4";
                      }}
                      alt={u.NombreUsuario}
                    />
                  </div>
                  <div className="ua-info">
                    <h3>
                      {u.Nombre} {u.PrimerApellido} {u.SegundoApellido}{" "}
                      <span className="ua-muted">(@{u.NombreUsuario})</span>
                    </h3>
                    <p className="ua-muted">{u.Correo}</p>
                    <p className="ua-meta">
                      Rol: {u.Id_Rol === 1 ? "Admin" : "Creador"}
                      {u.Estado === 0 ? (
                        <span className="ua-badge danger">eliminado</span>
                      ) : null}
                    </p>
                  </div>
                </div>

                <div className="ua-actions">
                  <button onClick={() => startEdit(u.IdUser)}>Editar</button>
                  {u.Estado === 0 ? (
                    <button className="ua-success" onClick={() => onRestore(u.IdUser)}>
                      Restaurar
                    </button>
                  ) : (
                    <button className="ua-danger" onClick={() => onDelete(u.IdUser)}>
                      Borrar
                    </button>
                  )}
                </div>
              </article>
            ))
          )}
        </div>

        <div className="ua-form">
          <h2>{editingId ? "Editar usuario" : "Nuevo usuario"}</h2>
          <form onSubmit={onSubmit} className="ua-form-grid">
            <label>
              Usuario
              <input
                value={form.NombreUsuario}
                onChange={(e) => setForm({ ...form, NombreUsuario: e.target.value })}
                required
              />
            </label>

            <label>
              Nombre
              <input
                value={form.Nombre}
                onChange={(e) => {
                  const val = e.target.value;
                  if (/^[a-zA-ZñÑ\s]*$/.test(val)) {
                    setForm({ ...form, Nombre: val });
                  }
                }}
                pattern="[A-Za-zñÑ\s]+"
                title="Solo letras y espacios"
                required
              />
            </label>

            <label>
              Primer Apellido
              <input
                value={form.PrimerApellido}
                onChange={(e) => {
                  const val = e.target.value;
                  if (/^[a-zA-ZñÑ\s]*$/.test(val)) {
                    setForm({ ...form, PrimerApellido: val });
                  }
                }}
                pattern="[A-Za-zñÑ\s]+"
                title="Solo letras y espacios"
                required
              />
            </label>

            <label>
              Segundo Apellido
              <input
                value={form.SegundoApellido}
                onChange={(e) => {
                  const val = e.target.value;
                  if (/^[a-zA-ZñÑ\s]*$/.test(val)) {
                    setForm({ ...form, SegundoApellido: val });
                  }
                }}
                pattern="[A-Za-zñÑ\s]+"
                title="Solo letras y espacios"
              />
            </label>

            <label className="ua-col-2">
              Correo
              <input
                type="email"
                value={form.Correo}
                onChange={(e) => setForm({ ...form, Correo: e.target.value })}
                required
              />
            </label>

            <label className="ua-col-2">
              Teléfono
              <input
                type="text"
                value={form.Telefono}
                onChange={(e) => {
                  const val = e.target.value;
                  if (/^\d{0,8}$/.test(val)) {
                    setForm({ ...form, Telefono: val });
                  }
                }}
                pattern="\d{8}"
                title="Debe tener exactamente 8 dígitos"
                maxLength={8}
                minLength={8}
                placeholder="Ej: 98765432"
                required
              />
            </label>

            <label className="ua-col-2">
              Imagen (URL)
              <input
                value={form.ImagenPerfil}
                onChange={(e) => setForm({ ...form, ImagenPerfil: e.target.value })}
                placeholder="https://i.pravatar.cc/150?img=3"
              />
            </label>

            <label className="ua-col-2">
              Contraseña {editingId ? <span className="ua-muted">(opcional)</span> : null}
              <div style={{ display: "flex", gap: 8 }}>
                <input
                  type={showPwd ? "text" : "password"}
                  value={form.Contrasenia}
                  onChange={(e) => setForm({ ...form, Contrasenia: e.target.value })}
                  placeholder={editingId ? "Dejar vacío para no cambiar" : "Mínimo 6 caracteres"}
                  {...(editingId ? {} : { required: true, minLength: 6 })}
                />
                <button
                  type="button"
                  className="ua-ghost"
                  onClick={() => setShowPwd((s) => !s)}
                >
                  {showPwd ? "Ocultar" : "Ver"}
                </button>
              </div>
            </label>

            <label>
              Rol
              <select
                value={form.Id_Rol}
                onChange={(e) => setForm({ ...form, Id_Rol: Number(e.target.value) })}
              >
                <option value={1}>Admin</option>
                <option value={2}>Creador</option>
              </select>
            </label>

            <div className="ua-form-actions ua-col-2">
              <button type="submit" className="ua-primary" disabled={saving}>
                {saving ? "Guardando…" : editingId ? "Actualizar" : "Crear"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={startCreate}
                  className="ua-ghost"
                  disabled={saving}
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}