// src/assets/views/Faq.jsx
import FaqCard from "../components/faq/FaqCard";
import "../../styles/Faq.css";

const faqs = [
  { question: "¿En qué consiste esta página?",
    answer: "IncUvaLab es una página de crowdfunding de Univalle para apoyar económicamente proyectos: inventos, emprendimientos, etc." },
  { question: "¿Cómo puedo ayudar?",
    answer: "Regístrate, elige una propuesta y dona el monto que desees. Las transacciones se realizan por pago QR." },
  { question: "¿Es seguro?",
    answer: "El equipo de IncubaLab controla el proceso y verifica a los responsables." },
  { question: "¿Mis donaciones pueden ser anónimas?",
    answer: "Sí, por defecto son anónimas salvo que dejes un comentario con tu nombre." },
  { question: "¿Qué sucede si un proyecto llega a su meta?",
    answer: "La idea se financia y puede seguir recibiendo apoyo para los creadores." },
  { question: "¿Puedo participar con mis ideas?",
    answer: "Se planea habilitar publicación de propuestas para recibir apoyo en una versión futura." },
  { question: "¿Qué más puedo esperar?",
    answer: "Mejoras continuas: más información para usuarios y nuevas funcionalidades." },
  { question: "Montos de donación",
    answer: "Montos fijos por comisiones; el pago QR no cubre donaciones muy bajas o muy altas." }
];

export default function Faq() {
  return (
    <section className="faq-section">
      <div className="faq-container">
        <h1 className="faq-heading">Preguntas más frecuentes</h1>
        <div className="faq-underline" />
        <div className="faq-grid">
          {faqs.map((f, i) => <FaqCard key={i} {...f} />)}
        </div>
      </div>
    </section>
  );
}
