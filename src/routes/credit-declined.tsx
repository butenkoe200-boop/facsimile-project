import { createFileRoute, Link } from "@tanstack/react-router";
import { X, Info, Wallet, QrCode, CalendarDays, Building2, Shield, Lock, PieChart } from "lucide-react";

import declinedBg from "@/assets/bora-bora.jpg";
import beachLoungers from "@/assets/beach-loungers.jpg";
import { ChatIcon, Footer, Header, OrderSummary } from "@/components/travel/Chrome";
import { PciBadge } from "@/components/travel/Brand";
import { ORDER } from "@/lib/order";

export const Route = createFileRoute("/credit-declined")({
  head: () => ({
    meta: [
      { title: "Кредит не одобрен — Travel Pay" },
      { name: "description", content: "Банк не смог одобрить заявку. Выберите другой способ оплаты: карта, СБП, Яндекс Pay, Сплит или рассрочка." },
      { property: "og:title", content: "Кредит не одобрен — Travel Pay" },
      { property: "og:description", content: "Это не повлияет на вашу кредитную историю. Выберите другой способ оплаты." },
    ],
  }),
  component: CreditDeclinedPage,
});

const OPTIONS = [
  {
    to: "/card",
    icon: <Wallet className="size-[16px] text-white" strokeWidth={2} />,
    bg: "bg-success",
    title: "Банковская карта",
    text: "Оплата любой картой\nVisa, Mastercard, МИР",
    action: "Оплатить картой",
    accent: "border-success text-success",
  },
  {
    to: "/sbp",
    icon: <QrCode className="size-[16px] text-white" strokeWidth={2} />,
    bg: "bg-brandblue",
    title: "СБП",
    text: "Оплата по QR-коду\nчерез ваш банк",
    action: "Оплатить через СБП",
    accent: "border-brandblue text-brandblue",
  },
  {
    to: "/yandex-pay",
    icon: <span className="text-[10px] font-bold text-white">Я Pay</span>,
    bg: "bg-navy",
    title: "Яндекс Pay",
    text: "Быстрая оплата\nчерез Яндекс",
    action: "Оплатить через Яндекс Pay",
    accent: "border-navy text-navy",
  },
  {
    to: "/yandex-split",
    icon: <PieChart className="size-[16px] text-white" strokeWidth={2} />,
    bg: "bg-[oklch(0.5_0.16_285)]",
    title: "Яндекс Сплит",
    text: "Оплата частями от 2 до 6\nмесяцев без переплат",
    action: "Оформить Сплит",
    accent: "border-[oklch(0.5_0.16_285)] text-[oklch(0.5_0.16_285)]",
  },
  {
    to: "/installment",
    icon: <CalendarDays className="size-[16px] text-white" strokeWidth={2} />,
    bg: "bg-gold",
    title: "Банковская рассрочка",
    text: "Рассрочка от банков-партнёров\nна выгодных условиях",
    action: "Выбрать рассрочку",
    accent: "border-gold text-gold-deep",
  },
  {
    to: "/credit",
    icon: <Building2 className="size-[16px] text-white" strokeWidth={2} />,
    bg: "bg-success",
    title: "Кредит в другом банке",
    text: "Попробуйте другой банк\nи получите решение",
    action: "Выбрать другой банк",
    accent: "border-success text-success",
  },
] as const;

function CreditDeclinedPage() {
  return (
    <div className="min-h-screen bg-[oklch(0.93_0.005_250)] py-0 sm:py-8">
      <div className="tp-frame">
        <Header tone="dark" />

        <div className="bg-navy px-5 pb-5">
          <OrderSummary third="orderedAt" />
        </div>

        <div className="relative isolate overflow-hidden">
          <img
            src={declinedBg}
            alt="Морская лагуна"
            width={1024}
            height={1024}
            className="absolute inset-0 size-full object-cover"
          />
          <div className="absolute inset-0 bg-card/55" />

          <div className="relative px-5 py-5">
            <div className="rounded-[16px] bg-card/95 px-5 py-6 shadow-raised backdrop-blur-sm">
              <div className="flex justify-center">
                <span className="flex size-[58px] items-center justify-center rounded-full bg-danger">
                  <X className="size-7 text-white" strokeWidth={3} />
                </span>
              </div>

              <h1 className="mt-4 text-center text-[22px] font-bold text-ink">Кредит не одобрен</h1>
              <p className="mt-2 text-center text-[11.5px] leading-[1.5] text-slate">
                К сожалению, банк не смог одобрить вашу заявку.
                <br />
                Не расстраивайтесь — вы можете выбрать другой способ оплаты.
              </p>

              <div className="mx-auto mt-4 flex max-w-[430px] items-start gap-2.5 rounded-[12px] bg-danger-soft px-4 py-3">
                <Info className="mt-0.5 size-[16px] shrink-0 text-danger" strokeWidth={1.8} />
                <div className="text-[10.5px] leading-[1.45] text-ink">
                  Причины отказа могут быть разными и не зависят от нас.
                  <br />
                  Это не повлияет на вашу кредитную историю.
                </div>
              </div>

              <div className="mt-5 rounded-[14px] border border-line bg-card p-4">
                <h2 className="text-[12.5px] font-bold text-ink">Выберите другой способ оплаты</h2>
                <div className="mt-3 grid grid-cols-3 gap-3">
                  {OPTIONS.map((option) => (
                    <div key={option.title} className="rounded-[12px] border border-line bg-card p-3.5">
                      <div className="flex items-center gap-2.5">
                        <span className={`flex size-[26px] items-center justify-center rounded-full ${option.bg}`}>
                          {option.icon}
                        </span>
                        <span className="text-[11.5px] font-bold text-ink">{option.title}</span>
                      </div>
                      <p className="mt-2.5 whitespace-pre-line text-[9.5px] leading-[1.4] text-slate">{option.text}</p>
                      <Link
                        to={option.to}
                        className={`mt-3 flex w-full items-center justify-center rounded-[8px] border bg-card py-2 text-[10.5px] font-semibold transition-colors hover:bg-surface ${option.accent}`}
                      >
                        {option.action}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex items-center gap-4 overflow-hidden rounded-[14px] bg-brandblue-soft">
                <img
                  src={beachLoungers}
                  alt="Шезлонг на пляже"
                  width={1024}
                  height={1024}
                  className="h-[74px] w-[110px] shrink-0 object-cover"
                />
                <div className="flex-1 py-3">
                  <div className="text-[12px] font-bold text-ink">Мы поможем вам найти лучшее решение!</div>
                  <div className="mt-0.5 text-[10px] leading-[1.4] text-slate">
                    Наши специалисты готовы подобрать для вас оптимальный вариант оплаты и сделать ваше
                    путешествие реальностью.
                  </div>
                </div>
                <Link
                  to="/support"
                  className="mr-4 flex shrink-0 items-center gap-2 rounded-[10px] border border-line bg-card px-4 py-2.5 text-[11.5px] font-semibold text-ink transition-colors hover:border-brandblue hover:text-brandblue"
                >
                  <ChatIcon />
                  Написать в чат
                </Link>
              </div>

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

              <p className="mt-4 text-center text-[9.5px] text-slate">Заказ {ORDER.numberTP}</p>
            </div>
          </div>
        </div>

        <Footer variant="full" />
      </div>
    </div>
  );
}
