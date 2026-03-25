interface StatItem {
  value: string;
  label: string;
}

interface StatsProps {
  items: StatItem[];
}

export default function Stats({ items }: StatsProps) {
  return (
    <section className="border-y border-gray-800/50 bg-gray-900/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-800/60">
          {items.map((item, index) => (
            <div
              key={item.label}
              className={`text-center px-6 py-2 ${index >= 2 ? 'mt-0' : ''} ${index >= 2 && index < 4 ? 'max-md:border-t max-md:border-gray-800/60 max-md:pt-8 max-md:mt-8' : ''}`}
            >
              <div className="text-3xl md:text-4xl font-bold gradient-heading tabular-nums">
                {item.value}
              </div>
              <div className="mt-2 text-sm text-gray-400 leading-snug">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
