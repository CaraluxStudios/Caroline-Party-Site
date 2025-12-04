import { Star, Quote } from 'lucide-react';

interface TestimonialCardProps {
  text: string;
  author: string;
}

const TestimonialCard = ({ text, author }: TestimonialCardProps) => {
  return (
    <div className="bg-card rounded-3xl p-8 shadow-card hover:shadow-glow transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-center gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={18} className="fill-accent text-accent" />
        ))}
      </div>
      <div className="relative mb-6">
        <Quote className="absolute -top-2 -left-2 text-primary/20 w-8 h-8" />
        <p className="text-foreground/80 italic leading-relaxed pl-6">
          "{text}"
        </p>
      </div>
      <p className="text-primary font-semibold">{author}</p>
    </div>
  );
};

export default TestimonialCard;
