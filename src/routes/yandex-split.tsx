import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Shield, Percent, Clock, Gift, Info } from "lucide-react";

import {
  BackLink,
  FeatureQuad,
  Footer,
  Header,
  OrderSummary,
  PageTitle,
  SecureLine,
} from "@/components/travel/Chrome";
import { SPLIT_PLANS } from "@/lib/order";
import { usePaymentState } from "@/lib/payment-state";

export const Route = createFileRoute("/yandex-split")({
  head: () => ({
    meta: [
      { title: "Яндекс Сплит — оплата частями без переплат | Travel Pay" },
      { name: "description", content: "Выберите удобный график платежей: 4, 6 или 12 платежей без процентов и переплат." },
      { property: "og:title", content: "Яндекс Сплит — оплата частями без переплат" },
      { property: "og:description", content: "Оплачивайте путешествие частями без переплат и процентов." },
    ],
  }),
  component: SplitPage,
});

const STEPS = ["Выберите удобный\nграфик платежей", "Нажмите «Оформить\nЯндекс Сплит»", "Авторизуйтесь в Яндекс ID", "Подтвердите оплату"];

function SplitMark({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9.5" fill="none" stroke="oklch(0.5 0.16 285)" strokeWidth="1.5" />
      <path d="M12 2.5a9.5 9.5 0 010 19z" fill="oklch(0.5 0.16 285)" opacity="0.3" />
      <path d="M12 2.5v19" stroke="oklch(0.5 0.16 285)" strokeWidth="1.5" />
    </svg>
  );
}

function Timeline({ dates, active }: { dates: readonly string[]; active: boolean }) {
  return (
    <div className="min-w-0 flex-1">
      <div className="relative mx-2 flex items-center justify-between">
        <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-line" />
        {dates.map((date, index) => (
          <span
            key={date + index}
            className={`relative size-2.5 rounded-full border ${
              index === 0 && active
                ? "border-[oklch(0.5_0.16_285)] bg-[oklch(0.5_0.16_285)]"
                : "border-line bg-card"
            }`}
          />
        ))}
      </div>
      <div className="mt-1.5 flex items-center justify-between text-[8.5px] text-slate">
        {dates.map((date, index) => (
          <span key={date + index}>{date}</span>
        ))}
      </div>
    </div>
  );
}

