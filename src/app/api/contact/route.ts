import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, phone, company, projectType, stage, budget, timeline, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Campos obrigatórios ausentes.' }, { status: 400 });
  }

  const rows = [
    ['Nome', name],
    ['E-mail', email],
    phone && ['WhatsApp', phone],
    company && ['Empresa', company],
    projectType && ['Tipo de projeto', projectType],
    stage && ['Estágio', stage],
    budget && ['Investimento', budget],
    timeline && ['Prazo', timeline],
  ].filter(Boolean) as [string, string][];

  const tableRows = rows
    .map(([label, value]) => `<tr><td style="padding:6px 12px;color:#9ca3af;font-size:14px;white-space:nowrap">${label}</td><td style="padding:6px 12px;color:#f9fafb;font-size:14px">${value}</td></tr>`)
    .join('');

  const html = `
    <div style="background:#111827;color:#f9fafb;font-family:sans-serif;padding:32px;border-radius:12px;max-width:600px">
      <h2 style="color:#fff;margin:0 0 4px">Nova solicitação via site</h2>
      <p style="color:#6b7280;margin:0 0 24px;font-size:14px">Tonolli Software — Formulário de contato</p>
      <table style="border-collapse:collapse;width:100%;background:#1f2937;border-radius:8px;overflow:hidden">
        <tbody>${tableRows}</tbody>
      </table>
      <div style="margin-top:24px">
        <p style="color:#9ca3af;font-size:13px;margin:0 0 8px">Mensagem:</p>
        <div style="background:#1f2937;border-radius:8px;padding:16px;color:#f9fafb;font-size:14px;line-height:1.6;white-space:pre-wrap">${message}</div>
      </div>
      <p style="color:#4b5563;font-size:12px;margin-top:24px">Responder para: <a href="mailto:${email}" style="color:#60a5fa">${email}</a></p>
    </div>
  `;

  const { error } = await resend.emails.send({
    from: 'Tonolli Software <onboarding@resend.dev>',
    to: 'joaoovitoor@hotmail.com',
    replyTo: email,
    subject: `Novo projeto: ${projectType || 'Contato'} — ${name}`,
    html,
  });

  if (error) {
    console.error('Resend error:', error);
    return NextResponse.json({ error: 'Erro ao enviar email.' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
