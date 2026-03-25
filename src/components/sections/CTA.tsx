import Button from '@/components/ui/Button';

interface CTAProps {
  title: string;
  subtitle: string;
  button: { label: string; href: string };
}

export default function CTA({ title, subtitle, button }: CTAProps) {
  return (
    <section className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="bg-dot-grid absolute inset-0 opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-600/8 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-blue-600/12 rounded-full blur-[100px]" />
        <div className="absolute top-0 right-1/4 w-[300px] h-[300px] bg-violet-600/6 rounded-full blur-[80px]" />
      </div>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="rounded-2xl border border-gray-800/80 bg-gray-900/40 backdrop-blur-sm p-10 md:p-20 elevation-2">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight gradient-heading">
            {title}
          </h2>
          <p className="mt-5 text-lg text-gray-400 max-w-xl mx-auto leading-relaxed">
            {subtitle}
          </p>
          <div className="mt-10">
            <Button href={button.href} size="lg">
              {button.label}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
