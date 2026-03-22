'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  Code,
  Brain,
  RefreshCw,
  Shield,
  HelpCircle,
  Check,
  Send,
  MessageCircle,
  ChevronRight,
} from 'lucide-react';
import { buildWhatsAppFromForm } from '@/lib/whatsapp';

interface FormState {
  name: string;
  company: string;
  projectType: string;
  projectTypeLabel: string;
  message: string;
  email: string;
  phone: string;
}

const projectTypeOptions = [
  { value: 'modernization', label: 'Modernização de Sistema', icon: RefreshCw, desc: 'Migrar ou refatorar sistema legado' },
  { value: 'software', label: 'Desenvolvimento de Software', icon: Code, desc: 'Sistema web, mobile ou API do zero' },
  { value: 'consulting', label: 'Consultoria Técnica', icon: Shield, desc: 'Arquitetura, code review, mentoria' },
  { value: 'ai', label: 'Inteligência Artificial', icon: Brain, desc: 'Agentes IA, chatbots, automação' },
  { value: 'other', label: 'Outro assunto', icon: HelpCircle, desc: 'Algo diferente do listado' },
];

const messagePlaceholders: Record<string, string> = {
  modernization: 'Descreva o sistema atual: tecnologia, idade aproximada, principais problemas e o que precisa mudar...',
  software: 'Descreva o sistema que precisa construir: funcionalidades principais, usuários, integrações necessárias...',
  consulting: 'Descreva o contexto: qual decisão técnica precisa tomar ou qual problema quer resolver...',
  ai: 'Descreva o processo que quer automatizar ou onde IA pode ajudar no seu negócio...',
  other: 'Descreva o que precisa — qualquer detalhe é bem-vindo...',
};

