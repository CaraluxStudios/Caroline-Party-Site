import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  // Navigation
  'nav.home': { en: 'Home', es: 'Inicio' },
  'nav.services': { en: 'Services', es: 'Servicios' },
  'nav.characters': { en: 'Characters', es: 'Personajes' },
  'nav.about': { en: 'About', es: 'Nosotros' },
  'nav.contact': { en: 'Contact', es: 'Contacto' },
  
  // Hero
  'hero.tagline': { en: 'Making Every Celebration Magical', es: 'Haciendo Cada Celebración Mágica' },
  'hero.subtitle': { en: 'Professional children\'s party entertainers bringing joy, wonder, and unforgettable moments to your special day.', es: 'Animadores profesionales de fiestas infantiles que traen alegría, asombro y momentos inolvidables a tu día especial.' },
  'hero.cta': { en: 'Book Your Party Now', es: 'Reserva Tu Fiesta Ahora' },
  'hero.view_services': { en: 'View Services', es: 'Ver Servicios' },

  // Services
  'services.title': { en: 'Our Magical Services', es: 'Nuestros Servicios Mágicos' },
  'services.subtitle': { en: 'From enchanting princesses to amazing magic shows, we have everything to make your child\'s party unforgettable!', es: '¡Desde encantadoras princesas hasta increíbles shows de magia, tenemos todo para hacer la fiesta de tu hijo inolvidable!' },
  
  'service.princess.title': { en: 'Princess Performers', es: 'Princesas' },
  'service.princess.desc': { en: 'Magical princess characters that bring fairy tales to life with songs, stories, and royal adventures.', es: 'Personajes mágicos de princesas que dan vida a los cuentos de hadas con canciones, historias y aventuras reales.' },
  
  'service.spa.title': { en: 'Kids Spa Parties', es: 'Fiestas Spa para Niños' },
  'service.spa.desc': { en: 'Pamper the little ones with mini manicures, facials, and relaxation activities in a fun spa setting.', es: 'Mima a los pequeños con mini manicuras, tratamientos faciales y actividades de relajación en un ambiente de spa divertido.' },
  
  'service.magic.title': { en: 'Magicians', es: 'Magos' },
  'service.magic.desc': { en: 'Mind-blowing magic shows with audience participation that will leave kids amazed and entertained.', es: 'Shows de magia impresionantes con participación del público que dejarán a los niños asombrados y entretenidos.' },
  
  'service.clown.title': { en: 'Clowns', es: 'Payasos' },
  'service.clown.desc': { en: 'Fun and friendly clowns bringing laughter, games, and balloon creations to every celebration.', es: 'Payasos divertidos y amigables que traen risas, juegos y creaciones de globos a cada celebración.' },
  
  'service.facepainting.title': { en: 'Face Painters', es: 'Pintacaritas' },
  'service.facepainting.desc': { en: 'Transform kids into their favorite characters with professional, safe face painting artistry.', es: 'Transforma a los niños en sus personajes favoritos con arte profesional y seguro de pintacaritas.' },
  
  'service.balloon.title': { en: 'Balloon Artists', es: 'Artistas de Globos' },
  'service.balloon.desc': { en: 'Amazing balloon sculptures and decorations that add color and excitement to any party.', es: 'Increíbles esculturas de globos y decoraciones que añaden color y emoción a cualquier fiesta.' },
  
  'service.dance.title': { en: 'Music & Dance Hosts', es: 'Animadores de Música y Baile' },
  'service.dance.desc': { en: 'Energetic hosts leading dance parties, games, and musical activities to keep the fun going.', es: 'Animadores energéticos que lideran fiestas de baile, juegos y actividades musicales para mantener la diversión.' },
  
  'service.host.title': { en: 'Party Hosts', es: 'Anfitriones de Fiestas' },
  'service.host.desc': { en: 'Professional party coordinators ensuring everything runs smoothly while you enjoy the celebration.', es: 'Coordinadores de fiestas profesionales que aseguran que todo funcione sin problemas mientras disfrutas de la celebración.' },

  // Characters
  'characters.title': { en: 'Meet Our Characters', es: 'Conoce a Nuestros Personajes' },
  'characters.subtitle': { en: 'Bring the magic of beloved fairy tale characters to your celebration!', es: '¡Trae la magia de los queridos personajes de cuentos de hadas a tu celebración!' },
  'characters.book': { en: 'Book This Character', es: 'Reservar Este Personaje' },

  'character.mermaid.name': { en: 'The Sea Princess', es: 'La Princesa del Mar' },
  'character.mermaid.desc': { en: 'Dive into an underwater adventure with our enchanting mermaid princess! She brings songs, stories, and sea magic.', es: '¡Sumérgete en una aventura submarina con nuestra encantadora princesa sirena! Trae canciones, historias y magia del mar.' },
  
  'character.ice.name': { en: 'The Ice Queen', es: 'La Reina del Hielo' },
  'character.ice.desc': { en: 'Let it go with our magical ice queen! Frozen adventures, royal elegance, and snow magic await.', es: '¡Libérate con nuestra mágica reina del hielo! Te esperan aventuras congeladas, elegancia real y magia de nieve.' },
  
  'character.adventure.name': { en: 'The Adventure Princess', es: 'La Princesa Aventurera' },
  'character.adventure.desc': { en: 'Brave and bold, our adventure princess leads exciting quests and teaches courage to all.', es: 'Valiente y audaz, nuestra princesa aventurera lidera emocionantes misiones y enseña coraje a todos.' },
  
  'character.spa.name': { en: 'Spa Princess', es: 'Princesa Spa' },
  'character.spa.desc': { en: 'Relax and pamper with our spa princess! Mini manicures, facials, and royal relaxation for little ones.', es: '¡Relájate y consiente con nuestra princesa spa! Mini manicuras, tratamientos faciales y relajación real para los pequeños.' },

  // About
  'about.title': { en: 'About Caroline Party', es: 'Sobre Caroline Party' },
  'about.story.title': { en: 'Our Story', es: 'Nuestra Historia' },
  'about.story.text': { en: 'Caroline Party was born from a simple dream: to bring pure joy and magical moments to children\'s celebrations. What started as a passion project has grown into a team of dedicated performers who share one mission – making every child feel like the star of their own fairy tale.', es: 'Caroline Party nació de un sueño simple: traer alegría pura y momentos mágicos a las celebraciones infantiles. Lo que comenzó como un proyecto de pasión ha crecido en un equipo de artistas dedicados que comparten una misión: hacer que cada niño se sienta como la estrella de su propio cuento de hadas.' },
  'about.mission.title': { en: 'Our Mission', es: 'Nuestra Misión' },
  'about.mission.text': { en: 'Making every child\'s celebration unforgettable through magical entertainment, professional performances, and heartfelt experiences that create lasting memories for families.', es: 'Hacer cada celebración infantil inolvidable a través de entretenimiento mágico, actuaciones profesionales y experiencias sinceras que crean recuerdos duraderos para las familias.' },
  'about.values.title': { en: 'Our Values', es: 'Nuestros Valores' },
  'about.value.safety': { en: 'Safety First', es: 'Seguridad Primero' },
  'about.value.safety.desc': { en: 'All our performers are background-checked and trained in child safety protocols.', es: 'Todos nuestros artistas tienen verificación de antecedentes y están capacitados en protocolos de seguridad infantil.' },
  'about.value.professionalism': { en: 'Professionalism', es: 'Profesionalismo' },
  'about.value.professionalism.desc': { en: 'We deliver high-quality entertainment with punctuality and attention to detail.', es: 'Entregamos entretenimiento de alta calidad con puntualidad y atención al detalle.' },
  'about.value.inclusivity': { en: 'Inclusivity', es: 'Inclusividad' },
  'about.value.inclusivity.desc': { en: 'Every child deserves to feel special. We celebrate diversity and create welcoming experiences.', es: 'Cada niño merece sentirse especial. Celebramos la diversidad y creamos experiencias acogedoras.' },

  // Contact
  'contact.title': { en: 'Book Your Party', es: 'Reserva Tu Fiesta' },
  'contact.subtitle': { en: 'Ready to create magical memories? Fill out the form and we\'ll get back to you within 24 hours!', es: '¿Listo para crear recuerdos mágicos? Completa el formulario y te responderemos dentro de 24 horas!' },
  'contact.firstName': { en: 'First Name', es: 'Nombre' },
  'contact.lastName': { en: 'Last Name', es: 'Apellido' },
  'contact.email': { en: 'Email', es: 'Correo Electrónico' },
  'contact.phone': { en: 'Phone', es: 'Teléfono' },
  'contact.message': { en: 'Event Details / Message', es: 'Detalles del Evento / Mensaje' },
  'contact.promo': { en: 'Receive promotional emails', es: 'Recibir correos promocionales' },
  'contact.terms': { en: 'I agree to the Terms & Conditions', es: 'Acepto los Términos y Condiciones' },
  'contact.submit': { en: 'Send Message', es: 'Enviar Mensaje' },
  'contact.success': { en: 'Thank you! We\'ll be in touch soon.', es: '¡Gracias! Estaremos en contacto pronto.' },
  'contact.error.required': { en: 'This field is required', es: 'Este campo es requerido' },
  'contact.error.email': { en: 'Please enter a valid email', es: 'Por favor ingresa un correo válido' },
  'contact.error.terms': { en: 'You must agree to the terms', es: 'Debes aceptar los términos' },

  // Testimonials
  'testimonials.title': { en: 'What Parents Say', es: 'Lo Que Dicen los Padres' },
  'testimonial.1.text': { en: 'The princess was absolutely amazing! My daughter\'s face lit up the moment she walked in. Truly magical!', es: '¡La princesa fue absolutamente increíble! El rostro de mi hija se iluminó en el momento en que entró. ¡Verdaderamente mágico!' },
  'testimonial.1.author': { en: 'Sarah M., Happy Mom', es: 'Sarah M., Mamá Feliz' },
  'testimonial.2.text': { en: 'Professional, punctual, and so much fun! The magician had all the kids captivated. Highly recommend!', es: '¡Profesional, puntual y muy divertido! El mago tenía a todos los niños cautivados. ¡Muy recomendado!' },
  'testimonial.2.author': { en: 'Michael R., Grateful Dad', es: 'Michael R., Papá Agradecido' },
  'testimonial.3.text': { en: 'The spa party was a huge hit! All the girls had an amazing time getting pampered. Thank you!', es: '¡La fiesta spa fue un gran éxito! Todas las niñas pasaron un tiempo increíble siendo consentidas. ¡Gracias!' },
  'testimonial.3.author': { en: 'Jennifer L., Party Host', es: 'Jennifer L., Anfitriona' },

  // FAQ
  'faq.title': { en: 'Frequently Asked Questions', es: 'Preguntas Frecuentes' },
  'faq.1.q': { en: 'How far in advance should I book?', es: '¿Con cuánta anticipación debo reservar?' },
  'faq.1.a': { en: 'We recommend booking at least 2-3 weeks in advance for the best availability, especially for weekends.', es: 'Recomendamos reservar con al menos 2-3 semanas de anticipación para mejor disponibilidad, especialmente para fines de semana.' },
  'faq.2.q': { en: 'What areas do you serve?', es: '¿Qué áreas cubren?' },
  'faq.2.a': { en: 'We serve the greater metropolitan area and surrounding suburbs. Contact us for specific location availability.', es: 'Servimos el área metropolitana y suburbios circundantes. Contáctanos para disponibilidad de ubicaciones específicas.' },
  'faq.3.q': { en: 'How long are the party packages?', es: '¿Cuánto duran los paquetes de fiesta?' },
  'faq.3.a': { en: 'Our standard packages are 1-2 hours, but we can customize the duration based on your needs.', es: 'Nuestros paquetes estándar son de 1-2 horas, pero podemos personalizar la duración según tus necesidades.' },
  'faq.4.q': { en: 'Do you provide costumes and props?', es: '¿Proporcionan disfraces y accesorios?' },
  'faq.4.a': { en: 'Yes! All our performers come fully equipped with professional costumes, props, and materials for activities.', es: '¡Sí! Todos nuestros artistas vienen completamente equipados con disfraces profesionales, accesorios y materiales para actividades.' },

  // Footer
  'footer.tagline': { en: 'Creating magical memories for children\'s celebrations since 2015.', es: 'Creando recuerdos mágicos para celebraciones infantiles desde 2015.' },
  'footer.quicklinks': { en: 'Quick Links', es: 'Enlaces Rápidos' },
  'footer.contact': { en: 'Contact Us', es: 'Contáctanos' },
  'footer.followus': { en: 'Follow Us', es: 'Síguenos' },
  'footer.copyright': { en: '© 2024 Caroline Party. All rights reserved.', es: '© 2024 Caroline Party. Todos los derechos reservados.' },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
