import { Link } from 'react-router-dom';
import { Mail, Phone, Instagram, Facebook, Youtube } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import logo from '@/assets/logo.png';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & Tagline */}
          <div className="space-y-4">
            <img src={logo} alt="Caroline Party" className="h-16 w-auto brightness-0 invert" />
            <p className="text-background/70 text-sm leading-relaxed">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">{t('footer.quicklinks')}</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/" className="text-background/70 hover:text-background transition-colors">
                {t('nav.home')}
              </Link>
              <Link to="/services" className="text-background/70 hover:text-background transition-colors">
                {t('nav.services')}
              </Link>
              <Link to="/characters" className="text-background/70 hover:text-background transition-colors">
                {t('nav.characters')}
              </Link>
              <Link to="/about" className="text-background/70 hover:text-background transition-colors">
                {t('nav.about')}
              </Link>
              <Link to="/contact" className="text-background/70 hover:text-background transition-colors">
                {t('nav.contact')}
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-4">{t('footer.contact')}</h4>
            <div className="flex flex-col gap-3">
              <a 
                href="mailto:info@carolineparty.com" 
                className="flex items-center gap-2 text-background/70 hover:text-background transition-colors"
              >
                <Mail size={18} />
                {t('footer.email')}
              </a>
              <a 
                href="tel:+1234567890" 
                className="flex items-center gap-2 text-background/70 hover:text-background transition-colors"
              >
                <Phone size={18} />
                {t('footer.phone')}
              </a>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-bold text-lg mb-4">{t('footer.followus')}</h4>
            <div className="flex items-center gap-4">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-background/10 text-center">
          <p className="text-background/50 text-sm">{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
