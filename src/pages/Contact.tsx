import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Send, Sparkles } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient'

const Contact = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  
  // Get service from query parameter (e.g., /contact?service=Characters)
  const serviceFromQuery = searchParams.get('service');
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    serviceType: '',
    preferredDate: '',
    message: '',
    promo: true,
    terms: false,
  });

  // Pre-fill message when service query param is present
  useEffect(() => {
    if (serviceFromQuery) {
      const prefillMessage = language === 'es' 
        ? `Estoy interesado/a en reservar: ${serviceFromQuery}`
        : `I'm interested in booking: ${serviceFromQuery}`;
      setFormData(prev => ({ ...prev, message: prefillMessage }));
    }
  }, [serviceFromQuery, language]);
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = t('contact.error.required');
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = t('contact.error.required');
    }
    if (!formData.email.trim()) {
      newErrors.email = t('contact.error.required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('contact.error.email');
    }
    if (!formData.phone.trim()) {
      newErrors.phone = t('contact.error.required');
    }
    if (!formData.serviceType) {
      newErrors.serviceType = t('contact.error.serviceType');
    }
    if (!formData.preferredDate) {
      newErrors.preferredDate = t('contact.error.preferredDate');
    }
    if (!formData.terms) {
      newErrors.terms = t('contact.error.terms');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!validate()) return;

  setIsSubmitting(true);
  setErrors({});

  try {
    const { error } = await supabase
  .from('contact_requests')
  .insert([
    {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      service_type: formData.serviceType,
      preferred_date: formData.preferredDate,
      note: formData.message,
      wants_promotions: formData.promo,
      agrees_terms: formData.terms,

      workspace_code: 'cp',
      source_site: 'cp_website',
    },
  ])

if (error) {
  console.error('Supabase insert error:', error)
  toast({
    title: '⚠️ Oops',
    description: error.message, // 👈 show the real message
    variant: 'destructive',
  })
  return
}

    toast({
      title: '✨ ' + t('contact.success'),
      description: formData.firstName + ', ' + t('contact.success'),
    });

    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      serviceType: '',
      preferredDate: '',
      message: '',
      promo: true,
      terms: false,
    });
  } catch (err) {
    console.error('Unexpected error:', err);
    toast({
      title: '⚠️ Oops',
      description: 'Unexpected error, please try again.',
      variant: 'destructive',
    });
  } finally {
    setIsSubmitting(false);
  }
};


  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <main className="py-16">
      {/* Page Header */}
      <section className="container mx-auto px-4 mb-16">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-gradient-magical">{t('contact.title')}</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            {t('contact.subtitle')}
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="container mx-auto px-4 max-w-2xl">
        <form onSubmit={handleSubmit} className="bg-card rounded-3xl p-8 md:p-12 shadow-card space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-foreground font-semibold">
                {t('contact.firstName')} *
              </Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
                className={`h-12 rounded-xl ${errors.firstName ? 'border-destructive' : ''}`}
                placeholder={t('contact.firstName')}
              />
              {errors.firstName && (
                <p className="text-sm text-destructive">{errors.firstName}</p>
              )}
            </div>

            {/* Last Name */}
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-foreground font-semibold">
                {t('contact.lastName')} *
              </Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
                className={`h-12 rounded-xl ${errors.lastName ? 'border-destructive' : ''}`}
                placeholder={t('contact.lastName')}
              />
              {errors.lastName && (
                <p className="text-sm text-destructive">{errors.lastName}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground font-semibold">
              {t('contact.email')} *
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className={`h-12 rounded-xl ${errors.email ? 'border-destructive' : ''}`}
              placeholder="your@email.com"
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-foreground font-semibold">
              {t('contact.phone')} *
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className={`h-12 rounded-xl ${errors.phone ? 'border-destructive' : ''}`}
              placeholder="(123) 456-7890"
            />
            {errors.phone && (
              <p className="text-sm text-destructive">{errors.phone}</p>
            )}
          </div>

          {/* Service Type & Preferred Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Service Type */}
            <div className="space-y-2">
              <Label htmlFor="serviceType" className="text-foreground font-semibold">
                {t('contact.serviceType')} *
              </Label>
              <Select
                value={formData.serviceType}
                onValueChange={(value) => handleChange('serviceType', value)}
              >
                <SelectTrigger
                  id="serviceType"
                  className={`h-12 rounded-xl ${errors.serviceType ? 'border-destructive' : ''}`}
                >
                  <SelectValue placeholder={t('contact.serviceType.placeholder')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="entertainers">{t('contact.serviceType.entertainers')}</SelectItem>
                  <SelectItem value="balloon-making">{t('contact.serviceType.balloonMaking')}</SelectItem>
                  <SelectItem value="face-painter">{t('contact.serviceType.facePainter')}</SelectItem>
                  <SelectItem value="characters">{t('contact.serviceType.characters')}</SelectItem>
                  <SelectItem value="shows">{t('contact.serviceType.shows')}</SelectItem>
                  <SelectItem value="mobile-spa">{t('contact.serviceType.mobileSpa')}</SelectItem>
                </SelectContent>
              </Select>
              {errors.serviceType && (
                <p className="text-sm text-destructive">{errors.serviceType}</p>
              )}
            </div>

            {/* Preferred Party Date */}
            <div className="space-y-2">
              <Label htmlFor="preferredDate" className="text-foreground font-semibold">
                {t('contact.preferredDate')} *
              </Label>
              <Input
                id="preferredDate"
                type="date"
                value={formData.preferredDate}
                onChange={(e) => handleChange('preferredDate', e.target.value)}
                className={`h-12 rounded-xl ${errors.preferredDate ? 'border-destructive' : ''}`}
                min={new Date().toISOString().split('T')[0]}
              />
              {errors.preferredDate && (
                <p className="text-sm text-destructive">{errors.preferredDate}</p>
              )}
            </div>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message" className="text-foreground font-semibold">
              {t('contact.message')}
            </Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleChange('message', e.target.value)}
              className="min-h-32 rounded-xl"
              placeholder={t('contact.message')}
            />
          </div>

          {/* Checkboxes */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center space-x-3">
              <Checkbox
                id="promo"
                checked={formData.promo}
                onCheckedChange={(checked) => handleChange('promo', checked as boolean)}
              />
              <Label htmlFor="promo" className="text-muted-foreground cursor-pointer">
                {t('contact.promo')}
              </Label>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="terms"
                  checked={formData.terms}
                  onCheckedChange={(checked) => handleChange('terms', checked as boolean)}
                />
                <Label htmlFor="terms" className="text-muted-foreground cursor-pointer">
                  {t('contact.terms')} *
                </Label>
              </div>
              {errors.terms && (
                <p className="text-sm text-destructive ml-7">{errors.terms}</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            variant="hero" 
            size="lg" 
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Sparkles className="animate-spin" size={20} />
                {t('contact.submit')}...
              </>
            ) : (
              <>
                <Send size={20} />
                {t('contact.submit')}
              </>
            )}
          </Button>
        </form>
      </section>
    </main>
  );
};

export default Contact;
