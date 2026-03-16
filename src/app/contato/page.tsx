import type { Metadata } from 'next';
import { Mail, Phone, MapPin, type LucideIcon } from 'lucide-react';
import Hero from '@/components/sections/Hero';
import ContactForm from '@/components/sections/ContactForm';
import contactData from '@/content/contact.json';
import { breadcrumbJsonLd } from '@/lib/seo';
import siteData from '@/content/site.json';

const iconMap: Record<string, LucideIcon> = { Mail, Phone, MapPin };

export const metadata: Metadata = {
  title: 'Contato',
  description:
    'Entre em contato com a Tonolli Software. Solicite uma proposta para seu projeto de software, IA ou modernização de sistemas.',
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
      />

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <ContactForm />
            </div>
            <div>
              <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6 md:p-8">
                <h3 className="text-lg font-semibold text-white mb-6">
                  {contactData.info.title}
                </h3>
                <div className="space-y-6">
                  {contactData.info.items.map((item) => {
                    const Icon = iconMap[item.icon] || Mail;
                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="flex items-start gap-4 group"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 shrink-0 group-hover:bg-blue-500/20 transition-colors">
                          <Icon size={18} />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">{item.label}</p>
                          <p className="text-sm text-gray-300 group-hover:text-white transition-colors">
                            {item.value}
                          </p>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-gray-800 bg-gray-900/50 p-6 md:p-8">
                <h4 className="text-sm font-semibold text-white mb-3">
                  Horário de atendimento
                </h4>
                <p className="text-sm text-gray-400">
                  Segunda a sexta, 9h às 18h (horário de Brasília).
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Disponibilidade para reuniões em EST/PST para clientes
                  internacionais.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
