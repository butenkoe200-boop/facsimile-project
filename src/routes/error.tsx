import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { X, AlertCircle, RefreshCw, CreditCard, Landmark, Headphones, ChevronRight, Info, Shield, Wallet, QrCode, Building2 } from "lucide-react";

import errorBg from "@/assets/beach-processing.jpg";
import { Footer, Header, HelpBar, OrderSummary } from "@/components/travel/Chrome";
import { MasterCardMark } from "@/components/travel/Brand";
import { ORDER } from "@/lib/order";

export const Route = createFileRoute("/error")({
  head: () => ({
    meta: [
      { title: "Ошибка оплаты — Travel Pay" },
      { name: "description", content: "Платёж не был завершён. Попробуйте ещё раз или выберите другой способ оплаты заказа TR-245789." },
      { property: "og:title", content: "Ошибка оплаты — Travel Pay" },
      { property: "og:description", content: "Средства не списаны. Попробуйте ещё раз или выберите другой способ оплаты." },
    ],
  }),
  component: ErrorPage,
});

const REASONS = [
  "Недостаточно средств на счёте",
  "Превышен лимит по карте",
  "Операция отклонена банком",
  "Временные технические неполадки",
];

const OTHER_METHODS = [
  { to: "/card", icon: <Wallet className="size-[14px] text-white" strokeWidth={2} />, bg: "bg-success", title: "Оплата картой", text: "Visa, Mastercard, МИР" },
  { to: "/sbp", icon: <QrCode className="size-[14px] text-white" strokeWidth={2} />, bg: "bg-brandblue", title: "СБП", text: "Оплата по QR-коду" },
  { to: "/yandex-pay", icon: <span className="text-[9px] font-bold text-white">Я</span>, bg: "bg-navy", title: "Яндекс Pay", text: "Быстрая оплата" },
  { to: "/yandex-split", icon: <span className="text-[9px] font-bold text-white">Я</span>, bg: "bg-[oklch(0.5_0.16_285)]", title: "Яндекс Сплит", text: "Оплата частями" },
  { to: "/credit", icon: <Building2 className="size-[14px] text-white" strokeWidth={2} />, bg: "bg-success", title: "Другой банк", text: "Кредит в другом банке" },
] as const;

