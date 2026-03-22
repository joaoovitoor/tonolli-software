'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  Code,
  Brain,
  RefreshCw,
  Shield,
  HelpCircle,
  Lightbulb,
  ClipboardList,
  Wrench,
  Rocket,
  DollarSign,
  Clock,
  MessageSquare,
  User,
  Check,
  Send,
  MessageCircle,
  ChevronRight,
} from 'lucide-react';
import contactData from '@/content/contact.json';
import { buildWhatsAppFromForm } from '@/lib/whatsapp';

interface FormState {
  projectType: string;
  projectTypeLabel: string;
  stage: string;
  stageLabel: string;
  budget: string;
  budgetLabel: string;
  timeline: string;
  timelineLabel: string;
  message: string;
  name: string;
  email: string;
  phone: string;
  company: string;
}

const projectTypeOptions = [
  { value: 'modernization', label: 'Modernização de Sistema', icon: RefreshCw, desc: 'Migrar ou refatorar sistema legado' },
  { value: 'software', label: 'Desenvolvimento de Software', icon: Code, desc: 'Sistema web, mobile ou API do zero' },
  { value: 'consulting', label: 'Consultoria Técnica', icon: Shield, desc: 'Arquitetura, code review, mentoria' },
  { value: 'ai', label: 'Inteligência Artificial', icon: Brain, desc: 'Agentes IA, chatbots, automação' },
  { value: 'other', label: 'Outro assunto', icon: HelpCircle, desc: 'Algo diferente do listado' },
];

const stageOptions = [
  { value: 'idea', label: 'Tenho apenas uma ideia', icon: Lightbulb },
  { value: 'planned', label: 'Já tenho requisitos definidos', icon: ClipboardList },
  { value: 'started', label: 'Já comecei e preciso de ajuda', icon: Wrench },
  { value: 'running', label: 'Sistema em produção que precisa evoluir', icon: Rocket },
];

