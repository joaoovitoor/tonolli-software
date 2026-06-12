import site from '@/content/site.json';
import home from '@/content/home.json';
import about from '@/content/about.json';
import services from '@/content/services.json';
import projects from '@/content/projects.json';
import contact from '@/content/contact.json';

// Início da carreira do fundador — base de todos os "X+ anos de experiência".
// O valor é calculado no build (site estático); o cron anual no deploy.yml
// garante rebuild na virada do ano.
export const EXPERIENCE_START_YEAR = 2006;
export const anosDeExperiencia = new Date().getFullYear() - EXPERIENCE_START_YEAR;

// Substitui o token {anos} em qualquer string dos JSONs de conteúdo
function withYears<T>(value: T): T {
  if (typeof value === 'string') {
    return value.replaceAll('{anos}', String(anosDeExperiencia)) as T;
  }
  if (Array.isArray(value)) {
    return value.map(withYears) as T;
  }
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [k, withYears(v)])
    ) as T;
  }
  return value;
}

export const siteData = withYears(site);
export const homeData = withYears(home);
export const aboutData = withYears(about);
export const servicesData = withYears(services);
export const projectsData = withYears(projects);
export const contactData = withYears(contact);
