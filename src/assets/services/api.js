// src/assets/services/api.js
const BASE_URL =
  import.meta.env.VITE_API_URL?.replace(/\/$/, "") || "http://localhost:4000";

async function request(path, { method = "GET", data, headers } = {}) {
  const opts = {
    method,
    headers: { "Content-Type": "application/json", ...(headers || {}) },
  };
  if (data !== undefined) opts.body = JSON.stringify(data);

  const res = await fetch(`${BASE_URL}${path}`, opts);
  const isJson = res.headers.get("content-type")?.includes("application/json");
  const payload = isJson ? await res.json() : await res.text();

  if (!res.ok) {
    const msg = (isJson && payload?.error) || res.statusText || "Error de API";
    throw new Error(msg);
  }
  return payload;
}

/* Endpoints de usuarios */
export const getUsers       = (params = {}) => {
  const qs = new URLSearchParams(params).toString();
  return request(`/api/users${qs ? `?${qs}` : ""}`);
};
export const getUser        = (id)        => request(`/api/users/${id}`);
export const createUser     = (user)      => request(`/api/users`,       { method: "POST",   data: user });
export const updateUser     = (id, user)  => request(`/api/users/${id}`, { method: "PUT",    data: user });
export const softDeleteUser = (id)        => request(`/api/users/${id}`, { method: "DELETE" });
export const restoreUser    = (id)        => request(`/api/users/${id}/restore`, { method: "PATCH" });

export const ping = () => request(`/`);
