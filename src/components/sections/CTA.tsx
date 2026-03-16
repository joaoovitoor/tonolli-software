import Button from '@/components/ui/Button';

interface CTAProps {
  title: string;
  subtitle: string;
  button: { label: string; href: string };
}

export default function CTA({ title, subtitle, button }: CTAProps) {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-600/5 to-transparent" />
      </div>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
          {title}
        </h2>
        <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
          {subtitle}
        </p>
        <div className="mt-10">
          <Button href={button.href} size="lg">
            {button.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
