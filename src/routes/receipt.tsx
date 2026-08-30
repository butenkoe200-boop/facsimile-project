import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Check,
  Download,
  Send,
  Shield,
  FileText,
  Mail,
  Briefcase,
  Headphones,
  Phone,
  Landmark,
  Wallet,
  Clock,
  CreditCard,
  ShieldCheck,
} from "lucide-react";

import { BackLink, ChatIcon, Footer, Header, BottomNav } from "@/components/travel/Chrome";
import { GmLogo, TravelPayLogo } from "@/components/travel/Brand";
import resortSunset from "@/assets/resort-sunset.jpg";
import { ORDER } from "@/lib/order";

export const Route = createFileRoute("/receipt")({
  head: () => ({
    meta: [
      { title: "Сохранение документа — чек об оплате Travel Pay" },
      { name: "description", content: "Ваш чек об оплате сохранён в формате PDF и готов к скачиванию." },
      { property: "og:title", content: "Сохранение документа — чек об оплате Travel Pay" },
      { property: "og:description", content: "Документ готов: чек об оплате заказа TR-245789 на 245 000 ₽." },
    ],
  }),
  component: ReceiptPage,
});

const NEXT = [
  { icon: Mail, title: "Мы отправили вам подтверждение", text: "Проверьте вашу почту" },
  { icon: FileText, title: "Документы и ваучеры", text: "Будут отправлены в ближайшее время" },
  { icon: Briefcase, title: "Подготовка к путешествию", text: "Мы всегда на связи и готовы помочь" },
  { icon: Headphones, title: "Поддержка 24/7", text: "На всех этапах вашего путешествия" },
];

