import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { CalendarDays, ChevronRight, Shield, Info, Gift, Clock, Percent, Headphones } from "lucide-react";

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
import { INSTALLMENT_BANKS } from "@/lib/order";
import { usePaymentState } from "@/lib/payment-state";

export const Route = createFileRoute("/installment")({
  head: () => ({
    meta: [
      { title: "Банковская рассрочка на путешествие — Travel Pay" },
      { name: "description", content: "Оформите рассрочку от банков-партнёров на выгодных условиях: от 3 до 24 месяцев без переплат." },
      { property: "og:title", content: "Банковская рассрочка на путешествие" },
      { property: "og:description", content: "Рассрочка без процентов и скрытых комиссий. Решение за 1–3 минуты." },
    ],
  }),
  component: InstallmentPage,
});

const STEPS = [
  "Выберите банк\nи подходящий срок",
  "Заполните короткую анкету\nна сайте банка",
  "Дождитесь решения\nза 1–3 минуты",
  "Подтвердите рассрочку\nи оплатите заказ",
];

function InstallmentPage() {
  const navigate = useNavigate();
  const { update } = usePaymentState();

  const pick = (id: string, name: string) => {
    update({ method: "installment", bankId: id, bankName: name });
    navigate({ to: "/credit-form" });
  };

  return (
    <div className="min-h-screen bg-[oklch(0.93_0.005_250)] py-0 sm:py-8">
      <div className="tp-frame">
        <Header tone="light" />

        <div className="px-4 sm:px-6 pb-6 pt-4">
          <BackLink to="/" label="Назад к способам оплаты" />
          <PageTitle
            icon={<CalendarDays className="size-5" strokeWidth={1.6} />}
            title="Оплата через банковскую рассрочку"
            subtitle="Оформите рассрочку от банков-партнёров на выгодных условиях"
          />
          <OrderSummary />

          <div className="mt-4 rounded-[14px] border border-line bg-card p-5">
            <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-6">
              <div>
                <h2 className="text-[12px] font-bold text-ink">Как оформить рассрочку</h2>
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
                    Ваши данные защищены. Рассрочка предоставляется банком-партнёром
                  </div>
                </div>

                <div className="mt-3 flex items-start gap-2 rounded-[12px] bg-warning-soft px-3.5 py-3">
                  <Info className="mt-px size-[14px] shrink-0 text-gold-deep" strokeWidth={1.8} />
                  <div className="text-[10px] leading-[1.4] text-ink">
                    Доступные условия могут отличаться в зависимости от банка и вашей кредитной истории
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-[12px] font-bold text-ink">Выберите банк и срок рассрочки</h2>

                <div className="mt-3 space-y-2.5">
                  {INSTALLMENT_BANKS.map((bank) => (
                    <div key={bank.id} className="relative">
                      {bank.recommended && (
                        <span className="absolute -top-2 right-3 z-10 rounded-[6px] bg-gold px-2 py-0.5 text-[8.5px] font-bold text-white">
                          Рекомендуем
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() => pick(bank.id, bank.name)}
                        className={`flex w-full flex-wrap items-center gap-x-4 gap-y-2 rounded-[12px] border px-4 py-3.5 text-left transition-colors ${
                          bank.recommended
                            ? "border-gold bg-warning-soft/50"
                            : "border-line bg-card hover:border-gold/60"
                        }`}
                      >
                        <BankMark id={bank.id} size={30} />
                        <span className="w-[120px] shrink-0">
                          <span className="block text-[12px] font-bold text-ink">{bank.name}</span>
                          <span className="block text-[9.5px] text-gold-deep">{bank.decision}</span>
                        </span>
                        <span className="w-[92px] shrink-0">
                          <span className="block text-[11.5px] font-semibold text-ink">{bank.term}</span>
                          <span className="block text-[10px] text-slate">{bank.monthly}</span>
                        </span>
                        <span className="flex-1">
                          <span className="block text-[11.5px] font-semibold text-ink">0 ₽</span>
                          <span className="block text-[10px] text-slate">переплата</span>
                        </span>
                        <ChevronRight className="size-4 shrink-0 text-slate" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-3 flex items-center gap-3 rounded-[12px] border border-line bg-surface-2 px-4 py-3">
                  <Gift className="size-[20px] shrink-0 text-gold" strokeWidth={1.6} />
                  <div className="flex-1">
                    <div className="text-[11.5px] font-bold text-ink">Бонус при оформлении рассрочки</div>
                    <div className="text-[10px] leading-[1.4] text-slate">
                      При оформлении рассрочки дарим сертификат GM International Beauty на 5 000 ₽
                    </div>
                  </div>
                  <div className="flex w-[112px] shrink-0 flex-col items-center rounded-[8px] border border-gold/50 bg-card px-2 py-2 text-center">
                    <span
                      className="text-[13px] font-semibold leading-none text-ink"
                      style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                    >
                      GM
                    </span>
                    <span className="text-[5.5px] font-semibold uppercase tracking-[0.08em] text-slate">
                      International Beauty
                    </span>
                    <span className="mt-1 text-[13px] font-bold text-gold">5 000 ₽</span>
                    <span className="text-[5.5px] font-semibold uppercase tracking-[0.06em] text-slate">
                      Подарочный сертификат
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <SecureLine text="Безопасное соединение. Данные защищены по стандарту PCI DSS" />
          </div>

          <FeatureQuad
            items={[
              {
                icon: <Shield className="size-[18px]" strokeWidth={1.6} />,
                title: "Без переплат",
                text: "Рассрочка без процентов\nи скрытых комиссий",
              },
              {
                icon: <Clock className="size-[18px]" strokeWidth={1.6} />,
                title: "Быстрое решение",
                text: "Одобрение от банков\nза 1–3 минуты",
              },
              {
                icon: <Percent className="size-[18px]" strokeWidth={1.6} />,
                title: "Выгодные условия",
                text: "Большой выбор сроков\nи банков-партнёров",
              },
              {
                icon: <Headphones className="size-[18px]" strokeWidth={1.6} />,
                title: "Поддержка 24/7",
                text: "Мы всегда на связи\nи готовы помочь",
              },
            ]}
          />
        </div>

        <Footer variant="method" />
      </div>
    </div>
  );
}
