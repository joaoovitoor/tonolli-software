import type { Metadata } from 'next';
import { ShieldCheck, Check, TrendingUp } from 'lucide-react';
import Hero from '@/components/sections/Hero';
import ProcessSteps from '@/components/sections/ProcessSteps';
import CTA from '@/components/sections/CTA';
import SectionTitle from '@/components/ui/SectionTitle';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { breadcrumbJsonLd, serviceJsonLd } from '@/lib/seo';
import { sistemaLegadoData, siteData, anosDeExperiencia } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Modernização de Sistemas Legados sem Parar a Operação',
  description: `Modernizamos sistemas legados corporativos sem interromper sua operação. ${anosDeExperiencia}+ anos de experiência, diagnóstico gratuito em 48h e proposta com escopo fechado.`,
  alternates: { canonical: '/sistema-legado' },
};

function faqJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: sistemaLegadoData.faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

export default function SistemaLegadoPage() {
  const data = sistemaLegadoData;
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Início', url: siteData.url },
              { name: 'Sistemas Legados', url: `${siteData.url}/sistema-legado` },
            ])
          ).replace(/</g, '\\u003c'),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceJsonLd({
              title: 'Modernização de Sistemas Legados',
              description: data.hero.subtitle,
              id: 'sistema-legado',
            })
          ).replace(/</g, '\\u003c'),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd()).replace(/</g, '\\u003c'),
        }}
      />

      <Hero
        badge={data.hero.badge}
        title={data.hero.title}
        subtitle={data.hero.subtitle}
        primaryCta={data.hero.cta.primary}
        secondaryCta={data.hero.cta.secondary}
      />
      <p className="-mt-12 pb-8 text-center text-sm text-gray-500">
        {data.hero.microcopy}
      </p>

      <section className="py-24 border-t border-gray-800/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle title={data.fears.title} subtitle={data.fears.subtitle} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {data.fears.items.map((item) => (
              <Card key={item.fear}>
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-blue-500/10 p-2 shrink-0">
                    <ShieldCheck size={20} className="text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">
                      A preocupação comum:
                    </p>
                    <p className="font-semibold text-white mb-2">{item.fear}</p>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 border-t border-gray-800/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle title={data.process.title} subtitle={data.process.subtitle} />
          <ProcessSteps steps={data.process.steps} />
        </div>
      </section>

      <section className="py-24 border-t border-gray-800/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400 mb-6">
                <TrendingUp size={28} />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                {data.proof.title}
              </h2>
              <p className="text-gray-400 leading-relaxed text-lg mb-8">
                {data.proof.description}
              </p>
              <Button href={data.proof.link.href} variant="outline">
                {data.proof.link.label}
              </Button>
            </div>
            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6 md:p-8">
              <p className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
                Resultados do projeto
              </p>
              <ul className="space-y-3">
                {data.proof.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 text-gray-300">
                    <Check size={16} className="mt-1 text-emerald-500 shrink-0" />
                    <span className="text-sm">{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 border-t border-gray-800/50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Perguntas frequentes"
            subtitle="O que decisores perguntam antes de modernizar."
          />
          <div className="space-y-5">
            {data.faq.map((item) => (
              <Card key={item.question}>
                <h3 className="font-semibold text-white mb-2">{item.question}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{item.answer}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <CTA title={data.cta.title} subtitle={data.cta.subtitle} button={data.cta.button} />
    </>
  );
}
