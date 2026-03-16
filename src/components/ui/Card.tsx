interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({
  children,
  className = '',
  hover = true,
}: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-gray-800 bg-gray-900/50 p-6 md:p-8 backdrop-blur-sm ${
        hover
          ? 'transition-all duration-300 hover:border-gray-700 hover:bg-gray-900/80 hover:shadow-xl hover:shadow-blue-500/5'
          : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}
