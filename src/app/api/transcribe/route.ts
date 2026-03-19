export async function POST(request: Request) {
  if (!process.env.GROQ_API_KEY) {
    return Response.json({ error: 'GROQ_API_KEY não configurada.' }, { status: 500 });
  }

  try {
    const formData = await request.formData();
    const audio = formData.get('audio') as Blob;

    if (!audio) {
      return Response.json({ error: 'Nenhum áudio recebido.' }, { status: 400 });
    }

    // Forward to Groq Whisper
    const groqForm = new FormData();
    groqForm.append('file', audio, 'audio.webm');
    groqForm.append('model', 'whisper-large-v3-turbo');
    groqForm.append('language', 'pt');
    groqForm.append('response_format', 'json');

    const response = await fetch('https://api.groq.com/openai/v1/audio/transcriptions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.GROQ_API_KEY}` },
      body: groqForm,
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('Groq Whisper error:', err);
      return Response.json({ error: 'Erro na transcrição.' }, { status: 500 });
    }

    const data = await response.json();
    return Response.json({ text: data.text?.trim() ?? '' });
  } catch (err) {
    console.error('Transcribe error:', err);
    return Response.json({ error: 'Erro interno.' }, { status: 500 });
  }
}
