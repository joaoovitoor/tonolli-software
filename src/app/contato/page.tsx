import type { Metadata } from 'next';
import { Mail, Phone, MapPin, type LucideIcon } from 'lucide-react';
import Hero from '@/components/sections/Hero';
import ContactWizard from '@/components/sections/ContactWizard';
import { breadcrumbJsonLd } from '@/lib/seo';
import { contactData, siteData } from '@/lib/content';

const iconMap: Record<string, LucideIcon> = { Mail, Phone, MapPin };

export const metadata: Metadata = {
  title: 'Contato',
  description:
    'Conte sobre seu projeto — site, sistema, app ou modernização. Direto com quem programa, sem agência. Resposta em até 24h.',
  alternates: { canonical: '/contato' },
};

export default function ContatoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Início', url: siteData.url },
              { name: 'Contato', url: `${siteData.url}/contato` },
            ])
          ).replace(/</g, '\\u003c'),
        }}
      />

      <Hero
        title={contactData.hero.title}
        subtitle={contactData.hero.subtitle}
        compact
      />

      <section className="pt-8 pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3">
              <ContactWizard />
            </div>
            <div className="lg:col-span-2">
              <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6 md:p-8 sticky top-24">
                <h2 className="text-base font-semibold text-white uppercase tracking-wider mb-6">
                  {contactData.info.title}
                </h2>
                <div className="space-y-6">
                  {contactData.info.items.map((item) => {
                    const Icon = iconMap[item.icon] || Mail;
                    const Wrapper = item.href ? 'a' : 'div';
                    return (
                      <Wrapper
                        key={item.label}
                        {...(item.href
                          ? {
                              href: item.href,
                              target: item.href.startsWith('http') ? '_blank' : undefined,
                              rel: item.href.startsWith('http') ? 'noopener noreferrer' : undefined,
                            }
                          : {})}
                        className="flex items-start gap-4 group"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 shrink-0 group-hover:bg-blue-500/20 transition-colors">
                          <Icon size={18} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm text-gray-500 mb-1">{item.label}</p>
                          <p className="text-sm text-gray-300 group-hover:text-white transition-colors break-words">
                            {item.value}
                          </p>
                        </div>
                      </Wrapper>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
