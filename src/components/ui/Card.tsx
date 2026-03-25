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
      className={`rounded-2xl border border-gray-800 bg-gray-900/50 p-6 md:p-8 backdrop-blur-sm elevation-1 ${
        hover
          ? 'hover-lift press-scale hover:border-gray-700 hover:bg-gray-900/80 hover:elevation-3'
          : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}
