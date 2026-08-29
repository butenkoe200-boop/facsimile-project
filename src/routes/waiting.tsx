import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Check, Clock, Landmark, CheckCircle2, Info, Hourglass, Shield, CreditCard, Wallet, CalendarDays } from "lucide-react";

import waitingBg from "@/assets/bora-bora.jpg";
import { Footer, Header, HelpBar, OrderSummary } from "@/components/travel/Chrome";
import { BankMark } from "@/components/travel/Brand";
import { CREDIT_OFFER, ORDER } from "@/lib/order";
import { usePaymentState } from "@/lib/payment-state";

export const Route = createFileRoute("/waiting")({
  head: () => ({
    meta: [
      { title: "Платеж ожидает подтверждения — Travel Pay" },
      { name: "description", content: "Мы отправили запрос в банк и ожидаем подтверждение. Обычно ответ приходит в течение 1–3 минут." },
      { property: "og:title", content: "Платеж ожидает подтверждения — Travel Pay" },
      { property: "og:description", content: "Не закрывайте страницу — результат появится автоматически." },
    ],
  }),
  component: WaitingPage,
});

const STAGES = [
  { title: "Запрос отправлен", note: "14:32", icon: Check, state: "done" as const },
  { title: "Ожидаем подтверждение", note: "В процессе", icon: Clock, state: "current" as const },
  { title: "Проверка банком", note: "", icon: Landmark, state: "idle" as const },
  { title: "Решение банка", note: "", icon: CheckCircle2, state: "idle" as const },
];

function WaitingPage() {
  const navigate = useNavigate();
  const { state } = usePaymentState();

  useEffect(() => {
    const timeout = setTimeout(() => navigate({ to: "/thanks" }), 5000);
    return () => clearTimeout(timeout);
  }, [navigate]);

  const DETAILS = [
    { icon: CreditCard, label: "Способ оплаты", value: "Кредит на путешествие" },
    { icon: Landmark, label: "Банк", value: state.bankName, bank: true },
    { icon: Wallet, label: "Сумма к оплате", value: ORDER.amount },
    { icon: CalendarDays, label: "Срок кредита", value: CREDIT_OFFER.term },
    { icon: Clock, label: "Ежемесячный платеж\n(ориентировочно)", value: `${CREDIT_OFFER.monthly} / мес` },
  ];

  return (
    <div className="min-h-screen bg-[oklch(0.93_0.005_250)] py-0 sm:py-8">
      <div className="tp-frame">
        <Header tone="dark" />

        <div className="bg-navy px-5 pb-5">
          <OrderSummary third="orderedAt" />
        </div>

        <div className="relative isolate overflow-hidden">
          <img
            src={waitingBg}
            alt="Морская лагуна"
            width={1024}
            height={1024}
            className="absolute inset-0 size-full object-cover"
          />
          <div className="absolute inset-0 bg-card/55" />

          <div className="relative px-5 py-5">
            <div className="rounded-[16px] bg-card/95 px-5 py-6 shadow-raised backdrop-blur-sm">
              <div className="relative mx-auto flex size-[106px] items-center justify-center">
                <span
                  className="tp-spin absolute inset-0 rounded-full border-2 border-dotted border-brandblue/40"
                  aria-hidden="true"
                />
                <span className="relative flex size-[80px] items-center justify-center rounded-full bg-warning-soft">
                  <Hourglass className="size-9 text-gold" strokeWidth={1.5} />
                  <span className="absolute -bottom-1 -right-1 flex size-[24px] items-center justify-center rounded-full bg-brandblue-soft">
                    <Landmark className="size-[13px] text-brandblue" strokeWidth={1.8} />
                  </span>
                </span>
              </div>

              <h1 className="mt-4 text-center text-[21px] font-bold text-ink">Платеж ожидает подтверждения</h1>
              <p className="mt-2 text-center text-[11.5px] text-slate">
                Мы отправили запрос в банк и ожидаем подтверждение.
              </p>

              <div className="mx-auto mt-4 flex max-w-[430px] items-start gap-2.5 rounded-[12px] bg-brandblue-soft px-4 py-3">
                <Info className="mt-0.5 size-[16px] shrink-0 text-brandblue" strokeWidth={1.8} />
                <div className="text-[10.5px] leading-[1.45] text-ink">
                  Обычно ответ приходит в течение 1–3 минут.
                  <br />
                  <span className="text-slate">Не закрывайте страницу — результат появится автоматически.</span>
                </div>
              </div>

              <div className="mt-5 rounded-[14px] border border-line bg-card px-5 py-4">
                <div className="relative flex items-start justify-between">
                  <span className="absolute inset-x-6 top-[15px] h-px bg-line" />
                  {STAGES.map((stage) => {
                    const Icon = stage.icon;
                    return (
                      <span key={stage.title} className="relative flex w-[110px] flex-col items-center text-center">
                        <span
                          className={`flex size-[31px] items-center justify-center rounded-full border-2 ${
                            stage.state === "done"
                              ? "border-brandblue bg-brandblue text-white"
                              : stage.state === "current"
                                ? "border-gold bg-card text-gold"
                                : "border-line bg-card text-slate"
                          }`}
                        >
                          <Icon className="size-[15px]" strokeWidth={2.2} />
                        </span>
                        <span className="mt-1.5 text-[10px] font-semibold text-ink">{stage.title}</span>
                        {stage.note && (
                          <span
                            className={`text-[9.5px] ${
                              stage.state === "current" ? "font-semibold text-gold" : "text-slate"
                            }`}
                          >
                            {stage.note}
                          </span>
                        )}
                      </span>
                    );
                  })}
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="rounded-[14px] border border-line bg-card p-4">
                  <h2 className="text-[12px] font-bold text-ink">Детали платежа</h2>
                  <dl className="mt-3 space-y-2.5">
                    {DETAILS.map((detail) => {
                      const Icon = detail.icon;
                      return (
                        <div key={detail.label} className="flex items-start justify-between gap-3">
                          <dt className="flex items-start gap-2 whitespace-pre-line text-[10px] leading-[1.35] text-slate">
                            {detail.bank ? (
                              <BankMark id={state.bankId} size={15} />
                            ) : (
                              <Icon className="mt-px size-[13px] shrink-0 text-brandblue" strokeWidth={1.8} />
                            )}
                            {detail.label}
                          </dt>
                          <dd className="text-[10.5px] font-semibold text-ink">{detail.value}</dd>
                        </div>
                      );
                    })}
                  </dl>
                </div>

                <div className="relative isolate overflow-hidden rounded-[14px]">
                  <img
                    src={waitingBg}
                    alt="Бунгало над водой"
                    width={1024}
                    height={1024}
                    className="absolute inset-0 size-full object-cover"
                  />
                  <div className="relative flex h-full flex-col justify-end p-3">
                    <div className="flex items-start gap-2.5 rounded-[10px] bg-card/95 px-3.5 py-3">
                      <Shield className="mt-0.5 size-[16px] shrink-0 text-success" strokeWidth={1.8} />
                      <div>
                        <div className="text-[10.5px] font-bold text-ink">Ваши данные под защитой</div>
                        <div className="text-[9.5px] leading-[1.4] text-slate">
                          Мы используем шифрование и передаём информацию только в банк-партнёр.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <HelpBar text="Наша служба поддержки всегда на связи." />
            </div>
          </div>
        </div>

        <Footer variant="full" />
      </div>
    </div>
  );
}
