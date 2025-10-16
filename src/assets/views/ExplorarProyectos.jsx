import { useEffect, useState } from "react";
import "../../styles/Explorar.css";

function ExplorarProyectos() {
  const [proyectos, setProyectos] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);

    fetch("http://localhost:4000/api/proyectos")
      .then(res => res.json())
      .then(data => setProyectos(data))
      .catch(err => console.error("Error al cargar proyectos:", err));
  }, []);

  const handleSeguir = (IdProyecto) => {
    if (!user) return alert("Debes iniciar sesión para seguir una campaña");

    fetch("http://localhost:4000/api/proyectos/seguir", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ IdUser: user.IdUser, IdProyecto }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) alert(data.error);
        else alert("Campaña seguida correctamente");
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="explorar-container">
      <h2>Explorar campañas activas</h2>
      <div className="proyectos-grid">
        {proyectos.length > 0 ? (
          proyectos.map((proyecto) => (
            <div key={proyecto.IdProyecto} className="proyecto-card">
              <img
                src={`http://localhost:4000${proyecto.ImagenPrincipal}`}
                alt={proyecto.Titulo}
                className="proyecto-img"
              />
              <h3>{proyecto.Titulo}</h3>
              <p>{proyecto.DescripcionCorta}</p>
              <small>
                por {proyecto.NombreCreador} {proyecto.ApellidoCreador}
              </small>
              <div className="proyecto-actions">
                <button onClick={() => handleSeguir(proyecto.IdProyecto)}>
                  👍 Me gusta
                </button>
                <a href={`/proyecto/${proyecto.IdProyecto}`}>Ver campaña</a>
              </div>
            </div>
          ))
        ) : (
          <p>No hay campañas disponibles.</p>
        )}
      </div>
    </div>
  );
}

export default ExplorarProyectos;
