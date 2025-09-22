export default function Home() {
  return (
    <main>
      {/* HERO */}
      <section className="container hero">
        <h1 className="hero-title">
          <span className="underline">Recaudar fondos en</span><br/>
          Incuva Lab solo lleva unos<br/> minutos
        </h1>

        {/* PASOS */}
        <div className="steps">
          {["1","2","3","4"].map((n) => (
            <article className="step" key={n}>
              <div className="badge">{n}</div>
              <h3 className="step-title">
                Empieza con<br/> lo mas basico
              </h3>
              <p className="step-sub">
                Comienza por tu nombre<br/> y ubicacion
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* DIVISOR */}
      <hr className="divider" />

      {/* ABOUT */}
      <section className="container about">
        <h2 className="about-title">¿Que es incUVa-Lab?</h2>
        <p className="about-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing edit. Nullam sit amet aliquet ipsum.
          Vestibulum sagittis at elit ing feugia. Curabitur at ipsum et sapien tempus cursus.
          Nunc ac ante sapien. Proin eget est tellus. In hac habitasse platea dictumst.
          Suspendisse potenti. Send tempor
        </p>
      </section>
    </main>
  );
}
