import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Check,
  Mail,
  RefreshCw,
  Send,
  Info,
  FileText,
  Briefcase,
  Headphones,
  Phone,
  Landmark,
  Wallet,
  Clock,
  Shield,
  BadgeCheck,
} from "lucide-react";

import { BackLink, ChatIcon, Footer, Header, BottomNav, FeatureQuad } from "@/components/travel/Chrome";
import resortSunset from "@/assets/resort-sunset.jpg";
import { ORDER } from "@/lib/order";
import { usePaymentState } from "@/lib/payment-state";

export const Route = createFileRoute("/receipt-email")({
  head: () => ({
    meta: [
      { title: "Отправка чека на email — Travel Pay" },
      { name: "description", content: "Ваш чек об оплате успешно отправлен на электронную почту." },
      { property: "og:title", content: "Отправка чека на email — Travel Pay" },
      { property: "og:description", content: "Чек об оплате заказа TR-245789 отправлен на вашу почту." },
    ],
  }),
  component: ReceiptEmailPage,
});

const NEXT = [
  { icon: Mail, title: "Мы отправили вам подтверждение", text: "Проверьте вашу почту" },
  { icon: FileText, title: "Документы и ваучеры", text: "Будут отправлены в ближайшее время" },
  { icon: Briefcase, title: "Подготовка к путешествию", text: "Мы всегда на связи и готовы помочь" },
  { icon: Headphones, title: "Поддержка 24/7", text: "На всех этапах вашего путешествия" },
];

