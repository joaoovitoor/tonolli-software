import type { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import Stats from '@/components/sections/Stats';
import ServicesGrid from '@/components/sections/ServicesGrid';
import ProjectCard from '@/components/sections/ProjectCard';
import TrustBar from '@/components/sections/TrustBar';
import CTA from '@/components/sections/CTA';
import SectionTitle from '@/components/ui/SectionTitle';
import homeData from '@/content/home.json';
import projectsData from '@/content/projects.json';

export const metadata: Metadata = {
  title: 'Tonolli Software | Modernização de Sistemas Legados',
  description:
    'Desenvolvimento de software sob medida, sistemas com inteligência artificial e modernização de plataformas. 19+ anos de experiência. São Paulo.',
  alternates: { canonical: '/' },
};

export default function HomePage() {
  const featuredProjects = projectsData.projects.slice(0, 3);

  return (
    <>
      <Hero
        badge={homeData.hero.badge}
        title={homeData.hero.title}
        subtitle={homeData.hero.subtitle}
        primaryCta={homeData.hero.cta.primary}
        secondaryCta={homeData.hero.cta.secondary}
      />

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

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title={homeData.projectsPreview.title}
            subtitle={homeData.projectsPreview.subtitle}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        </div>
      </section>

      <CTA
        title={homeData.cta.title}
        subtitle={homeData.cta.subtitle}
        button={homeData.cta.button}
      />
    </>
  );
}
