import { useState } from "react";
import "../../styles/CrearCampania2.css";
import placeholder from "../react.svg"; // 👈 usa tu imagen de placeholder, cámbiala si tienes otra

const CrearCampania2 = () => {
  const [imagen, setImagen] = useState(null);
  const [preview, setPreview] = useState(null);
  const [producto, setProducto] = useState(null);

  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagen(file.name);
      setPreview(URL.createObjectURL(file)); // 👈 genera URL temporal para mostrar preview
    } else {
      setImagen(null);
      setPreview(null);
    }
  };

  return (
    <div className="crear-campania2-container">
      <button className="next-btn">Ir a la siguiente sección</button>

      <section className="section">
        <h2>Muestra gráficamente la identidad de la Campaña</h2>

        <label className="label">Imagen del proyecto</label>
        <p className="subtext">
          Subir una imagen del proyecto según la medida de 600 x 400
        </p>
        
        <div className="image-upload-container">
          <div className="preview-box">
            <img
              src={preview || placeholder}
              alt="Preview"
              className="preview-img"
            />
          </div>
          <div>
            <label htmlFor="imagen" className="file-label">Elegir archivo</label>
            <input
              id="imagen"
              type="file"
              accept="image/*"
              className="input-file"
              onChange={handleImagenChange}
            />
            <span className="file-name">
              {imagen || "No se seleccionó ningún archivo"}
            </span>
          </div>
        </div>

        <label className="label">Producto final</label>
        <label htmlFor="producto" className="file-label">Elegir archivo</label>
        <input
          id="producto"
          type="file"
          className="input-file"
          onChange={(e) => setProducto(e.target.files[0]?.name)}
        />
        <span className="file-name">
          {producto || "No se seleccionó ningún archivo"}
        </span>

        <label className="label">Link de YouTube</label>
        <input
          type="text"
          className="input"
          placeholder="https://youtu.be/xxxx"
        />

        <button className="next-btn">Ir a la siguiente sección</button>
      </section>

      <h2>Más información</h2>
      <section className="more-info">
        <p>
          Cuéntale a las personas por qué deberían entusiasmarse con tu proyecto.
          Sé específico, y a la vez claro y conciso.
        </p>
        <p>Establece un cronograma claro y específico para los patrocinadores.</p>
        <p>¿Qué presupuesto tienes?</p>
      </section>
    </div>
  );
};

export default CrearCampania2;