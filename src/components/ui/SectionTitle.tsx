interface SectionTitleProps {
  title: string;
  subtitle?: string;
  badge?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionTitle({
  title,
  subtitle,
  badge,
  centered = true,
  light = false,
}: SectionTitleProps) {
  return (
    <div className={`max-w-3xl ${centered ? 'mx-auto text-center' : ''} mb-16`}>
      {badge && (
        <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-sm font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
          {badge}
        </span>
      )}
      <h2
        className={`text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight ${
          light ? 'text-gray-900' : 'text-white'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-lg md:text-xl ${
            light ? 'text-gray-600' : 'text-gray-400'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
