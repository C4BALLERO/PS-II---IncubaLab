import React from "react";

const HeroSection = () => {
  return (
    <section style={{
      background: 'linear-gradient(135deg, #66B5CB 0%, #880430 100%)',
      padding: '6rem 2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '700px',
      position: 'relative'
    }}>
      {/* Div transparente que engloba toda la sección */}
      <div style={{
        position: 'absolute',
        top: '2rem',
        left: '2rem',
        right: '2rem',
        bottom: '2rem',
        background: `
          linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%),
          radial-gradient(circle at 25% 30%, rgba(255,255,255,0.2) 0%, transparent 60%),
          radial-gradient(circle at 75% 70%, rgba(255,255,255,0.15) 0%, transparent 60%)
        `,
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '24px',
        zIndex: 1
      }} />

      {/* Contenido principal */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        maxWidth: '1400px',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '6rem',
        alignItems: 'center',
        padding: '2rem'
      }}>
        {/* Sección izquierda - Texto y botón */}
        <div style={{
          padding: '2rem'
        }}>
          <h1 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: '4rem',
            fontWeight: 'bold',
            color: '#000000',
            marginBottom: '2rem',
            lineHeight: '1.1'
          }}>
            ¿Listo para empezar?
          </h1>
          <p style={{
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontSize: '1.4rem',
            color: '#000000',
            marginBottom: '3rem',
            lineHeight: '1.6',
            opacity: 0.9
          }}>
            Únete ahora mismo a miles de personas.
          </p>
          <button style={{
            backgroundColor: '#880430',
            color: '#FFFFFF',
            border: 'none',
            padding: '20px 40px',
            borderRadius: '12px',
            fontSize: '1.3rem',
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 12px 30px rgba(136, 4, 48, 0.4)',
            transition: 'all 0.3s ease',
            transform: 'translateY(0)',
            '&:hover': {
              transform: 'translateY(-3px)',
              boxShadow: '0 15px 35px rgba(136, 4, 48, 0.5)'
            }
          }}>
            Iniciar Campaña
          </button>
        </div>

        {/* Sección derecha - Imagen con overlay uniforme */}
        <div style={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '2rem'
        }}>
          <div style={{
            width: '450px',
            height: '450px',
            borderRadius: '50%',
            background: `
              linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.1) 100%),
              radial-gradient(circle at center, rgba(255,255,255,0.3) 0%, transparent 70%)
            `,
            backdropFilter: 'blur(25px)',
            border: '3px solid rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '7rem',
            boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
            position: 'relative'
          }}>
            {/* Efecto de brillo adicional */}
            <div style={{
              position: 'absolute',
              top: '20%',
              left: '20%',
              width: '60%',
              height: '60%',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)',
              filter: 'blur(40px)',
              zIndex: -1
            }} />
            
            {/* Imagen principal */}
            <img 
              src="/main.png" 
              alt="IncuvaLab" 
              style={{
                width: '80%',
                height: '80%',
                objectFit: 'contain',
                borderRadius: '50%',
                filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.2))'
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export { HeroSection };
export default HeroSection;
