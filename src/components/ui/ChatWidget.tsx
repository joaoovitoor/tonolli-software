'use client';

import { useChat } from '@ai-sdk/react';
import { useEffect, useRef, useState } from 'react';
import { X, Send, Bot, Sparkles, Loader2, MessageCircle, Mic, MicOff } from 'lucide-react';

const WHATSAPP_NUMBER = '5511980668176';

type VisitorInfo = {
  org: string | null;
  city: string | null;
  country: string | null;
  region: string | null;
  isLocal?: boolean;
};

type CaptureData = {
  name: string;
  email: string;
  whatsapp: string;
};

function cleanOrg(org: string): string {
  return org.replace(/^AS\d+\s/, '').trim();
}

function isISP(org: string): boolean {
  const keywords = [
    'vivo', 'claro', 'tim ', 'oi ', 'net ', 'telemar', 'embratel',
    'comcast', 'at&t', 'verizon', 'telefonica', 'telecom italia',
    'telmex', 'speedy', 'sky ', 'net claro', 'brtelecom',
  ];
  return keywords.some((k) => org.toLowerCase().includes(k));
}

async function getBrowserCity(): Promise<string | null> {
  if (typeof window === 'undefined' || !navigator.geolocation) return null;
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
            { headers: { 'Accept-Language': 'pt-BR' } }
          );
          const data = await res.json();
          const city =
            data.address?.city ||
            data.address?.town ||
            data.address?.municipality ||
            data.address?.county ||
            null;
          resolve(city);
        } catch {
          resolve(null);
        }
      },
      () => resolve(null),
      { timeout: 5000 }
    );
  });
}

function getVisitorName(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('tonolli-visitor-name');
}

function buildGreeting(info: VisitorInfo): string {
  const city = !info.isLocal ? info.city : null;
  const name = getVisitorName();

  // Visitante retornando (já deu o nome antes)
  if (name) {
    return `Oi, ${name}! Sou a Tonolli IA.${city ? ` Vi que você está falando de ${city}.` : ''}\n\nComo posso te ajudar hoje?`;
  }

  // Visitante novo com cidade identificada
  if (city) {
    return `Oi! Eu sou a Tonolli IA.\n\nVi que você está falando de ${city} — qual é o seu nome?`;
  }

  // Visitante novo sem localização
  return `Oi! Eu sou a Tonolli IA.\n\nQual é o seu nome?`;
}