function StepCard({
  number,
  title,
  done,
  doneLabel,
  onReset,
  children,
}: {
  number: number;
  title: string;
  done?: boolean;
  doneLabel?: string;
  onReset?: () => void;
  children: React.ReactNode;
}) {
  if (done) {
    return (
      <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-5 animate-fade-in-up">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
            <Check className="h-5 w-5 text-emerald-500" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
              Passo {number}
            </p>
            <p className="text-[15px] font-medium text-white truncate">
              {doneLabel || title}
            </p>
          </div>
          {onReset && (
            <button
              onClick={onReset}
              className="text-[12px] text-gray-500 hover:text-gray-300 font-medium px-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors shrink-0 cursor-pointer"
            >
              Alterar
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-5 md:p-6 animate-fade-in-up">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
          <span className="text-sm font-bold text-blue-400">{number}</span>
        </div>
        <p className="text-[15px] font-semibold text-white">{title}</p>
      </div>
      {children}
    </div>
  );
}

export default function ContactWizard() {
  const router = useRouter();
  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);
  const step4Ref = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState<FormState>({
    name: '',
    company: '',
    projectType: '',
    projectTypeLabel: '',
    message: '',
    email: '',
    phone: '',
  });
  const [nameCompleted, setNameCompleted] = useState(false);
  const [messageCompleted, setMessageCompleted] = useState(false);
  const [selectingValue, setSelectingValue] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const update = (fields: Partial<FormState>) =>
    setForm((prev) => ({ ...prev, ...fields }));

  const resetStep = (from: 'name' | 'projectType' | 'message') => {
    if (from === 'name') {
      setForm({ name: '', company: '', projectType: '', projectTypeLabel: '', message: '', email: '', phone: '' });
      setNameCompleted(false);
      setMessageCompleted(false);
    } else if (from === 'projectType') {
      update({ projectType: '', projectTypeLabel: '', message: '', email: '', phone: '' });
      setMessageCompleted(false);
    } else if (from === 'message') {
      update({ message: '', email: '', phone: '' });
      setMessageCompleted(false);
    }
    setSubmitAttempted(false);
  };

  const selectWithFeedback = (value: string, updateFn: () => void) => {
    setSelectingValue(value);
    setTimeout(() => {
      setSelectingValue(null);
      updateFn();
    }, 150);
  };

  const scrollToStep = (ref: React.RefObject<HTMLDivElement>) => {
    setTimeout(() => {
      ref.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 200);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { if (nameCompleted) scrollToStep(step2Ref); }, [nameCompleted]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { if (form.projectType) scrollToStep(step3Ref); }, [form.projectType]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { if (messageCompleted) scrollToStep(step4Ref); }, [messageCompleted]);

  const currentStep = !nameCompleted ? 1
    : !form.projectType ? 2
    : !messageCompleted ? 3
    : 4;

  const progressPct = ((currentStep - 1) / 4) * 100;

  const handleSubmit = async () => {
    setSubmitAttempted(true);
    if (!form.email) return;
    setSending(true);
    setSendError(false);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          company: form.company,
          projectType: form.projectTypeLabel,
          message: form.message,
        }),
      });
      if (!res.ok) throw new Error('send failed');
      router.push('/contato/obrigado');
    } catch {
      setSendError(true);
    } finally {
      setSending(false);
    }
  };

  const handleWhatsApp = () => {
    const url = buildWhatsAppFromForm({
      name: form.name,
      company: form.company,
      projectType: form.projectTypeLabel,
      message: form.message,
    });
    window.open(url, '_blank');
  };

  const optionClass = (value: string) =>
    `flex items-start gap-3 rounded-xl border p-4 text-left transition-all cursor-pointer group ${
      selectingValue === value
        ? 'border-blue-400 bg-blue-500/15 scale-[0.98]'
        : 'border-gray-700 bg-gray-800/30 hover:border-blue-500 hover:bg-blue-500/5'
    }`;

  const iconClass = (value: string) =>
    `w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
      selectingValue === value
        ? 'bg-blue-500/30 text-blue-300'
        : 'bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20'
    }`;

  const inputClass = (hasError: boolean) =>
    `w-full rounded-xl border px-4 py-3 text-sm text-white placeholder:text-gray-500 bg-gray-800/50 focus:outline-none transition-colors ${
      hasError ? 'border-red-500 focus:border-red-400' : 'border-gray-700 focus:border-blue-500'
    }`;

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      {/* Progress bar */}
      <div className="mb-2">
        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
          <span>Passo {currentStep} de 4</span>
          <span>{Math.round(progressPct)}% concluído</span>
        </div>
        <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Step 1: Quem é você */}
      <StepCard
        number={1}
        title="Quem é você?"
        done={nameCompleted}
        doneLabel={form.company ? `${form.name} · ${form.company}` : form.name}
        onReset={() => resetStep('name')}
      >
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">Nome *</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => update({ name: e.target.value })}
                onKeyDown={(e) => { if (e.key === 'Enter' && form.name.trim()) setNameCompleted(true); }}
                placeholder="Seu nome"
                className="w-full rounded-xl border border-gray-700 bg-gray-800/50 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                autoFocus
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">Empresa</label>
              <input
                type="text"
                value={form.company}
                onChange={(e) => update({ company: e.target.value })}
                onKeyDown={(e) => { if (e.key === 'Enter' && form.name.trim()) setNameCompleted(true); }}
                placeholder="Nome da empresa"
                className="w-full rounded-xl border border-gray-700 bg-gray-800/50 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>
          <button
            onClick={() => { if (form.name.trim()) setNameCompleted(true); }}
            disabled={!form.name.trim()}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            Continuar
            <ChevronRight size={16} />
          </button>
        </div>
      </StepCard>

      {/* Step 2: O que você precisa */}
      {nameCompleted && (
        <div ref={step2Ref}>
          <StepCard
            number={2}
            title="O que você precisa?"
            done={!!form.projectType}
            doneLabel={form.projectTypeLabel}
            onReset={() => resetStep('projectType')}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {projectTypeOptions.map((opt) => {
                const Icon = opt.icon;
                return (
                  <button
                    key={opt.value}
                    onClick={() =>
                      selectWithFeedback(opt.value, () =>
                        update({ projectType: opt.value, projectTypeLabel: opt.label })
                      )
                    }
                    className={optionClass(opt.value)}
                  >
                    <div className={iconClass(opt.value)}>
                      <Icon size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{opt.label}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{opt.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </StepCard>
        </div>
      )}

      {/* Step 3: Descreva o problema */}
      {form.projectType && (
        <div ref={step3Ref}>
          <StepCard
            number={3}
            title="Descreva o problema"
            done={messageCompleted}
            doneLabel={form.message.length > 60 ? form.message.slice(0, 60) + '...' : form.message}
            onReset={() => resetStep('message')}
          >
            <div>
              <textarea
                value={form.message}
                onChange={(e) => update({ message: e.target.value })}
                placeholder={messagePlaceholders[form.projectType] || messagePlaceholders.other}
                rows={4}
                className="w-full rounded-xl border border-gray-700 bg-gray-800/50 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-blue-500 focus:outline-none resize-none"
                autoFocus
              />
              <button
                onClick={() => { if (form.message.trim()) setMessageCompleted(true); }}
                disabled={!form.message.trim()}
                className="mt-3 flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                Continuar
                <ChevronRight size={16} />
              </button>
            </div>
          </StepCard>
        </div>
      )}

      {/* Step 4: Contato */}
      {messageCompleted && (
        <div ref={step4Ref}>
          <StepCard number={4} title="Seu contato">
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5">E-mail *</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => update({ email: e.target.value })}
                    placeholder="seu@email.com"
                    className={inputClass(submitAttempted && !form.email)}
                    autoFocus
                  />
                  {submitAttempted && !form.email && (
                    <p className="mt-1 text-xs text-red-400">Campo obrigatório</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5">WhatsApp</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => update({ phone: e.target.value })}
                    placeholder="(11) 98000-0000"
                    className="w-full rounded-xl border border-gray-700 bg-gray-800/50 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {sendError && (
                <p className="text-sm text-red-400 text-center">
                  Erro ao enviar. Tente pelo WhatsApp ou contate-nos diretamente.
                </p>
              )}

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={handleSubmit}
                  disabled={sending}
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-medium text-white hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  <Send size={16} />
                  {sending ? 'Enviando...' : 'Enviar'}
                </button>
                <button
                  onClick={handleWhatsApp}
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-sm font-medium text-white hover:bg-emerald-700 transition-colors cursor-pointer"
                >
                  <MessageCircle size={16} />
                  Enviar pelo WhatsApp
                </button>
              </div>
            </div>
          </StepCard>
        </div>
      )}
    </div>
  );
}
