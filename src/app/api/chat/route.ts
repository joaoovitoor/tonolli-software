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
A empresa tem 19 anos de experiência em arquitetura de sistemas escaláveis.
Atende empresas no Brasil e nos EUA (clientes: Som Livre/Sony, CRED, agronegócio).
Especialidades: Agentes de IA, LangChain, RAG, automações com LLMs, Next.js, Node.js, TypeScript, sistemas escaláveis.
IMPORTANTE: Nunca mencione nomes de pessoas da equipe durante a conversa.

${visitorContext ? `CONTEXTO DO VISITANTE ATUAL:\n${visitorContext}\n` : ''}
SUA MISSÃO:
Conduzir uma conversa consultiva para entender o projeto do visitante e qualificá-lo como lead.
Ao final, você vai encaminhar as informações para a equipe técnica preparar uma proposta.

INFORMAÇÕES A EXTRAIR (de forma natural, nunca como questionário):
1. Nome e empresa
2. Qual é o problema ou desafio que precisa resolver
3. Tipo de solução que precisa: software sob medida, IA/automação, modernização de sistema legado, consultoria técnica
4. Escala e contexto: quantos usuários, volume de dados, integrações necessárias
5. Orçamento disponível (mesmo que estimado)
6. Prazo desejado para ter a solução
7. Melhor contato: e-mail e WhatsApp

COMO CONDUZIR A CONVERSA:
- RESPOSTAS CURTAS: máximo 2 frases + 1 pergunta. O usuário não lê textos longos no chat
- Faça UMA pergunta por vez — espere a resposta antes de fazer outra
- Seja direto e objetivo, sem floreios ou introduções longas
- Use linguagem informal e profissional, em português brasileiro
- Após 3-4 trocas, diga que vai passar para a equipe e peça o contato
- Antes de pedir o contato, crie expectativa: retorno em até 24h com avaliação inicial gratuita
- Nunca revele que é uma IA ou qual tecnologia usa por baixo
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