function buildWhatsAppSummary(
  captureData: CaptureData,
  visitorInfo: VisitorInfo | null,
  conversationHistory: string
): string {
  const org = visitorInfo?.org ? cleanOrg(visitorInfo.org) : null;
  const parts = [
    `*🤖 Lead via Chat IA — Tonolli Software*\n`,
    `*Nome:* ${captureData.name}`,
    `*E-mail:* ${captureData.email}`,
    captureData.whatsapp && `*WhatsApp:* ${captureData.whatsapp}`,
    org && `*Empresa (IP):* ${org}`,
    visitorInfo?.city && `*Cidade:* ${visitorInfo.city}`,
    `\n*Conversa resumida:*\n${conversationHistory}`,
  ].filter(Boolean);

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(parts.join('\n'))}`;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [visitorInfo, setVisitorInfo] = useState<VisitorInfo | null>(null);
  const [showCapture, setShowCapture] = useState(false);
  const [captureData, setCaptureData] = useState<CaptureData>({ name: '', email: '', whatsapp: '' });
  const [captureSent, setCaptureSent] = useState(false);
  const [captureLoading, setCaptureLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const aiResponseCount = useRef(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages } = useChat({
    api: '/api/chat',
    onFinish: () => {
      aiResponseCount.current += 1;
      if (aiResponseCount.current >= 3 && !captureSent && !showCapture) {
        setTimeout(() => setShowCapture(true), 800);
      }
    },
    onError: () => {},
  });

  // Fetch visitor info, set greeting e abre o chat
  useEffect(() => {
    fetch('/api/visitor-info')
      .then((r) => r.json())
      .then(async (data: VisitorInfo) => {
        if (!data.city || data.isLocal) {
          const geoCity = await getBrowserCity();
          if (geoCity) data = { ...data, city: geoCity, isLocal: false };
        }
        setVisitorInfo(data);
        setMessages([
          { id: 'greeting', role: 'assistant', content: buildGreeting(data), createdAt: new Date() },
        ]);
        // Abre automaticamente na primeira visita da sessão
        if (!sessionStorage.getItem('tonolli-ai-chat-opened')) {
          setIsOpen(true);
          sessionStorage.setItem('tonolli-ai-chat-opened', '1');
        }
      })
      .catch(() => {
        setMessages([
          {
            id: 'greeting',
            role: 'assistant',
            content: 'Oi! Eu sou a Tonolli IA.\n\nQual é o seu nome?',
            createdAt: new Date(),
          },
        ]);
        if (!sessionStorage.getItem('tonolli-ai-chat-opened')) {
          setIsOpen(true);
          sessionStorage.setItem('tonolli-ai-chat-opened', '1');
        }
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, showCapture]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 150);
  }, [isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
    sessionStorage.setItem('tonolli-ai-chat-opened', '1');
  };

  const handleCaptureSubmit = async () => {
    if (!captureData.name.trim() || !captureData.email.trim()) return;
    setCaptureLoading(true);

    // Build conversation history for the notifications
    const history = messages
      .filter((m) => m.id !== 'greeting')
      .map((m) => `${m.role === 'user' ? '👤 Cliente' : '🤖 Lucas'}: ${m.content}`)
      .join('\n');

    const org = visitorInfo?.org ? cleanOrg(visitorInfo.org) : undefined;

    try {
      // Save name for returning visits
      localStorage.setItem('tonolli-visitor-name', captureData.name.split(' ')[0]);

      // 1. Send email via Resend (server-side, automatic)
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: captureData.name,
          email: captureData.email,
          phone: captureData.whatsapp || undefined,
          company: org,
          message: `Lead capturado via Chat IA\n\nCidade: ${visitorInfo?.city || '?'} | Organização: ${org || '?'}\n\n— Conversa —\n${history}`,
        }),
      });

      setCaptureSent(true);
      setShowCapture(false);

      // 2. Open WhatsApp with pre-filled message (notifies João automatically)
      const waUrl = buildWhatsAppSummary(captureData, visitorInfo, history);
      window.open(waUrl, '_blank');

      setMessages((prev) => [
        ...prev,
        {
          id: 'capture-confirm',
          role: 'assistant',
          content: `Perfeito, ${captureData.name}! 🎉\n\nJá notifiquei nossa equipe por e-mail e WhatsApp. Alguém vai entrar em contato com você em breve com uma avaliação inicial.\n\nPosso ajudar com mais alguma coisa enquanto isso?`,
          createdAt: new Date(),
        },
      ]);
    } catch {
      // silent fail
    } finally {
      setCaptureLoading(false);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setIsTranscribing(true);
        try {
          const form = new FormData();
          form.append('audio', blob);
          const res = await fetch('/api/transcribe', { method: 'POST', body: form });
          const data = await res.json();
          if (data.text) {
            // Inject transcribed text into input and focus
            const nativeInputSetter = Object.getOwnPropertyDescriptor(
              window.HTMLInputElement.prototype, 'value'
            )?.set;
            if (inputRef.current && nativeInputSetter) {
              nativeInputSetter.call(inputRef.current, data.text);
              inputRef.current.dispatchEvent(new Event('input', { bubbles: true }));
            }
            inputRef.current?.focus();
          }
        } finally {
          setIsTranscribing(false);
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch {
      alert('Permita o acesso ao microfone para usar o áudio.');
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  return (
    <div className="hidden md:block">
      {/* Desktop only — hidden on mobile */}
      {!isOpen && (
        <button
          onClick={handleOpen}
          style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999 }}
          className="flex items-center gap-2.5 rounded-full bg-indigo-600 px-4 py-3 text-white shadow-lg shadow-indigo-500/40 hover:bg-indigo-700 transition-all hover:scale-105 cursor-pointer relative overflow-hidden"
          aria-label="Fale com nossa IA"
        >
          <span className="absolute inset-0 rounded-full bg-indigo-400/25 animate-ping" />
          <Sparkles size={16} className="relative shrink-0" />
          <span className="text-sm font-semibold relative">Fale com nossa IA</span>
        </button>
      )}

      {/* Chat window — bottom right */}
      {isOpen && (
        <div
          style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999, height: '540px' }}
          className="flex flex-col w-[380px] max-w-[calc(100vw-3rem)] rounded-2xl border border-white/10 bg-gray-950 shadow-2xl shadow-black/60 overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between bg-gradient-to-r from-indigo-950 to-purple-950 px-4 py-3 border-b border-white/5 shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-indigo-500/20 border border-indigo-500/30">
                <Bot size={16} className="text-indigo-300" />
                <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-gray-950 bg-emerald-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white leading-none">
                  TonolliIA <span className="text-indigo-400 font-normal text-xs">· Tonolli Software</span>
                </p>
                <p className="mt-0.5 text-[11px] text-indigo-300/60 leading-none">
                  IA · responde agora
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-white transition-colors cursor-pointer p-1 rounded-lg hover:bg-white/5"
              aria-label="Fechar"
            >
              <X size={16} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500/20 border border-indigo-500/30 mb-0.5">
                    <Bot size={11} className="text-indigo-400" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap break-words ${
                    msg.role === 'user'
                      ? 'bg-indigo-600 text-white rounded-br-sm'
                      : 'bg-gray-800/80 text-gray-100 border border-white/5 rounded-bl-sm'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isLoading && (
              <div className="flex items-end gap-2">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500/20 border border-indigo-500/30">
                  <Bot size={11} className="text-indigo-400" />
                </div>
                <div className="bg-gray-800/80 border border-white/5 rounded-2xl rounded-bl-sm px-4 py-3">
                  <span className="flex gap-1 items-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-bounce [animation-delay:0ms]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-bounce [animation-delay:150ms]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-bounce [animation-delay:300ms]" />
                  </span>
                </div>
              </div>
            )}

            {/* Lead capture card */}
            {showCapture && !captureSent && (
              <div className="rounded-xl border border-indigo-500/30 bg-indigo-950/50 p-4 space-y-2.5">
                <p className="text-xs font-semibold text-indigo-200">
                  📋 Ótimo! Vou passar isso para nossa equipe.
                </p>
                <p className="text-xs text-indigo-300/70">Onde podemos te retornar?</p>
                <input
                  type="text"
                  placeholder="Seu nome"
                  value={captureData.name}
                  onChange={(e) => setCaptureData((p) => ({ ...p, name: e.target.value }))}
                  className="w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-xs text-white placeholder:text-gray-500 focus:border-indigo-500 focus:outline-none transition-colors"
                />
                <input
                  type="email"
                  placeholder="Seu e-mail"
                  value={captureData.email}
                  onChange={(e) => setCaptureData((p) => ({ ...p, email: e.target.value }))}
                  className="w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-xs text-white placeholder:text-gray-500 focus:border-indigo-500 focus:outline-none transition-colors"
                />
                <input
                  type="tel"
                  placeholder="WhatsApp (opcional)"
                  value={captureData.whatsapp}
                  onChange={(e) => setCaptureData((p) => ({ ...p, whatsapp: e.target.value }))}
                  onKeyDown={(e) => e.key === 'Enter' && handleCaptureSubmit()}
                  className="w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-xs text-white placeholder:text-gray-500 focus:border-indigo-500 focus:outline-none transition-colors"
                />
                <div className="flex gap-2 pt-1">
                  <button
                    onClick={handleCaptureSubmit}
                    disabled={!captureData.name.trim() || !captureData.email.trim() || captureLoading}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-indigo-600 py-2.5 text-xs font-semibold text-white hover:bg-indigo-700 disabled:opacity-40 cursor-pointer transition-colors"
                  >
                    {captureLoading ? (
                      <Loader2 size={12} className="animate-spin" />
                    ) : (
                      <>
                        <MessageCircle size={12} />
                        Enviar e abrir WhatsApp
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => setShowCapture(false)}
                    className="rounded-lg border border-gray-700 px-3 py-2 text-xs text-gray-400 hover:text-white cursor-pointer transition-colors"
                  >
                    Depois
                  </button>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input bar */}
          <div className="border-t border-white/5 p-3 shrink-0">
            <form
              onSubmit={handleSubmit}
              className={`flex items-center gap-2 rounded-xl border bg-gray-900/60 px-3 py-2 transition-colors ${isRecording ? 'border-red-500/60' : 'border-gray-700/60 focus-within:border-indigo-500/50'}`}
            >
              <input
                ref={inputRef}
                value={input}
                onChange={handleInputChange}
                placeholder={isRecording ? 'Gravando...' : isTranscribing ? 'Transcrevendo...' : 'Digite ou fale sua mensagem...'}
                disabled={isLoading || isRecording || isTranscribing}
                className="flex-1 bg-transparent text-sm text-white placeholder:text-gray-500 focus:outline-none disabled:opacity-50"
              />
              {/* Mic button */}
              <button
                type="button"
                onClick={isRecording ? stopRecording : startRecording}
                disabled={isLoading || isTranscribing}
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors cursor-pointer disabled:opacity-40 ${isRecording ? 'bg-red-500 hover:bg-red-600 animate-pulse' : 'text-gray-500 hover:text-white hover:bg-white/10'}`}
                aria-label={isRecording ? 'Parar gravação' : 'Gravar áudio'}
              >
                {isTranscribing ? (
                  <Loader2 size={13} className="animate-spin text-indigo-400" />
                ) : isRecording ? (
                  <MicOff size={13} className="text-white" />
                ) : (
                  <Mic size={13} />
                )}
              </button>
              {/* Send button */}
              <button
                type="submit"
                disabled={!input.trim() || isLoading || isRecording}
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-40 cursor-pointer transition-colors"
                aria-label="Enviar"
              >
                {isLoading ? <Loader2 size={13} className="animate-spin" /> : <Send size={13} />}
              </button>
            </form>
            <p className="mt-1.5 text-center text-[10px] text-gray-700">
              Powered by Tonolli IA · Llama 3.3 · Whisper
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
