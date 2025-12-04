import { useLanguage } from '@/contexts/LanguageContext';
import CharacterCard from '@/components/CharacterCard';

import mermaidPrincess from '@/assets/mermaid-princess.png';
import princessesGroup from '@/assets/princesses-group.png';
import spaParty from '@/assets/spa-party.png';

const Characters = () => {
  const { t } = useLanguage();

  const characters = [
    { 
      nameKey: 'character.mermaid.name', 
      descKey: 'character.mermaid.desc', 
      image: mermaidPrincess 
    },
    { 
      nameKey: 'character.ice.name', 
      descKey: 'character.ice.desc', 
      image: princessesGroup 
    },
    { 
      nameKey: 'character.adventure.name', 
      descKey: 'character.adventure.desc', 
      image: princessesGroup 
    },
    { 
      nameKey: 'character.spa.name', 
      descKey: 'character.spa.desc', 
      image: spaParty 
    },
  ];

  return (
    <main className="py-16">
      {/* Page Header */}
      <section className="container mx-auto px-4 mb-16">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-gradient-magical">{t('characters.title')}</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            {t('characters.subtitle')}
          </p>
        </div>
      </section>

      {/* Characters Grid */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {characters.map((character, index) => (
            <CharacterCard
              key={character.nameKey}
              name={t(character.nameKey)}
              description={t(character.descKey)}
              image={character.image}
              delay={index * 150}
            />
          ))}
        </div>
      </section>

      {/* Decorative sparkles */}
      <div className="fixed top-1/4 left-4 text-accent/30 animate-sparkle">✦</div>
      <div className="fixed top-1/3 right-8 text-primary/30 animate-sparkle" style={{ animationDelay: '0.5s' }}>✧</div>
      <div className="fixed bottom-1/3 left-12 text-lavender/30 animate-sparkle" style={{ animationDelay: '1s' }}>✦</div>
    </main>
  );
};

export default Characters;
