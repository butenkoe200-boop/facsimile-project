import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Plane, ChevronRight, Shield, Info, Gift, Clock, Percent, FileText, Landmark } from "lucide-react";

import {
  BackLink,
  FeatureQuad,
  Footer,
  Header,
  OrderSummary,
  PageTitle,
  SecureLine,
} from "@/components/travel/Chrome";
import { BankMark } from "@/components/travel/Brand";
import { CREDIT_BANKS } from "@/lib/order";
import { usePaymentState } from "@/lib/payment-state";

export const Route = createFileRoute("/credit")({
  head: () => ({
    meta: [
      { title: "Кредит на путешествие — Travel Pay" },
      { name: "description", content: "Оформите кредит онлайн и оплачивайте путешествие сейчас: выгодные условия от банков-партнёров." },
      { property: "og:title", content: "Кредит на путешествие — Travel Pay" },
      { property: "og:description", content: "Решение по кредиту за 1–2 минуты, без визита в банк." },
    ],
  }),
  component: CreditPage,
});

const STEPS = [
  "Выберите банк\nи условия кредита",
  "Заполните короткую\nзаявку онлайн",
  "Узнайте решение\nза 1–2 минуты",
  "Подпишите договор\nонлайн",
  "Оплатите путешествие\nи летите отдыхать!",
];

