import { Link, useSearchParams } from 'react-router-dom';
import { Crown, Sparkles, Wand2, SmilePlus, Palette, PartyPopper } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import ServiceCard from '@/components/ServiceCard';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

import princessesGroup from '@/assets/princesses-group.png';
import spaParty from '@/assets/spa-party.png';
import magician from '@/assets/magician.jpg';
import clown from '@/assets/clown.jpg';
import facePainting from '@/assets/face-painting.jpg';
import balloonArtist from '@/assets/balloon-artist.jpg';

const Services = () => {
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();

  const services = [
    { key: 'entertainment', icon: Crown, image: princessesGroup },
    { key: 'characters', icon: Sparkles, image: spaParty },
    { key: 'facePainters', icon: Wand2, image: magician },
    { key: 'balloonArtists', icon: SmilePlus, image: clown },
    { key: 'shows', icon: Palette, image: facePainting },
    { key: 'santa', icon: PartyPopper, image: balloonArtist },
  ] as const;

  type ServiceKey = (typeof services)[number]['key'];

  const openServiceKey = searchParams.get('service') as ServiceKey | null;

  const handleOpenChange = (key: ServiceKey, open: boolean) => {
    const next = new URLSearchParams(searchParams);
    if (open) {
      next.set('service', key);
    } else {
      next.delete('service');
    }
    setSearchParams(next);
  };

  return (
    <main className="py-16">
      {/* Page Header */}
      <section className="container mx-auto px-4 mb-16">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-gradient-magical">{t('services.title')}</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            {t('services.subtitle')}
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const isOpen = openServiceKey === service.key;

            const isCharacters = service.key === 'characters';
            const ctaLabel = isCharacters
              ? t('services.modal.cta.characters')
              : t('services.modal.cta.book');
            const ctaTo = isCharacters ? '/characters' : '/contact';

            return (
              <Dialog
                key={service.key}
                open={isOpen}
                onOpenChange={(open) => handleOpenChange(service.key, open)}
              >
                <DialogTrigger asChild>
                  <ServiceCard
                    title={t(`service.${service.key}.title`)}
                    description={t(`service.${service.key}.short`)}
                    image={service.image}
                    icon={service.icon}
                    delay={index * 100}
                  />
                </DialogTrigger>
                <DialogContent className="max-w-2xl overflow-hidden p-0 sm:rounded-3xl">
                  <div className="flex flex-col">
                    <img
                      src={service.image}
                      alt={t(`service.${service.key}.title`)}
                      className="h-80 md:h-96 lg:h-[28rem] w-full object-cover"
                    />
                    <div className="space-y-4 p-6">
                      <DialogHeader className="space-y-2 text-left">
                        <DialogTitle className="text-2xl font-bold">
                          {t(`service.${service.key}.title`)}
                        </DialogTitle>
                        <DialogDescription className="text-base leading-relaxed">
                          {t(`service.${service.key}.details`)}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex justify-end">
                        <Button asChild size="lg">
                          <Link to={ctaTo} className="gap-2">
                            {ctaLabel}
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            );
          })}
        </div>
      </section>

      {/* Decorative Elements */}
      <div className="fixed top-1/4 left-4 w-8 h-8 bg-primary/20 rounded-full animate-float" />
      <div className="fixed top-1/3 right-8 w-6 h-6 bg-secondary/20 rounded-full animate-float" style={{ animationDelay: '1s' }} />
      <div className="fixed bottom-1/4 left-8 w-4 h-4 bg-accent/30 rounded-full animate-float" style={{ animationDelay: '0.5s' }} />
    </main>
  );
};

export default Services;
