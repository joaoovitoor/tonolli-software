import siteData from '@/content/site.json';

interface ContactData {
  name?: string;
  projectType?: string;
  stage?: string;
  message?: string;
}

export function buildWhatsAppUrl(data?: ContactData): string {
  const phone = siteData.contact.whatsapp;

  if (!data) {
    return `https://wa.me/${phone}`;
  }

  const parts: string[] = ['*Nova solicitação via site Tonolli Software*\n'];

  if (data.name) parts.push(`*Nome:* ${data.name}`);
  if (data.projectType) parts.push(`*Tipo:* ${data.projectType}`);
  if (data.stage) parts.push(`*Estágio:* ${data.stage}`);
  if (data.message) parts.push(`\n*Mensagem:*\n${data.message}`);

  const text = encodeURIComponent(parts.join('\n'));
  return `https://wa.me/${phone}?text=${text}`;
}

export function buildEmailBody(data: {
  name: string;
  email: string;
  phone: string;
  company: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
}): string {
  return [
    `Nome: ${data.name}`,
    `Email: ${data.email}`,
    `Telefone: ${data.phone}`,
    `Empresa: ${data.company}`,
    `Tipo de Projeto: ${data.projectType}`,
    `Orçamento: ${data.budget}`,
    `Prazo: ${data.timeline}`,
    `\nMensagem:\n${data.message}`,
  ].join('\n');
}

export function buildWhatsAppFromForm(data: {
  name: string;
  company: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
}): string {
  const phone = siteData.contact.whatsapp;
  const parts = [
    '*Nova solicitação via site Tonolli Software*\n',
    `*Nome:* ${data.name}`,
    `*Empresa:* ${data.company}`,
    `*Tipo:* ${data.projectType}`,
    `*Orçamento:* ${data.budget}`,
    `*Prazo:* ${data.timeline}`,
    `\n*Descrição:*\n${data.message}`,
  ];

  const text = encodeURIComponent(parts.join('\n'));
  return `https://wa.me/${phone}?text=${text}`;
}
