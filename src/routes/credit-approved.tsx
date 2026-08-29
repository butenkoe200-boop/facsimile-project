import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Check, CalendarDays, Percent, Wallet, Coins, ArrowRight, ArrowLeft, Shield, Lock } from "lucide-react";

import approvedBg from "@/assets/bora-bora.jpg";
import { Footer, Header, OrderSummary } from "@/components/travel/Chrome";
import { BankMark, PciBadge } from "@/components/travel/Brand";
import { CREDIT_OFFER } from "@/lib/order";
import { usePaymentState } from "@/lib/payment-state";

export const Route = createFileRoute("/credit-approved")({
  head: () => ({
    meta: [
      { title: "Кредит предварительно одобрен — Travel Pay" },
      { name: "description", content: "Банк готов предложить вам выгодные условия: 12 месяцев, 12,5% годовых, платёж 21 417 ₽." },
      { property: "og:title", content: "Кредит предварительно одобрен — Travel Pay" },
      { property: "og:description", content: "Поздравляем! Продолжите оформление и оплатите путешествие." },
    ],
  }),
  component: CreditApprovedPage,
});

const NEXT = [
  "Нажмите «Продолжить оформление»",
  "Проверьте и подтвердите свои данные",
  "Подпишите договор с банком онлайн",
];

const PERKS = ["Без скрытых комиссий", "Досрочное погашение без штрафов", "Решение за 1–2 минуты"];

function CreditApprovedPage() {
  const navigate = useNavigate();
  const { state } = usePaymentState();

  const OFFER = [
    { icon: CalendarDays, label: "Срок кредита", value: CREDIT_OFFER.term },
    { icon: Percent, label: "Ставка годовых", value: CREDIT_OFFER.ratePreApproved },
    { icon: Wallet, label: "Ежемесячный платёж", value: CREDIT_OFFER.monthly },
    { icon: Coins, label: "Переплата", value: CREDIT_OFFER.overpay },
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
            src={approvedBg}
            alt="Тропическая лагуна"
            width={1024}
            height={1024}
            className="absolute inset-0 size-full object-cover"
          />
          <div className="absolute inset-0 bg-card/55" />

          <div className="relative px-5 py-5">
            <div className="rounded-[16px] bg-card/95 px-5 py-6 shadow-raised backdrop-blur-sm">
              <div className="relative flex justify-center">
                <span className="tp-confetti" aria-hidden="true" />
                <span className="flex size-[58px] items-center justify-center rounded-full bg-success">
                  <Check className="size-8 text-white" strokeWidth={3} />
                </span>
              </div>

              <h1 className="mt-4 text-center text-[22px] font-bold text-ink">Кредит предварительно одобрен!</h1>
              <p className="mt-2 text-center text-[12px] text-slate">
                Поздравляем! Банк готов предложить вам выгодные условия.
              </p>

              <div className="mx-auto mt-4 flex max-w-[430px] items-start gap-2.5 rounded-[12px] bg-success-soft px-4 py-3">
                <Shield className="mt-0.5 size-[16px] shrink-0 text-success" strokeWidth={1.8} />
                <div className="text-[10.5px] leading-[1.45] text-ink">
                  Это предварительное решение. Финальное одобрение будет после подписания договора с банком.
                </div>
              </div>

              <div className="mt-5 rounded-[14px] border border-line bg-card p-4">
                <h2 className="text-[12.5px] font-bold text-ink">Ваше персональное предложение</h2>
                <div className="mt-3 grid grid-cols-[1fr_1fr_240px] gap-4">
                  <div className="col-span-2 grid grid-cols-2 gap-3">
                    {OFFER.map((item) => {
                      const Icon = item.icon;
                      return (
                        <div key={item.label} className="flex items-center gap-2.5">
                          <span className="flex size-[28px] shrink-0 items-center justify-center rounded-[8px] bg-brandblue-soft">
                            <Icon className="size-[15px] text-brandblue" strokeWidth={1.8} />
                          </span>
                          <span>
                            <span className="block text-[9.5px] text-slate">{item.label}</span>
                            <span className="block text-[13px] font-bold text-ink">{item.value}</span>
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="border-l border-line pl-4">
                    <div className="flex items-center gap-2.5">
                      <BankMark id={state.bankId} size={28} />
                      <span className="text-[12px] font-bold text-ink">{state.bankName}</span>
                    </div>
                    <ul className="mt-3 space-y-1.5">
                      {PERKS.map((perk) => (
                        <li key={perk} className="flex items-center gap-2 text-[10px] text-ink">
                          <Check className="size-[13px] shrink-0 text-success" strokeWidth={2.5} />
                          {perk}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="rounded-[14px] border border-line bg-card p-4">
                  <h2 className="text-[12px] font-bold text-ink">Что нужно сделать дальше?</h2>
                  <ol className="mt-3 space-y-2.5">
                    {NEXT.map((step, index) => (
                      <li key={step} className="flex items-center gap-2.5">
                        <span className="flex size-[19px] shrink-0 items-center justify-center rounded-full border border-success text-[10px] font-bold text-success">
                          {index + 1}
                        </span>
                        <span className="text-[10.5px] text-ink">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
                <img
                  src={approvedBg}
                  alt="Бунгало над водой"
                  width={1024}
                  height={1024}
                  className="h-[126px] w-full rounded-[14px] object-cover"
                />
              </div>

              <button
                type="button"
                onClick={() => navigate({ to: "/waiting" })}
                className="mt-4 flex w-full items-center justify-center gap-2.5 rounded-[10px] bg-navy py-3.5 text-[14px] font-bold text-white transition-opacity hover:opacity-90"
              >
                Продолжить оформление
                <ArrowRight className="size-4" />
              </button>

              <Link
                to="/"
                className="mt-2.5 flex w-full items-center justify-center gap-2.5 rounded-[10px] border border-line bg-card py-3 text-[12.5px] font-semibold text-brandblue transition-colors hover:bg-surface"
              >
                <ArrowLeft className="size-4" />
                Выбрать другие способы оплаты
              </Link>

              <div className="mt-4 grid grid-cols-2 divide-x divide-line rounded-[14px] border border-line bg-card px-4 py-3.5">
                <div className="flex items-start gap-2.5 pr-4">
                  <Shield className="mt-0.5 size-[18px] shrink-0 text-success" strokeWidth={1.7} />
                  <div>
                    <div className="text-[11px] font-bold text-ink">Ваши данные в безопасности</div>
                    <div className="text-[9.5px] leading-[1.4] text-slate">
                      Мы используем шифрование и передаём информацию только в банк-партнёр.
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 pl-4">
                  <Lock className="size-[16px] shrink-0 text-slate" strokeWidth={1.7} />
                  <div className="flex-1">
                    <div className="text-[11px] font-bold text-ink">PCI DSS</div>
                    <div className="text-[9.5px] leading-[1.4] text-slate">
                      Соответствуем международным стандартам безопасности.
                    </div>
                  </div>
                  <PciBadge />
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer variant="full" />
      </div>
    </div>
  );
}
