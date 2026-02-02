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
  'nav.pricing': { en: 'Pricing', es: 'Precios' },
  'nav.about': { en: 'About', es: 'Nosotros' },
  'nav.contact': { en: 'Contact', es: 'Contacto' },
  'nav.gallery': { en: 'Gallery', es: 'Galería' },
  'nav.gallery.entertainers': { en: 'Entertainers', es: 'Animadores' },
  'nav.gallery.characters': { en: 'Characters', es: 'Personajes' },
  'nav.gallery.facePainting': { en: 'Face Painting', es: 'Pinta Caritas' },
  'nav.gallery.balloons': { en: 'Balloon Artists', es: 'Artistas de Globos' },
  'nav.gallery.shows': { en: 'Shows', es: 'Shows' },
  'nav.gallery.specialCharacters': { en: 'Special Characters', es: 'Personajes Especiales' },
  
  // Hero
  'hero.brand': { en: 'Caroline Party', es: 'Caroline Party' },
  'hero.taglineShort': { en: 'Magical Kids Parties', es: 'Fiestas Mágicas' },
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

  // Additional characters for gallery
  'character.sleeping.name': { en: 'Sleeping Princess', es: 'Princesa Durmiente' },
  'character.sleeping.desc': { en: 'A dreamy princess who brings gentle magic and sweet fairy-tale moments.', es: 'Una princesa soñadora que trae magia suave y momentos de cuento de hadas.' },

  'character.bookish.name': { en: 'Bookish Princess', es: 'Princesa Lectora' },
  'character.bookish.desc': { en: 'A princess who loves books, stories, and sharing fairy-tale adventures.', es: 'Una princesa que ama los libros, los cuentos y compartir aventuras de cuentos de hadas.' },

  'character.royal.name': { en: 'Royal Princess', es: 'Princesa Real' },
  'character.royal.desc': { en: 'A classic royal princess perfect for elegant, storybook celebrations.', es: 'Una princesa real clásica, ideal para celebraciones elegantes de cuento.' },

  'character.cowgirl.name': { en: 'Cowgirl Hero', es: 'Heroína Vaquera' },
  'character.cowgirl.desc': { en: 'A fun cowgirl who brings western charm, dances, and playful energy.', es: 'Una vaquera divertida que trae encanto del oeste, bailes y energía juguetona.' },

  'character.easterBunny.name': { en: 'Easter Bunny', es: 'Conejo de Pascua' },
  'character.easterBunny.desc': { en: 'A friendly bunny perfect for spring celebrations and photo moments.', es: 'Un conejo amistoso perfecto para celebraciones de primavera y momentos de fotos.' },

  'character.popStar.name': { en: 'Pop Star', es: 'Estrella Pop' },
  'character.popStar.desc': { en: 'A sparkling pop performer who loves singing, dancing, and posing for photos.', es: 'Una estrella pop brillante que ama cantar, bailar y posar para fotos.' },

  'character.sharkMascot.name': { en: 'Shark Mascot', es: 'Mascota Tiburón' },
  'character.sharkMascot.desc': { en: 'A cheerful shark mascot great for silly dances and ocean-themed fun.', es: 'Una alegre mascota tiburón ideal para bailes divertidos y fiestas temáticas del mar.' },

  'character.monsterTrainer.name': { en: 'Monster Trainer', es: 'Entrenador de Monstruos' },
  'character.monsterTrainer.desc': { en: 'An energetic trainer who loves adventures with friendly little monsters.', es: 'Un entrenador lleno de energía que ama las aventuras con pequeños monstruos amistosos.' },

  'character.speedyHero.name': { en: 'Speedy Hero', es: 'Héroe Veloz' },
  'character.speedyHero.desc': { en: 'A fast and playful hero who races into parties with high energy.', es: 'Un héroe rápido y juguetón que llega a las fiestas con mucha energía.' },

  'character.adventurePlumber.name': { en: 'Adventure Plumber', es: 'Plomero Aventurero' },
  'character.adventurePlumber.desc': { en: 'A cheerful hero who jumps into action for fun, game-inspired adventures.', es: 'Un héroe alegre que salta a la acción para aventuras divertidas inspiradas en juegos.' },

  'character.spaceDuo.name': { en: 'Space Villain & Space Princess', es: 'Villano Espacial y Princesa Espacial' },
  'character.spaceDuo.desc': { en: 'A dramatic space duo perfect for intergalactic photo moments.', es: 'Un dúo espacial dramático, perfecto para momentos de fotos intergalácticos.' },

  'character.warriorHeroine.name': { en: 'Warrior Heroine', es: 'Heroína Guerrera' },
  'character.warriorHeroine.desc': { en: 'A strong and brave heroine who brings heroic poses and powerful energy.', es: 'Una heroína fuerte y valiente que trae poses heroicas y energía poderosa.' },

  'character.webHero.name': { en: 'Web Hero', es: 'Héroe de la Telaraña' },
  'character.webHero.desc': { en: 'A quick, wall-climbing hero who loves action poses and fun photo moments.', es: 'Un héroe veloz que trepa muros y ama las poses de acción y los momentos divertidos de foto.' },

  'character.bluePup.name': { en: 'Blue Pup', es: 'Perrito Azul' },
  'character.bluePup.desc': { en: 'A playful blue pup perfect for younger kids and cozy photo time.', es: 'Un perrito azul juguetón, perfecto para niños pequeños y momentos de fotos tiernos.' },

  'character.friendlyMonster.name': { en: 'Friendly Monster', es: 'Monstruo Amigable' },
  'character.friendlyMonster.desc': { en: 'A cuddly, colorful monster who brings smiles and silly fun.', es: 'Un monstruo colorido y abrazable que trae sonrisas y diversión chistosa.' },

  'character.toddlerFriends.name': { en: 'Nursery Friends', es: 'Amigos de la Guardería' },
  'character.toddlerFriends.desc': { en: 'Bright, playful friends perfect for toddler parties and first birthdays.', es: 'Amigos coloridos y juguetones, perfectos para fiestas de niños pequeños y primeros cumpleaños.' },

  'character.islandPrincess.name': { en: 'Island Princess', es: 'Princesa de la Isla' },
  'character.islandPrincess.desc': { en: 'An adventurous island princess who loves beaches, music, and sunsets.', es: 'Una princesa de la isla aventurera que ama las playas, la música y los atardeceres.' },

  'character.flowerSister.name': { en: 'Flower Sister', es: 'Hermana de las Flores' },
  'character.flowerSister.desc': { en: 'A floral-themed sister who brings colorful, garden-inspired magic.', es: 'Una hermana de temática floral que trae magia colorida inspirada en el jardín.' },

  'character.desertPrincess.name': { en: 'Desert Princess', es: 'Princesa del Desierto' },
  'character.desertPrincess.desc': { en: 'A desert princess who loves starry nights, markets, and magic carpets.', es: 'Una princesa del desierto que ama las noches estrelladas, los mercados y la magia de los cuentos.' },

  'character.joyfulHeroine.name': { en: 'Joyful Heroine', es: 'Heroína Alegre' },
  'character.joyfulHeroine.desc': { en: 'A bright, joyful heroine who fills the party with smiles and color.', es: 'Una heroína brillante y alegre que llena la fiesta de sonrisas y color.' },

  'character.peachPrincess.name': { en: 'Peach Princess', es: 'Princesa Durazno' },
  'character.peachPrincess.desc': { en: 'A sweet princess inspired by soft colors, crowns, and royal parties.', es: 'Una princesa dulce inspirada en colores suaves, coronas y fiestas reales.' },

  'character.pirateDaughter.name': { en: 'Pirate Daughter', es: 'Hija Pirata' },
  'character.pirateDaughter.desc': { en: 'A bold pirate daughter ready for nautical adventures and treasure fun.', es: 'Una hija pirata valiente lista para aventuras náuticas y diversión con tesoros.' },

  'character.stagePerformer.name': { en: 'Stage Pop Performer', es: 'Artista Pop de Escenario' },
  'character.stagePerformer.desc': { en: 'A colorful pop performer who loves microphones, music, and dancing.', es: 'Una artista pop colorida que ama el micrófono, la música y el baile.' },

  'character.groovyFriend.name': { en: 'Groovy Friend', es: 'Amigo Sesentero' },
  'character.groovyFriend.desc': { en: 'A retro, groovy friend who brings colorful, peace-and-love vibes.', es: 'Un amigo retro y alegre que trae vibras coloridas de paz y amor.' },

  // About
  'about.title': { en: 'About Caroline Party', es: 'Sobre Caroline Party' },
  'about.story.title': { en: 'Our Story', es: 'Nuestra Historia' },
  'about.story.p1': {
    en: 'Caroline Party was born from a deeply personal dream. In loving memory of Caroline, a cherished sister and daughter, Diana and Rosa set out to create something meaningful—an entertainment company dedicated to bringing joy, laughter, and magical moments to children and families.',
    es: 'Caroline Party nació de un sueño profundamente personal. En amorosa memoria de Caroline, una hermana e hija muy querida, Diana y Rosa decidieron crear algo significativo: una compañía de entretenimiento dedicada a llevar alegría, risas y momentos mágicos a niños y familias.',
  },
  'about.story.p2': {
    en: 'What began as a heartfelt tribute quickly grew into a passion-driven project rooted in love, creativity, and connection. In the early years, Caroline Party was small and hands-on, growing organically through word of mouth and the trust of families who believed in our vision.',
    es: 'Lo que comenzó como un homenaje lleno de amor pronto se convirtió en un proyecto impulsado por la pasión, la creatividad y la conexión humana. En sus primeros años, Caroline Party era pequeño y muy cercano, creciendo de manera orgánica gracias al boca a boca y a la confianza de las familias que creyeron en nuestra visión.',
  },
  'about.story.p3': {
    en: 'Over time, that dedication turned into something much bigger. Today, Caroline Party is proud to work with a large, talented team of professional entertainers, performers, and artists who share one mission: making every child feel celebrated and special.',
    es: 'Con el tiempo, esa dedicación se transformó en algo mucho más grande. Hoy, Caroline Party cuenta con un amplio y talentoso equipo de animadores, artistas y performers profesionales que comparten una misma misión: hacer que cada niño se sienta celebrado y especial.',
  },
  'about.story.p4': {
    en: 'With thousands of parties and happy families behind us, we bring not only magic—but experience, reliability, and heart—to every event we’re part of. From birthdays and holidays to schools and community celebrations, we understand what it takes to create moments children will remember forever.',
    es: 'Con miles de fiestas y familias felices a lo largo de nuestra historia, ofrecemos no solo magia, sino también experiencia, compromiso y corazón en cada evento del que formamos parte. Desde cumpleaños y celebraciones especiales hasta escuelas y eventos comunitarios, sabemos cómo crear recuerdos que los niños atesorarán para siempre.',
  },
  'about.story.p5': {
    en: 'At Caroline Party, every celebration is personal. Every smile matters. And every event is another chance to honor Caroline’s legacy by spreading happiness—one party at a time.',
    es: 'En Caroline Party, cada celebración es personal. Cada sonrisa importa. Y cada evento es una nueva oportunidad para honrar el legado de Caroline compartiendo felicidad—una fiesta a la vez.',
  },
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
  'contact.serviceType': { en: 'Service Type', es: 'Tipo de Servicio' },
  'contact.serviceType.placeholder': { en: 'Select a service...', es: 'Selecciona un servicio...' },
  'contact.serviceType.entertainers': { en: 'Entertainers', es: 'Animadores' },
  'contact.serviceType.balloonMaking': { en: 'Balloon Making', es: 'Globoflexia' },
  'contact.serviceType.facePainter': { en: 'Face Painter', es: 'Pintacaritas' },
  'contact.serviceType.characters': { en: 'Characters', es: 'Personajes' },
  'contact.serviceType.shows': { en: 'Shows', es: 'Shows' },
  'contact.serviceType.mobileSpa': { en: 'Mobile Spa', es: 'Spa Móvil' },
  'contact.preferredDate': { en: 'Preferred Party Date', es: 'Fecha Preferida de la Fiesta' },
  'contact.error.serviceType': { en: 'Please select a service type', es: 'Por favor selecciona un tipo de servicio' },
  'contact.error.preferredDate': { en: 'Please select a preferred date', es: 'Por favor selecciona una fecha preferida' },
  'contact.email.placeholder': { en: 'youremail.com', es: 'tucorreo.com' },
  'contact.phone.placeholder': { en: '(123) 456-7890', es: '(123) 456-7890' },

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
  'faq.1.a': { 
    en: 'You can book at any time, but we recommend reaching out at least 1 week before your event for the best availability. We can sometimes accommodate last-minute requests (as little as 2–3 days in advance) depending on scheduling, but availability isn’t guaranteed.', 
    es: 'Puedes reservar en cualquier momento, pero te recomendamos contactarnos con al menos 1 semana de anticipación para tener mejor disponibilidad. A veces podemos aceptar solicitudes de última hora (con tan solo 2–3 días de anticipación) según nuestra agenda, pero la disponibilidad no está garantizada.' 
  },
  'faq.2.q': { en: 'What areas do you serve?', es: '¿Qué áreas cubren?' },
  'faq.2.a': { 
    en: 'We currently serve Miami-Dade and Broward. Events outside these areas may be possible on a case-by-case basis, but typically require more advance notice and may include an additional travel fee.', 
    es: 'Actualmente trabajamos en Miami-Dade y Broward. Los eventos fuera de estas áreas pueden ser posibles caso por caso, pero normalmente requieren más anticipación y pueden incluir un costo adicional de traslado.' 
  },
  'faq.3.q': { en: 'How long are your services?', es: '¿Cuánto duran sus servicios?' },
  'faq.3.a': { 
    en: 'Most services are booked for 1 hour. You can request an additional hour, and in some cases it can even be extended during the event—however, extending last-minute depends on the performer’s schedule. For the best chance of availability, we recommend booking extra time in advance.', 
    es: 'La mayoría de nuestros servicios se reservan por 1 hora. Puedes pedir una hora adicional y, en algunos casos, incluso se puede extender durante el evento; sin embargo, extender a último momento depende del horario del artista. Para tener mayor seguridad de disponibilidad, te recomendamos reservar el tiempo extra por adelantado.' 
  },
  'faq.4.q': { en: 'What’s included with a booking?', es: '¿Qué está incluido en la reserva?' },
  'faq.4.a': { 
    en: 'It depends on the service. For entertainers, we typically bring the activities/games, a speaker + microphone, and everything needed to run the experience. For characters and specialty services (face painting, balloon art, shows, etc.), our team arrives with the appropriate materials and equipment required for the service you selected.', 
    es: 'Depende del servicio. Para animadores, normalmente llevamos las actividades y juegos, un parlante con micrófono y todo lo necesario para dirigir la experiencia. Para personajes y servicios especiales (pinta caritas, globoflexia, shows, etc.), nuestro equipo llega con los materiales y el equipo apropiado para el servicio que elegiste.' 
  },

  // Footer
  'footer.tagline': { en: 'Creating magical memories for children\'s celebrations since 2015.', es: 'Creando recuerdos mágicos para celebraciones infantiles desde 2015.' },
  'footer.quicklinks': { en: 'Quick Links', es: 'Enlaces Rápidos' },
  'footer.contact': { en: 'Contact Us', es: 'Contáctanos' },
  'footer.followus': { en: 'Follow Us', es: 'Síguenos' },
  'footer.email': { en: 'carolinepartyflorida@gmail.com', es: 'carolinepartyflorida@gmail.com' },
  'footer.phone': { en: '+1 (786) 925-5979', es: '+1 (786) 925-5979' },
  'footer.copyright': { en: '© 2026 Caroline Party. All rights reserved.', es: '© 2026 Caroline Party. Todos los derechos reservados.' },

  // Gallery
  'gallery.title': { en: 'Gallery', es: 'Galería' },
  'gallery.subtitle': { en: 'Browse our work and get inspired for your next celebration!', es: '¡Explora nuestro trabajo e inspírate para tu próxima celebración!' },
  'gallery.bookService': { en: 'Book This Service', es: 'Reservar Este Servicio' },
  'gallery.backToPricing': { en: 'Back to Pricing', es: 'Volver a Precios' },
  'gallery.placeholder': { en: 'More photos coming soon!', es: '¡Más fotos próximamente!' },
  'gallery.loadError': { en: 'Could not load photos.', es: 'No se pudieron cargar las fotos.' },
  'gallery.previousImage': { en: 'Previous image', es: 'Imagen anterior' },
  'gallery.nextImage': { en: 'Next image', es: 'Siguiente imagen' },
 
  // Home services cards (new structure)
  'services.modal.cta': { en: 'See all services', es: 'Ver todos los servicios' },
  'services.modal.cta.characters': { en: 'View Characters', es: 'Ver Personajes' },
  'services.modal.cta.book': { en: 'Book / Get a Quote', es: 'Reservar / Cotizar' },
  
  'service.entertainment.title': { en: 'Entertainment', es: 'Entretenimiento' },
  'service.entertainment.short': { en: 'Entertainers who bring the party to life with games and fun activities.', es: 'Animadores que llenan la fiesta de juegos y diversión.' },
  'service.entertainment.long': { en: 'Choose entertainers from our theme options inspired by popular movies, shows, and more.', es: 'Puedes pedir animadores de nuestros temas disponibles inspirados en películas, shows y más.' },
  'service.entertainment.details': {
    en: 'A professional entertainer leads the party with age-appropriate games, dances, and interactive activities tailored to your theme. Standard bookings are for 1 hour and include a portable speaker, microphone, and all materials for the activities planned. You can add extra time or additional entertainers for larger groups or more complex events. We recommend a clear area for games and access to a power outlet for the sound system.',
    es: 'Un animador profesional dirige la fiesta con juegos, bailes y actividades interactivas adaptadas a la edad y al tema que elijas. Las reservas estándar son de 1 hora e incluyen parlante portátil, micrófono y todos los materiales necesarios para las dinámicas. Puedes agregar tiempo extra o animadores adicionales para grupos grandes o eventos más complejos. Recomendamos un área despejada para los juegos y acceso a un tomacorriente para el sonido.',
  },
  
  'service.characters.title': { en: 'Characters', es: 'Personajes' },
  'service.characters.short': { en: 'Characters kids can interact with, dance with, and take pictures with.', es: 'Personajes con los que los niños pueden interactuar, bailar y tomarse fotos.' },
  'service.characters.long': { en: 'Characters don’t host the party. They focus on simple interactions like dancing and photo moments—perfect for themed pictures.', es: 'Los personajes no animan ni conducen la fiesta. Hacen interacciones simples como bailar y tomarse fotos—ideales para fotos temáticas.' },
  'service.characters.details': {
    en: 'Our characters are perfect for meet-and-greet moments, photo sessions, and simple interactions like dancing or helping with the cake song. They do not host or run the full party; instead, they create magical, focused moments within your event. Typical visits last around 45–60 minutes, which can include a grand entrance, photo time, and a special moment around the cake. We recommend scheduling the character to arrive once most guests are present.',
    es: 'Nuestros personajes son ideales para momentos de fotos, saludos y pequeñas interacciones como bailar o acompañar en la canción del pastel. No animan ni conducen toda la fiesta; se enfocan en crear momentos mágicos y puntuales dentro del evento. Las visitas suelen durar entre 45 y 60 minutos, incluyendo entrada especial, tiempo de fotos y un momento especial alrededor del pastel. Recomendamos coordinar la llegada del personaje cuando ya estén la mayoría de los invitados.',
  },
  
  'service.facePainters.title': { en: 'Face Painters', es: 'Pinta Caritas' },
  'service.facePainters.short': { en: 'Transform kids into their favorite characters with professional, safe face painting artistry.', es: 'Transforma a los niños en sus personajes favoritos con arte profesional y seguro de pintacaritas.' },
  'service.facePainters.long': { en: 'Our face painters offer a wide variety of designs for kids to choose from, and sometimes can take a custom request. About 20 faces per hour.', es: 'Nuestros pinta caritas tienen una gran variedad de diseños para elegir y, a veces, pueden aceptar pedidos personalizados. Aproximadamente 20 caritas por hora.' },
  'service.facePainters.details': {
    en: 'A trained face painter arrives with professional, skin-safe paints and brushes, offering a menu of popular designs plus a few custom requests when time allows. One painter can usually paint up to 18–20 kids per hour, depending on the complexity of the designs. We recommend providing a small table and two chairs in a shaded or indoor area so kids are comfortable. Face painting is not recommended for children with active skin conditions or allergies around the face.',
    es: 'Un pinta caritas profesional llega con pinturas y materiales seguros para la piel, ofreciendo un menú de diseños populares y algunos pedidos personalizados cuando el tiempo lo permite. Un artista puede pintar normalmente entre 18 y 20 niños por hora, según la complejidad de los diseños. Recomendamos tener una mesa pequeña y dos sillas en un área techada o interior para la comodidad de los niños. No se recomienda pintar a niños con irritaciones de piel activas o alergias en la cara.',
  },
  
  'service.balloonArtists.title': { en: 'Balloon Artists', es: 'Artistas de Globos' },
  'service.balloonArtists.short': { en: 'Fun and colorful balloon sculptures to add more joy and memories to your party.', es: 'Figuras de globos divertidas y coloridas para sumar alegría y recuerdos a tu fiesta.' },
  'service.balloonArtists.long': { en: 'Kids can choose from a set of simple, fun balloon options. We also offer more specialized designs for an additional price.', es: 'Los niños pueden elegir entre opciones simples y divertidas. También ofrecemos diseños más especializados por un costo adicional.' },
  'service.balloonArtists.details': {
    en: 'Our balloon artists twist fun, kid-friendly designs like swords, animals, flowers, and more using high-quality balloons. On average, one artist can serve about 20–25 kids per hour with simple designs; more elaborate creations may reduce that number. We recommend a small area for the line so kids can wait safely and comfortably. Balloons are best for children old enough to handle them safely and are not recommended for kids who may chew or bite the latex.',
    es: 'Nuestros artistas de globos crean figuras divertidas como espadas, animalitos, flores y más usando globos de alta calidad. En promedio, un artista puede atender alrededor de 20 a 25 niños por hora con diseños sencillos; las figuras más elaboradas pueden reducir ese número. Recomendamos destinar un pequeño espacio para la fila, de forma que los niños puedan esperar seguros y cómodos. Los globos son ideales para niños que ya los manejan con cuidado y no se recomienda para quienes tienden a morder o masticar el látex.',
  },
  
  'service.shows.title': { en: 'Shows', es: 'Shows' },
  'service.shows.short': { en: 'Starting with 2 characters from the same universe, we guide guests through a themed adventure—Caroline style!', es: 'Desde 2 personajes del mismo universo, llevamos a todos por una aventura temática—¡al estilo Caroline!' },
  'service.shows.long': { en: 'We offer multiple themed shows (mostly inspired by movies) where 2 to 4 entertainers act, dance, and perform to music in a prepared storyline.', es: 'Tenemos varios shows temáticos (principalmente de películas) donde 2 a 4 animadores actúan, bailan y presentan con música siguiendo una historia preparada.' },
  'service.shows.details': {
    en: 'Our themed shows feature 2–4 performers from the same universe acting, dancing, and guiding kids through a prepared storyline with music. Shows typically run 40–60 minutes and work best when kids can sit or gather in front of a small “stage” area. We bring the sound system and any small props needed for the performance. For the best experience, we recommend minimizing other noise (like bounce houses or loud music) during the show time.',
    es: 'Nuestros shows temáticos cuentan con 2 a 4 artistas del mismo universo que actúan, bailan y llevan a los niños por una historia preparada con música. Normalmente duran entre 40 y 60 minutos y funcionan mejor cuando los niños pueden sentarse o reunirse frente a un área tipo “escenario”. Nosotros llevamos el sonido y los accesorios pequeños necesarios para la presentación. Para una mejor experiencia, recomendamos reducir otros ruidos (como inflables o música muy alta) durante el tiempo del show.',
  },
  
  'service.santa.title': { en: 'Special Character: Santa!', es: 'Personaje Especial: ¡Santa!' },
  'service.santa.short': { en: 'Invite Santa to your kids’ party or event for a special holiday moment to remember!', es: '¡Invita a Santa a tu fiesta o evento para un momento navideño inolvidable!' },
  'service.santa.long': { en: 'Our Santa cast is professional and dedicated to creating a magical experience for every child.', es: 'Nuestro elenco de Santas es profesional y está dedicado a crear una experiencia mágica para cada niño.' },
  'service.santa.details': {
    en: 'Santa visits are designed for holiday magic: greetings, photos, and a warm, family-friendly interaction with each child. A typical visit can include a grand entrance, story time or a short message, and support handing out gifts you provide. Visits are usually 30–60 minutes depending on the number of children and activities planned. We recommend a comfortable spot for photos and, if possible, a chair or special seat for Santa.',
    es: 'Las visitas de Santa están pensadas para crear magia navideña: saludos, fotos y una interacción cálida y familiar con cada niño. La visita puede incluir una entrada especial, un cuento corto o mensaje navideño y ayuda para entregar regalos que tú proporciones. Normalmente duran entre 30 y 60 minutos, según la cantidad de niños y actividades planeadas. Recomendamos preparar un lugar cómodo para las fotos y, si es posible, una silla especial para Santa.',
  },
 
  // Pricing
  'pricing.title': { en: 'Our Pricing', es: 'Nuestros Precios' },
  'pricing.subtitle': { en: 'Transparent pricing for unforgettable celebrations. All packages can be customized to fit your needs!', es: '¡Precios transparentes para celebraciones inolvidables. Todos los paquetes pueden personalizarse según tus necesidades!' },
  'pricing.startingAt': { en: 'Starting at', es: 'Desde' },
  'pricing.from': { en: 'From', es: 'Desde' },
  'pricing.perSession': { en: 'per session', es: 'por sesión' },
  'pricing.bookNow': { en: 'Book Now', es: 'Reservar Ahora' },
  'pricing.viewGallery': { en: 'View Gallery', es: 'Ver Galería' },
  'pricing.contactForQuote': { en: 'Contact us for a custom quote', es: 'Contáctanos para una cotización personalizada' },
  'pricing.note': { en: 'Note', es: 'Nota' },
  // Not Found
  'notfound.message': { en: 'Oops! Page not found', es: '¡Ups! Página no encontrada' },
  'notfound.return_home': { en: 'Return to Home', es: 'Volver al inicio' },
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
