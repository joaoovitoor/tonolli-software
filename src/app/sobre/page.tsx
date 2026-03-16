import type { Metadata } from 'next';
import { Award } from 'lucide-react';
import Hero from '@/components/sections/Hero';
import Stats from '@/components/sections/Stats';
import CTA from '@/components/sections/CTA';
import Card from '@/components/ui/Card';
import SectionTitle from '@/components/ui/SectionTitle';
import aboutData from '@/content/about.json';
import { breadcrumbJsonLd } from '@/lib/seo';
import siteData from '@/content/site.json';

export const metadata: Metadata = {
  title: 'Sobre',
  description:
    'Conheça a Tonolli Software: software house em São Paulo especializada em desenvolvimento sob medida, IA e modernização de sistemas.',
  alternates: { canonical: '/sobre' },
};

export default function SobrePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Início', url: siteData.url },
              { name: 'Sobre', url: `${siteData.url}/sobre` },
            ])
          ).replace(/</g, '\\u003c'),
        }}
      />

      <Hero
        title={aboutData.hero.title}
        subtitle={aboutData.hero.subtitle}
      />

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            <div className="lg:col-span-3">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                {aboutData.company.title}
              </h2>
              <div className="space-y-4">
                {aboutData.company.paragraphs.map((paragraph, i) => (
                  <p key={i} className="text-gray-400 leading-relaxed text-lg">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            <div className="lg:col-span-2">
              <Card hover={false}>
                <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
                  {aboutData.founder.title}
                </h4>
                <h3 className="text-xl font-semibold text-white mb-1">
                  {aboutData.founder.name}
                </h3>
                <p className="text-blue-400 text-sm font-medium mb-4">
                  {aboutData.founder.role}
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {aboutData.founder.description}
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Stats items={aboutData.numbers.items} />

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title={aboutData.values.title}
            subtitle=""
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {aboutData.values.items.map((value) => (
              <Card key={value.title}>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500 mb-4">
                  <Award size={20} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {value.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <CTA
        title={aboutData.cta.title}
        subtitle={aboutData.cta.subtitle}
        button={aboutData.cta.button}
      />
    </>
  );
}
