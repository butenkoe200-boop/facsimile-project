import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Lock, CalendarDays, ChevronDown } from "lucide-react";

import formHero from "@/assets/bora-bora.jpg";
import { BackLink, Footer, Header, OrderSummary } from "@/components/travel/Chrome";
import {
  CreditBenefits,
  CreditStepper,
  DataProtectedNote,
  HelpCard,
  OfferCard,
} from "@/components/travel/CreditOffer";
import { ORDER } from "@/lib/order";
import { usePaymentState } from "@/lib/payment-state";

export const Route = createFileRoute("/credit-form")({
  head: () => ({
    meta: [
      { title: "Заполнение анкеты на кредит — Travel Pay" },
      { name: "description", content: "Заполните анкету для получения решения по кредиту на путешествие. Это займёт всего несколько минут." },
      { property: "og:title", content: "Заполнение анкеты на кредит — Travel Pay" },
      { property: "og:description", content: "Решение банка за 1–2 минуты, оформление полностью онлайн." },
    ],
  }),
  component: CreditFormPage,
});

function Field({
  label,
  value,
  onChange,
  icon,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  icon?: "calendar" | "select";
  type?: string;
}) {
  const id = `f-${label.replace(/\s+/g, "-").toLowerCase()}`;
  return (
    <div className="relative rounded-[10px] border border-line bg-surface-2 px-3 pb-2 pt-1.5 transition-colors focus-within:border-brandblue">
      <label htmlFor={id} className="block text-[8.5px] text-slate">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full bg-transparent pr-5 text-[11.5px] font-medium text-ink outline-none"
      />
      {icon === "calendar" && (
        <CalendarDays className="absolute bottom-2.5 right-2.5 size-[13px] text-slate" strokeWidth={1.7} />
      )}
      {icon === "select" && (
        <ChevronDown className="absolute bottom-2.5 right-2.5 size-[13px] text-slate" strokeWidth={1.7} />
      )}
    </div>
  );
}

