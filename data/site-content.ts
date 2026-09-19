import type { Benefit, Faq, ProcessStep, Testimonial } from "@/types";

/**
 * CONTENIDO EDITABLE DE LA COCINA Ketty.
 *
 * ⚠️ Los testimonios y la historia de la marca son CONTENIDO DE DEMOSTRACIÓN:
 * reemplazar por testimonios reales y la historia verdadera de la empresa
 * antes de lanzar el sitio al público.
 */

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "Los sorrentinos son increíbles. Se nota que son realmente caseros, la masa es otra cosa.",
    author: "Martina G.",
    location: "Buenos Aires",
    rating: 5,
    isDemo: true,
  },
  {
    id: "t2",
    quote:
      "Pedimos el combo familiar y cenamos todos. La lasagna desapareció en cinco minutos. Un éxito en casa.",
    author: "Diego R.",
    location: "San Isidro",
    rating: 5,
    isDemo: true,
  },
  {
    id: "t3",
    quote:
      "Los ñoquis son suaves como nube. Se siente el amor por el oficio en cada paquete.",
    author: "Carolina M.",
    location: "Vicente López",
    rating: 5,
    isDemo: true,
  },
  {
    id: "t4",
    quote:
      "El delivery llegó puntual y con todo en perfecto estado. La atención por WhatsApp es excelente.",
    author: "Javier T.",
    location: "Belgrano",
    rating: 5,
    isDemo: true,
  },
];

export const faqs: Faq[] = [
  {
    question: "¿Hacen envíos?",
    answer:
      "Sí, realizamos envíos a domicilio dentro de nuestra zona de reparto y también ofrecés la opción de retirar tu pedido por el local.",
  },
  {
    question: "¿Dónde realizan entregas?",
    answer:
      "Entregamos en Pergamino. Si vivís en otra zona, consultanos por WhatsApp y vemos si podemos llegar a tu barrio.",
  },
  {
    question: "¿Cómo se conservan las pastas?",
    answer:
      "Nuestras pastas son frescas y deben conservarse refrigeradas entre 1°C y 5°C, siempre dentro del envase original para que no se sequen.",
  },
  {
    question: "¿Las pastas son frescas?",
    answer:
      "Sí. Elaboramos nuestras pastas en el día con harina, huevos y rellenos frescos. No utilizamos conservantes ni productos congelados.",
  },
  {
    question: "¿Cuánto duran?",
    answer:
      "Las pastas frescas se conservan refrigeradas hasta 3 días. Las lasagnas hasta 72 horas. Si querés, podés congelarlas al recibirlas y duran hasta 60 días.",
  },
  {
    question: "¿Qué medios de pago aceptan?",
    answer:
      "Aceptamos transferencia bancaria y pago en efectivo al retirar o recibir tu pedido.",
  },
  {
    question: "¿Puedo hacer un pedido personalizado?",
    answer:
      "¡Claro que sí! Para eventos y pedidos especiales escribinos por WhatsApp con tiempo y armamos el combo que necesites.",
  },
  {
    question: "¿Cómo realizo un pedido?",
    answer:
      "Es muy fácil: agregá tus pastas al carrito, completá el checkout y tu pedido llega directo a nuestro WhatsApp para confirmar el envío o retiro.",
  },
];

export const processSteps: ProcessStep[] = [
  {
    title: "Seleccionamos los ingredientes",
    description:
      "Elegimos diariamente harina, huevos frescos y verduras de estación. Sin atajos, sin conservantes.",
  },
  {
    title: "Preparamos la masa",
    description:
      "Amasamos en el día y estiramos cada lámina a mano hasta lograr la textura justa.",
  },
  {
    title: "Elaboramos cada pasta",
    description:
      "Rellenamos, cortamos y damos forma a cada pieza con dedicación, como se hace desde siempre.",
  },
  {
    title: "Llega a tu mesa",
    description:
      "Empacamos con cuidado y llevamos la mesa puesta directo a tu casa, fresca y lista para cocinar.",
  },
];

export interface CookingTimeItem {
  id: string;
  product: string;
  minutes: string;
  tip: string;
}

