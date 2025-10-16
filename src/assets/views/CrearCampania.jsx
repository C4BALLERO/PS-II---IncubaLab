import { useState } from "react";
import { useNavigate } from "react-router-dom"; // 👈 importamos el hook
import { crearProyecto } from "../services/api"; 
import "../../styles/CrearCampania.css";

const CrearCampania = () => {
  const [titulo, setTitulo] = useState("");
  const [descripcionBreve, setDescripcionBreve] = useState("");
  const [descripcionGeneral, setDescripcionGeneral] = useState("");
  const [mensaje, setMensaje] = useState(null);
  const [tipoMensaje, setTipoMensaje] = useState("success"); // success | error

  const navigate = useNavigate(); // 👈 inicializamos navegación

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!titulo || !descripcionGeneral) {
      setTipoMensaje("error");
      setMensaje("⚠️ El Título y la Descripción General son obligatorios");
      return;
    }

    try {
      const res = await crearProyecto({
        titulo,
        descripcionBreve,
        descripcionGeneral,
      });

      if (res.success) {
        setTipoMensaje("success");
        setMensaje(`✅ Proyecto creado con ID ${res.id}`);

        // limpiar campos
        setTitulo("");
        setDescripcionBreve("");
        setDescripcionGeneral("");

        // 👈 redirigir a la siguiente página solo si se creó con éxito
        navigate("/crear-campania-2");
      } else {
        setTipoMensaje("error");
        setMensaje(res.error || "❌ No se pudo crear el proyecto");
      }
    } catch (err) {
      setTipoMensaje("error");
      setMensaje("❌ Error en el servidor. Intenta más tarde.");
    }
  };

  return (
    <div className="crear-campania-container">
      {/* Columna izquierda */}
      <form className="crear-campania-left" onSubmit={handleSubmit}>
        <h1>Crear una Campaña</h1>

        <section className="section">
          <h2>Presentación del proyecto</h2>
          <p className="subtext">
            Escribe un título y subtítulo claros que resuman tu proyecto.
            <br />
            Se mostrarán en tu página, en el pre-lanzamiento, en búsquedas,
            categorías y correos para patrocinadores.
          </p>

          <label className="label">Descripción breve</label>
          <textarea
            className="input-textarea"
            rows="3"
            value={descripcionBreve}
            onChange={(e) => setDescripcionBreve(e.target.value)}
          />

          <button type="submit" className="next-btn">
            Ir a la siguiente sección
          </button>
        </section>

        <section className="section">
          <h2>Presenta tu proyecto</h2>
          <p className="subtext">
            El creador debe mostrar con entusiasmo el valor y atractivo del
            proyecto, definir la misión, presentar un plan con cronograma claro
            y transmitir confianza para garantizar un buen uso de los fondos.
          </p>
        </section>

        {mensaje && <div className={`alert ${tipoMensaje}`}>{mensaje}</div>}
      </form>

      {/* Columna derecha */}
      <div className="crear-campania-right">
        <label className="label">Título</label>
        <input
          type="text"
          className="input"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />

        <label className="label">Descripción general</label>
        <textarea
          className="input-textarea"
          rows="4"
          value={descripcionGeneral}
          onChange={(e) => setDescripcionGeneral(e.target.value)}
          required
        />
      </div>
    </div>
  );
};

export default CrearCampania;