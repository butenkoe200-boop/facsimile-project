import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Headphones,
  Paperclip,
  Send,
  ChevronRight,
  HelpCircle,
  Phone,
  Mail,
  Landmark,
  Wallet,
  CalendarDays,
  Clock,
  Shield,
  Lock,
  Check,
} from "lucide-react";

import { BackLink, BottomNav, Footer, Header } from "@/components/travel/Chrome";
import { ORDER } from "@/lib/order";

export const Route = createFileRoute("/support")({
  head: () => ({
    meta: [
      { title: "Чат с поддержкой — Travel Pay" },
      { name: "description", content: "Служба поддержки Travel Pay на связи 24/7: чат, телефон, email, Telegram и WhatsApp." },
      { property: "og:title", content: "Чат с поддержкой — Travel Pay" },
      { property: "og:description", content: "Напишите нам, и мы ответим в ближайшее время." },
    ],
  }),
  component: SupportPage,
});

type Message = { id: number; from: "user" | "agent"; text: string; time: string };

const INITIAL: Message[] = [
  {
    id: 1,
    from: "user",
    text: "Здравствуйте! У меня возник вопрос по оплате заказа TR-245789.",
    time: "14:32",
  },
  {
    id: 2,
    from: "agent",
    text: "Здравствуйте! Спасибо, что обратились в GM International Travel 🙂\n\nПодскажите, пожалуйста, что именно вас интересует? Мы готовы помочь.",
    time: "14:33",
  },
  {
    id: 3,
    from: "user",
    text: "Платёж не проходит, хотя банк списал деньги. Что делать в такой ситуации?",
    time: "14:34",
  },
  {
    id: 4,
    from: "agent",
    text: "Понимаем вашу ситуацию. Давайте проверим.\n\nУточните, пожалуйста, последние 4 цифры карты или способ оплаты, которым вы совершали платёж.",
    time: "14:35",
  },
  { id: 5, from: "user", text: "**** 1234", time: "14:35" },
];

const FAQ = [
  "Почему не проходит оплата?",
  "Когда спишутся деньги?",
  "Как получить чек об оплате?",
  "Как отменить заказ?",
  "Возврат денежных средств",
];