function ReceiptEmailPage() {
  const { state, update } = usePaymentState();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(state.email);
  const [resent, setResent] = useState(false);

  const DETAILS = [
    { icon: Landmark, label: "Номер заказа", value: ORDER.numberTR },
    { icon: Wallet, label: "Сумма оплачена", value: ORDER.amount },
    { icon: Clock, label: "Дата и время заказа", value: ORDER.dateTimeMsk },
  ];

  return (
    <div className="min-h-screen bg-[oklch(0.93_0.005_250)] py-0 sm:py-8">
      <div className="tp-frame">
        <Header tone="dark" />

        <div className="grid grid-cols-[1fr_270px] gap-5 bg-surface px-5 py-5">
          <div>
            <div className="flex items-start gap-2.5">
              <BackLink to="/success" label="" />
              <div>
                <h1 className="text-[15px] font-bold text-ink">Отправка на email</h1>
                <p className="text-[10.5px] text-slate">Ваш чек будет отправлен на электронную почту</p>
              </div>
            </div>

            <div className="mt-3.5 flex items-center gap-4 rounded-[14px] bg-success-soft px-5 py-4">
              <span className="relative flex size-[46px] items-center justify-center rounded-full bg-success">
                <Mail className="size-[21px] text-white" strokeWidth={1.8} />
                <span className="absolute -bottom-1 -right-1 flex size-[19px] items-center justify-center rounded-full border-2 border-card bg-success">
                  <Check className="size-[10px] text-white" strokeWidth={3} />
                </span>
              </span>
              <div>
                <div className="text-[15px] font-bold text-ink">Чек отправлен!</div>
                <p className="text-[10.5px] leading-[1.4] text-slate">
                  Ваш чек об оплате успешно
                  <br />
                  отправлен на электронную почту.
                </p>
              </div>
            </div>

            <div className="mt-3.5 rounded-[14px] border border-line bg-card px-5 py-6">
              <div className="flex justify-center">
                <span className="relative flex size-[92px] items-center justify-center rounded-[16px] bg-brandblue-soft">
                  <Mail className="size-[44px] text-brandblue" strokeWidth={1.4} />
                  <span className="absolute -left-1 top-1 flex size-[24px] items-center justify-center rounded-full bg-success">
                    <Check className="size-[13px] text-white" strokeWidth={3} />
                  </span>
                  <Send className="absolute -right-3 bottom-2 size-[18px] text-brandblue" strokeWidth={1.6} />
                </span>
              </div>

              <div className="mt-4 text-center text-[14px] font-bold text-ink">{state.email}</div>
              <p className="mt-1 text-center text-[11px] text-slate">Проверьте вашу почту, пожалуйста.</p>

              <div className="mt-4 flex items-start gap-2.5 rounded-[10px] bg-brandblue-soft px-4 py-3">
                <Info className="mt-0.5 size-[15px] shrink-0 text-brandblue" strokeWidth={1.8} />
                <div className="text-[9.5px] leading-[1.45] text-slate">
                  Если письмо не пришло в течение нескольких минут,
                  <br />
                  проверьте папку «Спам».
                </div>
              </div>

              {editing ? (
                <form
                  className="mt-4"
                  onSubmit={(event) => {
                    event.preventDefault();
                    update({ email: draft });
                    setEditing(false);
                    setResent(true);
                  }}
                >
                  <label className="tp-label" htmlFor="receipt-email">
                    Email для отправки чека
                  </label>
                  <input
                    id="receipt-email"
                    type="email"
                    required
                    value={draft}
                    onChange={(event) => setDraft(event.target.value)}
                    className="mt-1.5 w-full rounded-[10px] border border-line bg-card px-4 py-2.5 text-[12.5px] text-ink outline-none focus:border-brandblue"
                  />
                  <button
                    type="submit"
                    className="mt-2.5 flex w-full items-center justify-center gap-2 rounded-[10px] bg-brandblue py-3 text-[12.5px] font-semibold text-white transition-opacity hover:opacity-90"
                  >
                    <Send className="size-[15px]" />
                    Отправить на новый email
                  </button>
                </form>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => setResent(true)}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-[10px] bg-brandblue py-3 text-[12.5px] font-semibold text-white transition-opacity hover:opacity-90"
                  >
                    <RefreshCw className="size-[15px]" />
                    Отправить ещё раз
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setDraft(state.email);
                      setEditing(true);
                      setResent(false);
                    }}
                    className="mt-2.5 flex w-full items-center justify-center gap-2 rounded-[10px] border border-line bg-card py-3 text-[12.5px] font-semibold text-ink transition-colors hover:border-brandblue hover:text-brandblue"
                  >
                    <Send className="size-[15px]" />
                    Изменить email
                  </button>
                </>
              )}

              {resent && (
                <div className="mt-2.5 flex items-center justify-center gap-2 rounded-[10px] bg-success-soft py-2.5 text-[11px] font-semibold text-success">
                  <BadgeCheck className="size-[15px]" />
                  Чек отправлен на {state.email}
                </div>
              )}

              <Link
                to="/receipt"
                className="mt-4 flex items-center gap-4 rounded-[12px] bg-success-soft px-4 py-3.5 transition-opacity hover:opacity-90"
              >
                <span className="flex size-[36px] shrink-0 items-center justify-center rounded-[10px] bg-card">
                  <FileText className="size-[18px] text-success" strokeWidth={1.8} />
                </span>
                <span>
                  <span className="block text-[12px] font-bold text-ink">Сохранить чек</span>
                  <span className="block text-[9.5px] leading-[1.4] text-slate">
                    Вы также можете скачать чек в формате PDF и сохранить его на устройстве.
                  </span>
                </span>
              </Link>
            </div>
          </div>

          <aside>
            <div className="rounded-[14px] border border-line bg-card p-4">
              <h2 className="text-[12px] font-bold text-ink">Детали заказа</h2>
              <dl className="mt-3 space-y-3">
                {DETAILS.map((detail) => {
                  const Icon = detail.icon;
                  return (
                    <div key={detail.label}>
                      <dt className="flex items-center gap-2 text-[9.5px] text-slate">
                        <Icon className="size-[13px] shrink-0 text-brandblue" strokeWidth={1.8} />
                        {detail.label}
                      </dt>
                      <dd className="mt-0.5 pl-[21px] text-[11px] font-bold text-ink">{detail.value}</dd>
                    </div>
                  );
                })}
                <div>
                  <dt className="flex items-center gap-2 text-[9.5px] text-slate">
                    <Clock className="size-[13px] shrink-0 text-brandblue" strokeWidth={1.8} />
                    Статус
                  </dt>
                  <dd className="mt-1 pl-[21px]">
                    <span className="rounded-[6px] bg-success-soft px-2.5 py-1 text-[10px] font-semibold text-success">
                      Оплачено
                    </span>
                  </dd>
                </div>
              </dl>
            </div>

            <div className="mt-4 rounded-[14px] border border-line bg-card p-4">
              <h2 className="text-[12px] font-bold text-ink">Что дальше?</h2>
              <ul className="mt-3 space-y-3">
                {NEXT.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.title} className="flex items-start gap-2.5">
                      <span className="flex size-[24px] shrink-0 items-center justify-center rounded-[7px] bg-brandblue-soft">
                        <Icon className="size-[13px] text-brandblue" strokeWidth={1.8} />
                      </span>
                      <span>
                        <span className="block text-[10px] font-bold text-ink">{item.title}</span>
                        <span className="block text-[9px] text-slate">{item.text}</span>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="mt-4 rounded-[14px] border border-line bg-card p-4">
              <h2 className="text-[12px] font-bold text-ink">Нужна помощь?</h2>
              <p className="mt-1 text-[9.5px] text-slate">Наши специалисты на связи 24/7</p>
              <Link
                to="/support"
                className="mt-3 flex items-center justify-center gap-2 rounded-[10px] border border-brandblue bg-card py-2.5 text-[11px] font-semibold text-brandblue transition-colors hover:bg-brandblue-soft"
              >
                <ChatIcon />
                Написать в чат
              </Link>

              <ul className="mt-3.5 space-y-3">
                <li className="flex items-start gap-2.5">
                  <Phone className="mt-0.5 size-[14px] shrink-0 text-brandblue" strokeWidth={1.8} />
                  <span>
                    <span className="block text-[10px] font-semibold text-brandblue">Позвонить</span>
                    <a href={`tel:${ORDER.phone}`} className="block text-[10px] text-ink">
                      {ORDER.phone}
                    </a>
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Mail className="mt-0.5 size-[14px] shrink-0 text-brandblue" strokeWidth={1.8} />
                  <span>
                    <span className="block text-[10px] font-semibold text-brandblue">Написать на почту</span>
                    <a href={`mailto:${ORDER.email}`} className="block text-[10px] text-ink">
                      {ORDER.email}
                    </a>
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Send className="mt-0.5 size-[14px] shrink-0 text-brandblue" strokeWidth={1.8} />
                  <span>
                    <span className="block text-[10px] font-semibold text-brandblue">Telegram</span>
                    <span className="block text-[10px] text-ink">{ORDER.telegram}</span>
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Headphones className="mt-0.5 size-[14px] shrink-0 text-success" strokeWidth={1.8} />
                  <span>
                    <span className="block text-[10px] font-semibold text-brandblue">WhatsApp</span>
                    <span className="block text-[10px] text-ink">{ORDER.whatsapp}</span>
                  </span>
                </li>
              </ul>
            </div>
          </aside>
        </div>

        <div className="bg-surface px-5 pb-5">
          <div className="relative isolate overflow-hidden rounded-[14px]">
            <img
              src={resortSunset}
              alt="Закат на курорте"
              width={1920}
              height={640}
              className="absolute inset-0 size-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-navy/92 via-navy/60 to-transparent" />
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

          <div className="mt-4 grid grid-cols-3 gap-4 rounded-[14px] bg-brandblue-soft px-5 py-4">
            {[
              { icon: Headphones, title: "Поддержка 24/7", text: "Мы всегда на связи" },
              { icon: Wallet, title: "Без скрытых платежей", text: "Прозрачные условия" },
              { icon: Shield, title: "Надёжные партнёры", text: "Только проверенные" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex items-start gap-2.5">
                  <Icon className="mt-0.5 size-[16px] shrink-0 text-brandblue" strokeWidth={1.8} />
                  <span>
                    <span className="block text-[10.5px] font-bold text-ink">{item.title}</span>
                    <span className="block text-[9.5px] text-slate">{item.text}</span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <Footer variant="full" />
        <BottomNav active="home" />
      </div>
    </div>
  );
}
