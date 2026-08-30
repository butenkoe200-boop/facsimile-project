import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Download, Mail, Home, Plane, FileText, User, Ticket, Shield, Headphones } from "lucide-react";

import successBg from "@/assets/bora-bora.jpg";
import beachLoungers from "@/assets/beach-loungers.jpg";
import { Footer, Header, OrderSummary } from "@/components/travel/Chrome";
import { METHOD_LABELS, ORDER } from "@/lib/order";
import { usePaymentState } from "@/lib/payment-state";

export const Route = createFileRoute("/success")({
  head: () => ({
    meta: [
      { title: "Оплата успешно принята — Travel Pay" },
      { name: "description", content: "Платёж по заказу TP-245789 прошёл успешно. Скачайте чек, отправьте его на e-mail или вернитесь на сайт турагентства." },
      { property: "og:title", content: "Оплата успешно принята — Travel Pay" },
      { property: "og:description", content: "Спасибо! Ваше путешествие уже совсем близко." },
    ],
  }),
  component: SuccessPage,
});

const NEXT_STEPS = [
  { icon: Check, title: "Оплата", text: "получена", done: true },
  { icon: FileText, title: "Туроператор получил", text: "средства", done: false },
  { icon: User, title: "Менеджер оформляет", text: "документы", done: false },
  { icon: Ticket, title: "Билеты и ваучеры", text: "придут после подтверждения", done: false },
];

