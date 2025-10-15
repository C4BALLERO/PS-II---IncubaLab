import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./assets/layouts/MainLayout";

// Views
import Home from "./assets/views/Home";
import Prueba from "./assets/views/prueba";
import Profile from "./assets/views/Profile";
import Faq from "./assets/views/Faq";

// ABOUT
import About from "./assets/views/About";
// Auth
import Login from "./assets/views/login";
import Register from "./assets/views/register";
import UsersAdmin from "./assets/views/UsersAdmin";
import CrearCampania from "./assets/views/CrearCampania";
import CrearCampania2 from "./assets/views/CrearCampania2";

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas con layout (Header + Footer) */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/prueba" element={<Prueba />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/sobre" element={<About />} />

          {/* NUEVA RUTA: Administración de Usuarios */}
          <Route path="/admin/users" element={<UsersAdmin />} />

          {/* NUEVA RUTA: Crear Campaña */}
          <Route path="/crear-campania" element={<CrearCampania />} />
          <Route path="/crear-campania-2" element={<CrearCampania2 />} />
        </Route>

        {/* Rutas sin layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* (Opcional) 404 básica */}
        {/* <Route path="*" element={<div style={{padding:24}}>Página no encontrada</div>} /> */}
      </Routes>
    </Router>
  );
}

export default App;