function SplitPage() {
  const navigate = useNavigate();
  const { state, update } = usePaymentState();
  const selected = SPLIT_PLANS.find((plan) => plan.id === state.splitPlan) ?? SPLIT_PLANS[0];

  return (
    <div className="min-h-screen bg-[oklch(0.93_0.005_250)] py-0 sm:py-8">
      <div className="tp-frame">
        <Header tone="light" />

        <div className="px-6 pb-6 pt-4">
          <BackLink to="/" label="Назад к способам оплаты" />
          <PageTitle
            icon={<SplitMark size={20} />}
            title="Оплата через Яндекс Сплит"
            subtitle="Оплачивайте частями без переплат и процентов"
          />
          <OrderSummary />

          <div className="mt-4 rounded-[14px] border border-line bg-card p-5">
            <div className="grid grid-cols-[190px_1fr] gap-6">
              <div>
                <h2 className="text-[12px] font-bold text-ink">Как оплатить через Яндекс Сплит</h2>
                <ol className="mt-3 space-y-3">
                  {STEPS.map((step, index) => (
                    <li key={step} className="flex items-start gap-2.5">
                      <span className="flex size-[19px] shrink-0 items-center justify-center rounded-full bg-[oklch(0.5_0.16_285)]/12 text-[10.5px] font-bold text-[oklch(0.5_0.16_285)]">
                        {index + 1}
                      </span>
                      <span className="whitespace-pre-line text-[11.5px] leading-[1.4] text-ink">{step}</span>
                    </li>
                  ))}
                </ol>

                <div className="mt-4 rounded-[12px] bg-[oklch(0.5_0.16_285)]/8 px-3.5 py-3">
                  <div className="flex items-center gap-2">
                    <Shield className="size-[16px] text-[oklch(0.5_0.16_285)]" strokeWidth={1.7} />
                    <div className="text-[11.5px] font-bold text-ink">Без переплат</div>
                  </div>
                  <div className="mt-1 text-[10px] leading-[1.4] text-slate">
                    Вы оплачиваете только ту сумму, которая указана в графике платежей
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <h2 className="text-[12px] font-bold text-ink">Выберите удобный график платежей</h2>
                  <span className="rounded-[6px] bg-[oklch(0.5_0.16_285)]/12 px-2 py-1 text-[9.5px] font-semibold text-[oklch(0.5_0.16_285)]">
                    Без переплат
                  </span>
                </div>

                <div className="mt-3 space-y-2.5">
                  {SPLIT_PLANS.map((plan) => {
                    const active = plan.id === selected.id;
                    return (
                      <button
                        key={plan.id}
                        type="button"
                        aria-pressed={active}
                        onClick={() => update({ splitPlan: plan.id })}
                        className={`flex w-full items-center gap-4 rounded-[12px] border px-4 py-3.5 text-left transition-colors ${
                          active
                            ? "border-[oklch(0.5_0.16_285)] bg-[oklch(0.5_0.16_285)]/5"
                            : "border-line bg-card hover:border-[oklch(0.5_0.16_285)]/50"
                        }`}
                      >
                        <span
                          className={`flex size-[15px] shrink-0 items-center justify-center rounded-full border ${
                            active ? "border-[oklch(0.5_0.16_285)]" : "border-line"
                          }`}
                        >
                          {active && <span className="size-[7px] rounded-full bg-[oklch(0.5_0.16_285)]" />}
                        </span>
                        <span className="w-[92px] shrink-0">
                          <span className="block text-[12px] font-bold text-ink">{plan.payments}</span>
                          <span className="block text-[11px] font-semibold text-slate">{plan.per}</span>
                        </span>
                        <Timeline dates={plan.dates} active={active} />
                      </button>
                    );
                  })}
                </div>

                <div className="mt-3 grid grid-cols-3 divide-x divide-line rounded-[12px] border border-line bg-surface-2 py-3 text-center">
                  <div>
                    <div className="tp-label">Первый платёж</div>
                    <div className="mt-1 text-[13px] font-bold text-ink">{selected.first}</div>
                    <div className="text-[9.5px] text-slate">сегодня</div>
                  </div>
                  <div>
                    <div className="tp-label">Количество платежей</div>
                    <div className="mt-1 text-[13px] font-bold text-ink">{selected.count}</div>
                  </div>
                  <div>
                    <div className="tp-label">Переплата</div>
                    <div className="mt-1 text-[13px] font-bold text-ink">0 ₽</div>
                    <div className="text-[9.5px] text-slate">Без процентов</div>
                  </div>
                </div>

                <div className="mt-3 flex items-start gap-2 rounded-[10px] bg-warning-soft px-3.5 py-2.5">
                  <Info className="mt-px size-[14px] shrink-0 text-gold-deep" strokeWidth={1.8} />
                  <p className="text-[10px] leading-[1.4] text-ink">
                    Нажимая кнопку, вы переходите в Яндекс для оформления оплаты через Яндекс Сплит
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    update({ method: "yandex-split" });
                    navigate({ to: "/processing" });
                  }}
                  className="mt-3 flex w-full items-center justify-center gap-2.5 rounded-[10px] bg-navy py-3.5 text-[14px] font-bold text-white transition-opacity hover:opacity-90"
                >
                  <span className="flex size-[18px] items-center justify-center rounded-full bg-danger text-[10px] font-bold">
                    Я
                  </span>
                  Оформить Яндекс Сплит
                </button>

                <SecureLine text="Безопасное соединение. Данные защищены по стандарту PCI DSS" />
              </div>
            </div>
          </div>

          <FeatureQuad
            items={[
              {
                icon: <Shield className="size-[18px]" strokeWidth={1.6} />,
                title: "Без переплат",
                text: "Вы ничего не переплачиваете\nза использование\nсервиса",
              },
              {
                icon: <Percent className="size-[18px]" strokeWidth={1.6} />,
                title: "Удобный график",
                text: "Выбирайте количество\nи даты платежей",
              },
              {
                icon: <Clock className="size-[18px]" strokeWidth={1.6} />,
                title: "Быстрое оформление",
                text: "Всего несколько кликов\nи оплата оформлена",
              },
              {
                icon: <Gift className="size-[18px]" strokeWidth={1.6} />,
                title: "Надёжно и безопасно",
                text: "Платежи защищены\nпо международным\nстандартам",
              },
            ]}
          />
        </div>

        <Footer variant="method" />
      </div>
    </div>
  );
}
