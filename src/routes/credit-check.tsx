import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check, Landmark, Shield } from "lucide-react";

import checkBg from "@/assets/bora-bora.jpg";
import { BackLink, Footer, Header, HelpBar, OrderSummary } from "@/components/travel/Chrome";
import { CREDIT_FOOTER_FEATURES, OfferCard } from "@/components/travel/CreditOffer";
import { ORDER } from "@/lib/order";
import { usePaymentState } from "@/lib/payment-state";

export const Route = createFileRoute("/credit-check")({
  head: () => ({
    meta: [
      { title: "Проверка заявки на кредит — Travel Pay" },
      { name: "description", content: "Банк проверяет данные и принимает решение по вашей заявке. Обычно это занимает не более 1–2 минут." },
      { property: "og:title", content: "Проверка заявки на кредит — Travel Pay" },
      { property: "og:description", content: "Мы приняли вашу заявку — ожидайте решение банка." },
    ],
  }),
  component: CreditCheckPage,
});

const STAGES = [
  { title: "Заявка отправлена в банк", time: "14:33" },
  { title: "Данные получены банком", time: "14:33" },
  { title: "Проверка данных и скоринг", time: "В процессе" },
  { title: "Принятие решения", time: "" },
  { title: "Ответ банка", time: "" },
];

function CreditCheckPage() {
  const navigate = useNavigate();
  const { state } = usePaymentState();
  const [dot, setDot] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setDot((value) => (value + 1) % 3), 700);
    const timeout = setTimeout(
      () => navigate({ to: state.creditOutcome === "declined" ? "/credit-declined" : "/credit-approved" }),
      5000,
    );
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [navigate, state.creditOutcome]);

  return (
    <div className="min-h-screen bg-[oklch(0.93_0.005_250)] py-0 sm:py-8">
      <div className="tp-frame">
        <Header tone="dark" />

        <div className="bg-navy px-5 pb-5">
          <OrderSummary third="orderedAt" numberValue={ORDER.numberTR} />
        </div>

        <div className="relative isolate overflow-hidden">
          <img
            src={checkBg}
            alt="Лагуна с бунгало"
            width={1024}
            height={1024}
            className="absolute inset-0 size-full object-cover"
          />
          <div className="absolute inset-0 bg-card/45" />

          <div className="relative px-5 py-5">
            <div className="rounded-[16px] bg-card/92 px-6 py-6 backdrop-blur-sm">
              <BackLink to="/credit-form" label="Назад к анкете" variant="arrow" />

              <h1 className="mt-3 text-center text-[21px] font-bold text-ink">Мы приняли вашу заявку!</h1>
              <p className="mt-2 text-center text-[11.5px] leading-[1.5] text-slate">
                Банк проверяет данные и принимает решение.
                <br />
                Это обычно занимает не более 1–2 минут.
              </p>

              <div className="relative mx-auto mt-5 flex size-[110px] items-center justify-center">
                <span
                  className="tp-spin absolute inset-0 rounded-full"
                  style={{
                    background:
                      "conic-gradient(from 0deg, oklch(0.552 0.208 262) 0deg 120deg, oklch(0.93 0.01 250) 120deg 360deg)",
                    mask: "radial-gradient(farthest-side, transparent calc(100% - 5px), #000 calc(100% - 5px))",
                    WebkitMask:
                      "radial-gradient(farthest-side, transparent calc(100% - 5px), #000 calc(100% - 5px))",
                  }}
                  aria-hidden="true"
                />
                <span className="flex size-[92px] items-center justify-center rounded-full bg-card shadow-card">
                  <Landmark className="size-9 text-gold" strokeWidth={1.5} />
                </span>
              </div>

              <div className="mt-4 text-center">
                <div className="text-[12.5px] font-bold text-ink">Проверяем вашу заявку</div>
                <div className="mt-1 text-[11px] text-slate">Пожалуйста, не закрывайте страницу</div>
                <div className="mt-2.5 flex items-center justify-center gap-1.5">
                  {[0, 1, 2].map((index) => (
                    <span
                      key={index}
                      className={`size-[5px] rounded-full transition-colors ${
                        index === dot ? "bg-brandblue" : "bg-line"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-5 grid grid-cols-[1fr_240px] gap-4">
                <div className="rounded-[14px] border border-line bg-card p-3.5">
                  <ul className="space-y-2">
                    {STAGES.map((stage, index) => {
                      const done = index < 2;
                      const current = index === 2;
                      return (
                        <li
                          key={stage.title}
                          className={`flex items-center justify-between gap-3 rounded-[10px] px-2.5 py-2 ${
                            current ? "border border-line bg-surface-2" : ""
                          }`}
                        >
                          <span className="flex items-center gap-2.5">
                            <span
                              className={`flex size-[19px] shrink-0 items-center justify-center rounded-full border ${
                                done
                                  ? "border-brandblue bg-brandblue"
                                  : current
                                    ? "border-2 border-brandblue bg-card"
                                    : "border-line bg-card"
                              }`}
                            >
                              {done && <Check className="size-3 text-white" strokeWidth={3} />}
                            </span>
                            <span
                              className={`text-[11px] ${
                                done || current ? "font-semibold text-ink" : "text-slate"
                              }`}
                            >
                              {stage.title}
                            </span>
                          </span>
                          {stage.time && (
                            <span className={`text-[10px] ${current ? "font-semibold text-brandblue" : "text-slate"}`}>
                              {stage.time}
                            </span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div>
                  <OfferCard bankId={state.bankId} bankName={state.bankName} />
                  <div className="mt-3 flex items-start gap-2.5 rounded-[14px] bg-brandblue-soft px-4 py-3">
                    <Shield className="mt-0.5 size-[16px] shrink-0 text-brandblue" strokeWidth={1.8} />
                    <div>
                      <div className="text-[11px] font-bold text-ink">Ваши данные под защитой</div>
                      <div className="text-[9.5px] leading-[1.4] text-slate">
                        Мы используем шифрование и передаём данные только в банк.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <HelpBar text="Наши специалисты на связи 24/7" />

              <div className="mt-4 grid grid-cols-4 divide-x divide-line border-t border-line pt-4">
                {CREDIT_FOOTER_FEATURES.map((feature) => (
                  <div key={feature.title} className="flex items-start gap-2 px-3">
                    <span className="mt-0.5 flex size-[26px] shrink-0 items-center justify-center rounded-full bg-surface text-brandblue">
                      {feature.icon}
                    </span>
                    <span className="text-[9.5px] font-bold leading-[1.3] text-ink">
                      {feature.title}
                      <span className="mt-0.5 block whitespace-pre-line font-medium text-slate">{feature.text}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Footer variant="full" />
      </div>
    </div>
  );
}
