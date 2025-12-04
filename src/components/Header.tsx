import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import logo from '@/assets/logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'nav.home' },
    { path: '/services', label: 'nav.services' },
    { path: '/characters', label: 'nav.characters' },
    { path: '/about', label: 'nav.about' },
    { path: '/contact', label: 'nav.contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover-float">
            <img src={logo} alt="Caroline Party" className="h-14 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-base font-semibold transition-colors duration-300 hover:text-primary relative ${
                  isActive(link.path) ? 'text-primary' : 'text-foreground'
                }`}
              >
                {t(link.label)}
                {isActive(link.path) && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Language Switcher & CTA */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-1 bg-muted rounded-full p-1">
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  language === 'en'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('es')}
                className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  language === 'es'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                ES
              </button>
            </div>
            <Button asChild variant="hero" size="sm">
              <Link to="/contact">{t('hero.cta')}</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-base font-semibold py-2 px-4 rounded-lg transition-colors duration-300 ${
                    isActive(link.path)
                      ? 'bg-primary/10 text-primary'
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  {t(link.label)}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border">
              <div className="flex items-center gap-1 bg-muted rounded-full p-1">
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-all ${
                    language === 'en' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage('es')}
                  className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-all ${
                    language === 'es' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
                  }`}
                >
                  ES
                </button>
              </div>
              <Button asChild variant="hero" size="sm" className="flex-1">
                <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                  {t('hero.cta')}
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
