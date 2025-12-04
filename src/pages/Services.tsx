import { Crown, Sparkles, Wand2, SmilePlus, Palette, PartyPopper, Music, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import ServiceCard from '@/components/ServiceCard';

import princessesGroup from '@/assets/princesses-group.png';
import spaParty from '@/assets/spa-party.png';
import magician from '@/assets/magician.jpg';
import clown from '@/assets/clown.jpg';
import facePainting from '@/assets/face-painting.jpg';
import balloonArtist from '@/assets/balloon-artist.jpg';
import mermaidPrincess from '@/assets/mermaid-princess.png';

const Services = () => {
  const { t, language } = useLanguage();

  const services = [
    { key: 'princess', icon: Crown, image: princessesGroup },
    { key: 'spa', icon: Sparkles, image: spaParty },
    { key: 'magic', icon: Wand2, image: magician },
    { key: 'clown', icon: SmilePlus, image: clown },
    { key: 'facepainting', icon: Palette, image: facePainting },
    { key: 'balloon', icon: PartyPopper, image: balloonArtist },
    { key: 'dance', icon: Music, image: mermaidPrincess },
    { key: 'host', icon: Users, image: princessesGroup },
  ];

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={service.key}
              title={t(`service.${service.key}.title`)}
              description={t(`service.${service.key}.desc`)}
              image={service.image}
              icon={service.icon}
              delay={index * 100}
            />
          ))}
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
