import { useCallback, useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ChevronLeft, ChevronRight, ImageIcon } from 'lucide-react';
import { 
  servicePricing, 
  getLocalizedText,
  type ServicePricing,
} from '@/data/pricing';
import { Dialog, DialogContent } from '@/components/ui/dialog';

/**
 * Map URL slugs to service IDs.
 * This allows for URL-friendly paths like /gallery/face-painting
 */
const slugToServiceId: Record<string, string> = {
  characters: 'characters',
  balloons: 'balloon',
  entertainers: 'entertainers',
  'face-painting': 'facePainting',
  shows: 'shows',
  'special-characters': 'mobileSpa',
  // Legacy alias for backwards compatibility; handled via redirect below.
  'mobile-spa': 'mobileSpa',
};

/**
 * Placeholder images for each category.
 * TODO: Replace with actual gallery images.
 */
const placeholderCount = 6;

// Derive a grouping key from the image path to keep similar characters apart.
// Strategy: take the filename (no path), strip extension, then take the prefix
// before the first underscore, lowercased. This keeps variants like
// "Elsa_and_Anna_1" and "Elsa_and_Anna_2" in the same group.
const getImageGroupKey = (path: string): string => {
  const filename = path.split('/').pop() ?? path;
  const base = filename.split('.')[0];
  const [prefix] = base.split('_');
  return prefix.toLowerCase();
};

// Deterministically "shuffle" by grouping similar images and interleaving
// groups in round-robin order, preserving the original order within each group.
const interleaveByGroup = (items: string[]): string[] => {
  const groups: Record<string, string[]> = {};
  const groupOrder: string[] = [];

  for (const item of items) {
    const key = getImageGroupKey(item);
    if (!groups[key]) {
      groups[key] = [];
      groupOrder.push(key);
    }
    groups[key].push(item);
  }

  const result: string[] = [];
  let remaining = items.length;

  while (remaining > 0) {
    for (const key of groupOrder) {
      const group = groups[key];
      if (group.length > 0) {
        result.push(group.shift() as string);
        remaining--;
      }
    }
  }

  return result;
};

// Entertainers gallery images (used for /gallery/entertainers)
const entertainersImages: string[] = [
  '/images/Aurora_1.jpeg',
  '/images/Anna_1.jpeg',
  '/images/Aurora_2.jpg',
  '/images/Belle_1.jpeg',
  '/images/Bluey_1.jpeg',
  '/images/Cowgirl_1.jpeg',
  '/images/DarthVader_and_Leia_1.jpeg',
  '/images/Elsa_and_Anna_1.jpg',
  '/images/Elsa_and_Anna_2.jpeg',
  '/images/Hippie_1.jpeg',
  '/images/Isabella_1.jpeg',
  '/images/Jasmine_1.jpeg',
  '/images/Joy_1.jpeg',
  '/images/Luli_Pampin_1.jpg',
  '/images/Luli_Pampin_2.jpg',
  '/images/Luli_Pampin_4.jpeg',
  '/images/Moana_!.jpeg',
  '/images/Peach_1.jpeg',
  '/images/Pokemon_Trainer_1.jpeg',
  '/images/Spiderman_1.jpeg',
  '/images/Taylor_Swift_1.jpg',
  '/images/Uma_1.jpeg',
  '/images/Wonder_Woman_1.jpeg',
];

// Deterministically interleaved entertainers images to avoid obvious repeats.
const entertainersImagesShuffled: string[] = interleaveByGroup(entertainersImages);

// Characters gallery images (used for /gallery/characters)
const charactersImages: string[] = [
  '/images/Baby_Shark_1.jpg',
  '/images/CocoMelon_1.jpeg',
  '/images/conejo_de_pascua_1.jpeg',
  '/images/Elmo_and_CookieMonster_1.jpeg',
  '/images/Mario_1.jpeg',
  '/images/Sonic_1.jpeg',
];

// Deterministically interleaved characters images to avoid obvious repeats.
const charactersImagesShuffled: string[] = interleaveByGroup(charactersImages);

