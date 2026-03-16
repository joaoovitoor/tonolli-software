import Link from 'next/link';
import Image from 'next/image';
import { Github, Linkedin, Mail, Phone } from 'lucide-react';
import siteData from '@/content/site.json';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-800 bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <Image
                src="/images/logo.svg"
                alt={siteData.name}
                width={28}
                height={28}
                className="h-7 w-7"
              />
              <span className="text-lg text-white brand-name">
                {siteData.name}
              </span>
            </Link>
            <p className="text-gray-400 max-w-md">
              {siteData.description}
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href={siteData.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href={siteData.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href={`mailto:${siteData.contact.email}`}
                className="text-gray-500 hover:text-emerald-400 transition-colors"
                aria-label="E-mail"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Navegação
            </h4>
            <ul className="space-y-3">
              {siteData.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Contato
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${siteData.contact.email}`}
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
                >
                  <Mail size={14} />
                  {siteData.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${siteData.contact.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
                >
                  <Phone size={14} />
                  {siteData.contact.phone.replace('+55', '+55 ')}
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <p className="text-xs text-gray-600">
                {siteData.legalName}
              </p>
              <p className="text-xs text-gray-600">
                CNPJ: {siteData.cnpj}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800/50 text-center">
          <p className="text-sm text-gray-500">
            &copy; {currentYear} {siteData.name}. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
