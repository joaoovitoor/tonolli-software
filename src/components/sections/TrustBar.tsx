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
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
          {companies.map((company, index) => (
            <span key={company} className="flex items-center gap-10">
              <span className="text-base font-medium text-gray-500 hover:text-gray-300 transition-colors duration-200 cursor-default">
                {company}
              </span>
              {index < companies.length - 1 && (
                <span className="hidden sm:block h-1 w-1 rounded-full bg-gray-700 shrink-0" />
              )}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
