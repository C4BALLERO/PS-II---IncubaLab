import { useEffect, useState } from "react";
import "../../styles/Explorar.css";

function ExplorarProyectos() {
  const [proyectos, setProyectos] = useState([]);
  const [user, setUser] = useState(null);
  const [seguidos, setSeguidos] = useState([]); // Proyectos que el usuario ya sigue

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      // Traer proyectos que ya siguió
      fetch(`http://localhost:4000/api/proyectos/donados/${storedUser.IdUser}`)
        .then(res => res.json())
        .then(data => setSeguidos(data.map(p => p.IdProyecto)))
        .catch(err => console.error(err));
    }

    fetch("http://localhost:4000/api/proyectos/todos")
      .then(res => res.json())
      .then(data => setProyectos(data))
      .catch(err => console.error("Error al cargar proyectos:", err));
  }, []);

  const handleSeguir = async (IdProyecto) => {
    if (!user) return alert("Debes iniciar sesión para seguir una campaña");

    try {
      const res = await fetch("http://localhost:4000/api/proyectos/seguir", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ IdUser: user.IdUser, IdProyecto }),
      });
      const data = await res.json();

      if (data.error) alert(data.error);
      else {
        alert("Campaña seguida correctamente");
        setSeguidos([...seguidos, IdProyecto]); // Actualizar estado local
      }
    } catch (err) {
      console.error(err);
      alert("Ocurrió un error al seguir la campaña");
    }
  };

  const handleQuitar = async (IdProyecto) => {
    if (!user) return alert("Debes iniciar sesión");

    try {
      const res = await fetch("http://localhost:4000/api/proyectos/seguir", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ IdUser: user.IdUser, IdProyecto }),
      });
      const data = await res.json();

      if (data.error) alert(data.error);
      else setSeguidos(seguidos.filter(id => id !== IdProyecto));
    } catch (err) {
      console.error(err);
      alert("Ocurrió un error al quitar el me gusta");
    }
  };

  return (
    <div className="explorar-container">
      <h2 className="explorar-header">Proyectos</h2>
      {proyectos.length > 0 ? (
        <div className="proyectos-grid">
          {proyectos.map((p) => {
            const yaSeguido = seguidos.includes(p.IdProyecto);
            return (
              <div key={p.IdProyecto} className="proyecto-card">
                <img
                  src={p.ImagenPrincipal ? `http://localhost:4000${p.ImagenPrincipal}` : "/default.png"}
                  alt={p.Titulo}
                  className="proyecto-img"
                />
                <h3>{p.Titulo}</h3>
                <p>{p.DescripcionCorta}</p>
                <small>
                  por {p.NombreCreador} {p.ApellidoCreador}
                </small>
                <div className="proyecto-actions">
                  {yaSeguido ? (
                    <button className="btn-rojo" onClick={() => handleQuitar(p.IdProyecto)}>💔 Seguido</button>
                  ) : (
                    <button className="btn-verde" onClick={() => handleSeguir(p.IdProyecto)}>👍 Me gusta</button>
                  )}
                  <a className="btn-azul" href={`/proyecto/${p.IdProyecto}`}>Ver campaña</a>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p>No hay campañas disponibles.</p>
      )}
    </div>
  );
}

export default ExplorarProyectos;
