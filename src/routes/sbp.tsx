import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Shield, Zap, Percent, Headphones, MoreHorizontal } from "lucide-react";

import {
  BackLink,
  FeatureQuad,
  Footer,
  Header,
  OrderSummary,
  PageTitle,
  SecureLine,
} from "@/components/travel/Chrome";
import { BankMark, SbpMark } from "@/components/travel/Brand";
import { usePaymentState } from "@/lib/payment-state";

export const Route = createFileRoute("/sbp")({
  head: () => ({
    meta: [
      { title: "Оплата через СБП по QR-коду — Travel Pay" },
      { name: "description", content: "Отсканируйте QR-код в мобильном приложении вашего банка и подтвердите оплату через СБП." },
      { property: "og:title", content: "Оплата через СБП — Travel Pay" },
      { property: "og:description", content: "Оплата по QR-коду. Комиссия СБП всего 0,7%." },
    ],
  }),
  component: SbpPage,
});

const STEPS = [
  "Откройте приложение\nвашего банка",
  "Выберите «Оплата по QR-коду»\nили «СБП»",
  "Отсканируйте QR-код\nсправа",
  "Подтвердите оплату\nв приложении банка",
];

const BANKS = [
  { id: "sber", label: "СберБанк" },
  { id: "tbank", label: "Т-Банк" },
  { id: "alfa", label: "Альфа-Банк" },
  { id: "vtb", label: "ВТБ" },
  { id: "other", label: "Другой банк" },
];

function QrCode() {
  // Deterministic pseudo-random QR pattern
  const cells: boolean[] = [];
  let seed = 7;
  for (let i = 0; i < 33 * 33; i++) {
    seed = (seed * 1103515245 + 12345) % 2147483648;
    cells.push((seed >> 16) % 100 > 48);
  }
  const isFinder = (r: number, c: number) =>
    (r < 7 && c < 7) || (r < 7 && c > 25) || (r > 25 && c < 7);
  const isCenter = (r: number, c: number) => r > 12 && r < 20 && c > 12 && c < 20;

  return (
    <div className="relative rounded-[10px] bg-card p-3">
      <svg viewBox="0 0 33 33" className="size-full" aria-label="QR-код для оплаты через СБП" role="img">
        {cells.map((on, i) => {
          const r = Math.floor(i / 33);
          const c = i % 33;
          if (isFinder(r, c) || isCenter(r, c)) return null;
          return on ? <rect key={i} x={c} y={r} width="1" height="1" fill="oklch(0.204 0.052 259)" /> : null;
        })}
        {([
          [0, 0],
          [0, 26],
          [26, 0],
        ] as const).map(([r, c]) => (
          <g key={`${r}-${c}`}>
            <rect x={c} y={r} width="7" height="7" fill="oklch(0.204 0.052 259)" />
            <rect x={c + 1} y={r + 1} width="5" height="5" fill="white" />
            <rect x={c + 2} y={r + 2} width="3" height="3" fill="oklch(0.204 0.052 259)" />
          </g>
        ))}
        <rect x="12" y="12" width="9" height="9" fill="white" />
      </svg>
      <span className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-[6px] bg-card px-2 py-1">
        <SbpMark size={18} />
        <span className="text-[12px] font-bold text-ink">сбп</span>
      </span>
    </div>
  );
}

function SbpPage() {
  const navigate = useNavigate();
  const { update } = usePaymentState();

  const pay = () => {
    update({ method: "sbp" });
    navigate({ to: "/processing" });
  };

  return (
    <div className="min-h-screen bg-[oklch(0.93_0.005_250)] py-0 sm:py-8">
      <div className="tp-frame">
        <Header tone="light" />

        <div className="px-6 pb-6 pt-4">
          <BackLink to="/" label="Назад к способам оплаты" />
          <PageTitle
            icon={<SbpMark size={20} />}
            title="Оплата через СБП"
            subtitle="Отсканируйте QR-код в мобильном приложении вашего банка"
          />
          <OrderSummary />

          <div className="mt-4 rounded-[14px] border border-line bg-card p-5">
            <div className="grid grid-cols-2 gap-6">
              {/* Steps */}
              <div>
                <h2 className="text-[12.5px] font-bold text-ink">Как оплатить через СБП</h2>
                <ol className="mt-3 space-y-3">
                  {STEPS.map((step, index) => (
                    <li key={step} className="flex items-start gap-2.5">
                      <span className="flex size-[19px] shrink-0 items-center justify-center rounded-full bg-gold/15 text-[10.5px] font-bold text-gold-deep">
                        {index + 1}
                      </span>
                      <span className="whitespace-pre-line text-[11.5px] leading-[1.4] text-ink">{step}</span>
                    </li>
                  ))}
                </ol>

                <div className="mt-4 flex items-start gap-2.5 rounded-[12px] bg-surface px-3.5 py-3">
                  <Shield className="mt-0.5 size-[18px] shrink-0 text-ink" strokeWidth={1.6} />
                  <div>
                    <div className="text-[11.5px] font-bold text-ink">Безопасно и быстро</div>
                    <div className="text-[10px] leading-[1.4] text-slate">
                      Платежи через СБП защищены банком и проходят моментально
                    </div>
                  </div>
                </div>
              </div>

              {/* QR */}
              <div className="flex flex-col items-center">
                <h2 className="text-[12px] font-semibold text-ink">Отсканируйте QR-код для оплаты</h2>
                <div className="mt-3 w-full rounded-[14px] border border-gold/50 bg-card p-2">
                  <QrCode />
                </div>

                <div className="mt-4 w-full border-t border-line pt-3 text-center text-[11px] text-slate">
                  Или выберите ваш банк
                </div>
                <div className="mt-2.5 grid w-full grid-cols-5 gap-1.5">
                  {BANKS.map((bank) => (
                    <button
                      key={bank.id}
                      type="button"
                      onClick={pay}
                      className="flex flex-col items-center gap-1.5 rounded-[10px] border border-line bg-card px-1 py-2.5 transition-colors hover:border-gold/60"
                    >
                      {bank.id === "other" ? (
                        <span className="flex size-[26px] items-center justify-center rounded-[8px] bg-surface">
                          <MoreHorizontal className="size-4 text-slate" />
                        </span>
                      ) : (
                        <BankMark id={bank.id} size={26} />
                      )}
                      <span className="text-[8.5px] leading-tight text-ink">{bank.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <SecureLine text="Безопасное соединение. Данные защищены по стандарту PCI DSS" />
          </div>

          <FeatureQuad
            items={[
              {
                icon: <Shield className="size-[18px]" strokeWidth={1.6} />,
                title: "Безопасно",
                text: "Платежи защищены\nпо стандартам\nвашего банка",
              },
              {
                icon: <Zap className="size-[18px]" strokeWidth={1.6} />,
                title: "Мгновенно",
                text: "Деньги поступают\nмоментально\n24/7",
              },
              {
                icon: <Percent className="size-[18px]" strokeWidth={1.6} />,
                title: "Выгодно",
                text: "Комиссия СБП\nвсего 0,7%",
              },
              {
                icon: <Headphones className="size-[18px]" strokeWidth={1.6} />,
                title: "Поддержка 24/7",
                text: "Наша служба поддержки\nвсегда на связи",
              },
            ]}
          />
        </div>

        <Footer variant="method" />
      </div>
    </div>
  );
}
