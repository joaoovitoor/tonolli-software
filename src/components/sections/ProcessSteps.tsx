import Card from '@/components/ui/Card';

interface Step {
  number: string;
  title: string;
  description: string;
}

interface ProcessStepsProps {
  steps: Step[];
}

export default function ProcessSteps({ steps }: ProcessStepsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {steps.map((step) => (
        <Card key={step.number} className="relative group">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500/0 via-blue-500/40 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-2xl" />
          <span className="text-5xl font-extrabold text-blue-500/10 absolute top-3 right-4 tracking-tighter">
            {step.number}
          </span>
          <h3 className="text-lg font-semibold text-white mb-2 mt-2">
            {step.title}
          </h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            {step.description}
          </p>
        </Card>
      ))}
    </div>
  );
}
