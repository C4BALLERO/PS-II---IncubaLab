// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./assets/layouts/MainLayout";

import Home from "./assets/views/Home";
import Prueba from "./assets/views/prueba";
import Profile from "./assets/views/Profile";

// NUEVO: FAQ
import Faq from "./assets/views/Faq";

import Login from "./assets/views/login";
import Register from "./assets/views/register";

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas con layout (Header + Footer) */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/prueba" element={<Prueba />} />
          <Route path="/profile" element={<Profile />} />
          {/* NUEVA RUTA */}
          <Route path="/faq" element={<Faq />} />
        </Route>

        {/* Rutas sin layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
