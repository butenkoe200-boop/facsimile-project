import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Plane, Armchair, Car, Gift, Flower2, Download, Send, Lock, Mail, FileText, Briefcase, Headphones, Clock, Wallet, CreditCard, ShieldCheck } from "lucide-react";

import thanksBg from "@/assets/bora-bora.jpg";
import resortSunset from "@/assets/resort-sunset.jpg";
import { Footer, Header, HelpBar } from "@/components/travel/Chrome";
import { ORDER } from "@/lib/order";

export const Route = createFileRoute("/thanks")({
  head: () => ({
    meta: [
      { title: "Спасибо! Ваше путешествие уже совсем близко — Travel Pay" },
      { name: "description", content: "Оплата успешно завершена. Подтверждение и все документы отправлены на вашу почту." },
      { property: "og:title", content: "Спасибо! Ваше путешествие уже совсем близко" },
      { property: "og:description", content: "Оплата успешно завершена — документы уже в пути." },
    ],
  }),
  component: ThanksPage,
});

const PERKS = [
  { icon: Plane, title: "Путешествие\nначинается\nздесь", tone: "bg-brandblue-soft text-brandblue" },
  { icon: Armchair, title: "Бизнес-зал\nв подарок", tone: "bg-success-soft text-success" },
  { icon: Car, title: "Такси в подарок\nв одну сторону", tone: "bg-warning-soft text-gold-deep" },
  { icon: Gift, title: "Подарок от\nGM International\nTravel", tone: "bg-danger-soft text-danger" },
  { icon: Flower2, title: "Сертификат\nв GM International\nBeauty", tone: "bg-[oklch(0.5_0.16_285)]/12 text-[oklch(0.5_0.16_285)]" },
];

const NEXT = [
  { icon: Mail, title: "Мы отправили вам подтверждение", text: "Проверьте вашу почту" },
  { icon: FileText, title: "Документы и ваучеры", text: "Будут отправлены в ближайшее время" },
  { icon: Briefcase, title: "Подготовка к путешествию", text: "Мы всегда на связи и готовы помочь" },
  { icon: Headphones, title: "Поддержка 24/7", text: "На всех этапах вашего путешествия" },
];

