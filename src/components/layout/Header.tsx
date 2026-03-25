'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import siteData from '@/content/site.json';
import Button from '@/components/ui/Button';

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-800/50 bg-gray-950/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/icon.svg"
              alt=""
              width={28}
              height={28}
              className="h-7 w-7 object-contain"
              priority
            />
            <span className="text-2xl font-semibold tracking-tight text-white">
              {siteData.name}
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {siteData.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 text-sm transition-colors rounded-lg hover:bg-white/5 ${
                  pathname === item.href
                    ? 'text-white bg-white/5'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="ml-4">
              <Button href="/contato" size="sm">
                Falar com especialista
              </Button>
            </div>
          </nav>

          <button
            onClick={() => setOpen(!open)}
            onKeyDown={(e) => { if (e.key === 'Escape' && open) setOpen(false); }}
            className="md:hidden p-2 text-gray-400 hover:text-white"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={open}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-gray-800 bg-gray-950/95 backdrop-blur-xl">
          <nav className="flex flex-col px-4 py-4 gap-1">
            {siteData.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`px-4 py-3 rounded-lg hover:bg-white/5 transition-colors ${
                  pathname === item.href
                    ? 'text-white bg-white/5'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 px-4">
              <Button href="/contato" size="sm" className="w-full">
                Falar com especialista
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
