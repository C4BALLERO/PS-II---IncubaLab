import { useState } from "react";
import "../../styles/CrearProyecto.css";

function CrearProyecto() {
  const [formData, setFormData] = useState({
    Nombre: "",
    DescripcionCorta: "",
    DescripcionGeneral: "",
    FechaInicio: "",
    FechaFin: "",
    ImagenPrincipal: null,
    Video: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones básicas
    if (!formData.Nombre.trim()) return alert("Debes ingresar un nombre de proyecto");
    if (!formData.DescripcionCorta.trim()) return alert("Agrega una descripción corta");
    if (!formData.DescripcionGeneral.trim()) return alert("Agrega una descripción general");
    if (!formData.FechaInicio || !formData.FechaFin) return alert("Selecciona fechas válidas");
    if (new Date(formData.FechaFin) < new Date(formData.FechaInicio)) {
      return alert("La fecha de fin no puede ser anterior a la de inicio");
    }

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return alert("Usuario no encontrado");

    const data = new FormData();
    for (const key in formData) {
      if (formData[key]) data.append(key, formData[key]);
    }
    data.append("IdCreador", user.IdUser);

    try {
      const res = await fetch("http://localhost:3001/api/proyectos/crear", {
        method: "POST",
        body: data,
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Error al crear proyecto");

      alert("Proyecto creado correctamente ✅");
      setFormData({
        Nombre: "",
        DescripcionCorta: "",
        DescripcionGeneral: "",
        FechaInicio: "",
        FechaFin: "",
        ImagenPrincipal: null,
        Video: "",
      });
    } catch (err) {
      console.error(err);
      alert("Error al crear proyecto ❌");
    }
  };

  return (
    <div className="crear-proyecto-container">
      <h1>Crear nueva campaña</h1>
      <form onSubmit={handleSubmit} className="crear-proyecto-form">
        <label>
          Nombre del Proyecto:
          <input
            type="text"
            name="Nombre"
            value={formData.Nombre}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Descripción Corta:
          <input
            type="text"
            name="DescripcionCorta"
            value={formData.DescripcionCorta}
            onChange={handleChange}
            maxLength="150"
            required
          />
        </label>

        <label>
          Descripción General:
          <textarea
            name="DescripcionGeneral"
            value={formData.DescripcionGeneral}
            onChange={handleChange}
            rows="4"
            required
          ></textarea>
        </label>

        <label>
          Fecha de Inicio:
          <input
            type="date"
            name="FechaInicio"
            value={formData.FechaInicio}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Fecha de Fin:
          <input
            type="date"
            name="FechaFin"
            value={formData.FechaFin}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Imagen Principal:
          <input
            type="file"
            name="ImagenPrincipal"
            onChange={handleChange}
            accept="image/*"
          />
        </label>

        <label>
          Video (URL, opcional):
          <input
            type="text"
            name="Video"
            value={formData.Video}
            onChange={handleChange}
            placeholder="https://..."
          />
        </label>

        <button type="submit" className="btn-crear">
          Crear Proyecto
        </button>
      </form>
    </div>
  );
}

export default CrearProyecto;
