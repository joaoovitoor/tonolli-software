import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, MessageCircle, ArrowRight } from 'lucide-react';
import siteData from '@/content/site.json';

export const metadata: Metadata = {
  title: 'Projeto recebido — Tonolli Software',
  description: 'Recebemos sua solicitação e retornaremos em até 24 horas.',
  robots: { index: false, follow: false },
};

export default function ObrigadoPage() {
  const whatsappUrl = `https://wa.me/${siteData.contact.whatsapp}?text=${encodeURIComponent('Olá! Acabei de enviar uma solicitação pelo site e queria conversar sobre meu projeto.')}`;

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-24">
      <div className="max-w-lg w-full text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 mx-auto mb-8">
          <CheckCircle size={40} />
        </div>

        <h1 className="text-3xl font-bold text-white mb-4">
          Projeto recebido!
        </h1>
        <p className="text-gray-400 text-lg mb-10 leading-relaxed">
          Vamos analisar sua solicitação e retornar em até <span className="text-white font-medium">24 horas</span>.
          Para agilizar, entre em contato também pelo WhatsApp.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-medium text-white hover:bg-emerald-700 transition-colors"
          >
            <MessageCircle size={18} />
            Falar pelo WhatsApp
          </a>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-700 px-6 py-3 text-sm font-medium text-gray-300 hover:border-gray-500 hover:text-white transition-colors"
          >
            Voltar ao início
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </main>
  );
}