function ReceiptPage() {
  const RECEIPT_ROWS = [
    { icon: Landmark, label: "Номер заказа", value: ORDER.numberTR },
    { icon: CreditCard, label: "Способ оплаты", value: "Travel Pay (Кредит на путешествие)" },
    { icon: Wallet, label: "Сумма оплачена", value: ORDER.amount },
    { icon: Clock, label: "Дата и время оплаты", value: ORDER.dateTimeMsk },
  ];

  const DETAILS = [
    { icon: Landmark, label: "Номер заказа", value: ORDER.numberTR },
    { icon: Wallet, label: "Сумма оплачена", value: ORDER.amount },
    { icon: Clock, label: "Дата и время заказа", value: ORDER.dateTimeMsk },
  ];

  return (
    <div className="min-h-screen bg-[oklch(0.93_0.005_250)] py-0 sm:py-8">
      <div className="tp-frame">
        <Header tone="dark" />

        <div className="grid grid-cols-1 sm:grid-cols-[1fr_270px] gap-5 bg-surface px-5 py-5">
          <div>
            <div className="flex items-start gap-2.5">
              <BackLink to="/success" label="" />
              <div>
                <h1 className="text-[15px] font-bold text-ink">Сохранение документа</h1>
                <p className="text-[10.5px] text-slate">Ваш чек будет сохранён на устройстве в формате PDF</p>
              </div>
            </div>

            <div className="mt-3.5 flex items-center gap-4 rounded-[14px] bg-success-soft px-5 py-4">
              <span className="relative flex size-[46px] items-center justify-center rounded-[12px] bg-card">
                <FileText className="size-[22px] text-success" strokeWidth={1.8} />
                <span className="absolute -bottom-1 -right-1 flex size-[19px] items-center justify-center rounded-full bg-success">
                  <Check className="size-[11px] text-white" strokeWidth={3} />
                </span>
              </span>
              <div>
                <div className="text-[15px] font-bold text-ink">Документ готов!</div>
                <p className="text-[10.5px] leading-[1.4] text-slate">
                  Ваш чек сохранён в формате PDF
                  <br />и готов к скачиванию.
                </p>
              </div>
            </div>

            <div className="mt-3.5 rounded-[14px] border border-line bg-card p-5">
              <div className="flex items-center justify-between">
                <GmLogo tone="dark" />
                <TravelPayLogo tone="dark" size="sm" />
              </div>

              <h2 className="mt-4 text-[14px] font-bold text-ink">ЧЕК ОБ ОПЛАТЕ</h2>
              <div className="text-[11px] font-semibold text-success">Успешно оплачено</div>

              <dl className="mt-3.5 space-y-2.5 border-t border-line pt-3.5">
                {RECEIPT_ROWS.map((row) => {
                  const Icon = row.icon;
                  return (
                    <div key={row.label} className="flex items-center justify-between gap-3">
                      <dt className="flex items-center gap-2 text-[10px] text-slate">
                        <Icon className="size-[13px] shrink-0 text-slate" strokeWidth={1.8} />
                        {row.label}
                      </dt>
                      <dd className="text-[10.5px] font-semibold text-ink">{row.value}</dd>
                    </div>
                  );
                })}
                <div className="flex items-center justify-between gap-3">
                  <dt className="flex items-center gap-2 text-[10px] text-slate">
                    <ShieldCheck className="size-[13px] shrink-0 text-slate" strokeWidth={1.8} />
                    Статус
                  </dt>
                  <dd>
                    <span className="rounded-[6px] bg-success-soft px-2.5 py-1 text-[10px] font-semibold text-success">
                      Оплачено
                    </span>
                  </dd>
                </div>
              </dl>

              <div className="mt-4 border-t border-line pt-3.5">
                <div className="text-[10.5px] font-bold text-ink">Назначение платежа</div>
                <p className="mt-1 text-[10px] leading-[1.5] text-slate">
                  Оплата тура
                  <br />
                  Турция, Анталья
                  <br />2 взрослых
                </p>
              </div>

              <div className="mt-4 flex items-start justify-between gap-4 border-t border-line pt-3.5">
                <div>
                  <div className="text-[10.5px] font-bold text-ink">Получатель платежа</div>
                  <p className="mt-1 text-[10px] leading-[1.5] text-slate">
                    GM International Travel
                    <br />
                    ИНН 9701234567
                    <br />
                    КПП 770101001
                  </p>
                </div>
                <span className="flex size-[62px] shrink-0 items-center justify-center rounded-full border border-brandblue/40 text-center text-[6.5px] font-semibold leading-[1.2] text-brandblue/70">
                  GM
                  <br />
                  INTERNATIONAL
                  <br />
                  TRAVEL
                </span>
              </div>

              <div className="mt-4 flex items-start gap-2.5 rounded-[10px] bg-brandblue-soft px-4 py-3">
                <Shield className="mt-0.5 size-[15px] shrink-0 text-brandblue" strokeWidth={1.8} />
                <div className="text-[9.5px] leading-[1.4] text-slate">
                  Документ содержит фискальные данные
                  <br />и подтверждает оплату.
                </div>
              </div>
            </div>

            <a
              href={`data:text/plain;charset=utf-8,${encodeURIComponent(
                `ЧЕК ОБ ОПЛАТЕ\nНомер заказа: ${ORDER.numberTR}\nСумма оплачена: ${ORDER.amount}\nДата и время оплаты: ${ORDER.dateTimeMsk}\nСтатус: Оплачено\nПолучатель: GM International Travel, ИНН 9701234567, КПП 770101001`,
              )}`}
              download={`${ORDER.numberTR}.pdf`}
              className="mt-3.5 flex items-center justify-center gap-2 rounded-[10px] bg-brandblue py-3 text-[12.5px] font-semibold text-white transition-opacity hover:opacity-90"
            >
              <Download className="size-[15px]" />
              Скачать PDF
            </a>

            <Link
              to="/receipt-email"
              className="mt-2.5 flex items-center justify-center gap-2 rounded-[10px] border border-brandblue bg-card py-3 text-[12.5px] font-semibold text-brandblue transition-colors hover:bg-brandblue-soft"
            >
              <Send className="size-[15px]" />
              Отправить на почту
            </Link>

            <Link
              to="/"
              className="mt-2.5 flex items-center justify-center rounded-[10px] bg-surface-2 py-3 text-[12.5px] font-semibold text-ink transition-colors hover:bg-line"
            >
              Вернуться на главную
            </Link>
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

        <div className="relative isolate overflow-hidden bg-navy px-5 pb-5">
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
        </div>

        <Footer variant="full" />
        <BottomNav active="help" />
      </div>
    </div>
  );
}
