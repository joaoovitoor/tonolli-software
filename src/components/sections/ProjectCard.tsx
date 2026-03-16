import { ExternalLink } from 'lucide-react';
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
  return (
    <Card className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
          {badge}
        </span>
        <span className="text-xs text-gray-500">{category}</span>
      </div>

      <h3 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
        {title}
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-blue-400 transition-colors"
            aria-label={`Visitar ${title}`}
          >
            <ExternalLink size={16} />
          </a>
        )}
      </h3>

      <p className="text-gray-400 mb-6 leading-relaxed flex-grow">
        {shortDescription}
      </p>

      <ul className="space-y-2 mb-6">
        {highlights.map((h) => (
          <li key={h} className="flex items-start gap-2 text-sm text-gray-300">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
            {h}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-4 border-t border-gray-800/50">
        <div className="flex flex-wrap gap-2">
          {technologies.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs rounded-md bg-gray-800 text-gray-400"
            >
              {tech}
            </span>
          ))}
        </div>
        {ownership === 'Tonolli Software' && (
          <p className="mt-3 text-xs text-emerald-500 font-medium">
            Autoria: Tonolli Software
          </p>
        )}
      </div>
    </Card>
  );
}
