interface TrustBarProps {
  title: string;
  companies: string[];
}

export default function TrustBar({ title, companies }: TrustBarProps) {
  return (
    <section className="py-16 border-y border-gray-800/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm text-gray-500 uppercase tracking-wider mb-8">
          {title}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {companies.map((company) => (
            <span
              key={company}
              className="text-lg font-medium text-gray-600 hover:text-gray-400 transition-colors"
            >
              {company}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
