// src/assets/services/api.js

// Detecta automáticamente VITE_API_URL y quita "/" final
const BASE_URL =
  import.meta.env.VITE_API_URL?.replace(/\/$/, "") || "http://localhost:4000";

// Función genérica para llamadas a la API
async function request(path, { method = "GET", data, headers } = {}) {
  const opts = {
    method,
    headers: { "Content-Type": "application/json", ...(headers || {}) },
  };
  if (data !== undefined) opts.body = JSON.stringify(data);

  try {
    const res = await fetch(`${BASE_URL}${path}`, opts);
    const isJson = res.headers.get("content-type")?.includes("application/json");
    const payload = isJson ? await res.json() : await res.text();

    if (!res.ok) {
      const msg = (isJson && (payload?.message || payload?.error)) || res.statusText || "Error en la API";
      throw new Error(msg);
    }

    // Normaliza la respuesta para los endpoints que devuelven objetos o arrays
    return payload;
  } catch (err) {
    console.error("❌ Error al conectar API:", err);
    throw err;
  }
}

/* -------------------- USERS -------------------- */
export const getUsers = (params = {}) => {
  const qs = new URLSearchParams(params).toString();
  return request(`/api/users${qs ? `?${qs}` : ""}`);
};

export const getUser = (id) => request(`/api/users/${id}`);

export const createUser = (user) => request(`/api/users`, { method: "POST", data: user });

export const updateUser = (id, user) => request(`/api/users/${id}`, { method: "PUT", data: user });

export const softDeleteUser = (id) => request(`/api/users/${id}`, { method: "DELETE" });

export const restoreUser = (id) => request(`/api/users/${id}/restore`, { method: "PATCH" });

/* -------------------- PROYECTOS -------------------- */
export const getProyectos = (params = {}) => {
  const qs = new URLSearchParams(params).toString();
  return request(`/proyectos${qs ? `?${qs}` : ""}`);
};

export const getProyecto = (id) => request(`/proyectos/${id}`);

export const crearProyecto = ({ titulo, descripcionBreve, descripcionGeneral }) =>
  request(`/proyectos`, { method: "POST", data: { titulo, descripcionBreve, descripcionGeneral } });

export const updateProyecto = (id, data) => request(`/proyectos/${id}`, { method: "PUT", data });

export const deleteProyecto = (id) => request(`/proyectos/${id}`, { method: "DELETE" });

/* -------------------- Healthcheck -------------------- */
export const ping = () => request(`/`);
