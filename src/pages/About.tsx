import { Heart, Shield, Users, Star } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

import princessesGroup from '@/assets/princesses-group.png';

const About = () => {
  const { t } = useLanguage();

  const values = [
    { key: 'safety', icon: Shield, color: 'bg-primary' },
    { key: 'professionalism', icon: Star, color: 'bg-secondary' },
    { key: 'inclusivity', icon: Heart, color: 'bg-lavender' },
  ];

  return (
    <main className="py-16">
      {/* Page Header */}
      <section className="container mx-auto px-4 mb-16">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-gradient-magical">{t('about.title')}</span>
          </h1>
        </div>
      </section>

      {/* Our Story */}
      <section className="container mx-auto px-4 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">
              {t('about.story.title')}
            </h2>
            <div className="space-y-4">
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t('about.story.p1')}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t('about.story.p2')}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t('about.story.p3')}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t('about.story.p4')}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t('about.story.p5')}
              </p>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <img 
              src={princessesGroup} 
              alt="Caroline Party team" 
              className="rounded-3xl shadow-card w-full"
            />
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <Users className="mx-auto text-primary" size={48} />
            <h2 className="text-3xl md:text-4xl font-bold">
              {t('about.mission.title')}
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {t('about.mission.text')}
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            {t('about.values.title')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div 
                key={value.key}
                className="bg-card rounded-3xl p-8 shadow-card hover:shadow-glow transition-all duration-300 hover:-translate-y-2 text-center"
              >
                <div className={`w-16 h-16 ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                  <value.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-3">
                  {t(`about.value.${value.key}`)}
                </h3>
                <p className="text-muted-foreground">
                  {t(`about.value.${value.key}.desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
