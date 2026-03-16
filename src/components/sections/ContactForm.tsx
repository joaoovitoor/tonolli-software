'use client';

import { useState } from 'react';
import { Send, MessageCircle } from 'lucide-react';
import contactData from '@/content/contact.json';
import { buildWhatsAppFromForm } from '@/lib/whatsapp';

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
}

export default function ContactForm() {
  const { form } = contactData;
  const [data, setData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const update = (field: keyof FormData, value: string) =>
    setData((prev) => ({ ...prev, [field]: value }));

  const isValid =
    data.name && data.email && data.projectType && data.message;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setSubmitted(true);
  };

  const handleWhatsApp = () => {
    const typeLabel =
      form.projectType.options.find((o) => o.value === data.projectType)
        ?.label || data.projectType;
    const budgetLabel =
      form.budget.options.find((o) => o.value === data.budget)?.label ||
      data.budget;
    const timelineLabel =
      form.timeline.options.find((o) => o.value === data.timeline)?.label ||
      data.timeline;

    const url = buildWhatsAppFromForm({
      name: data.name,
      company: data.company,
      projectType: typeLabel,
      budget: budgetLabel,
      timeline: timelineLabel,
      message: data.message,
    });
    window.open(url, '_blank');
  };

  const selectClasses =
    'w-full rounded-xl border border-gray-700 bg-gray-800/50 px-4 py-3 text-sm text-white focus:border-blue-500 focus:outline-none appearance-none cursor-pointer';
  const inputClasses =
    'w-full rounded-xl border border-gray-700 bg-gray-800/50 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-blue-500 focus:outline-none';

  if (submitted) {
    return (
      <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-8 md:p-12 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500 mx-auto mb-6">
          <Send size={28} />
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">
          Recebemos seu projeto!
        </h3>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          Vamos analisar e retornar em até 24 horas. Para agilizar, você pode
          também nos enviar pelo WhatsApp:
        </p>
        <button
          onClick={handleWhatsApp}
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-medium text-white hover:bg-emerald-700 transition-colors cursor-pointer"
        >
          <MessageCircle size={18} />
          Enviar também pelo WhatsApp
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6 md:p-8"
    >
      <h3 className="text-xl font-semibold text-white mb-6">{form.title}</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-xs text-gray-400 mb-1.5">
            {form.fields.name.label} *
          </label>
          <input
            type="text"
            required
            value={data.name}
            onChange={(e) => update('name', e.target.value)}
            placeholder={form.fields.name.placeholder}
            className={inputClasses}
          />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1.5">
            {form.fields.email.label} *
          </label>
          <input
            type="email"
            required
            value={data.email}
            onChange={(e) => update('email', e.target.value)}
            placeholder={form.fields.email.placeholder}
            className={inputClasses}
          />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1.5">
            {form.fields.phone.label}
          </label>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => update('phone', e.target.value)}
            placeholder={form.fields.phone.placeholder}
            className={inputClasses}
          />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1.5">
            {form.fields.company.label}
          </label>
          <input
            type="text"
            value={data.company}
            onChange={(e) => update('company', e.target.value)}
            placeholder={form.fields.company.placeholder}
            className={inputClasses}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-xs text-gray-400 mb-1.5">
            {form.projectType.label} *
          </label>
          <select
            required
            value={data.projectType}
            onChange={(e) => update('projectType', e.target.value)}
            className={selectClasses}
          >
            <option value="">Selecione...</option>
            {form.projectType.options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1.5">
            {form.budget.label}
          </label>
          <select
            value={data.budget}
            onChange={(e) => update('budget', e.target.value)}
            className={selectClasses}
          >
            <option value="">Selecione...</option>
            {form.budget.options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1.5">
            {form.timeline.label}
          </label>
          <select
            value={data.timeline}
            onChange={(e) => update('timeline', e.target.value)}
            className={selectClasses}
          >
            <option value="">Selecione...</option>
            {form.timeline.options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-xs text-gray-400 mb-1.5">
          {form.message.label} *
        </label>
        <textarea
          required
          rows={4}
          value={data.message}
          onChange={(e) => update('message', e.target.value)}
          placeholder={form.message.placeholder}
          className={`${inputClasses} resize-none`}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="submit"
          disabled={!isValid}
          className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-medium text-white hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          <Send size={16} />
          {form.submit}
        </button>
        <button
          type="button"
          onClick={handleWhatsApp}
          disabled={!isValid}
          className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-sm font-medium text-white hover:bg-emerald-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          <MessageCircle size={16} />
          Enviar pelo WhatsApp
        </button>
      </div>
    </form>
  );
}
