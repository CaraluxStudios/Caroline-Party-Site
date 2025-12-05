import { useParams, Link, Navigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ImageIcon } from 'lucide-react';
import { 
  servicePricing, 
  getLocalizedText,
  type ServicePricing,
} from '@/data/pricing';

/**
 * Map URL slugs to service IDs.
 * This allows for URL-friendly paths like /gallery/face-painting
 */
const slugToServiceId: Record<string, string> = {
  'characters': 'characters',
  'balloons': 'balloon',
  'entertainers': 'entertainers',
  'face-painting': 'facePainting',
  'shows': 'shows',
  'mobile-spa': 'mobileSpa',
};

/**
 * Placeholder images for each category.
 * TODO: Replace with actual gallery images.
 */
const placeholderCount = 6;

const Gallery = () => {
  const { category } = useParams<{ category: string }>();
  const { t, language } = useLanguage();

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
          {Array.from({ length: placeholderCount }).map((_, index) => (
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