const Gallery = () => {
  const { category } = useParams<{ category: string }>();
  const { t, language } = useLanguage();

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Redirect legacy /gallery/mobile-spa to the new canonical slug
  if (category === 'mobile-spa') {
    return <Navigate to="/gallery/special-characters" replace />;
  }

  // Convert URL slug to service ID
  const serviceId = category ? slugToServiceId[category] : undefined;
  
  // Find the service data
  const service: ServicePricing | undefined = serviceId 
    ? servicePricing.find((s) => s.id === serviceId)
    : undefined;

  // If category doesn't exist, redirect to pricing
  if (!service) {
    return <Navigate to="/pricing" replace />;
  }

  const serviceName = getLocalizedText(service.name, language);

  const galleryImages =
    category === 'entertainers'
      ? entertainersImagesShuffled
      : category === 'characters'
      ? charactersImagesShuffled
      : [];

  const openLightbox = (index: number) => {
    if (!galleryImages.length) return;
    setActiveIndex(index);
    setLightboxOpen(true);
  };

  const showPrev = useCallback(() => {
    if (!galleryImages.length || activeIndex === null) return;
    setActiveIndex((current) => {
      if (current === null) return current;
      const nextIndex = (current - 1 + galleryImages.length) % galleryImages.length;
      return nextIndex;
    });
  }, [galleryImages.length, activeIndex]);

  const showNext = useCallback(() => {
    if (!galleryImages.length || activeIndex === null) return;
    setActiveIndex((current) => {
      if (current === null) return current;
      const nextIndex = (current + 1) % galleryImages.length;
      return nextIndex;
    });
  }, [galleryImages.length, activeIndex]);

  useEffect(() => {
    if (!lightboxOpen || !galleryImages.length) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        showPrev();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        showNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, galleryImages.length, showPrev, showNext]);

  // Build contact URL with service query parameter
  const bookingUrl = `/contact?service=${encodeURIComponent(serviceName)}`;

  return (
    <main className="py-16">
      {/* Page Header */}
      <section className="container mx-auto px-4 mb-12">
        {/* Back link */}
        <Link 
          to="/pricing" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft size={18} />
          {t('gallery.backToPricing')}
        </Link>

        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="text-gradient-magical">{serviceName}</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-2">
            {t('gallery.title')}
          </p>
          <p className="text-xl text-muted-foreground leading-relaxed">
            {getLocalizedText(service.description, language)}
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="container mx-auto px-4 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {category === 'entertainers'
            ? entertainersImagesShuffled.map((src, index) => (
                <div
                  key={index}
                  className="aspect-square rounded-2xl overflow-hidden bg-muted"
                  onClick={() => openLightbox(index)}
                >
                  <img
                    src={src}
                    alt={`${serviceName} photo ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              ))
            : category === 'characters'
            ? charactersImagesShuffled.map((src, index) => (
                <div
                  key={index}
                  className="aspect-square rounded-2xl overflow-hidden bg-muted"
                  onClick={() => openLightbox(index)}
                >
                  <img
                    src={src}
                    alt={`${serviceName} photo ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              ))
            : Array.from({ length: placeholderCount }).map((_, index) => (
                <div
                  key={index}
                  className="aspect-square bg-muted rounded-2xl flex flex-col items-center justify-center gap-3 border-2 border-dashed border-muted-foreground/20"
                >
                  <ImageIcon size={48} className="text-muted-foreground/40" />
                  <span className="text-sm text-muted-foreground/60">
                    {t('gallery.placeholder')}
                  </span>
                </div>
              ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        {galleryImages.length > 0 && activeIndex !== null && (
          <DialogContent className="bg-transparent border-none shadow-none p-0 max-w-none w-auto">
            <div className="relative flex items-center justify-center gap-4">
              <button
                type="button"
                aria-label={t('gallery.previousImage')}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-background/85 text-foreground shadow-md hover:bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                onClick={showPrev}
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <div className="bg-gradient-magical p-[2px] sm:p-[3px] rounded-[1.75rem] shadow-magical">
                <div className="bg-background rounded-[1.5rem] p-3 sm:p-4">
                  <img
                    src={galleryImages[activeIndex]}
                    alt={serviceName}
                    className="max-h-[80vh] max-w-[90vw] w-auto object-contain rounded-2xl"
                  />
                </div>
              </div>

              <button
                type="button"
                aria-label={t('gallery.nextImage')}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-background/85 text-foreground shadow-md hover:bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                onClick={showNext}
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          </DialogContent>
        )}
      </Dialog>

      {/* Book Service CTA */}
      <section className="container mx-auto px-4">
        <div className="bg-muted/50 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">
            {serviceName}
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            {service.note && getLocalizedText(service.note, language)}
          </p>
          <Button asChild variant="hero" size="lg">
            <Link to={bookingUrl}>
              {t('gallery.bookService')}
            </Link>
          </Button>
        </div>
      </section>

      {/* Decorative Elements */}
      <div className="fixed top-1/4 left-4 w-8 h-8 bg-primary/20 rounded-full animate-float" />
      <div className="fixed top-1/3 right-8 w-6 h-6 bg-secondary/20 rounded-full animate-float" style={{ animationDelay: '1s' }} />
      <div className="fixed bottom-1/4 left-8 w-4 h-4 bg-accent/30 rounded-full animate-float" style={{ animationDelay: '0.5s' }} />
    </main>
  );
};

export default Gallery;

