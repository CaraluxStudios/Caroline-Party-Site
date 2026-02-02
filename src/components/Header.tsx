import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import logo from '@/assets/logo.png';

type NavLinkItem =
  | {
      type: 'link';
      path: string;
      label: string;
    }
  | {
      type: 'gallery';
      label: string;
    };

// Temporary hide: Balloon Artists gallery should not be publicly accessible.
// Flip to `false` to re-enable the nav link.
const HIDE_BALLOON_ARTISTS_GALLERY = true;

const galleryLinks = [
  { path: '/gallery/entertainers', labelKey: 'nav.gallery.entertainers' },
  { path: '/gallery/characters', labelKey: 'nav.gallery.characters' },
  { path: '/gallery/face-painting', labelKey: 'nav.gallery.facePainting' },
  { path: '/gallery/balloons', labelKey: 'nav.gallery.balloons' },
  { path: '/gallery/shows', labelKey: 'nav.gallery.shows' },
  { path: '/gallery/special-characters', labelKey: 'nav.gallery.specialCharacters' },
].filter(
  (item) =>
    !(HIDE_BALLOON_ARTISTS_GALLERY && item.path === '/gallery/balloons'),
);

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isMobileGalleryOpen, setIsMobileGalleryOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  const navLinks: NavLinkItem[] = [
    { type: 'link', path: '/', label: 'nav.home' },
    { type: 'link', path: '/services', label: 'nav.services' },
    { type: 'link', path: '/pricing', label: 'nav.pricing' },
    { type: 'gallery', label: 'nav.gallery' },
    { type: 'link', path: '/about', label: 'nav.about' },
    { type: 'link', path: '/contact', label: 'nav.contact' },
  ];

  const isActive = (path: string) => location.pathname === path;
  const isGalleryActive = location.pathname.startsWith('/gallery');

  const handleToggleMenu = () => {
    setIsMenuOpen((prev) => {
      const next = !prev;
      if (!next) {
        setIsMobileGalleryOpen(false);
      }
      return next;
    });
  };

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
            {navLinks.map((link) => {
              if (link.type === 'link') {
                return (
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
                );
              }

              return (
                <DropdownMenu
                  key={link.label}
                  open={isGalleryOpen}
                  onOpenChange={setIsGalleryOpen}
                >
                  <DropdownMenuTrigger
                    onMouseEnter={() => setIsGalleryOpen(true)}
                    className={`text-base font-semibold transition-colors duration-300 hover:text-primary relative inline-flex items-center gap-1 focus:outline-none ${
                      isGalleryActive ? 'text-primary' : 'text-foreground'
                    }`}
                  >
                    {t(link.label)}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${
                        isGalleryOpen ? 'rotate-180' : ''
                      }`}
                    />
                    {isGalleryActive && (
                      <span className="pointer-events-none absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full" />
                    )}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    onMouseLeave={() => setIsGalleryOpen(false)}
                    align="start"
                    className="rounded-2xl border bg-popover/95 backdrop-blur-md shadow-xl"
                  >
                    {galleryLinks.map((item) => (
                      <DropdownMenuItem key={item.path} className="px-2 py-1.5">
                        <Link
                          to={item.path}
                          className={`block w-full rounded-md px-2 py-1.5 text-sm transition-colors ${
                            isActive(item.path)
                              ? 'bg-primary/10 text-primary font-semibold'
                              : 'text-foreground hover:bg-muted'
                          }`}
                        >
                          {t(item.labelKey)}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              );
            })}
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
            onClick={handleToggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => {
                if (link.type === 'link') {
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsMobileGalleryOpen(false);
                      }}
                      className={`text-base font-semibold py-2 px-4 rounded-lg transition-colors duration-300 ${
                        isActive(link.path)
                          ? 'bg-primary/10 text-primary'
                          : 'text-foreground hover:bg-muted'
                      }`}
                    >
                      {t(link.label)}
                    </Link>
                  );
                }

                return (
                  <div key={link.label} className="px-2">
                    <button
                      type="button"
                      className="flex w-full items-center justify-between rounded-lg px-2 py-2 text-base font-semibold text-foreground hover:bg-muted transition-colors"
                      onClick={() =>
                        setIsMobileGalleryOpen((prev) => !prev)
                      }
                    >
                      <span className="px-2">{t(link.label)}</span>
                      <ChevronDown
                        className={`h-5 w-5 transition-transform duration-200 ${
                          isMobileGalleryOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isMobileGalleryOpen && (
                      <div className="mt-1 ml-4 flex flex-col gap-1 border-l border-border/40 pl-3">
                        {galleryLinks.map((item) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => {
                              setIsMenuOpen(false);
                              setIsMobileGalleryOpen(false);
                            }}
                            className={`text-sm font-medium py-1.5 px-3 rounded-lg transition-colors ${
                              isActive(item.path) || location.pathname === item.path
                                ? 'bg-primary/10 text-primary'
                                : 'text-foreground hover:bg-muted'
                            }`}
                          >
                            {t(item.labelKey)}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
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
