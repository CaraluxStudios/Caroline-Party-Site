import { useLanguage } from '@/contexts/LanguageContext';
import CharacterCard from '@/components/CharacterCard';

import mermaidPrincess from '@/assets/mermaid-princess.png';
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
      image: '/images/Elsa_and_Anna_1.jpg' 
    },
    { 
      nameKey: 'character.adventure.name', 
      descKey: 'character.adventure.desc', 
      image: '/images/Anna_1.jpeg' 
    },
    { 
      nameKey: 'character.sleeping.name',
      descKey: 'character.sleeping.desc',
      image: '/images/Aurora_1.jpeg'
    },
    { 
      nameKey: 'character.bookish.name',
      descKey: 'character.bookish.desc',
      image: '/images/Belle_1.jpeg'
    },
    { 
      nameKey: 'character.royal.name',
      descKey: 'character.royal.desc',
      image: '/images/CLH Princess.jpg'
    },
    { 
      nameKey: 'character.cowgirl.name',
      descKey: 'character.cowgirl.desc',
      image: '/images/Cowgirl_1.jpeg'
    },
    { 
      nameKey: 'character.easterBunny.name',
      descKey: 'character.easterBunny.desc',
      image: '/images/conejo_de_pascua_1.jpeg'
    },
    { 
      nameKey: 'character.popStar.name',
      descKey: 'character.popStar.desc',
      image: '/images/Taylor_Swift_1.jpg'
    },
    { 
      nameKey: 'character.sharkMascot.name',
      descKey: 'character.sharkMascot.desc',
      image: '/images/Baby_Shark_1.jpg'
    },
    { 
      nameKey: 'character.monsterTrainer.name',
      descKey: 'character.monsterTrainer.desc',
      image: '/images/Pokemon_Trainer_1.jpeg'
    },
    { 
      nameKey: 'character.speedyHero.name',
      descKey: 'character.speedyHero.desc',
      image: '/images/Sonic_1.jpeg'
    },
    { 
      nameKey: 'character.adventurePlumber.name',
      descKey: 'character.adventurePlumber.desc',
      image: '/images/Mario_1.jpeg'
    },
    { 
      nameKey: 'character.spaceDuo.name',
      descKey: 'character.spaceDuo.desc',
      image: '/images/DarthVader_and_Leia_1.jpeg'
    },
    { 
      nameKey: 'character.warriorHeroine.name',
      descKey: 'character.warriorHeroine.desc',
      image: '/images/Wonder_Woman_1.jpeg'
    },
    { 
      nameKey: 'character.webHero.name',
      descKey: 'character.webHero.desc',
      image: '/images/Spiderman_1.jpeg'
    },
    { 
      nameKey: 'character.bluePup.name',
      descKey: 'character.bluePup.desc',
      image: '/images/Bluey_1.jpeg'
    },
    { 
      nameKey: 'character.friendlyMonster.name',
      descKey: 'character.friendlyMonster.desc',
      image: '/images/Elmo_and_CookieMonster_1.jpeg'
    },
    { 
      nameKey: 'character.toddlerFriends.name',
      descKey: 'character.toddlerFriends.desc',
      image: '/images/CocoMelon_1.jpeg'
    },
    { 
      nameKey: 'character.islandPrincess.name',
      descKey: 'character.islandPrincess.desc',
      image: '/images/Moana_!.jpeg'
    },
    { 
      nameKey: 'character.flowerSister.name',
      descKey: 'character.flowerSister.desc',
      image: '/images/Isabella_1.jpeg'
    },
    { 
      nameKey: 'character.desertPrincess.name',
      descKey: 'character.desertPrincess.desc',
      image: '/images/Jasmine_1.jpeg'
    },
    { 
      nameKey: 'character.joyfulHeroine.name',
      descKey: 'character.joyfulHeroine.desc',
      image: '/images/Joy_1.jpeg'
    },
    { 
      nameKey: 'character.peachPrincess.name',
      descKey: 'character.peachPrincess.desc',
      image: '/images/Peach_1.jpeg'
    },
    { 
      nameKey: 'character.pirateDaughter.name',
      descKey: 'character.pirateDaughter.desc',
      image: '/images/Uma_1.jpeg'
    },
    { 
      nameKey: 'character.stagePerformer.name',
      descKey: 'character.stagePerformer.desc',
      image: '/images/Luli_Pampin_1.jpg'
    },
    { 
      nameKey: 'character.groovyFriend.name',
      descKey: 'character.groovyFriend.desc',
      image: '/images/Hippie_1.jpeg'
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
