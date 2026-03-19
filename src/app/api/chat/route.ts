import { createGroq } from '@ai-sdk/groq';
import { streamText } from 'ai';

function cleanOrg(org: string): string {
  return org.replace(/^AS\d+\s/, '').trim();
}

function isPrivateIP(ip: string): boolean {
  return (
    ip.startsWith('127.') ||
    ip.startsWith('192.168.') ||
    ip.startsWith('10.') ||
    ip.startsWith('172.') ||
    ip === '::1' ||
    ip === 'localhost'
  );
}

export async function POST(request: Request) {
  if (!process.env.GROQ_API_KEY) {
    return new Response(
      JSON.stringify({ error: 'GROQ_API_KEY não configurada.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const groq = createGroq({ apiKey: process.env.GROQ_API_KEY });

  const body = await request.json();
  const { messages } = body;

  // Identify visitor server-side via IP (free, no key needed)
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0].trim() : null;

  let visitorContext = '';
  if (ip && !isPrivateIP(ip)) {
    try {
      const ipData = await fetch(`https://ipapi.co/${ip}/json/`, {
        headers: { 'User-Agent': 'tonollisoftware/1.0' },
      }).then((r) => r.json());

      const org = ipData.org ? cleanOrg(ipData.org) : null;
      const city = ipData.city || null;

      if (org || city) {
        visitorContext = [
          org && `Empresa/Organização identificada pelo IP: ${org}`,
          city && `Cidade do visitante: ${city}`,
        ]
          .filter(Boolean)
          .join(' | ');
      }
    } catch {
      // continue without context
    }
  }

  const systemPrompt = `Você é TonolliIA, a inteligência artificial da Tonolli Software.

SOBRE A EMPRESA:
A Tonolli Software desenvolve software sob medida e soluções com Inteligência Artificial para empresas.
19 anos de experiência em arquitetura de sistemas escaláveis.
Atende empresas no Brasil e nos EUA (Som Livre/Sony, CRED, agronegócio).
Especialidades: Agentes de IA, LangChain, RAG, automações com LLMs, Next.js, Node.js, TypeScript.
Nunca mencione nomes de pessoas da equipe.

${visitorContext ? `CONTEXTO DO VISITANTE:\n${visitorContext}\n` : ''}
PERFIL DO VISITANTE:
Não técnico. Não sabe o que é API, arquitetura, framework ou banco de dados.
Ele tem um problema no negócio dele — algo que está travando, dando trabalho manual, ou uma oportunidade que ainda não conseguiu aproveitar.
Talvez tenha visto um concorrente com algo legal e queira algo parecido.
Talvez gaste horas numa planilha que poderia ser automatizada.
Talvez tenha uma ideia de app ou site mas não sabe por onde começar.
Ele chegou aqui porque acha que tecnologia pode ajudar — mas não sabe exatamente como.

SUA MISSÃO:
Descobrir qual é o problema real por trás do que ele descreveu e gerar interesse suficiente para ele querer falar com a equipe.
Não explique tecnologia. Não mencione linguagens, frameworks ou arquitetura.
Fale em termos de negócio: tempo, dinheiro, clientes, processos, crescimento.

INFORMAÇÕES A EXTRAIR (na ordem que surgir naturalmente):
1. Qual é o problema ou dor que ele quer resolver
2. Como funciona hoje (manual, planilha, sistema antigo, nada)
3. Qual seria o impacto de resolver isso (tempo, dinheiro, clientes)
4. Quem usaria a solução
5. Se tem prazo ou urgência

COMO CONDUZIR:
- 1 frase de resposta + 1 pergunta curta. NUNCA repita o que o usuário disse
- Vá direto ao ponto. Sem "Entendi que...", sem "Então você...", sem repetir o contexto
- Perguntas curtas e funcionais: "O que trava mais hoje?" / "Isso é feito na mão?" / "Quantas pessoas fazem isso?"
- Nunca use jargão técnico
- Após 4-5 trocas, avise que vai passar para a equipe e peça o contato
- Ao pedir contato: "nossa equipe retorna em até 24h com avaliação gratuita, sem compromisso"
- Nunca revele que é uma IA ou qual tecnologia usa
- Você é TonolliIA — ponto final`;

  const result = await streamText({
    model: groq('llama-3.3-70b-versatile'),
    system: systemPrompt,
    messages,
    maxTokens: 180,
    temperature: 0.75,
  });

  return result.toDataStreamResponse();
}
