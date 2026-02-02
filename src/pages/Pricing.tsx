import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  servicePricing, 
  getLocalizedText,
  formatPricing,
  isPriceRange,
  type ServicePricing,
} from '@/data/pricing';

const Pricing = () => {
  const { t, language } = useLanguage();
  const balloonGalleryEnabled = false;

  /**
   * Renders the price display based on pricing type.
   * Shows "Starting at $X" for single prices or "From $X–$Y" for ranges.
   */
  const renderPrice = (service: ServicePricing) => {
    const { pricing } = service;
    
    if (isPriceRange(pricing)) {
      return (
        <>
          <div className="text-3xl font-bold text-primary">
            {formatPricing(pricing)}
          </div>
          <p className="text-sm text-muted-foreground">
            {t('pricing.from')} · {t('pricing.perSession')}
          </p>
        </>
      );
    }
    
    return (
      <>
        <div className="text-3xl font-bold text-primary">
          {formatPricing(pricing)}
        </div>
        <p className="text-sm text-muted-foreground">
          {t('pricing.startingAt')} · {t('pricing.perSession')}
        </p>
      </>
    );
  };

  /**
   * Renders a single pricing card for a service category.
   */
  const renderPricingCard = (service: ServicePricing) => {
    const isBalloonArtists = service.id === 'balloon';
    const galleryEnabled = !(isBalloonArtists && !balloonGalleryEnabled);

    return (
      <Card key={service.id} className="flex flex-col h-full">
      <CardHeader>
        <CardTitle className="text-xl">
          {getLocalizedText(service.name, language)}
        </CardTitle>
        <CardDescription className="text-base">
          {getLocalizedText(service.description, language)}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        {renderPrice(service)}
        {service.note && (
          <p className="mt-4 text-sm text-muted-foreground italic border-l-2 border-primary/30 pl-3">
            <span className="font-medium">{t('pricing.note')}:</span>{' '}
            {getLocalizedText(service.note, language)}
          </p>
        )}
      </CardContent>
      <CardFooter>
        {galleryEnabled ? (
          <Button asChild variant="default" className="w-full">
            <Link to={service.galleryPath}>{t('pricing.viewGallery')}</Link>
          </Button>
        ) : (
          <Button
            type="button"
            variant="default"
            className="w-full pointer-events-none opacity-60"
            disabled
            aria-disabled="true"
          >
            {t('pricing.viewGallery')}
          </Button>
        )}
      </CardFooter>
    </Card>
    );
  };

  return (
    <main className="py-16">
      {/* Page Header */}
      <section className="container mx-auto px-4 mb-16">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-gradient-magical">{t('pricing.title')}</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            {t('pricing.subtitle')}
          </p>
        </div>
      </section>

      {/* Pricing Cards Grid - One per Category */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicePricing.map(renderPricingCard)}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="container mx-auto px-4 mt-16">
        <div className="bg-muted/50 rounded-2xl p-8 text-center">
          <p className="text-lg text-muted-foreground mb-4">
            {t('pricing.contactForQuote')}
          </p>
          <Button asChild variant="default" size="lg">
            <Link to="/contact">{t('hero.cta')}</Link>
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

export default Pricing;
