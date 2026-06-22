import { Resend } from 'resend';

export const onRequestPost = async (context: {
  request: Request;
  env: { RESEND_API_KEY: string };
}) => {
  try {
    const body = (await context.request.json()) as {
      name: string;
      email: string;
      phone?: string;
      company?: string;
      projectType: string;
      message: string;
    };

    if (!body.name || !body.email || !body.message) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const resend = new Resend(context.env.RESEND_API_KEY);

    const lines = [
      `Nome: ${body.name}`,
      body.company ? `Empresa: ${body.company}` : null,
      `E-mail: ${body.email}`,
      body.phone ? `WhatsApp: ${body.phone}` : null,
      `Tipo de Projeto: ${body.projectType}`,
      '',
      'Mensagem:',
      body.message,
    ]
      .filter((l) => l !== null)
      .join('\n');

    await resend.emails.send({
      from: 'Tonolli Software <contato@tonollisoftware.com.br>',
      to: 'joaoovitoor@hotmail.com',
      replyTo: body.email,
      subject: `[Site] ${body.projectType} — ${body.name}`,
      text: lines,
    });

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('contact form error:', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
