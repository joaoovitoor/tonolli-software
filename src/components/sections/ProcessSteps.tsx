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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {steps.map((step) => (
        <Card key={step.number} className="relative">
          <span className="text-4xl font-bold text-blue-500/20 absolute top-4 right-4">
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
