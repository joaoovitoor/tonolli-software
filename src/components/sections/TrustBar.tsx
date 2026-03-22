interface TrustBarProps {
  title: string;
  companies: string[];
}

export default function TrustBar({ title, companies }: TrustBarProps) {
  return (
    <section className="py-14 border-y border-gray-800/50 bg-gray-900/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xs text-gray-500 uppercase tracking-[0.18em] font-medium mb-8">
          {title}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {companies.map((company) => (
            <span
              key={company}
              className="px-4 py-1.5 rounded-full text-sm font-medium text-gray-400 bg-gray-800/60 border border-gray-700/50 hover:text-gray-200 hover:border-gray-600 transition-colors duration-200 cursor-default"
            >
              {company}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
