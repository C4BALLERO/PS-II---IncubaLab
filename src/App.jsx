// src/App.jsx
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./assets/layouts/MainLayout";
import PrivateRoute from "./assets/components/PrivateRoute";

// Vistas públicas
import Home from "./assets/views/Home";
import Prueba from "./assets/views/prueba";
import Faq from "./assets/views/Faq";
import About from "./assets/views/About";
import Login from "./assets/views/login";
import Register from "./assets/views/register";
import ExplorarProyectos from "./assets/views/ExplorarProyectos";
import CrearProyecto from "./assets/views/CrearProyecto";
import CrearCampania from "./assets/views/CrearCampania";
import CrearCampania2 from "./assets/views/CrearCampania2";

// Vistas administración
import UsersAdmin from "./assets/views/UsersAdmin";
import CrudUsuarios from "./assets/views/admin/CrudUsuarios";
import CrudProyectos from "./assets/views/admin/CrudProyectos";
import AceptarProyectos from "./assets/views/admin/AceptarProyectos";
import ProyectosRemovidos from "./assets/views/admin/ProyectosRemovidos";
import Perfil from "./assets/views/admin/Perfil";
import Configurar2FA from "./assets/views/Configurar2FA";
import Profile from "./assets/views/Profile";
import EditarProyecto from "./assets/views/admin/EditarProyecto";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar usuario desde localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
    setLoading(false);
  }, []);

  if (loading) return <p>Cargando...</p>; // Spinner o mensaje mientras carga

  return (
    <Router>
      <Routes>
        {/* ----------------- Rutas públicas dentro de MainLayout ----------------- */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/prueba" element={<Prueba />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/explorar" element={<ExplorarProyectos />} />
          <Route path="/crear-proyecto" element={<CrearProyecto />} />
          <Route path="/crear-campania" element={<CrearCampania />} />
          <Route path="/crear-campania-2" element={<CrearCampania2 />} />

          {/* Rutas de admin con layout */}
          {user?.Id_Rol === 1 && (
            <>
              <Route path="/admin/users" element={<UsersAdmin />} />
              <Route path="/admin/proyectos" element={<CrudProyectos />} />
              <Route path="/admin/aprobar-proyectos" element={<AceptarProyectos />} />
              <Route path="/admin/proyectos-removidos" element={<ProyectosRemovidos />} />
              <Route path="/admin/perfil" element={<Perfil />} />
              <Route path="/admin/editar/:id" element={<EditarProyecto />} />
            </>
          )}
        </Route>

        {/* ----------------- Rutas protegidas ----------------- */}
        <Route
          path="/profile"
          element={
            <PrivateRoute user={user}>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/configurar-2fa"
          element={
            <PrivateRoute user={user}>
              <Configurar2FA userId={user?.IdUser} />
            </PrivateRoute>
          }
        />

        {/* ----------------- Login/Register ----------------- */}
        <Route
          path="/login"
          element={!user ? <Login setUser={setUser} /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!user ? <Register setUser={setUser} /> : <Navigate to="/" />}
        />

        {/* ----------------- (Opcional) 404 ----------------- */}
        {/* <Route path="*" element={<div style={{ padding: 24 }}>Página no encontrada</div>} /> */}
      </Routes>
    </Router>
  );
}

export default App;
