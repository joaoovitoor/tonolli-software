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
          <Card key={item.title}>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 mb-5">
              <Icon size={24} />
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
