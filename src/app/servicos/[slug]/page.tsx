import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  Code,
  Brain,
  RefreshCw,
  Shield,
  Globe,
  LayoutDashboard,
  Smartphone,
  HelpCircle,
  type LucideIcon,
} from 'lucide-react';
import Hero from '@/components/sections/Hero';
import ProcessSteps from '@/components/sections/ProcessSteps';
import CTA from '@/components/sections/CTA';
import SectionTitle from '@/components/ui/SectionTitle';
import Card from '@/components/ui/Card';
import { breadcrumbJsonLd, serviceJsonLd } from '@/lib/seo';
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

export function generateStaticParams() {
  return servicesData.services.map((service) => ({ slug: service.slug }));
}

function getService(slug: string) {
  return servicesData.services.find((service) => service.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.whatIs,
    alternates: { canonical: `/servicos/${service.slug}` },
  };
}

export default async function ServicoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const Icon = iconMap[service.icon] || Code;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Início', url: siteData.url },
              { name: 'Serviços', url: `${siteData.url}/servicos` },
              { name: service.title, url: `${siteData.url}/servicos/${service.slug}` },
            ])
          ).replace(/</g, '\\u003c'),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceJsonLd({ title: service.title, description: service.whatIs, id: service.id })
          ).replace(/</g, '\\u003c'),
        }}
      />

      <Hero
        badge="Serviço"
        title={service.title}
        subtitle={service.whatIs}
        primaryCta={{ label: 'Falar comigo sobre isso', href: `/contato?origem=${service.slug}` }}
        secondaryCta={{ label: 'Ver outros serviços', href: '/servicos' }}
      />

      <section className="py-24 border-t border-gray-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400 mb-6">
            <Icon size={28} />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Como funciona
          </h2>
          <p className="text-gray-400 leading-relaxed text-lg mb-8">
            {service.how}
          </p>
          <div className="flex flex-wrap gap-2">
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
      </section>

      <section className="py-24 border-t border-gray-800/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Perguntas antes de contratar"
            subtitle="As preocupações que ouço antes de fechar esse tipo de projeto — e como respondo cada uma."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {service.concerns.map((c) => (
              <Card key={c.concern}>
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-blue-500/10 p-2 shrink-0">
                    <HelpCircle size={20} className="text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">
                      A pergunta comum:
                    </p>
                    <p className="font-semibold text-white mb-2">{c.concern}</p>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {c.answer}
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
        button={{ label: servicesData.cta.button.label, href: `/contato?origem=${service.slug}` }}
      />
    </>
  );
}