function CreditPage() {
  const navigate = useNavigate();
  const { state, update } = usePaymentState();
  const selected = CREDIT_BANKS.find((bank) => bank.id === state.bankId) ?? CREDIT_BANKS[0];

  const proceed = (id: string, name: string) => {
    update({ method: "credit", bankId: id, bankName: name });
    navigate({ to: "/credit-form" });
  };

  return (
    <div className="min-h-screen bg-[oklch(0.93_0.005_250)] py-0 sm:py-8">
      <div className="tp-frame">
        <Header tone="light" />

        <div className="px-6 pb-6 pt-4">
          <BackLink to="/" label="Назад к способам оплаты" />
          <PageTitle
            icon={<Plane className="size-5" strokeWidth={1.6} />}
            title="Кредит на путешествие"
            subtitle="Оформите кредит онлайн и оплачивайте путешествие сейчас"
          />
          <OrderSummary />

          <div className="mt-4 rounded-[14px] border border-line bg-card p-5">
            <div className="grid grid-cols-[164px_1fr] gap-5">
              <div className="min-w-0">

                <h2 className="text-[12px] font-bold text-ink">Как оформить кредит</h2>
                <ol className="mt-3 space-y-3">
                  {STEPS.map((step, index) => (
                    <li key={step} className="flex items-start gap-2.5">
                      <span className="flex size-[19px] shrink-0 items-center justify-center rounded-full bg-gold/15 text-[10.5px] font-bold text-gold-deep">
                        {index + 1}
                      </span>
                      <span className="whitespace-pre-line text-[11px] leading-[1.4] text-ink">{step}</span>
                    </li>
                  ))}
                </ol>

                <div className="mt-4 rounded-[12px] bg-surface px-3.5 py-3">
                  <div className="flex items-center gap-2">
                    <Shield className="size-[16px] text-ink" strokeWidth={1.7} />
                    <div className="text-[11px] font-bold text-ink">Надёжно и безопасно</div>
                  </div>
                  <div className="mt-1 text-[10px] leading-[1.4] text-slate">
                    Ваши данные защищены. Мы сотрудничаем только с проверенными банками
                  </div>
                </div>

                <div className="mt-3 flex items-start gap-2 rounded-[12px] bg-warning-soft px-3.5 py-3">
                  <Info className="mt-px size-[14px] shrink-0 text-gold-deep" strokeWidth={1.8} />
                  <div className="text-[10px] leading-[1.4] text-ink">
                    Кредит предоставляется банками-партнёрами. Условия могут отличаться.
                  </div>
                </div>
              </div>

              <div className="min-w-0">
                <h2 className="text-[12px] font-bold text-ink">Выберите банк и условия кредита</h2>

                <div className="mt-3 space-y-2.5">
                  {CREDIT_BANKS.map((bank) => {
                    const active = bank.id === selected.id;
                    return (
                      <div key={bank.id} className="relative">
                        {bank.recommended && (
                          <span className="absolute -top-2 right-3 z-10 rounded-[6px] bg-gold px-2 py-0.5 text-[8.5px] font-bold text-white">
                            Рекомендуем
                          </span>
                        )}
                        <button
                          type="button"
                          aria-pressed={active}
                          onClick={() => update({ method: "credit", bankId: bank.id, bankName: bank.name })}
                          className={`flex w-full items-center gap-2 rounded-[12px] border px-3 py-3 text-left transition-colors ${
                            active ? "border-gold bg-warning-soft/50" : "border-line bg-card hover:border-gold/60"
                          }`}
                        >
                          <BankMark id={bank.id} size={26} />
                          <span className="w-[92px] shrink-0">
                            <span className="block text-[11px] font-bold leading-tight text-ink">{bank.name}</span>
                            <span className="block text-[9px] leading-tight text-gold-deep">{bank.decision}</span>
                          </span>
                          <span className="w-[86px] shrink-0">
                            <span className="block text-[10px] font-semibold leading-tight text-ink">{bank.term}</span>
                            <span className="block text-[9px] leading-tight text-slate">Срок кредита</span>
                          </span>
                          <span className="w-[54px] shrink-0">
                            <span className="block text-[10px] font-semibold leading-tight text-ink">{bank.rate}</span>
                            <span className="block text-[9px] leading-tight text-slate">Ставка годовых</span>
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block text-[10px] font-semibold leading-tight text-ink">{bank.monthly}</span>
                            <span className="block text-[9px] leading-tight text-slate">Платёж</span>
                          </span>
                          <ChevronRight className="size-4 shrink-0 text-slate" />
                        </button>
                      </div>
                    );
                  })}
                </div>


                <div className="mt-3 flex items-center gap-3 rounded-[12px] border border-line bg-surface-2 px-3.5 py-3">
                  <Gift className="size-[20px] shrink-0 text-gold" strokeWidth={1.6} />
                  <div className="min-w-0 flex-1">
                    <div className="text-[11px] font-bold text-ink">Бонус при оформлении кредита</div>
                    <div className="text-[9.5px] leading-[1.4] text-slate">
                      Дарим подарочный сертификат GM International Beauty на 5 000 ₽ после погашения кредита
                    </div>
                  </div>
                  <div className="flex w-[92px] shrink-0 flex-col items-center rounded-[8px] border border-gold/50 bg-card px-2 py-2 text-center">
                    <span
                      className="text-[12px] font-semibold leading-none text-ink"
                      style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                    >
                      GM
                    </span>
                    <span className="text-[5px] font-semibold uppercase tracking-[0.08em] text-slate">
                      International Beauty
                    </span>
                    <span className="mt-1 text-[12px] font-bold text-gold">5 000 ₽</span>
                    <span className="text-[5px] font-semibold uppercase tracking-[0.06em] text-slate">
                      Подарочный сертификат
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => proceed(selected.id, selected.name)}
                  className="mt-3 flex w-full items-center justify-center gap-2.5 rounded-[10px] bg-navy py-3.5 text-[13px] font-bold text-white transition-opacity hover:opacity-90"
                >
                  <Landmark className="size-[17px]" strokeWidth={1.7} />
                  Выбрать условия и оформить кредит
                </button>

              </div>
            </div>

            <SecureLine text="Безопасное соединение. Данные защищены по стандарту PCI DSS" />
          </div>

          <FeatureQuad
            items={[
              {
                icon: <Clock className="size-[18px]" strokeWidth={1.6} />,
                title: "Быстрое решение",
                text: "Решение по кредиту\nза 1–2 минуты",
              },
              {
                icon: <Percent className="size-[18px]" strokeWidth={1.6} />,
                title: "Выгодные условия",
                text: "Выбирайте срок и ставку,\nкоторые подходят вам",
              },
              {
                icon: <FileText className="size-[18px]" strokeWidth={1.6} />,
                title: "Без визита в банк",
                text: "Оформление и подписание\nдоговора онлайн",
              },
              {
                icon: <Plane className="size-[18px]" strokeWidth={1.6} />,
                title: "Летите отдыхать",
                text: "Оплачивайте путешествие\nи наслаждайтесь отдыхом",
              },
            ]}
          />
        </div>

        <Footer variant="method" />
      </div>
    </div>
  );
}
