import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, Lock, Shield, Clock, Gift, Headphones, Handshake, BadgeCheck, CreditCard, CalendarDays, Briefcase } from "lucide-react";

import heroImage from "@/assets/hero-santorini.jpg";
import { Header, Footer } from "@/components/travel/Chrome";
import { SbpMark, YaPayMark } from "@/components/travel/Brand";
import { ORDER } from "@/lib/order";
import { usePaymentState } from "@/lib/payment-state";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Travel Pay — оплата вашего путешествия | GM International Travel" },
      {
        name: "description",
        content:
          "Оплатите тур быстро, удобно и безопасно: карта, СБП, Яндекс Pay, Яндекс Сплит, банковская рассрочка и кредит на путешествие.",
      },
      { property: "og:title", content: "Travel Pay — оплата вашего путешествия" },
      {
        property: "og:description",
        content: "Быстро, удобно, безопасно. Данные защищены по стандарту PCI DSS.",
      },
    ],
  }),
  component: Index,
});

const METHODS = [
  {
    to: "/card",
    id: "card" as const,
    title: "Банковской картой",
    subtitle: "Visa, MasterCard, МИР",
    icon: <CreditCard className="size-[19px] text-ink" strokeWidth={1.6} />,
  },
  {
    to: "/sbp",
    id: "sbp" as const,
    title: "Через СБП",
    subtitle: "Оплата по QR-коду",
    icon: <SbpMark size={20} />,
  },
  {
    to: "/yandex-pay",
    id: "yandex-pay" as const,
    title: "Яндекс Pay",
    subtitle: "Быстро и безопасно",
    icon: <YaPayMark size={20} />,
  },
  {
    to: "/yandex-split",
    id: "yandex-split" as const,
    title: "Яндекс Сплит",
    subtitle: "Оплата частями без переплат",
    icon: <SplitMark />,
  },
  {
    to: "/installment",
    id: "installment" as const,
    title: "Банковская рассрочка",
    subtitle: "От 3 до 24 месяцев",
    icon: <CalendarDays className="size-[19px] text-gold" strokeWidth={1.6} />,
  },
  {
    to: "/credit",
    id: "credit" as const,
    title: "Кредит на путешествие",
    subtitle: "Выгодные условия от банков",
    icon: <Briefcase className="size-[19px] text-gold" strokeWidth={1.6} />,
  },
];

function SplitMark() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9.5" fill="none" stroke="oklch(0.703 0.09 79)" strokeWidth="1.5" />
      <path d="M12 3a9 9 0 010 18" fill="oklch(0.703 0.09 79)" opacity="0.25" />
      <path d="M12 3v18" stroke="oklch(0.703 0.09 79)" strokeWidth="1.5" />
    </svg>
  );
}

const BENEFITS = [
  { icon: Shield, title: "Безопасная оплата", text: "Данные защищены" },
  { icon: Clock, title: "Мгновенное зачисление", text: "Платеж сразу поступает туроператору" },
  { icon: Gift, title: "Выгодные условия", text: "Оплата частями и рассрочка без переплат" },
];

const TRUST = [
  { icon: Shield, label: "Без скрытых комиссий" },
  { icon: Headphones, label: "Поддержка 24/7" },
  { icon: Handshake, label: "Надёжные партнёры" },
  { icon: BadgeCheck, label: "Соответствие стандартам" },
];

function Index() {
  const { update } = usePaymentState();

  return (
    <div className="min-h-screen bg-[oklch(0.93_0.005_250)] py-0 sm:py-8">
      <div className="tp-frame">
        <Header tone="light" />

        {/* Hero */}
        <section className="relative isolate overflow-hidden">
          <img
            src={heroImage}
            alt="Закат над Санторини — направление вашего путешествия"
            width={1024}
            height={1280}
            className="absolute inset-0 size-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/45 via-navy/10 to-transparent" />
          <div className="relative px-4 sm:px-6 pb-4 pt-7">
            <h1 className="max-w-[260px] text-[26px] font-bold leading-[1.15] text-white drop-shadow-[0_1px_8px_oklch(0.2_0.05_259/0.5)]">
              Оплата вашего путешествия
            </h1>
            <p className="mt-2 text-[13px] text-white/90">Быстро, удобно, безопасно</p>

            <div className="mt-4 w-[210px] rounded-[14px] bg-card/95 p-4 shadow-raised backdrop-blur-sm">
              <div className="tp-label">Номер заказа</div>
              <div className="mt-1 text-[16px] font-bold text-ink">{ORDER.numberTP}</div>

              <div className="mt-3 border-t border-line pt-3">
                <div className="tp-label">Сумма к оплате</div>
                <div className="mt-0.5 text-[20px] font-bold text-gold">{ORDER.amount}</div>
              </div>

              <div className="mt-3 space-y-2 border-t border-line pt-3">
                {BENEFITS.map((b) => {
                  const Icon = b.icon;
                  return (
                    <div key={b.title} className="flex items-start gap-2">
                      <Icon className="mt-0.5 size-[14px] shrink-0 text-gold" strokeWidth={1.7} />
                      <div>
                        <div className="text-[10.5px] font-bold leading-tight text-ink">{b.title}</div>
                        <div className="text-[9.5px] leading-[1.3] text-slate">{b.text}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 flex items-start gap-2 text-white">
              <Lock className="mt-0.5 size-[13px]" />
              <div>
                <div className="text-[10.5px] font-semibold leading-tight">Безопасное соединение</div>
                <div className="text-[9.5px] text-white/80">Данные защищены по стандарту PCI DSS</div>
              </div>
            </div>
          </div>
        </section>

        {/* Methods */}
        <section className="bg-card px-4 sm:px-6 py-6">
          <h2 className="text-[16px] font-bold text-ink">Выберите способ оплаты</h2>

          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {METHODS.map((m) => (
              <Link
                key={m.id}
                to={m.to}
                onClick={() => update({ method: m.id })}
                className="group flex items-center justify-between gap-2 rounded-[12px] border border-line bg-surface-2 px-3.5 py-3.5 transition-all hover:border-gold/60 hover:shadow-card"
              >
                <div className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex size-[26px] shrink-0 items-center justify-center rounded-[8px] border border-line bg-card">
                    {m.icon}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[11.5px] font-bold leading-tight text-ink">{m.title}</span>
                    <span className="mt-0.5 block text-[9.5px] leading-[1.3] text-slate">{m.subtitle}</span>
                  </span>
                </div>
                <ChevronRight className="size-4 shrink-0 text-slate transition-transform group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
            {TRUST.map((t) => {
              const Icon = t.icon;
              return (
                <div key={t.label} className="flex items-center gap-1.5">
                  <Icon className="size-[15px] text-slate" strokeWidth={1.6} />
                  <span className="text-[10px] text-slate">{t.label}</span>
                </div>
              );
            })}
          </div>
        </section>

        <Footer variant="method" />
      </div>
    </div>
  );
}
