// src/assets/services/api.js

// Detecta automáticamente si tienes VITE_API_URL en el .env
// y se asegura de quitar el "/" final si lo hubiera.
const BASE_URL =
  import.meta.env.VITE_API_URL?.replace(/\/$/, "") || "http://localhost:4000/api";

async function request(path, { method = "GET", data, headers } = {}) {
  const opts = {
    method,
    headers: { "Content-Type": "application/json", ...(headers || {}) },
  };
  if (data !== undefined) opts.body = JSON.stringify(data);

  try {
    const res = await fetch(`${BASE_URL}${path}`, opts);
    const contentType = res.headers.get("content-type") || "";
    const isJson = contentType.includes("application/json");
    const payload = isJson ? await res.json() : await res.text();

    if (!res.ok) {
      const msg =
        (isJson && (payload?.message || payload?.error)) ||
        res.statusText ||
        "Error en la API";
      return { success: false, message: msg };
    }

    // Normaliza siempre la respuesta
    return { success: true, ...payload };
  } catch (err) {
    console.error("❌ Error al conectar API:", err);
    return { success: false, message: "No se pudo conectar al servidor" };
  }
}

/* ---------------- USERS ---------------- */
export const getUsers = (params = {}) => {
  const qs = new URLSearchParams(params).toString();
  return request(`/users${qs ? `?${qs}` : ""}`);
};
export const getUser = (id) => request(`/users/${id}`);
export const createUser = (user) =>
  request(`/users`, { method: "POST", data: user });
export const updateUser = (id, user) =>
  request(`/users/${id}`, { method: "PUT", data: user });
export const softDeleteUser = (id) =>
  request(`/users/${id}`, { method: "DELETE" });
export const restoreUser = (id) =>
  request(`/users/${id}/restore`, { method: "PATCH" });

/* ---------------- PROYECTOS ---------------- */
export const getProyectos = (params = {}) => {
  const qs = new URLSearchParams(params).toString();
  return request(`/proyectos${qs ? `?${qs}` : ""}`);
};

export const getProyecto = (id) => request(`/proyectos/${id}`);

export const crearProyecto = ({ titulo, descripcionBreve, descripcionGeneral }) =>
  request(`/proyectos`, {
    method: "POST",
    data: { titulo, descripcionBreve, descripcionGeneral },
  });

export const updateProyecto = (id, data) =>
  request(`/proyectos/${id}`, { method: "PUT", data });

export const deleteProyecto = (id) =>
  request(`/proyectos/${id}`, { method: "DELETE" });

/* ---------------- PING ---------------- */
export const ping = () => request(`/`);