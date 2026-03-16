import type { Metadata } from 'next';
import {
  Code,
  Brain,
  RefreshCw,
  Shield,
  Check,
  type LucideIcon,
} from 'lucide-react';
import Hero from '@/components/sections/Hero';
import ProcessSteps from '@/components/sections/ProcessSteps';
import CTA from '@/components/sections/CTA';
import SectionTitle from '@/components/ui/SectionTitle';
import servicesData from '@/content/services.json';
import { breadcrumbJsonLd, serviceJsonLd } from '@/lib/seo';
import siteData from '@/content/site.json';

const iconMap: Record<string, LucideIcon> = {
  Code,
  Brain,
  RefreshCw,
  Shield,
};

export const metadata: Metadata = {
  title: 'Serviços',
  description:
    'Desenvolvimento de software sob medida, inteligência artificial, modernização de sistemas legados e consultoria técnica. Conheça nossos serviços.',
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
      {servicesData.services.map((s) => (
        <script
          key={s.id}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(serviceJsonLd(s)).replace(/</g, '\\u003c'),
          }}
        />
      ))}

      <Hero
        title={servicesData.hero.title}
        subtitle={servicesData.hero.subtitle}
      />

      <section className="pt-8 pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-20">
          {servicesData.services.map((service) => {
            const Icon = iconMap[service.icon] || Code;
            return (
              <div
                key={service.id}
                id={service.id}
                className="scroll-mt-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
              >
                <div>
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400 mb-6">
                    <Icon size={28} />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    {service.title}
                  </h2>
                  <p className="text-gray-400 leading-relaxed text-lg">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-6">
                    {service.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs rounded-full bg-gray-800 text-gray-400 border border-gray-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6 md:p-8">
                  <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
                    O que inclui
                  </h4>
                  <ul className="space-y-3">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-gray-300"
                      >
                        <Check
                          size={16}
                          className="mt-1 text-emerald-500 shrink-0"
                        />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
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
