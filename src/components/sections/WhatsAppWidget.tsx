'use client';

import { useState } from 'react';
import { MessageCircle, X, Send, ArrowLeft } from 'lucide-react';
import contactData from '@/content/contact.json';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

type Step = 'greeting' | 'questions' | 'message' | 'sending';

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<Step>('greeting');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const questions = contactData.whatsappWidget.questions;

  const reset = () => {
    setStep('greeting');
    setCurrentQuestion(0);
    setAnswers({});
    setName('');
    setMessage('');
  };

  const handleOpen = () => {
    setIsOpen(true);
    reset();
  };

  const handleSelectOption = (questionId: string, value: string, label: string) => {
    const newAnswers = { ...answers, [questionId]: label };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setStep('message');
    }
  };

  const handleSend = () => {
    const url = buildWhatsAppUrl({
      name,
      projectType: answers['type'],
      stage: answers['stage'],
      message,
    });
    window.open(url, '_blank');
    setIsOpen(false);
    reset();
  };

  const handleBack = () => {
    if (step === 'message') {
      setCurrentQuestion(questions.length - 1);
      setStep('questions');
    } else if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      setStep('greeting');
    }
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={handleOpen}
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 hover:bg-emerald-600 transition-[background-color,transform] hover:scale-105 cursor-pointer"
          aria-label="Abrir WhatsApp"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] rounded-2xl border border-gray-700 bg-gray-900 shadow-2xl overflow-hidden overscroll-contain">
          <div className="flex items-center justify-between bg-emerald-600 px-4 py-3">
            <div className="flex items-center gap-3">
              {step !== 'greeting' && (
                <button
                  onClick={handleBack}
                  className="text-white/80 hover:text-white transition-colors cursor-pointer"
                  aria-label="Voltar"
                >
                  <ArrowLeft size={18} />
                </button>
              )}
              <div>
                <p className="text-sm font-semibold text-white">
                  Tonolli Software
                </p>
                <p className="text-xs text-emerald-100">Online agora</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors cursor-pointer"
              aria-label="Fechar"
            >
              <X size={18} />
            </button>
          </div>

          <div className="p-4 min-h-[280px] flex flex-col">
            {step === 'greeting' && (
              <div className="flex flex-col gap-4 flex-1">
                <div className="bg-gray-800 rounded-xl p-3 text-sm text-gray-200 max-w-[85%]">
                  {contactData.whatsappWidget.greeting}
                </div>
                <div className="mt-auto">
                  <label htmlFor="wa-name" className="block text-xs text-gray-400 mb-1.5">
                    Seu nome
                  </label>
                  <input
                    id="wa-name"
                    type="text"
                    name="name"
                    autoComplete="given-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Como posso te chamar\u2026"
                    className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2.5 text-sm text-white placeholder:text-gray-500 focus:border-emerald-500 focus:outline-none"
                  />
                  <button
                    onClick={() => setStep('questions')}
                    disabled={!name.trim()}
                    className="mt-3 w-full rounded-lg bg-emerald-600 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  >
                    Continuar
                  </button>
                </div>
              </div>
            )}

            {step === 'questions' && (
              <div className="flex flex-col gap-4 flex-1">
                <div className="bg-gray-800 rounded-xl p-3 text-sm text-gray-200 max-w-[85%]">
                  Oi {name}! {questions[currentQuestion].question}
                </div>
                <div className="flex flex-col gap-2 mt-2">
                  {questions[currentQuestion].options.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() =>
                        handleSelectOption(
                          questions[currentQuestion].id,
                          opt.value,
                          opt.label
                        )
                      }
                      className="w-full text-left rounded-lg border border-gray-700 bg-gray-800/50 px-4 py-3 text-sm text-gray-200 hover:border-emerald-500 hover:bg-emerald-500/10 transition-colors cursor-pointer"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
                <div className="mt-auto text-center">
                  <span className="text-xs text-gray-500">
                    {currentQuestion + 1} de {questions.length}
                  </span>
                </div>
              </div>
            )}

            {step === 'message' && (
              <div className="flex flex-col gap-4 flex-1">
                <div className="bg-gray-800 rounded-xl p-3 text-sm text-gray-200 max-w-[85%]">
                  Perfeito, {name}! Quer adicionar algum detalhe sobre o projeto?
                </div>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Descreva brevemente seu projeto (opcional)\u2026"
                  rows={3}
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2.5 text-sm text-white placeholder:text-gray-500 focus:border-emerald-500 focus:outline-none resize-none"
                />
                <button
                  onClick={handleSend}
                  className="mt-auto w-full flex items-center justify-center gap-2 rounded-lg bg-emerald-600 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 transition-colors cursor-pointer"
                >
                  <Send size={16} />
                  Enviar via WhatsApp
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
