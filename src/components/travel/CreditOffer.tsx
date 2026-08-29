import { Clock, XCircle, RefreshCw, FileText, Shield, Headphones, Lock, Percent, CheckCircle2 } from "lucide-react";
import { Link } from "@tanstack/react-router";

import { BankMark } from "./Brand";
import { CREDIT_OFFER } from "@/lib/order";

export function OfferCard({ bankId, bankName }: { bankId: string; bankName: string }) {
  const rows = [
    { label: "Сумма кредита", value: CREDIT_OFFER.amount },
    { label: "Срок кредита", value: CREDIT_OFFER.term },
    { label: "Ежемесячный платёж", value: CREDIT_OFFER.monthly },
    { label: "Ставка", value: CREDIT_OFFER.rate },
  ];
  return (
    <div className="rounded-[14px] border border-line bg-card p-4">
      <h2 className="text-[12px] font-bold text-ink">Ваше предложение</h2>
      <div className="mt-3 flex items-center gap-2.5">
        <BankMark id={bankId} size={30} />
        <span className="text-[12.5px] font-bold text-ink">{bankName}</span>
      </div>
      <dl className="mt-3 space-y-2">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between gap-3">
            <dt className="text-[10.5px] text-slate">{row.label}</dt>
            <dd className="text-[11px] font-semibold text-ink">{row.value}</dd>
          </div>
        ))}
      </dl>
      <span className="mt-3 inline-flex rounded-[6px] bg-brandblue-soft px-2.5 py-1 text-[10px] font-semibold text-brandblue">
        Без скрытых комиссий
      </span>
    </div>
  );
}

const BENEFITS = [
  { icon: Clock, title: "Быстрое решение", text: "Ответ банка за 1–2 минуты" },
  { icon: XCircle, title: "Без скрытых комиссий", text: "Никаких дополнительных платежей" },
  { icon: RefreshCw, title: "Досрочное погашение", text: "Без штрафов и комиссий" },
  { icon: FileText, title: "Оформление онлайн", text: "Нужен только паспорт и данные о доходе" },
];

export function CreditBenefits() {
  return (
    <div className="mt-3 space-y-3 rounded-[14px] border border-line bg-card p-4">
      {BENEFITS.map((benefit) => {
        const Icon = benefit.icon;
        return (
          <div key={benefit.title} className="flex items-start gap-2.5">
            <Icon className="mt-0.5 size-[16px] shrink-0 text-brandblue" strokeWidth={1.7} />
            <div>
              <div className="text-[11px] font-bold text-ink">{benefit.title}</div>
              <div className="text-[9.5px] leading-[1.4] text-slate">{benefit.text}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function HelpCard() {
  return (
    <div className="mt-3 rounded-[14px] border border-line bg-card p-4">
      <div className="flex items-start gap-2.5">
        <Headphones className="mt-0.5 size-[18px] shrink-0 text-brandblue" strokeWidth={1.7} />
        <div>
          <div className="text-[11.5px] font-bold text-ink">Нужна помощь?</div>
          <div className="text-[10px] leading-[1.4] text-slate">
            Наши специалисты на связи 24/7
          </div>
        </div>
      </div>
      <Link
        to="/support"
        className="mt-3 flex w-full items-center justify-center rounded-[10px] border border-line bg-card py-2.5 text-[11.5px] font-semibold text-ink transition-colors hover:border-brandblue hover:text-brandblue"
      >
        Написать в чат
      </Link>
    </div>
  );
}

export function CreditStepper({ current }: { current: 1 | 2 | 3 | 4 }) {
  const steps = ["Анкета", "Проверка данных", "Решение банка", "Результат"];
  return (
    <div className="mt-4 max-w-[330px]">
      <div className="relative flex items-center justify-between">
        <span className="absolute inset-x-3 top-[13px] h-px bg-line" />
        {steps.map((step, index) => {
          const number = index + 1;
          const active = number <= current;
          return (
            <span key={step} className="relative flex w-[74px] flex-col items-center">
              <span
                className={`flex size-[26px] items-center justify-center rounded-full text-[11px] font-bold ${
                  active ? "bg-brandblue text-white" : "border border-line bg-card text-slate"
                }`}
              >
                {number}
              </span>
              <span
                className={`mt-1.5 text-center text-[9.5px] leading-tight ${
                  active ? "font-semibold text-brandblue" : "text-slate"
                }`}
              >
                {step}
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}

export function DataProtectedNote() {
  return (
    <div className="flex items-start gap-2.5 rounded-[12px] bg-success-soft px-3.5 py-3">
      <Shield className="mt-0.5 size-[16px] shrink-0 text-success" strokeWidth={1.8} />
      <div>
        <div className="text-[11px] font-bold text-ink">Ваши данные под защитой</div>
        <div className="text-[9.5px] leading-[1.4] text-slate">
          Мы используем шифрование и передаём информацию только в банк. Соответствуем стандарту PCI DSS.
        </div>
      </div>
    </div>
  );
}

export const CREDIT_FOOTER_FEATURES = [
  { icon: <Clock className="size-[16px]" strokeWidth={1.7} />, title: "Быстрое решение", text: "Ответ банка\nза 1–2 минуты" },
  { icon: <Lock className="size-[16px]" strokeWidth={1.7} />, title: "Без скрытых комиссий", text: "Никаких дополнительных\nплатежей" },
  { icon: <Percent className="size-[16px]" strokeWidth={1.7} />, title: "Выгодные условия", text: "Специальные ставки\nдля путешествий" },
  { icon: <CheckCircle2 className="size-[16px]" strokeWidth={1.7} />, title: "Досрочное погашение", text: "Без штрафов и комиссий" },
];
