import Button from '@/components/ui/Button';

interface HeroProps {
  badge?: string;
  title: string;
  subtitle: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  centered?: boolean;
}

export default function Hero({
  badge,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  centered = true,
}: HeroProps) {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="bg-dot-grid absolute inset-0 opacity-100" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[650px] bg-blue-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-violet-600/6 rounded-full blur-[110px]" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/4 rounded-full blur-[80px]" />
      </div>

      <div
        className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${
          centered ? 'text-center' : ''
        }`}
      >
        <div className={centered ? 'max-w-4xl mx-auto' : 'max-w-3xl'}>
          {badge && (
            <span className="animate-fade-in-up inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full text-sm font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse shrink-0" />
              {badge}
            </span>
          )}

          <h1 className="animate-fade-in-up delay-100 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight gradient-heading leading-[1.1]">
            {title}
          </h1>

          <p className={`animate-fade-in-up delay-200 mt-6 text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed ${centered ? 'mx-auto' : ''}`}>
            {subtitle}
          </p>

          {(primaryCta || secondaryCta) && (
            <div className={`animate-fade-in-up delay-300 mt-10 flex flex-col sm:flex-row gap-4 ${centered ? 'justify-center' : ''}`}>
              {primaryCta && (
                <Button href={primaryCta.href} size="lg">
                  {primaryCta.label}
                </Button>
              )}
              {secondaryCta && (
                <Button href={secondaryCta.href} variant="outline" size="lg">
                  {secondaryCta.label}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