function CreditFormPage() {
  const navigate = useNavigate();
  const { state, update } = usePaymentState();

  const [form, setForm] = useState({
    lastName: "Иванов",
    firstName: "Иван",
    middleName: "Иванович",
    birthDate: "15.05.1990",
    citizenship: "РФ",
    inn: "770123456789",
    phone: "+7 (999) 123-45-67",
    email: "ivanov@mail.ru",
    passport: "45 12 345678",
    issueDate: "20.06.2012",
    unitCode: "770-001",
    issuedBy: "ОВД «Тверской» г. Москва",
    zip: "125009",
    city: "Москва",
    street: "Тверская",
    house: "15",
    building: "1",
    flat: "45",
    employment: "Работаю по найму",
    income: "150 000 ₽",
    extraIncome: "20 000 ₽",
    organization: "ООО «ТехноСервис»",
    position: "Руководитель отдела",
  });

  const set = (key: keyof typeof form) => (value: string) => setForm((prev) => ({ ...prev, [key]: value }));

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const income = Number(form.income.replace(/\D/g, ""));
    update({ creditOutcome: income >= 50000 ? "approved" : "declined" });
    navigate({ to: "/credit-check" });
  };

  return (
    <div className="min-h-screen bg-[oklch(0.93_0.005_250)] py-0 sm:py-8">
      <div className="tp-frame">
        <Header tone="dark" />

        <div className="bg-navy px-5 pb-5">
          <OrderSummary third="orderedAt" numberValue={ORDER.numberTR} />
        </div>

        <div className="bg-card">
          <div className="relative">
            <div className="grid grid-cols-[1fr_290px] items-start">
              <div className="px-6 pt-5">
                <BackLink
                  to={state.method === "installment" ? "/installment" : "/credit"}
                  label="Назад к выбору банка"
                  variant="arrow"
                />
                <h1 className="mt-3 text-[21px] font-bold text-ink">Заполнение анкеты</h1>
                <p className="mt-1.5 text-[11.5px] leading-[1.5] text-slate">
                  Заполните анкету для получения решения по кредиту
                  <br />
                  на путешествие. Это займёт всего несколько минут.
                </p>
                <CreditStepper current={1} />
              </div>
              <img
                src={formHero}
                alt="Бунгало над лагуной Бора-Бора"
                width={1024}
                height={1024}
                className="h-[180px] w-full rounded-bl-[24px] object-cover"
              />
            </div>
          </div>

          <div className="grid grid-cols-[1fr_290px] gap-5 px-6 pb-6 pt-5">
            <form onSubmit={submit}>
              <h2 className="text-[12.5px] font-bold text-ink">Личные данные</h2>
              <div className="mt-2.5 grid grid-cols-3 gap-3">
                <Field label="Фамилия" value={form.lastName} onChange={set("lastName")} />
                <Field label="Имя" value={form.firstName} onChange={set("firstName")} />
                <Field label="Отчество" value={form.middleName} onChange={set("middleName")} />
                <Field label="Дата рождения" value={form.birthDate} onChange={set("birthDate")} icon="calendar" />
                <Field label="Гражданство" value={form.citizenship} onChange={set("citizenship")} icon="select" />
                <Field label="ИНН (необязательно)" value={form.inn} onChange={set("inn")} />
              </div>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <Field label="Мобильный телефон" value={form.phone} onChange={set("phone")} />
                <Field label="Электронная почта" value={form.email} onChange={set("email")} type="email" />
              </div>

              <h2 className="mt-5 text-[12.5px] font-bold text-ink">Паспортные данные</h2>
              <div className="mt-2.5 grid grid-cols-3 gap-3">
                <Field label="Серия и номер паспорта" value={form.passport} onChange={set("passport")} />
                <Field label="Дата выдачи" value={form.issueDate} onChange={set("issueDate")} icon="calendar" />
                <Field label="Код подразделения" value={form.unitCode} onChange={set("unitCode")} />
              </div>
              <div className="mt-3">
                <Field label="Кем выдан" value={form.issuedBy} onChange={set("issuedBy")} />
              </div>

              <h2 className="mt-5 text-[12.5px] font-bold text-ink">Адрес регистрации</h2>
              <div className="mt-2.5 grid grid-cols-3 gap-3">
                <Field label="Индекс" value={form.zip} onChange={set("zip")} />
                <Field label="Город" value={form.city} onChange={set("city")} />
                <Field label="Улица" value={form.street} onChange={set("street")} />
                <Field label="Дом" value={form.house} onChange={set("house")} />
                <Field label="Корпус" value={form.building} onChange={set("building")} />
                <Field label="Квартира" value={form.flat} onChange={set("flat")} />
              </div>

              <h2 className="mt-5 text-[12.5px] font-bold text-ink">Информация о доходе</h2>
              <div className="mt-2.5 grid grid-cols-3 gap-3">
                <Field label="Тип занятости" value={form.employment} onChange={set("employment")} icon="select" />
                <Field label="Ежемесячный доход" value={form.income} onChange={set("income")} />
                <Field
                  label="Дополнительный доход (необязательно)"
                  value={form.extraIncome}
                  onChange={set("extraIncome")}
                />
              </div>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <Field label="Название организации" value={form.organization} onChange={set("organization")} />
                <Field label="Должность" value={form.position} onChange={set("position")} />
              </div>

              <div className="mt-5 grid grid-cols-2 items-start gap-4">
                <DataProtectedNote />
                <div>
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-[10px] bg-brandblue py-3 text-[13px] font-bold text-white transition-opacity hover:opacity-90"
                  >
                    <Lock className="size-[15px]" />
                    Получить решение
                  </button>
                  <p className="mt-2 text-center text-[9px] leading-[1.4] text-slate">
                    Нажимая кнопку, вы соглашаетесь с условиями{" "}
                    <span className="text-brandblue underline">обработки персональных данных</span>
                  </p>
                </div>
              </div>
            </form>

            <aside>
              <OfferCard bankId={state.bankId} bankName={state.bankName} />
              <CreditBenefits />
              <HelpCard />
            </aside>
          </div>
        </div>

        <Footer variant="full" />
      </div>
    </div>
  );
}