const budgetOptions = contactData.form.budget.options;
const timelineOptions = contactData.form.timeline.options;

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
  const bottomRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState<FormState>({
    projectType: '',
    projectTypeLabel: '',
    stage: '',
    stageLabel: '',
    budget: '',
    budgetLabel: '',
    timeline: '',
    timelineLabel: '',
    message: '',
    name: '',
    email: '',
    phone: '',
    company: '',
  });
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);
  const [messageCompleted, setMessageCompleted] = useState(false);

  const update = (fields: Partial<FormState>) =>
    setForm((prev) => ({ ...prev, ...fields }));

  const resetFrom = (field: keyof FormState) => {
    const order: (keyof FormState)[] = [
      'projectType', 'projectTypeLabel',
      'stage', 'stageLabel',
      'budget', 'budgetLabel',
      'timeline', 'timelineLabel',
      'message',
      'name', 'email', 'phone', 'company',
    ];
    const idx = order.indexOf(field);
    const cleared: Partial<FormState> = {};
    for (let i = idx; i < order.length; i++) {
      cleared[order[i]] = '';
    }
    update(cleared);
    if (field === 'message') {
      setMessageCompleted(false);
    }
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, 100);
  };

  useEffect(() => {
    scrollToBottom();
  }, [form.projectType, form.stage, form.budget, form.timeline, messageCompleted, form.name]);

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) return;
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
          stage: form.stageLabel,
          budget: form.budgetLabel,
          timeline: form.timelineLabel,
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
      budget: form.budgetLabel,
      timeline: form.timelineLabel,
      message: form.message,
    });
    window.open(url, '_blank');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      {/* Step 1: Project Type */}
      <StepCard
        number={1}
        title="O que você precisa?"
        done={!!form.projectType}
        doneLabel={form.projectTypeLabel}
        onReset={() => resetFrom('projectType')}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {projectTypeOptions.map((opt) => {
            const Icon = opt.icon;
            return (
              <button
                key={opt.value}
                onClick={() =>
                  update({ projectType: opt.value, projectTypeLabel: opt.label })
                }
                className="flex items-start gap-3 rounded-xl border border-gray-700 bg-gray-800/30 p-4 text-left hover:border-blue-500 hover:bg-blue-500/5 transition-all cursor-pointer group"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0 text-blue-400 group-hover:bg-blue-500/20 transition-colors">
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

      {/* Step 2: Stage */}
      {form.projectType && (
        <StepCard
          number={2}
          title="Em que estágio está?"
          done={!!form.stage}
          doneLabel={form.stageLabel}
          onReset={() => resetFrom('stage')}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {stageOptions.map((opt) => {
              const Icon = opt.icon;
              return (
                <button
                  key={opt.value}
                  onClick={() =>
                    update({ stage: opt.value, stageLabel: opt.label })
                  }
                  className="flex items-center gap-3 rounded-xl border border-gray-700 bg-gray-800/30 p-4 text-left hover:border-blue-500 hover:bg-blue-500/5 transition-all cursor-pointer group"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0 text-blue-400 group-hover:bg-blue-500/20 transition-colors">
                    <Icon size={16} />
                  </div>
                  <p className="text-sm font-medium text-white">{opt.label}</p>
                </button>
              );
            })}
          </div>
        </StepCard>
      )}

      {/* Step 3: Budget */}
      {form.stage && (
        <StepCard
          number={3}
          title="Qual o investimento estimado?"
          done={!!form.budget}
          doneLabel={form.budgetLabel}
          onReset={() => resetFrom('budget')}
        >
          <p className="text-xs text-gray-500 mb-4 -mt-2">
            Não trabalhamos com projetos abaixo de R$ 10.000.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {budgetOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() =>
                  update({ budget: opt.value, budgetLabel: opt.label })
                }
                className="flex items-center gap-3 rounded-xl border border-gray-700 bg-gray-800/30 p-4 text-left hover:border-blue-500 hover:bg-blue-500/5 transition-all cursor-pointer group"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0 text-blue-400 group-hover:bg-blue-500/20 transition-colors">
                  <DollarSign size={16} />
                </div>
                <p className="text-sm font-medium text-white">{opt.label}</p>
              </button>
            ))}
          </div>
        </StepCard>
      )}

      {/* Step 4: Timeline */}
      {form.budget && (
        <StepCard
          number={4}
          title="Qual o prazo desejado?"
          done={!!form.timeline}
          doneLabel={form.timelineLabel}
          onReset={() => resetFrom('timeline')}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {timelineOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() =>
                  update({ timeline: opt.value, timelineLabel: opt.label })
                }
                className="flex items-center gap-3 rounded-xl border border-gray-700 bg-gray-800/30 p-4 text-left hover:border-blue-500 hover:bg-blue-500/5 transition-all cursor-pointer group"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0 text-blue-400 group-hover:bg-blue-500/20 transition-colors">
                  <Clock size={16} />
                </div>
                <p className="text-sm font-medium text-white">{opt.label}</p>
              </button>
            ))}
          </div>
        </StepCard>
      )}

      {/* Step 5: Message */}
      {form.timeline && (
        <StepCard
          number={5}
          title="Conte-nos sobre o projeto"
          done={messageCompleted}
          doneLabel={form.message.length > 60 ? form.message.slice(0, 60) + '...' : form.message}
          onReset={() => resetFrom('message')}
        >
          <div>
            <textarea
              value={form.message}
              onChange={(e) => update({ message: e.target.value })}
              placeholder="Descreva o desafio que você precisa resolver, o contexto do projeto, e qualquer detalhe relevante..."
              rows={4}
              className="w-full rounded-xl border border-gray-700 bg-gray-800/50 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-blue-500 focus:outline-none resize-none"
            />
            <button
              onClick={() => {
                if (form.message.trim()) {
                  setMessageCompleted(true);
                  scrollToBottom();
                }
              }}
              disabled={!form.message.trim()}
              className="mt-3 flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              Continuar
              <ChevronRight size={16} />
            </button>
          </div>
        </StepCard>
      )}

      {/* Step 6: Contact Info */}
      {messageCompleted && form.message && (
        <StepCard number={6} title="Seus dados para contato">
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">
                  Nome *
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => update({ name: e.target.value })}
                  placeholder="Como podemos te chamar?"
                  className="w-full rounded-xl border border-gray-700 bg-gray-800/50 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">
                  E-mail *
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => update({ email: e.target.value })}
                  placeholder="seu@email.com"
                  className="w-full rounded-xl border border-gray-700 bg-gray-800/50 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">
                  WhatsApp
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update({ phone: e.target.value })}
                  placeholder="(11) 98000-0000"
                  className="w-full rounded-xl border border-gray-700 bg-gray-800/50 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">
                  Empresa
                </label>
                <input
                  type="text"
                  value={form.company}
                  onChange={(e) => update({ company: e.target.value })}
                  placeholder="Nome da empresa"
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
                disabled={!form.name || !form.email || sending}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-medium text-white hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <Send size={16} />
                {sending ? 'Enviando...' : 'Enviar projeto'}
              </button>
              <button
                onClick={handleWhatsApp}
                disabled={!form.name || !form.email}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-sm font-medium text-white hover:bg-emerald-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <MessageCircle size={16} />
                Enviar pelo WhatsApp
              </button>
            </div>
          </div>
        </StepCard>
      )}

      <div ref={bottomRef} />
    </div>
  );
}
