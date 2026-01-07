import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Sparkles } from 'lucide-react';

interface CharacterCardProps {
  name: string;
  description: string;
  image: string;
  delay?: number;
}

const CharacterCard = ({ name, image, delay = 0 }: CharacterCardProps) => {
  const { t } = useLanguage();

  return (
    <div 
      className="group bg-card rounded-3xl overflow-hidden shadow-card hover:shadow-glow transition-all duration-500 hover:-translate-y-2 animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/20 to-transparent opacity-60" />
        
        {/* Sparkle decorations */}
        <div className="absolute top-4 right-4 text-accent animate-sparkle">
          <Sparkles size={24} />
        </div>
        
        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-primary-foreground">
          <h3 className="text-2xl font-bold mb-2">{name}</h3>
          <Button asChild variant="accent" size="sm" className="w-full">
            <Link to="/contact">{t('characters.book')}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
