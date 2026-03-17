import { ExternalLink, ArrowUpRight } from 'lucide-react';
import Card from '@/components/ui/Card';

interface ProjectCardProps {
  title: string;
  category: string;
  badge: string;
  shortDescription: string;
  technologies: string[];
  highlights: string[];
  url?: string;
  ownership: string;
}

const badgeColors: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  'IA & Agronegócio': { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20', dot: 'bg-emerald-500' },
  'IA & Clima': { bg: 'bg-sky-500/10', text: 'text-sky-400', border: 'border-sky-500/20', dot: 'bg-sky-500' },
  'IA & Carreira': { bg: 'bg-violet-500/10', text: 'text-violet-400', border: 'border-violet-500/20', dot: 'bg-violet-500' },
  'IA & Fintech': { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20', dot: 'bg-amber-500' },
  'Enterprise': { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20', dot: 'bg-blue-500' },
  'IA & Marketing': { bg: 'bg-rose-500/10', text: 'text-rose-400', border: 'border-rose-500/20', dot: 'bg-rose-500' },
};

const defaultColors = { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20', dot: 'bg-blue-400' };

export default function ProjectCard({
  title,
  category,
  badge,
  shortDescription,
  technologies,
  highlights,
  url,
  ownership,
}: ProjectCardProps) {
  const colors = badgeColors[badge] || defaultColors;

  return (
    <Card className="flex flex-col h-full group relative overflow-hidden">
      <div className={`absolute top-0 left-0 right-0 h-[2px] ${colors.dot} opacity-60 group-hover:opacity-100 transition-opacity`} />

      <div className="flex items-center justify-between mb-4">
        <span className={`px-3 py-1 text-xs font-medium rounded-full ${colors.bg} ${colors.text} border ${colors.border}`}>
          {badge}
        </span>
        <span className="text-xs text-gray-500">{category}</span>
      </div>

      <h3 className="text-xl font-semibold text-white mb-3">
        {title}
      </h3>

      <p className="text-gray-400 mb-6 leading-relaxed flex-grow">
        {shortDescription}
      </p>

      <ul className="space-y-2 mb-6">
        {highlights.map((h) => (
          <li key={h} className="flex items-start gap-2.5 text-sm text-gray-300">
            <span className={`mt-1.5 h-1.5 w-1.5 rounded-full ${colors.dot} shrink-0`} />
            {h}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-4 border-t border-gray-800/50 space-y-3">
        <div className="flex flex-wrap gap-2">
          {technologies.slice(0, 6).map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs rounded-md bg-gray-800 text-gray-400"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          {ownership === 'Tonolli Software' && (
            <p className="text-xs text-emerald-500 font-medium">
              Autoria: Tonolli Software
            </p>
          )}
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={`ml-auto inline-flex items-center gap-1.5 text-sm font-medium ${colors.text} hover:underline underline-offset-4 transition-colors`}
              aria-label={`Visitar ${title}`}
            >
              Visitar
              <ArrowUpRight size={14} />
            </a>
          )}
        </div>
      </div>
    </Card>
  );
}
