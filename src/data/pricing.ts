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
  // ENTERTAINERS
  // ============================================
  {
    id: 'entertainers',
    name: { en: 'Entertainers', es: 'Animadores' },
    pricing: { type: 'starting', basePrice: 220 },
    description: {
      en: 'Professional party entertainers who host games, lead activities, interact with kids, and keep the energy high throughout the event.',
      es: 'Animadores de fiesta profesionales que dirigen juegos, lideran actividades, interactúan con los niños y mantienen la energía alta durante todo el evento.',
    },
    note: {
      en: 'Ideal for birthdays and events that need structured fun and crowd engagement.',
      es: 'Ideal para cumpleaños y eventos que necesitan diversión estructurada y manejo de grupos.',
    },
    galleryPath: '/gallery/entertainers',
  },

  // ============================================
  // CHARACTERS
  // ============================================
  {
    id: 'characters',
    name: { en: 'Characters', es: 'Personajes' },
    pricing: { type: 'starting', basePrice: 180 },
    description: {
      en: 'Costumed character appearances that bring beloved themes to life through interaction, photos, and magical moments.',
      es: 'Apariciones de personajes disfrazados que dan vida a los temas favoritos mediante interacción, fotos y momentos mágicos.',
    },
    note: {
      en: 'Character availability may vary. Additional time can be added when booked in advance.',
      es: 'La disponibilidad de personajes puede variar. Se puede agregar tiempo adicional si se reserva con anticipación.',
    },
    galleryPath: '/gallery/characters',
  },

  // ============================================
  // BALLOON MAKING
  // ============================================
  {
    id: 'balloon',
    name: { en: 'Balloon Artists', es: 'Artistas de Globos' },
    pricing: { type: 'starting', basePrice: 160 },
    description: {
      en: 'Balloon twisting and custom balloon creations that add color, excitement, and interactive fun to any party.',
      es: 'Figuras y creaciones personalizadas con globos que añaden color, emoción y diversión interactiva a cualquier fiesta.',
    },
    note: {
      en: 'More complex designs may affect the total number of balloons created.',
      es: 'Los diseños más complejos pueden afectar la cantidad total de globos realizados.',
    },
    galleryPath: '/gallery/balloons',
  },

  // ============================================
  // FACE PAINTING
  // ============================================
  {
    id: 'facePainting',
    name: { en: 'Face Painting', es: 'Pintacaritas' },
    pricing: { type: 'starting', basePrice: 160 },
    description: {
      en: 'Professional face painting using safe, hypoallergenic paints. Perfect for transforming kids into fun and colorful designs.',
      es: 'Pintacaritas profesional con pinturas seguras e hipoalergénicas. Perfecto para transformar a los niños en diseños divertidos y coloridos.',
    },
    note: {
      en: 'Approximately 25-30 faces per hour, depending on design complexity.',
      es: 'Aproximadamente de 25 a 30 caritas por hora, según la complejidad del diseño.',
    },
    galleryPath: '/gallery/face-painting',
  },

  // ============================================
  // SHOWS (Price Range)
  // ============================================
  {
    id: 'shows',
    name: { en: 'Shows', es: 'Shows' },
    pricing: { type: 'starting', basePrice: 550 },
    description: {
      en: 'High-energy shows including magic, themed performances, and interactive entertainment designed to captivate and amaze audiences.',
      es: 'Shows de alta energía que incluyen magia, presentaciones temáticas y entretenimiento interactivo diseñado para cautivar y sorprender al público.',
    },
    note: {
      en: 'Base price includes two character entertainers and one assistant. Final pricing may vary depending on show type and number of characters.',
      es: 'El precio base incluye dos personajes animadores y un asistente. El precio final puede variar según el tipo de show y la cantidad de personajes.',
    },
    galleryPath: '/gallery/shows',
  },

  // ============================================
  // MOBILE SPA (Price Range)
  // ============================================
  {
    id: 'mobileSpa',
    name: { en: 'Special Characters (Santa)', es: 'Personajes Especiales (Santa)' },
    pricing: { type: 'starting', basePrice: 250 },
    description: {
      en: 'A classic and festive Santa character experience, perfect for holiday parties, photos, and memorable interactions.',
      es: 'Una experiencia clásica y festiva con Santa, perfecta para fiestas navideñas, fotos y momentos inolvidables.',
    },
    note: {
      en: 'Seasonal availability. Advance booking is highly recommended.',
      es: 'Disponibilidad de temporada. Se recomienda reservar con anticipación.',
    },
    galleryPath: '/gallery/special-characters',
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
