import {
  Code,
  Brain,
  RefreshCw,
  Shield,
  type LucideIcon,
} from 'lucide-react';
import Card from '@/components/ui/Card';

const iconMap: Record<string, LucideIcon> = {
  Code,
  Brain,
  RefreshCw,
  Shield,
};

interface ServiceItem {
  icon: string;
  title: string;
  description: string;
}

interface ServicesGridProps {
  items: ServiceItem[];
}

export default function ServicesGrid({ items }: ServicesGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {items.map((item) => {
        const Icon = iconMap[item.icon] || Code;
        return (
          <Card key={item.title} className="group relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500/0 via-blue-500/60 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-2xl" />
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/5 border border-blue-500/15 text-blue-400 mb-5 group-hover:border-blue-500/30 group-hover:from-blue-500/25 transition-all duration-300">
              <Icon size={22} />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">
              {item.title}
            </h3>
            <p className="text-gray-400 leading-relaxed">{item.description}</p>
          </Card>
        );
      })}
    </div>
  );
}