function ThanksPage() {
  const DETAILS = [
    { icon: CreditCard, label: "Способ оплаты", value: "Travel Pay (Кредит на путешествие)" },
    { icon: Clock, label: "Номер заказа", value: ORDER.numberTR },
    { icon: ShieldCheck, label: "Статус оплаты", value: "Оплачено", badge: true },
    { icon: Clock, label: "Дата и время", value: ORDER.dateTimeMsk },
    { icon: Wallet, label: "Сумма оплачена", value: ORDER.amount },
  ];

  return (
    <div className="min-h-screen bg-[oklch(0.93_0.005_250)] py-0 sm:py-8">
      <div className="tp-frame">
        <Header tone="dark" />

        <div className="bg-navy px-5 pb-5">
          <div className="flex items-center justify-between gap-4 rounded-[14px] bg-card px-6 py-4">
            <div>
              <div className="tp-label">Номер заказа</div>
              <div className="mt-1 text-[17px] font-bold text-ink">{ORDER.numberTR}</div>
            </div>
            <div>
              <div className="tp-label">Дата и время заказа</div>
              <div className="mt-1 text-[13.5px] font-bold text-ink">{ORDER.dateTime}</div>
              <div className="text-[10.5px] text-slate">(МСК)</div>
            </div>
          </div>
        </div>

        <div className="relative isolate overflow-hidden">
          <img
            src={thanksBg}
            alt="Тропический пляж с бунгало"
            width={1024}
            height={1024}
            className="absolute inset-0 size-full object-cover"
          />
          <div className="absolute inset-0 bg-card/35" />

          <div className="relative px-5 py-6">
            <div className="flex justify-center">
              <span className="flex size-[54px] items-center justify-center rounded-full border-[3px] border-success bg-card">
                <Check className="size-7 text-success" strokeWidth={3} />
              </span>
            </div>

            <h1 className="mt-4 text-center text-[28px] font-bold leading-tight text-ink">
              🎉 Спасибо!
              <span className="mt-1 block text-[22px]">Ваше путешествие уже совсем близко.</span>
            </h1>
            <p className="mt-3 text-center text-[11.5px] leading-[1.5] text-ink">
              Оплата успешно завершена.
              <br />
              Подтверждение и все документы отправлены на вашу почту.
            </p>

            <div className="mt-5 grid grid-cols-5 gap-3">
              {PERKS.map((perk) => {
                const Icon = perk.icon;
                return (
                  <div key={perk.title} className="flex flex-col items-center text-center">
                    <span className={`flex size-[38px] items-center justify-center rounded-full ${perk.tone}`}>
                      <Icon className="size-[18px]" strokeWidth={1.8} />
                    </span>
                    <span className="mt-2 whitespace-pre-line text-[9.5px] font-semibold leading-[1.3] text-ink">
                      {perk.title}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 grid grid-cols-2 gap-4">
              <div className="rounded-[14px] bg-card/95 p-4 shadow-card">
                <h2 className="text-[12.5px] font-bold text-ink">Детали вашего заказа</h2>
                <dl className="mt-3 space-y-2.5">
                  {DETAILS.map((detail) => {
                    const Icon = detail.icon;
                    return (
                      <div key={detail.label} className="flex items-center justify-between gap-3">
                        <dt className="flex items-center gap-2 text-[10px] text-slate">
                          <Icon className="size-[13px] shrink-0 text-brandblue" strokeWidth={1.8} />
                          {detail.label}
                        </dt>
                        <dd>
                          {detail.badge ? (
                            <span className="rounded-[6px] bg-success-soft px-2.5 py-1 text-[10px] font-semibold text-success">
                              {detail.value}
                            </span>
                          ) : (
                            <span className="text-[10.5px] font-semibold text-ink">{detail.value}</span>
                          )}
                        </dd>
                      </div>
                    );
                  })}
                </dl>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <Link
                    to="/receipt"
                    className="flex items-center justify-center gap-2 rounded-[10px] border border-brandblue bg-card py-2.5 text-[11px] font-semibold text-brandblue transition-colors hover:bg-brandblue-soft"
                  >
                    <Download className="size-[14px]" />
                    Скачать чек
                  </Link>
                  <Link
                    to="/receipt-email"
                    className="flex items-center justify-center gap-2 rounded-[10px] border border-brandblue bg-card py-2.5 text-[11px] font-semibold text-brandblue transition-colors hover:bg-brandblue-soft"
                  >
                    <Send className="size-[14px]" />
                    Отправить чек
                  </Link>
                </div>
                <p className="mt-2 flex items-center gap-1.5 text-[9.5px] text-slate">
                  <Lock className="size-3" />
                  Чек содержит фискальные данные и подтверждает оплату.
                </p>
              </div>

              <div className="rounded-[14px] bg-card/95 p-4 shadow-card">
                <h2 className="text-[12.5px] font-bold text-ink">Что дальше?</h2>
                <ul className="mt-3 space-y-3">
                  {NEXT.map((item) => {
                    const Icon = item.icon;
                    return (
                      <li key={item.title} className="flex items-start gap-2.5">
                        <span className="flex size-[26px] shrink-0 items-center justify-center rounded-[8px] bg-brandblue-soft">
                          <Icon className="size-[14px] text-brandblue" strokeWidth={1.8} />
                        </span>
                        <span>
                          <span className="block text-[11px] font-bold text-ink">{item.title}</span>
                          <span className="block text-[9.5px] text-slate">{item.text}</span>
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            <div className="relative mt-5 isolate overflow-hidden rounded-[14px]">
              <img
                src={resortSunset}
                alt="Закат на курорте"
                width={1920}
                height={640}
                className="absolute inset-0 size-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/60 to-transparent" />
              <div className="relative px-5 py-5">
                <div className="text-[15px] font-bold leading-tight text-white">
                  Мы рады быть частью
                  <br />
                  вашего путешествия!
                </div>
                <p className="mt-2 text-[10px] leading-[1.45] text-white/80">
                  Спасибо, что выбрали GM International Travel.
                  <br />
                  Желаем ярких впечатлений и незабываемых эмоций!
                </p>
              </div>
            </div>

            <HelpBar text="Наши специалисты на связи 24/7" />
          </div>
        </div>

        <Footer variant="full" />
      </div>
    </div>
  );
}