export const cookingTimes: CookingTimeItem[] = [
  {
    id: "c1",
    product: "Ravioles",
    minutes: "3–4 min",
    tip: "Sacalos apenas empiecen a flotar en agua hirviendo con sal.",
  },
  {
    id: "c2",
    product: "Sorrentinos",
    minutes: "4–5 min",
    tip: "Son generosos: dejá que suban y contá un minuto más antes de retirarlos.",
  },
  {
    id: "c3",
    product: "Tallarines",
    minutes: "1–2 min",
    tip: "Se cocinan rapidísimo, probá uno al minuto y regulá según tu punto.",
  },
  {
    id: "c4",
    product: "Ñoquis",
    minutes: "2–3 min",
    tip: "Apenas flotan están listos. Si los dejás más, se deshacen.",
  },
  {
    id: "c5",
    product: "Lasagnas",
    minutes: "35–40 min",
    tip: "Al horno a 180°C hasta que la superficie se dore y burbujee.",
  },
  {
    id: "c6",
    product: "Rellenas",
    minutes: "4–6 min",
    tip: "Cocinalas en olla amplia con agua abundante y movelas con cuidado.",
  },
];

export const cookingGuide = {
  eyebrow: "En tu cocina",
  title: "Tiempos de cocción",
  subtitle:
    "Agua abundante con sal, fuego fuerte y estos tiempos para que queden en su punto justo.",
};

export const benefits: Benefit[] = [
  {
    title: "Ingredientes seleccionados",
    description: "Harina, huevos y verduras frescas de productores de confianza.",
  },
  {
    title: "Elaboración artesanal",
    description: "Cada pasta se hace a mano, en el día y en pequeñas tandas.",
  },
  {
    title: "Hecho con dedicación",
    description: "Una receta de familia con la misma pasión desde la primera tanda.",
  },
  {
    title: "Entrega a domicilio",
    description: "Llevamos tu pedido fresco y refrigerado hasta tu puerta.",
  },
  {
    title: "Pastas frescas",
    description: "Sin precocciones, sin conservantes: solo sabor casero.",
  },
];

/**
 * HISTORIA DE MARCA — CONTENIDO DE DEMOSTRACIÓN.
 * Reemplazar con la historia real de La Cocina Ketty.
 */
export const brandStory = {
  eyebrow: "Nuestra historia",
  title: "Hecho como en casa",
  intro:
    "La Cocina Ketty nació en una cocina de familia, alrededor de una mesa larga y muchos comensales.",
  paragraphs: [
    "Hace años, Ketty comenzó amasando para sus hijos los domingos: tallarines para el tuco, ñoquis para el 29 y sorrentinos para los cumpleaños. Lo que empezó como un ritual familiar se volvió un oficio, y lo que era una mesa, se volvió una cocina.",
    "Hoy seguimos elaborando cada pasta como el primer día: a mano, con ingredientes frescos y mucha paciencia. Creemos que las mejores comidas son las que reúnen a las personas alrededor de una mesa, y cada paquete que sale de nuestra cocina lleva un poco de esa intención.",
  ],
  imageKitchen:
    "https://images.pexels.com/photos/37000118/pexels-photo-37000118.jpeg?auto=compress&cs=tinysrgb&w=1200",
  imageIngredients:
    "https://images.pexels.com/photos/6287579/pexels-photo-6287579.jpeg?auto=compress&cs=tinysrgb&w=1200",
};

export const heroContent = {
  eyebrow: "Pastas caseras artesanales",
  title: "Pastas caseras, hechas con amor.",
  subtitle: "El sabor de lo casero, directo a tu mesa.",
  primaryCta: "Ver nuestras pastas",
  secondaryCta: "Conocé nuestra historia",
  image:
    "https://images.pexels.com/photos/35377953/pexels-photo-35377953.jpeg?auto=compress&cs=tinysrgb&w=1600",
  imageAlt:
    "Manos elaborando masa de pasta fresca artesanal sobre una mesa enharinada",
};

export const whyUsIntro = {
  title: "¿Por qué elegir La Cocina Ketty?",
  subtitle:
    "Porque detrás de cada paquete hay una cocina, un recuerdo y el sabor de lo hecho en casa.",
};

export const contactIntro = {
  title: "Contacto",
  subtitle:
    "Escribinos por WhatsApp, seguinos en redes o pasate por el local. Siempre respondemos rápido.",
};