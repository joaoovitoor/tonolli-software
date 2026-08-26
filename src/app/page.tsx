import type { Metadata } from 'next';
import { FileCheck, UserCheck, Layers, type LucideIcon } from 'lucide-react';
import Hero from '@/components/sections/Hero';
import Stats from '@/components/sections/Stats';
import ServicesGrid from '@/components/sections/ServicesGrid';
import TrustBar from '@/components/sections/TrustBar';
import CTA from '@/components/sections/CTA';
import SectionTitle from '@/components/ui/SectionTitle';
import Card from '@/components/ui/Card';
import { homeData, anosDeExperiencia } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Tonolli Software | Programador com CNPJ — Contratação Direta',
  description: `Contrate direto quem programa: CNPJ, contrato e nota fiscal, sem agência pelo meio. Sistemas, sites, automações e integrações sob medida. ${anosDeExperiencia}+ anos de experiência.`,
  alternates: { canonical: '/' },
};

const whyMeIconMap: Record<string, LucideIcon> = { FileCheck, UserCheck, Layers };

export default function HomePage() {
  return (
    <>
      <Hero
        badge={homeData.hero.badge}
        title={homeData.hero.title}
        subtitle={homeData.hero.subtitle}
        primaryCta={homeData.hero.cta.primary}
        secondaryCta={homeData.hero.cta.secondary}
      />

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title={homeData.whyMe.title}
            subtitle={homeData.whyMe.subtitle}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {homeData.whyMe.items.map((item) => {
              const Icon = whyMeIconMap[item.icon] || FileCheck;
              return (
                <Card key={item.concern}>
                  <div className="flex items-start gap-4">
                    <div className="rounded-lg bg-blue-500/10 p-2 shrink-0">
                      <Icon size={20} className="text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">
                        A pergunta comum:
                      </p>
                      <p className="font-semibold text-white mb-2">{item.concern}</p>
                      <p className="text-sm text-gray-400 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <Stats items={homeData.stats} />

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title={homeData.servicesPreview.title}
            subtitle={homeData.servicesPreview.subtitle}
          />
          <ServicesGrid items={homeData.servicesPreview.items} />
        </div>
      </section>

      <TrustBar
        title={homeData.trust.title}
        companies={homeData.trust.companies}
      />

      <CTA
        title={homeData.cta.title}
        subtitle={homeData.cta.subtitle}
        button={homeData.cta.button}
      />
    </>
  );
}
