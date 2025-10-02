import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "¿Qué es Incuvalab?",
    answer:
      "Incuvalab es una plataforma dedicada a promover y gestionar proyectos renovables y sostenibles. Conectamos a personas interesadas en contribuir al desarrollo de iniciativas que benefician al medio ambiente y a las comunidades.",
  },
  {
    question: "¿Cómo puedo participar en un proyecto?",
    answer:
      "Para participar en un proyecto, primero debes crear una cuenta en nuestra plataforma. Luego, explora el catálogo de proyectos disponibles y selecciona aquellos que te interesen. Puedes contribuir de diferentes formas según las necesidades de cada proyecto.",
  },
  {
    question: "¿Puedo crear mi propio proyecto?",
    answer:
      "Sí, los usuarios registrados pueden proponer nuevos proyectos. Una vez que envíes tu propuesta, nuestro equipo la revisará y, si cumple con los criterios de sostenibilidad y viabilidad, será publicada en la plataforma.",
  },
  {
    question: "¿Los proyectos son gratuitos?",
    answer:
      "La participación en la plataforma es gratuita. Sin embargo, algunos proyectos pueden requerir contribuciones económicas o de otro tipo para su implementación. Toda la información sobre los requisitos se detalla en la página de cada proyecto.",
  },
  {
    question: "¿Cómo se garantiza la transparencia de los proyectos?",
    answer:
      "Todos los proyectos pasan por un proceso de revisión y verificación. Además, mantenemos un sistema de seguimiento que permite a los contribuyentes ver el progreso y los resultados de cada iniciativa.",
  },
]

export default function PreguntasPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-serif text-[#880430] mb-4">Preguntas Frecuentes</h1>
            <p className="text-lg text-[#8D8D8D]">Encuentra respuestas a las preguntas más comunes</p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border border-[#8D8D8D]/20 rounded-lg px-6">
                <AccordionTrigger className="text-left text-[#880430] font-medium hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-[#8D8D8D]">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 p-8 bg-[#66B5CB]/10 rounded-lg text-center">
            <h2 className="text-2xl font-serif text-[#880430] mb-4">¿No encontraste lo que buscabas?</h2>
            <p className="text-[#8D8D8D] mb-6">Contáctanos y con gusto te ayudaremos</p>
            <a
              href="mailto:contacto@incuvalab.com"
              className="inline-block px-6 py-3 bg-[#880430] text-white rounded-lg hover:bg-[#880430]/90 transition-colors"
            >
              Contactar Soporte
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
