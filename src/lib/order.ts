export const ORDER = {
  numberTP: "TP-245789",
  numberTR: "TR-245789",
  amount: "245 000 ₽",
  amountShort: "245 000 ₽",
  validUntil: "до 15 мая 2024, 14:30",
  timer: "29:45",
  dateTime: "29 мая 2024, 14:32",
  dateTimeMsk: "29 мая 2024, 14:32 (МСК)",
  tourOperator: "Sun & Sea Travel",
  phone: "8 800 123-45-67",
  email: "support@gminternational.travel",
  telegram: "@GM_International_Travel",
  whatsapp: "+7 (910) 474-40-40",
  customerEmail: "erik.inkerman@gmail.com",
} as const;

export type PaymentMethodId =
  | "card"
  | "sbp"
  | "yandex-pay"
  | "yandex-split"
  | "installment"
  | "credit";

export const METHOD_LABELS: Record<PaymentMethodId, string> = {
  card: "Банковская карта",
  sbp: "СБП",
  "yandex-pay": "Яндекс Pay",
  "yandex-split": "Яндекс Сплит",
  installment: "Банковская рассрочка",
  credit: "Кредит на путешествие",
};

export const CREDIT_OFFER = {
  bank: "Альфа-Банк",
  amount: "245 000 ₽",
  term: "12 месяцев",
  monthly: "21 417 ₽",
  rate: "11,9%",
  ratePreApproved: "12,5%",
  overpay: "10 004 ₽",
} as const;

export const INSTALLMENT_BANKS = [
  { id: "alfa", name: "Альфа-Банк", decision: "Решение за 1 минуту", term: "12 месяцев", monthly: "20 417 ₽ / мес", recommended: true },
  { id: "sber", name: "СберБанк", decision: "Решение за 1–2 минуты", term: "12 месяцев", monthly: "20 417 ₽ / мес", recommended: false },
  { id: "tbank", name: "Т-Банк", decision: "Решение за 2 минуты", term: "6 месяцев", monthly: "40 833 ₽ / мес", recommended: false },
  { id: "raif", name: "Райффайзен Банк", decision: "Решение за 2 минуты", term: "12 месяцев", monthly: "20 417 ₽ / мес", recommended: false },
  { id: "psb", name: "ПСБ Банк", decision: "Решение за 2–3 минуты", term: "24 месяца", monthly: "10 208 ₽ / мес", recommended: false },
] as const;

export const CREDIT_BANKS = [
  { id: "alfa", name: "Альфа-Банк", decision: "Решение за 1 минуту", term: "от 3 до 36 месяцев", rate: "от 12,5%", monthly: "6 944 ₽ / мес", recommended: true },
  { id: "sber", name: "СберБанк", decision: "Решение за 1–2 минуты", term: "от 3 до 60 месяцев", rate: "от 13,9%", monthly: "5 909 ₽ / мес", recommended: false },
  { id: "tbank", name: "Т-Банк", decision: "Решение за 2 минуты", term: "от 3 до 36 месяцев", rate: "от 14,9%", monthly: "7 167 ₽ / мес", recommended: false },
  { id: "psb", name: "ПСБ Банк", decision: "Решение за 2–3 минуты", term: "от 6 до 84 месяцев", rate: "от 15,5%", monthly: "4 492 ₽ / мес", recommended: false },
  { id: "raif", name: "Райффайзен Банк", decision: "Решение за 2 минуты", term: "от 6 до 60 месяцев", rate: "от 14,9%", monthly: "5 394 ₽ / мес", recommended: false },
] as const;

export const SPLIT_PLANS = [
  { id: "4", payments: "4 платежа", per: "по 61 250 ₽", dates: ["Сегодня", "27 май", "10 июн", "24 июн"], first: "61 250 ₽", count: "4" },
  { id: "6", payments: "6 платежей", per: "по 40 833 ₽", dates: ["Сегодня", "27 май", "10 июн", "24 июн", "82 июл"], first: "40 833 ₽", count: "6" },
  { id: "12", payments: "12 платежей", per: "по 21 208 ₽", dates: ["Сегодня", "27 май", "10 июн", "24 июн", "28 окт"], first: "21 208 ₽", count: "12" },
] as const;