function SupportPage() {
  const [messages, setMessages] = useState<Message[]>(INITIAL);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(true);

  const send = (text: string) => {
    const value = text.trim();
    if (!value) return;
    const time = new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
    setMessages((prev) => [...prev, { id: prev.length + 1, from: "user", text: value, time }]);
    setDraft("");
    setTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          from: "agent",
          text: "Спасибо! Мы уже проверяем информацию по вашему обращению и ответим в ближайшее время.",
          time: new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
      setTyping(false);
    }, 2500);
  };

  const DETAILS = [
    { icon: Landmark, label: "Номер заказа", value: ORDER.numberTR },
    { icon: Wallet, label: "Сумма к оплате", value: ORDER.amount },
    { icon: CalendarDays, label: "Дата и время заказа", value: ORDER.dateTimeMsk },
  ];

  return (
    <div className="min-h-screen bg-[oklch(0.93_0.005_250)] py-0 sm:py-8">
      <div className="tp-frame">
        <Header tone="dark" />

        <div className="grid grid-cols-[1fr_270px] gap-5 bg-surface px-5 py-5">
          <div className="flex flex-col">
            <div className="flex items-start gap-2.5">
              <BackLink to="/" label="" />
              <div>
                <h1 className="text-[15px] font-bold text-ink">Чат с поддержкой</h1>
                <p className="flex items-center gap-1.5 text-[10.5px] text-success">
                  <span className="size-[6px] rounded-full bg-success" />
                  Мы онлайн
                </p>
              </div>
            </div>

            <div className="mt-3.5 flex items-start gap-2.5 rounded-[12px] bg-brandblue-soft px-4 py-3">
              <span className="flex size-[26px] shrink-0 items-center justify-center rounded-full bg-card">
                <Headphones className="size-[14px] text-brandblue" strokeWidth={1.8} />
              </span>
              <div>
                <div className="text-[11.5px] font-bold text-ink">Мы всегда рады помочь!</div>
                <div className="text-[10px] text-slate">Напишите нам, и мы ответим в ближайшее время.</div>
              </div>
            </div>

            <div className="mt-3.5 flex-1 space-y-3">
              {messages.map((message) =>
                message.from === "user" ? (
                  <div key={message.id} className="flex justify-end">
                    <div className="max-w-[74%] rounded-[12px] rounded-br-[4px] bg-brandblue-soft px-3.5 py-2.5">
                      <p className="whitespace-pre-line text-[10.5px] leading-[1.5] text-ink">{message.text}</p>
                      <div className="mt-1 flex items-center justify-end gap-1 text-[9px] text-slate">
                        {message.time}
                        <Check className="size-[11px] text-brandblue" strokeWidth={2.5} />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div key={message.id} className="flex items-start gap-2.5">
                    <span className="flex size-[28px] shrink-0 items-center justify-center rounded-full bg-brandblue">
                      <Headphones className="size-[14px] text-white" strokeWidth={1.8} />
                    </span>
                    <div className="max-w-[74%] rounded-[12px] rounded-tl-[4px] border border-line bg-card px-3.5 py-2.5">
                      <div className="text-[10px] font-bold text-slate">Служба поддержки</div>
                      <p className="mt-1 whitespace-pre-line text-[10.5px] leading-[1.5] text-ink">{message.text}</p>
                      <div className="mt-1 text-right text-[9px] text-slate">{message.time}</div>
                    </div>
                  </div>
                ),
              )}

              {typing && (
                <div className="flex items-start gap-2.5">
                  <span className="flex size-[28px] shrink-0 items-center justify-center rounded-full bg-brandblue">
                    <Headphones className="size-[14px] text-white" strokeWidth={1.8} />
                  </span>
                  <div className="rounded-[12px] rounded-tl-[4px] border border-line bg-card px-3.5 py-2.5">
                    <div className="text-[10px] font-bold text-slate">Служба поддержки</div>
                    <div className="text-[10px] text-slate">Печатает...</div>
                    <div className="mt-1.5 flex items-center gap-1">
                      <span className="tp-typing-dot size-[5px] rounded-full bg-brandblue" />
                      <span className="tp-typing-dot size-[5px] rounded-full bg-brandblue [animation-delay:0.15s]" />
                      <span className="tp-typing-dot size-[5px] rounded-full bg-brandblue [animation-delay:0.3s]" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <form
              className="mt-4 flex items-center gap-2.5 rounded-[999px] border border-line bg-card px-4 py-2"
              onSubmit={(event) => {
                event.preventDefault();
                send(draft);
              }}
            >
              <Paperclip className="size-[15px] shrink-0 text-slate" strokeWidth={1.8} />
              <input
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder="Напишите сообщение..."
                aria-label="Напишите сообщение"
                className="flex-1 bg-transparent py-1.5 text-[11.5px] text-ink outline-none placeholder:text-slate"
              />
              <button
                type="submit"
                aria-label="Отправить сообщение"
                className="flex size-[28px] shrink-0 items-center justify-center rounded-full bg-brandblue text-white transition-opacity hover:opacity-90"
              >
                <Send className="size-[14px]" />
              </button>
            </form>
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
                    <span className="rounded-[6px] bg-warning-soft px-2.5 py-1 text-[10px] font-semibold text-gold-deep">
                      Ожидает оплаты
                    </span>
                  </dd>
                </div>
              </dl>
            </div>

            <div className="mt-4 rounded-[14px] border border-line bg-card p-4">
              <h2 className="text-[12px] font-bold text-ink">Популярные вопросы</h2>
              <ul className="mt-3 space-y-2.5">
                {FAQ.map((question) => (
                  <li key={question}>
                    <button
                      type="button"
                      onClick={() => send(question)}
                      className="flex w-full items-center gap-2 text-left text-[10px] text-ink transition-colors hover:text-brandblue"
                    >
                      <HelpCircle className="size-[14px] shrink-0 text-brandblue" strokeWidth={1.8} />
                      <span className="flex-1">{question}</span>
                      <ChevronRight className="size-[13px] shrink-0 text-slate" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 rounded-[14px] border border-line bg-card p-4">
              <h2 className="text-[12px] font-bold text-ink">Другие способы связи</h2>
              <ul className="mt-3 space-y-3">
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
          <div className="flex items-center justify-between gap-4 rounded-[14px] bg-brandblue-soft px-5 py-4">
            <div className="flex items-start gap-3">
              <Shield className="mt-0.5 size-[20px] shrink-0 text-brandblue" strokeWidth={1.8} />
              <div>
                <div className="text-[11.5px] font-bold text-ink">Ваши данные под защитой</div>
                <div className="text-[10px] leading-[1.4] text-slate">
                  Мы используем шифрование и
                  <br />
                  соответствуем стандарту PCI DSS.
                </div>
              </div>
            </div>
            <Lock className="size-[38px] text-brandblue/70" strokeWidth={1.4} />
          </div>
        </div>

        <Footer variant="full" />
        <BottomNav active="help" />
      </div>
    </div>
  );
}
