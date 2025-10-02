import "../../styles/Login.css";

const cards = [
  { title: "Card 1", text: "Esto es una prueba de contenido en la card 1." },
  { title: "Card 2", text: "Esto es una prueba de contenido en la card 2." },
  { title: "Card 3", text: "Esto es una prueba de contenido en la card 3." },
  { title: "Card 4", text: "Esto es una prueba de contenido en la card 4." },
];

const Login = () => {
  return (
    <div className="login-container">
      <h1 className="center-text">Crearas una carpeta para el login que este con el registro, lo hice como prueba esto</h1>
      
      <p className="left-text">Texto alineado a la izquierda para pruebas.</p>
      <p className="right-text">Texto alineado a la derecha para pruebas.</p>
      
      <div className="cards-container">
        {cards.map((card, index) => (
          <div key={index} className="card">
            <h3>{card.title}</h3>
            <p>{card.text}</p>
          </div>
        ))}
      </div>

      <div className="long-text">
        {[...Array(30)].map((_, i) => (
          <p key={i}>Esta es línea de prueba scroll {i + 1}</p>
        ))}
      </div>

      <div className="fake-footer">
        <p>Footer de prueba centrado</p>
      </div>
    </div>
  );
};

export default Login;
