// src/utils/auth.js
const TOKEN_KEYS = ["authToken", "adminToken", "userToken", "token"];

export function getAuth() {
  for (const k of TOKEN_KEYS) {
    const v = localStorage.getItem(k) || sessionStorage.getItem(k);
    if (v) return { token: v };
  }
  // fallback: si guardas user serializado
  const userStr =
    localStorage.getItem("user") || sessionStorage.getItem("user");
  if (userStr) return { user: JSON.parse(userStr) };
  return null;
}

export function setAuth({ token, user, persist = true }) {
  const storage = persist ? localStorage : sessionStorage;
  if (token) storage.setItem("authToken", token);
  if (user) storage.setItem("user", JSON.stringify(user));
  window.dispatchEvent(new Event("auth-changed"));
}

export function clearAuth() {
  const keys = ["authToken", "adminToken", "userToken", "token", "user"];
  keys.forEach((k) => {
    localStorage.removeItem(k);
    sessionStorage.removeItem(k);
  });
  window.dispatchEvent(new Event("auth-changed"));
}