function SuccessPage() {
  const { state } = usePaymentState();

  return (
    <div className="min-h-screen bg-[oklch(0.93_0.005_250)] py-0 sm:py-8">
      <div className="tp-frame">
        <Header tone="dark" />

        <div className="bg-navy px-5 pb-5">
          <OrderSummary third="paidAt" />
        </div>

        <div className="relative isolate overflow-hidden">
          <img
            src={successBg}
            alt="Лагуна Бора-Бора"
            width={1024}
            height={1024}
            className="absolute inset-0 size-full object-cover"
          />
          <div className="absolute inset-0 bg-card/40" />

          <div className="relative px-5 py-5">
            <div className="rounded-[16px] bg-card/95 px-4 sm:px-6 py-7 shadow-raised backdrop-blur-sm">
              <div className="relative flex justify-center">
                <span className="tp-confetti" aria-hidden="true" />
                <span className="flex size-[62px] items-center justify-center rounded-full bg-success">
                  <Check className="size-9 text-white" strokeWidth={3} />
                </span>
              </div>

              <h1 className="mt-4 text-center text-[22px] font-bold text-ink">Оплата успешно принята!</h1>
              <p className="mt-1.5 text-center text-[12.5px] text-slate">
                Спасибо! Ваше путешествие уже совсем близко.
              </p>

              <div className="mx-auto mt-4 flex max-w-[420px] items-start gap-3 rounded-[12px] bg-success-soft px-4 py-3">
                <Shield className="mt-0.5 size-[18px] shrink-0 text-success" strokeWidth={1.7} />
                <div className="text-[11.5px] leading-[1.45] text-ink">
                  Платёж прошёл успешно и защищён.
                  <br />
                  <span className="text-slate">Ваши данные и средства в безопасности.</span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-[1fr_260px] overflow-hidden rounded-[14px] border border-line">
                <div className="p-5">
                  <h2 className="text-[13px] font-bold text-ink">Детали платежа</h2>
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3.5">
                    <div>
                      <div className="tp-label">Заказ</div>
                      <div className="tp-value">{ORDER.numberTP}</div>
                    </div>
                    <div>
                      <div className="tp-label">Сумма</div>
                      <div className="tp-value">{ORDER.amount}</div>
                    </div>
                    <div>
                      <div className="tp-label">Туроператор</div>
                      <div className="tp-value">{ORDER.tourOperator}</div>
                    </div>
                    <div>
                      <div className="tp-label">Дата и время</div>
                      <div className="tp-value">
                        {ORDER.dateTime} <span className="text-[10px] font-normal text-slate">(МСК)</span>
                      </div>
                    </div>
                    <div>
                      <div className="tp-label">Способ оплаты</div>
                      <div className="tp-value">{METHOD_LABELS[state.method]}</div>
                    </div>
                    <div>
                      <div className="tp-label">Статус платежа</div>
                      <div className="mt-1 inline-flex rounded-[6px] bg-success-soft px-2.5 py-1 text-[11px] font-semibold text-success">
                        Оплачено
                      </div>
                    </div>
                  </div>
                </div>
                <img
                  src={beachLoungers}
                  alt="Пляж с лежаками под пальмами"
                  width={1024}
                  height={1024}
                  className="size-full object-cover"
                />
              </div>

              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
                <Link
                  to="/receipt"
                  className="flex items-center gap-3 rounded-[12px] border border-line bg-card px-4 py-3.5 transition-colors hover:border-navy"
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-navy">
                    <Download className="size-4 text-white" strokeWidth={2} />
                  </span>
                  <span className="text-[11.5px] font-bold leading-tight text-ink">
                    Скачать чек
                    <span className="block font-medium text-slate">PDF</span>
                  </span>
                </Link>
                <Link
                  to="/receipt-email"
                  className="flex items-center gap-3 rounded-[12px] border border-line bg-card px-4 py-3.5 transition-colors hover:border-navy"
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-navy">
                    <Mail className="size-4 text-white" strokeWidth={2} />
                  </span>
                  <span className="text-[11.5px] font-bold leading-tight text-ink">
                    Отправить чек
                    <span className="block font-medium text-slate">на e-mail</span>
                  </span>
                </Link>
                <Link
                  to="/"
                  className="flex items-center gap-3 rounded-[12px] border border-gold bg-card px-4 py-3.5 transition-colors hover:bg-warning-soft"
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-warning-soft">
                    <Home className="size-4 text-gold-deep" strokeWidth={2} />
                  </span>
                  <span className="text-[11.5px] font-bold leading-tight text-ink">
                    Вернуться на сайт
                    <span className="block font-medium text-slate">турагентства</span>
                  </span>
                </Link>
              </div>

              <div className="mt-4 rounded-[14px] bg-surface px-4 py-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
                  <div className="flex shrink-0 items-center gap-2.5">
                    <span className="flex size-9 items-center justify-center rounded-full bg-brandblue-soft">
                      <Plane className="size-[18px] text-brandblue" strokeWidth={1.7} />
                    </span>
                    <span className="text-[12px] font-bold text-ink">Что дальше?</span>
                  </div>
                  <div className="grid flex-1 grid-cols-1 gap-y-2 sm:grid-cols-4 sm:gap-y-0 sm:divide-x sm:divide-line">
                    {NEXT_STEPS.map((step) => {
                      const Icon = step.icon;
                      return (
                        <div key={step.title} className="flex items-center gap-2 sm:px-3">

                          <span
                            className={`flex size-[22px] shrink-0 items-center justify-center rounded-full ${
                              step.done ? "bg-success-soft text-success" : "bg-brandblue-soft text-brandblue"
                            }`}
                          >
                            <Icon className="size-[13px]" strokeWidth={2} />
                          </span>
                          <span className="text-[9.5px] font-semibold leading-[1.3] text-ink">
                            {step.title}
                            <span className="block font-medium text-slate">{step.text}</span>
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-center gap-3 border-t border-line pt-4 text-[11.5px] text-slate">
                <Headphones className="size-4" strokeWidth={1.7} />
                Возникли вопросы? Наша служба поддержки всегда на связи
                <span className="text-line">|</span>
                <Link to="/support" className="font-semibold text-brandblue hover:underline">
                  Написать в чат
                </Link>
              </div>
            </div>
          </div>
        </div>

        <Footer variant="full" />
      </div>
    </div>
  );
}
