interface StatItem {
  value: string;
  label: string;
}

interface StatsProps {
  items: StatItem[];
}

export default function Stats({ items }: StatsProps) {
  return (
    <section className="border-y border-gray-800/50 bg-gray-900/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {items.map((item) => (
            <div key={item.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white">
                {item.value}
              </div>
              <div className="mt-2 text-sm text-gray-400">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
