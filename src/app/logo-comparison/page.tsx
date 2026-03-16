import Image from 'next/image';

const logos = [
  { name: 'Opção 1: Neural Network + Code', file: 'logo.svg', meaning: 'Nós conectados (IA) com brackets de código (Software)' },
  { name: 'Opção 2: Hexágono + Camadas', file: 'logo-alt1.svg', meaning: 'Hexágono (IA) com blocos empilhados (Software)' },
  { name: 'Opção 3: Circuito + Brackets', file: 'logo-alt2.svg', meaning: 'Fluxo de circuito (IA) com brackets de código (Software)' },
  { name: 'Opção 4: Módulos Conectados', file: 'logo-alt3.svg', meaning: 'Módulos interconectados (IA + Software)' },
  { name: 'Opção 5: Data Flow + Layers', file: 'logo-alt4.svg', meaning: 'Fluxo de dados (IA) com camadas (Software)' },
  { name: 'Opção 6: Hub Neural + Frame', file: 'logo-alt5.svg', meaning: 'Hub neural (IA) com frame de código (Software)' },
];

export default function LogoComparison() {
  return (
    <div className="min-h-screen bg-gray-950 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-white mb-2 text-center">
          Comparação de Logos
        </h1>
        <p className="text-gray-400 text-center mb-12">
          Escolha o ícone que melhor representa a Tonolli Software
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {/* Background previews */}
          <div className="col-span-full mb-4">
            <p className="text-sm text-gray-500 mb-4">Preview em fundo escuro (como no site):</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {logos.map((logo) => (
            <div
              key={logo.file}
              className="rounded-2xl border border-gray-800 bg-gray-900/50 p-8 text-center"
            >
              <div className="flex items-center justify-center mb-6 bg-gray-950 rounded-xl p-6">
                <Image
                  src={`/images/${logo.file}`}
                  alt={logo.name}
                  width={120}
                  height={120}
                  className="w-30 h-30"
                />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {logo.name}
              </h3>
              <p className="text-sm text-gray-400">{logo.meaning}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-500 text-sm">
            Acesse: <code className="text-blue-400">/logo-comparison</code>
          </p>
        </div>
      </div>
    </div>
  );
}