function ErrorPage() {
  const navigate = useNavigate();

  const ACTIONS = [
    {
      icon: <RefreshCw className="size-[17px]" strokeWidth={1.7} />,
      title: "Попробовать ещё раз",
      text: "Повторить оплату тем же способом",
      onClick: () => navigate({ to: "/processing" }),
    },
    {
      icon: <CreditCard className="size-[17px]" strokeWidth={1.7} />,
      title: "Выбрать другой способ оплаты",
      text: "Карта, СБП или другой способ",
      onClick: () => navigate({ to: "/" }),
    },
    {
      icon: <Landmark className="size-[17px]" strokeWidth={1.7} />,
      title: "Выбрать другой банк",
      text: "Получить кредит через другой банк",
      onClick: () => navigate({ to: "/credit" }),
    },
    {
      icon: <Headphones className="size-[17px]" strokeWidth={1.7} />,
      title: "Связаться с поддержкой",
      text: "Мы поможем решить проблему",
      onClick: () => navigate({ to: "/support" }),
    },
  ];

  const DETAILS = [
    {
      label: "Способ оплаты",
      value: (
        <span className="flex items-center gap-2">
          <MasterCardMark />
          <span className="text-[11.5px] font-semibold text-ink">**** 1234</span>
        </span>
      ),
    },
    { label: "Сумма к оплате", value: <span className="text-[11.5px] font-semibold text-ink">{ORDER.amount}</span> },
    { label: "Номер заказа", value: <span className="text-[11.5px] font-semibold text-ink">{ORDER.numberTR}</span> },
    { label: "Дата и время", value: <span className="text-[11.5px] font-semibold text-ink">{ORDER.dateTimeMsk}</span> },
    { label: "Код ошибки", value: <span className="text-[11.5px] font-bold text-danger">PAY-5003</span> },
    {
      label: "Статус",
      value: (
        <span className="rounded-[6px] bg-danger-soft px-2.5 py-1 text-[10.5px] font-semibold text-danger">
          Не оплачено
        </span>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[oklch(0.93_0.005_250)] py-0 sm:py-8">
      <div className="tp-frame">
        <Header tone="dark" />

        <div className="bg-navy px-5 pb-5">
          <OrderSummary third="orderedAt" numberValue={ORDER.numberTR} />
        </div>

        <div className="relative isolate overflow-hidden">
          <img
            src={errorBg}
            alt="Тропический курорт"
            width={1024}
            height={1024}
            className="absolute inset-0 size-full object-cover"
          />
          <div className="absolute inset-0 bg-card/55" />

          <div className="relative px-5 py-5">
            <div className="rounded-[16px] bg-card/95 px-5 py-6 shadow-raised backdrop-blur-sm">
              <div className="flex justify-center">
                <span className="flex size-[62px] items-center justify-center rounded-full border-2 border-dashed border-danger/50">
                  <span className="flex size-[42px] items-center justify-center rounded-full bg-danger">
                    <X className="size-6 text-white" strokeWidth={3} />
                  </span>
                </span>
              </div>

              <h1 className="mt-4 text-center text-[22px] font-bold text-ink">Ошибка оплаты</h1>
              <p className="mx-auto mt-2 max-w-[420px] text-center text-[11.5px] leading-[1.5] text-slate">
                Платёж не был завершён. Это могло произойти по разным причинам.
                <br />
                Пожалуйста, попробуйте ещё раз или выберите другой способ оплаты.
              </p>

              <div className="mx-auto mt-4 max-w-[460px] rounded-[12px] bg-danger-soft px-4 py-3.5">
                <div className="flex items-start gap-2.5">
                  <AlertCircle className="mt-px size-[16px] shrink-0 text-danger" strokeWidth={1.8} />
                  <div>
                    <div className="text-[11.5px] font-bold text-ink">Возможные причины:</div>
                    <ul className="mt-1.5 space-y-1">
                      {REASONS.map((reason) => (
                        <li key={reason} className="flex items-start gap-2 text-[10.5px] text-ink">
                          <span className="mt-[5px] size-1 shrink-0 rounded-full bg-ink" />
                          {reason}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <h2 className="text-[12px] font-bold text-ink">Что можно сделать</h2>
                  <div className="mt-2.5 space-y-2 rounded-[12px] border border-line bg-card p-1.5">
                    {ACTIONS.map((action) => (
                      <button
                        key={action.title}
                        type="button"
                        onClick={action.onClick}
                        className="flex w-full items-center gap-3 rounded-[10px] px-3 py-2.5 text-left transition-colors hover:bg-surface"
                      >
                        <span className="text-brandblue">{action.icon}</span>
                        <span className="flex-1">
                          <span className="block text-[11.5px] font-bold text-ink">{action.title}</span>
                          <span className="block text-[10px] text-slate">{action.text}</span>
                        </span>
                        <ChevronRight className="size-4 shrink-0 text-slate" />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-[12px] font-bold text-ink">Детали оплаты</h2>
                  <div className="mt-2.5 divide-y divide-line rounded-[12px] border border-line bg-card px-3.5">
                    {DETAILS.map((detail) => (
                      <div key={detail.label} className="flex items-center justify-between gap-3 py-2.5">
                        <span className="flex items-center gap-2 text-[10.5px] text-slate">
                          <Info className="size-[13px] text-brandblue" strokeWidth={1.8} />
                          {detail.label}
                        </span>
                        {detail.value}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="flex items-start gap-2.5 rounded-[12px] bg-brandblue-soft px-4 py-3">
                  <Info className="mt-0.5 size-[16px] shrink-0 text-brandblue" strokeWidth={1.8} />
                  <div>
                    <div className="text-[11px] font-bold text-ink">Средства не списаны</div>
                    <div className="text-[9.5px] leading-[1.4] text-slate">
                      Если деньги были заблокированы, они автоматически вернутся на счёт в течение
                      нескольких минут в зависимости от вашего банка.
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 rounded-[12px] bg-brandblue-soft px-4 py-3">
                  <Shield className="mt-0.5 size-[16px] shrink-0 text-brandblue" strokeWidth={1.8} />
                  <div>
                    <div className="text-[11px] font-bold text-ink">Ваши данные под защитой</div>
                    <div className="text-[9.5px] leading-[1.4] text-slate">
                      Мы используем шифрование и соответствуем стандарту PCI DSS.
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-[12px] border border-line bg-card p-4">
                <h2 className="text-[12px] font-bold text-ink">Другие способы оплаты</h2>
                <div className="mt-2.5 grid grid-cols-5 gap-2">
                  {OTHER_METHODS.map((method) => (
                    <Link
                      key={method.title}
                      to={method.to}
                      className="rounded-[10px] border border-line bg-card px-2.5 py-2.5 transition-colors hover:border-brandblue"
                    >
                      <span className="flex items-center gap-1.5">
                        <span className={`flex size-[20px] items-center justify-center rounded-[6px] ${method.bg}`}>
                          {method.icon}
                        </span>
                        <span className="text-[9.5px] font-bold text-ink">{method.title}</span>
                      </span>
                      <span className="mt-1.5 flex items-center justify-between gap-1">
                        <span className="text-[8.5px] text-slate">{method.text}</span>
                        <ChevronRight className="size-3 shrink-0 text-slate" />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              <HelpBar text="Наши специалисты на связи 24/7" />
            </div>
          </div>
        </div>

        <Footer variant="full" />
      </div>
    </div>
  );
}
