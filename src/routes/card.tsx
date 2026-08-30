import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { CreditCard, Lock, Shield, Zap, Gift, Headphones, HelpCircle } from "lucide-react";

import {
  BackLink,
  FeatureQuad,
  Footer,
  Header,
  OrderSummary,
  PageTitle,
  SecureLine,
} from "@/components/travel/Chrome";
import { MasterCardMark, MirMark, VisaMark } from "@/components/travel/Brand";
import { ORDER } from "@/lib/order";
import { usePaymentState } from "@/lib/payment-state";

export const Route = createFileRoute("/card")({
  head: () => ({
    meta: [
      { title: "Оплата банковской картой — Travel Pay" },
      { name: "description", content: "Введите данные карты Visa, MasterCard или МИР для оплаты заказа TP-245789." },
      { property: "og:title", content: "Оплата банковской картой — Travel Pay" },
      { property: "og:description", content: "Безопасная оплата картой по стандарту PCI DSS." },
    ],
  }),
  component: CardPage,
});

function formatCardNumber(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiry(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)} / ${digits.slice(2)}`;
}

function CardPage() {
  const navigate = useNavigate();
  const { update } = usePaymentState();
  const [number, setNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [holder, setHolder] = useState("");
  const [showCvvHint, setShowCvvHint] = useState(false);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    update({ method: "card" });
    const digits = number.replace(/\D/g, "");
    if (digits.startsWith("0000")) {
      navigate({ to: "/error" });
      return;
    }
    navigate({ to: "/processing" });
  };

  return (
    <div className="min-h-screen bg-[oklch(0.93_0.005_250)] py-0 sm:py-8">
      <div className="tp-frame">
        <Header tone="light" />

        <div className="px-4 sm:px-6 pb-6 pt-4">
          <BackLink to="/" label="Назад к способам оплаты" />
          <PageTitle
            icon={<CreditCard className="size-5" strokeWidth={1.6} />}
            title="Оплата банковской картой"
            subtitle="Введите данные карты для оплаты заказа"
          />
          <OrderSummary />

          <form onSubmit={submit} className="mt-4 rounded-[14px] border border-line bg-card p-5">
            <div className="flex items-center justify-between">
              <span className="text-[12.5px] font-semibold text-ink">Мы принимаем к оплате</span>
              <span className="flex items-center gap-3">
                <VisaMark />
                <MasterCardMark />
                <MirMark />
              </span>
            </div>

            <div className="mt-4">
              <label htmlFor="card-number" className="block text-[11.5px] font-semibold text-ink">
                Номер карты
              </label>
              <div className="mt-1.5 flex items-center gap-3 rounded-[10px] border border-line bg-card px-4 py-3 transition-colors focus-within:border-gold">
                <CreditCard className="size-[18px] text-slate" strokeWidth={1.5} />
                <input
                  id="card-number"
                  inputMode="numeric"
                  autoComplete="cc-number"
                  value={number}
                  onChange={(e) => setNumber(formatCardNumber(e.target.value))}
                  placeholder="0000 0000 0000 0000"
                  className="w-full bg-transparent text-[15px] tracking-[0.05em] text-ink outline-none placeholder:text-slate/70"
                />
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="card-expiry" className="block text-[11.5px] font-semibold text-ink">
                  Срок действия
                </label>
                <input
                  id="card-expiry"
                  inputMode="numeric"
                  autoComplete="cc-exp"
                  value={expiry}
                  onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                  placeholder="ММ / ГГ"
                  className="mt-1.5 w-full rounded-[10px] border border-line bg-card px-4 py-3 text-[15px] text-ink outline-none transition-colors placeholder:text-slate/70 focus:border-gold"
                />
              </div>
              <div>
                <label htmlFor="card-cvv" className="block text-[11.5px] font-semibold text-ink">
                  CVV / CVC
                </label>
                <div className="relative mt-1.5">
                  <input
                    id="card-cvv"
                    type="password"
                    inputMode="numeric"
                    autoComplete="cc-csc"
                    maxLength={3}
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
                    placeholder="•••"
                    className="w-full rounded-[10px] border border-line bg-card px-4 py-3 pr-11 text-[15px] tracking-[0.3em] text-ink outline-none transition-colors placeholder:text-slate/70 focus:border-gold"
                  />
                  <button
                    type="button"
                    aria-label="Что такое CVV / CVC"
                    onClick={() => setShowCvvHint((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate transition-colors hover:text-ink"
                  >
                    <HelpCircle className="size-[18px]" strokeWidth={1.6} />
                  </button>
                  {showCvvHint && (
                    <div className="absolute right-0 top-full z-10 mt-2 w-[220px] rounded-[10px] border border-line bg-card p-3 text-[10.5px] leading-[1.4] text-slate shadow-card">
                      CVV / CVC — три цифры на обратной стороне карты.
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="card-holder" className="block text-[11.5px] font-semibold text-ink">
                Имя владельца карты
              </label>
              <input
                id="card-holder"
                autoComplete="cc-name"
                value={holder}
                onChange={(e) => setHolder(e.target.value.toUpperCase())}
                placeholder="IVAN IVANOV"
                className="mt-1.5 w-full rounded-[10px] border border-line bg-card px-4 py-3 text-[15px] uppercase text-ink outline-none transition-colors placeholder:text-slate/70 focus:border-gold"
              />
              <p className="mt-1.5 text-[11px] text-slate">Как указано на карте</p>
            </div>

            <button
              type="submit"
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-[10px] bg-gradient-to-b from-gold to-gold-deep py-3.5 text-[14.5px] font-bold text-white transition-opacity hover:opacity-95"
            >
              <Lock className="size-4" />
              Оплатить {ORDER.amount}
            </button>

            <SecureLine text="Безопасное соединение. Ваши данные защищены по стандарту PCI DSS" />
          </form>

          <FeatureQuad
            items={[
              {
                icon: <Shield className="size-[18px]" strokeWidth={1.6} />,
                title: "Безопасно",
                text: "Платежи защищены\nпо международным\nстандартам",
              },
              {
                icon: <Zap className="size-[18px]" strokeWidth={1.6} />,
                title: "Быстро",
                text: "Мгновенное зачисление\nи подтверждение\nплатежа",
              },
              {
                icon: <Gift className="size-[18px]" strokeWidth={1.6} />,
                title: "Выгодно",
                text: "Оплата без переплат\nи скрытых\nкомиссий",
              },
              {
                icon: <Headphones className="size-[18px]" strokeWidth={1.6} />,
                title: "Поддержка",
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
