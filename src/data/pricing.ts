/**
 * Simplified pricing data structure for Caroline Party services.
 * One item per service category, with gallery links.
 * All prices are placeholders and should be adjusted to actual values.
 */

export type Language = 'en' | 'es';

/**
 * Bilingual text object for name, description, and optional note.
 */
export interface BilingualText {
  en: string;
  es: string;
}

/**
 * Service category identifiers.
 */
export type ServiceCategory = 
  | 'characters'
  | 'balloon'
  | 'entertainers'
  | 'facePainting'
  | 'shows'
  | 'mobileSpa';

/**
 * Pricing can be a single starting price or a range (min-max).
 */
export type PricingType = 
  | { type: 'starting'; basePrice: number }
  | { type: 'range'; minPrice: number; maxPrice: number };

/**
 * A service pricing item - one per category.
 */
export interface ServicePricing {
  /** Unique identifier matching the category */
  id: ServiceCategory;
  /** Bilingual name of the service category */
  name: BilingualText;
  /** Pricing information - single price or range */
  pricing: PricingType;
  /** Bilingual short description */
  description: BilingualText;
  /** Optional bilingual note (e.g., "Price varies by duration") */
  note?: BilingualText;
  /** Route path to the gallery page for this service */
  galleryPath: string;
}

/**
 * All service pricing - exactly one item per category.
 * TODO: adjust price values to actual rates.
 */
export const servicePricing: ServicePricing[] = [
  // ============================================
  // CHARACTERS
  // ============================================
  {
    id: 'characters',
    name: { en: 'Characters', es: 'Personajes' },
    pricing: { type: 'starting', basePrice: 175 }, // TODO: adjust price
    description: {
      en: 'Bring beloved characters to life at your party with magical princess visits, superhero appearances, and enchanting performances.',
      es: 'Da vida a personajes queridos en tu fiesta con visitas mágicas de princesas, apariciones de superhéroes y actuaciones encantadoras.',
    },
    note: {
      en: 'Price varies by character and duration (1-2 hours).',
      es: 'El precio varía según el personaje y la duración (1-2 horas).',
    },
    galleryPath: '/gallery/characters',
  },

  // ============================================
  // BALLOON MAKING
  // ============================================
  {
    id: 'balloon',
    name: { en: 'Balloon Making', es: 'Globoflexia' },
    pricing: { type: 'starting', basePrice: 125 }, // TODO: adjust price
    description: {
      en: 'Amazing balloon sculptures, twisting creations, and custom decorations that add color and excitement to any party.',
      es: 'Increíbles esculturas de globos, creaciones de globoflexia y decoraciones personalizadas que añaden color y emoción a cualquier fiesta.',
    },
    note: {
      en: 'Includes balloon twisting for up to 15 kids. Additional time and decorations available.',
      es: 'Incluye globoflexia para hasta 15 niños. Tiempo adicional y decoraciones disponibles.',
    },
    galleryPath: '/gallery/balloons',
  },

  // ============================================
  // ENTERTAINERS
  // ============================================
  {
    id: 'entertainers',
    name: { en: 'Entertainers', es: 'Animadores' },
    pricing: { type: 'starting', basePrice: 175 }, // TODO: adjust price
    description: {
      en: 'Professional party hosts, DJs, and clowns who coordinate games, activities, and keep the fun going all day.',
      es: 'Anfitriones de fiestas profesionales, DJs y payasos que coordinan juegos, actividades y mantienen la diversión todo el día.',
    },
    note: {
      en: 'Standard packages are 2 hours. Custom duration available.',
      es: 'Los paquetes estándar son de 2 horas. Duración personalizada disponible.',
    },
    galleryPath: '/gallery/entertainers',
  },

  // ============================================
  // FACE PAINTING
  // ============================================
  {
    id: 'facePainting',
    name: { en: 'Face Painting', es: 'Pintacaritas' },
    pricing: { type: 'starting', basePrice: 125 }, // TODO: adjust price
    description: {
      en: 'Professional face painting with safe, hypoallergenic paints. Transform kids into their favorite characters!',
      es: 'Pintacaritas profesional con pinturas seguras e hipoalergénicas. ¡Transforma a los niños en sus personajes favoritos!',
    },
    note: {
      en: 'Approximately 8-12 faces per hour.',
      es: 'Aproximadamente 8-12 caras por hora.',
    },
    galleryPath: '/gallery/face-painting',
  },

  // ============================================
  // SHOWS (Price Range)
  // ============================================
  {
    id: 'shows',
    name: { en: 'Shows', es: 'Shows' },
    pricing: { type: 'range', minPrice: 200, maxPrice: 300 }, // TODO: adjust price
    description: {
      en: 'Magical performances including magic shows, puppet theater, and science experiments that captivate and amaze.',
      es: 'Actuaciones mágicas que incluyen shows de magia, teatro de títeres y experimentos de ciencia que cautivan y asombran.',
    },
    note: {
      en: '30-45 minute shows with audience participation. Birthday child is the star!',
      es: 'Shows de 30-45 minutos con participación del público. ¡El cumpleañero es la estrella!',
    },
    galleryPath: '/gallery/shows',
  },

  // ============================================
  // MOBILE SPA (Price Range)
  // ============================================
  {
    id: 'mobileSpa',
    name: { en: 'Mobile Spa', es: 'Spa Móvil' },
    pricing: { type: 'range', minPrice: 250, maxPrice: 400 }, // TODO: adjust price
    description: {
      en: 'Pampering spa experiences for kids including mini manicures, pedicures, facials, and glamour packages.',
      es: 'Experiencias de spa consentidoras para niños incluyendo mini manicuras, pedicuras, tratamientos faciales y paquetes de glamour.',
    },
    note: {
      en: 'Packages available for 6-10 kids. Spa robes and party favors included in deluxe options.',
      es: 'Paquetes disponibles para 6-10 niños. Batas de spa y recuerdos de fiesta incluidos en opciones deluxe.',
    },
    galleryPath: '/gallery/mobile-spa',
  },
];

/**
 * Get a service pricing item by ID.
 */
export function getServiceById(id: ServiceCategory): ServicePricing | undefined {
  return servicePricing.find((item) => item.id === id);
}

/**
 * Get the localized text from a BilingualText object.
 */
export function getLocalizedText(text: BilingualText, language: Language): string {
  return text[language];
}

/**
 * Format pricing for display based on type.
 * Returns a formatted string like "$175" or "$200–$300"
 */
export function formatPricing(pricing: PricingType): string {
  if (pricing.type === 'starting') {
    return `$${pricing.basePrice}`;
  }
  return `$${pricing.minPrice}–$${pricing.maxPrice}`;
}

/**
 * Check if pricing is a range type.
 */
export function isPriceRange(pricing: PricingType): pricing is { type: 'range'; minPrice: number; maxPrice: number } {
  return pricing.type === 'range';
}
