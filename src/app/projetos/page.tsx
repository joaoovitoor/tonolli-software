import type { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import ProjectCard from '@/components/sections/ProjectCard';
import CTA from '@/components/sections/CTA';
import projectsData from '@/content/projects.json';
import { breadcrumbJsonLd } from '@/lib/seo';
import siteData from '@/content/site.json';

export const metadata: Metadata = {
  title: 'Projetos',
  description:
    'Conheça os projetos desenvolvidos pela Tonolli Software. Produtos próprios com IA e sistemas para clientes como Sony Music, CRED e Final Level.',
  alternates: { canonical: '/projetos' },
};

export default function ProjetosPage() {
  const ownProjects = projectsData.projects.filter(
    (p) => p.ownership === 'Tonolli Software'
  );
  const clientProjects = projectsData.projects.filter(
    (p) => p.ownership === 'Cliente'
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Início', url: siteData.url },
              { name: 'Projetos', url: `${siteData.url}/projetos` },
            ])
          ).replace(/</g, '\\u003c'),
        }}
      />

      <Hero
        title={projectsData.hero.title}
        subtitle={projectsData.hero.subtitle}
      />

      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-2">
              Produtos Próprios
            </h2>
            <p className="text-gray-400">
              Soluções criadas, projetadas e mantidas pela Tonolli Software.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ownProjects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 border-t border-gray-800/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-2">
              Projetos para Clientes
            </h2>
            <p className="text-gray-400">
              Sistemas enterprise desenvolvidos para empresas globais.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clientProjects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        </div>
      </section>

      <CTA
        title={projectsData.cta.title}
        subtitle={projectsData.cta.subtitle}
        button={projectsData.cta.button}
      />
    </>
  );
}
