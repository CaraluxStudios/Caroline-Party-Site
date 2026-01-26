import { Link } from 'react-router-dom';
import { Mail, Phone, Instagram, Facebook } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import logo from '@/assets/logo.png';

const TikTokIcon = (props: JSX.IntrinsicElements['svg']) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
    {...props}
  >
    <path
      fill="currentColor"
      d="M16.5 3.5c.5 1.2 1.5 2.2 2.7 2.7.5.2 1 .3 1.5.3V9c-.8 0-1.7-.2-2.5-.5-.5-.2-1-.5-1.5-.8v6.2c0 3.1-2.5 5.6-5.6 5.6S5 17 5 13.9c0-2.7 1.9-5 4.4-5.5v3.3c-.7.4-1.2 1.1-1.2 2 0 1.2 1 2.2 2.2 2.2s2.2-1 2.2-2.2V3h3.9c0 .2.1.4.2.5Z"
    />
  </svg>
);

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & Tagline */}
          <div className="space-y-4">
            <img src={logo} alt="Caroline Party" className="h-16 w-auto" />
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
              <Link to="/gallery/characters" className="text-background/70 hover:text-background transition-colors">
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
                href="tel:+17869255979"
                className="flex items-center gap-2 text-background/70 hover:text-background transition-colors"
              >
                <Phone size={18} />
                +1 (786) 925-5979
              </a>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-bold text-lg mb-4">{t('footer.followus')}</h4>
            <div className="flex items-center gap-4">
              <a 
                href="https://www.instagram.com/carolineparty/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://www.facebook.com/Carolineentertainment/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://www.tiktok.com/@carolineparty?lang=en" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <TikTokIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-background/10 text-center space-y-1">
          <p className="text-background/50 text-sm">
            {t('footer.copyright')}
          </p>
          <p className="text-background/40 text-xs">
            Powered by{' '}
            <a
              href="https://caraluxstudio.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-background/60 transition-colors"
            >
              CLX
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
