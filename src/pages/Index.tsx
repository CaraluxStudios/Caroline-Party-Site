import { Link } from 'react-router-dom';
import { Crown, Sparkles, Wand2, SmilePlus, Palette, PartyPopper, Music, Users, ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import ServiceCard from '@/components/ServiceCard';
import TestimonialCard from '@/components/TestimonialCard';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import heroBg from '@/assets/hero-bg.jpg';
import princessesGroup from '@/assets/princesses-group.png';
import mermaidPrincess from '@/assets/mermaid-princess.png';
import spaParty from '@/assets/spa-party.png';
import magician from '@/assets/magician.jpg';
import clown from '@/assets/clown.jpg';
import facePainting from '@/assets/face-painting.jpg';
import balloonArtist from '@/assets/balloon-artist.jpg';

const Index = () => {
  const { t } = useLanguage();

  const services = [
    { key: 'princess', icon: Crown, image: princessesGroup },
    { key: 'spa', icon: Sparkles, image: spaParty },
    { key: 'magic', icon: Wand2, image: magician },
    { key: 'clown', icon: SmilePlus, image: clown },
    { key: 'facepainting', icon: Palette, image: facePainting },
    { key: 'balloon', icon: PartyPopper, image: balloonArtist },
  ];

  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/50 to-background" />
        
        <div className="container relative z-10 mx-auto px-4 py-20 text-center">
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-primary font-semibold">
              <Sparkles size={18} className="animate-sparkle" />
              <span>Caroline Party</span>
              <Sparkles size={18} className="animate-sparkle" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
              <span className="text-gradient-magical">{t('hero.tagline')}</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t('hero.subtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button asChild variant="hero" size="xl">
                <Link to="/contact" className="gap-3">
                  {t('hero.cta')}
                  <ArrowRight size={20} />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/services">{t('hero.view_services')}</Link>
              </Button>
            </div>
          </div>
          
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-soft">
            <ChevronDown size={32} className="text-primary" />
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t('services.title')}</h2>
            <p className="text-xl text-muted-foreground">{t('services.subtitle')}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
          
          <div className="text-center mt-12">
            <Button asChild variant="secondary" size="lg">
              <Link to="/services" className="gap-2">
                {t('hero.view_services')}
                <ArrowRight size={18} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Gallery / Featured */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="grid grid-cols-2 gap-4">
              <img 
                src={princessesGroup} 
                alt="Princess performers" 
                className="rounded-3xl shadow-card w-full h-64 object-cover"
              />
              <img 
                src={mermaidPrincess} 
                alt="Mermaid princess" 
                className="rounded-3xl shadow-card w-full h-64 object-cover mt-8"
              />
              <img 
                src={spaParty} 
                alt="Kids spa party" 
                className="rounded-3xl shadow-card w-full h-48 object-cover -mt-4"
              />
              <img 
                src={magician} 
                alt="Magician show" 
                className="rounded-3xl shadow-card w-full h-48 object-cover mt-4"
              />
            </div>
            
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold">
                {t('characters.title')}
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {t('characters.subtitle')}
              </p>
              <Button asChild variant="default" size="lg">
                <Link to="/characters" className="gap-2">
                  {t('nav.characters')}
                  <ArrowRight size={18} />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            {t('testimonials.title')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard
              text={t('testimonial.1.text')}
              author={t('testimonial.1.author')}
            />
            <TestimonialCard
              text={t('testimonial.2.text')}
              author={t('testimonial.2.author')}
            />
            <TestimonialCard
              text={t('testimonial.3.text')}
              author={t('testimonial.3.author')}
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            {t('faq.title')}
          </h2>
          
          <Accordion type="single" collapsible className="space-y-4">
            {[1, 2, 3, 4].map((num) => (
              <AccordionItem 
                key={num} 
                value={`item-${num}`}
                className="bg-card rounded-2xl px-6 border-none shadow-card"
              >
                <AccordionTrigger className="text-lg font-semibold hover:text-primary hover:no-underline">
                  {t(`faq.${num}.q`)}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {t(`faq.${num}.a`)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-primary via-lavender to-secondary">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <Sparkles className="mx-auto text-primary-foreground animate-sparkle" size={48} />
            <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground">
              {t('hero.tagline')}
            </h2>
            <Button asChild variant="accent" size="xl">
              <Link to="/contact" className="gap-3">
                {t('hero.cta')}
                <ArrowRight size={20} />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;
