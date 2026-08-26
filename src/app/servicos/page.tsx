import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Code,
  Brain,
  RefreshCw,
  Shield,
  Globe,
  LayoutDashboard,
  Smartphone,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';
import Hero from '@/components/sections/Hero';
import ProcessSteps from '@/components/sections/ProcessSteps';
import CTA from '@/components/sections/CTA';
import SectionTitle from '@/components/ui/SectionTitle';
import Card from '@/components/ui/Card';
import { breadcrumbJsonLd } from '@/lib/seo';
import { servicesData, siteData } from '@/lib/content';

const iconMap: Record<string, LucideIcon> = {
  Code,
  Brain,
  RefreshCw,
  Shield,
  Globe,
  LayoutDashboard,
  Smartphone,
};

export const metadata: Metadata = {
  title: 'Serviços',
  description:
    'Sites, sistemas web, apps, modernização, consultoria e automação com IA — direto com quem programa. Conheça meus serviços.',
  alternates: { canonical: '/servicos' },
};

export default function ServicosPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Início', url: siteData.url },
              { name: 'Serviços', url: `${siteData.url}/servicos` },
            ])
          ).replace(/</g, '\\u003c'),
        }}
      />

      <Hero
        title={servicesData.hero.title}
        subtitle={servicesData.hero.subtitle}
        compact
      />

      <section className="pt-8 pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {servicesData.services.map((service) => {
              const Icon = iconMap[service.icon] || Code;
              return (
                <Link key={service.id} href={`/servicos/${service.slug}`}>
                  <Card className="group h-full">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 mb-5 group-hover:bg-blue-500/20 transition-colors">
                      <Icon size={22} />
                    </div>
                    <h2 className="text-xl font-semibold text-white mb-3">
                      {service.title}
                    </h2>
                    <p className="text-gray-400 leading-relaxed mb-5">
                      {service.shortDescription}
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 group-hover:gap-3 transition-all">
                      Ver detalhes
                      <ArrowRight size={16} />
                    </span>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 border-t border-gray-800/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title={servicesData.process.title}
            subtitle={servicesData.process.subtitle}
          />
          <ProcessSteps steps={servicesData.process.steps} />
        </div>
      </section>

      <CTA
        title={servicesData.cta.title}
        subtitle={servicesData.cta.subtitle}
        button={servicesData.cta.button}
      />
    </>
  );
}
