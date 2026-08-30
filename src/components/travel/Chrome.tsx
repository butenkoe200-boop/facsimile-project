import { Link, useRouter } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ChevronLeft, ArrowLeft, Lock, Shield, Home, FileText, Headphones, User } from "lucide-react";

import { GmLogo, LangSelector, TravelPayLogo } from "./Brand";
import { ORDER } from "@/lib/order";

export function Header({ tone = "light" }: { tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <header
      className={`flex items-center justify-between px-4 sm:px-6 py-4 ${
        dark ? "bg-navy" : "border-b border-line bg-card"
      }`}
    >
      <GmLogo tone={dark ? "light" : "dark"} />
      <TravelPayLogo tone={dark ? "light" : "dark"} />
      <LangSelector tone={dark ? "light" : "dark"} />
    </header>
  );
}

export function BackLink({
  to,
  label,
  variant = "chevron",
}: {
  to: string;
  label: string;
  variant?: "chevron" | "arrow";
}) {
  return (
    <Link
      to={to}
      className={`inline-flex items-center gap-1.5 text-[12.5px] font-medium transition-colors ${
        variant === "arrow" ? "text-brandblue hover:text-navy" : "text-slate hover:text-ink"
      }`}
    >
      {variant === "arrow" ? <ArrowLeft className="size-4" /> : <ChevronLeft className="size-4" />}
      {label}
    </Link>
  );
}

export function PageTitle({
  icon,
  title,
  subtitle,
}: {
  icon: ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mt-4">
      <div className="flex items-center gap-3">
        <span className="flex size-9 items-center justify-center rounded-[10px] border border-gold/45 text-gold">
          {icon}
        </span>
        <h1 className="text-[21px] font-bold leading-tight text-ink">{title}</h1>
      </div>
      <p className="mt-1 pl-12 text-[12.5px] text-slate">{subtitle}</p>
    </div>
  );
}

export function OrderSummary({
  third = "validity",
  numberValue = ORDER.numberTP,
}: {
  third?: "validity" | "paidAt" | "orderedAt";
  numberValue?: string;
}) {
  return (
    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 divide-y divide-line sm:divide-x sm:divide-y-0 rounded-[14px] border border-line bg-card">
      <div className="px-5 py-4">
        <div className="tp-label">Номер заказа</div>
        <div className="mt-1.5 text-[17px] font-bold text-ink">{numberValue}</div>
      </div>
      <div className="px-5 py-4">
        <div className="tp-label">Сумма к оплате</div>
        <div className="mt-1.5 text-[19px] font-bold text-gold">{ORDER.amount}</div>
      </div>
      <div className="px-5 py-4">
        <div className="tp-label">
          {third === "validity"
            ? "Ссылка действительна"
            : third === "paidAt"
              ? "Дата и время оплаты"
              : "Дата и время заказа"}
        </div>
        {third === "validity" ? (
          <>
            <div className="mt-1.5 flex items-center gap-1.5 text-[15px] font-bold text-ink">
              <ClockIcon />
              {ORDER.timer}
            </div>
            <div className="text-[10.5px] text-slate">{ORDER.validUntil}</div>
          </>
        ) : (
          <>
            <div className="mt-1.5 flex items-center gap-1.5 text-[13.5px] font-bold text-ink">
              {third === "paidAt" ? (
                <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" fill="none" stroke="oklch(0.556 0.147 148)" strokeWidth="2" />
                  <path d="M8 12.5l2.6 2.5L16 9.5" fill="none" stroke="oklch(0.556 0.147 148)" strokeWidth="2" strokeLinecap="round" />
                </svg>
              ) : (
                <ClockIcon tone="blue" />
              )}
              {ORDER.dateTime}
            </div>
            <div className="text-[10.5px] text-slate">(МСК)</div>
          </>
        )}
      </div>
    </div>
  );
}

function ClockIcon({ tone = "ink" }: { tone?: "ink" | "blue" }) {
  const stroke = tone === "blue" ? "oklch(0.552 0.208 262)" : "oklch(0.28 0.062 259)";
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" fill="none" stroke={stroke} strokeWidth="1.8" />
      <path d="M12 7.5V12l3 2" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function SecureLine({ text }: { text: string }) {
  return (
    <div className="flex items-center justify-center gap-1.5 py-3 text-[11.5px] text-slate">
      <Lock className="size-3.5" />
      <span>{text}</span>
    </div>
  );
}

export function FeatureQuad({
  items,
}: {
  items: { icon: ReactNode; title: string; text: string }[];
}) {
  return (
    <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 divide-y divide-line sm:divide-x sm:divide-y-0 rounded-[14px] border border-line bg-card py-5">
      {items.map((item) => (
        <div key={item.title} className="flex flex-col items-center px-3 text-center">
          <span className="flex size-9 items-center justify-center rounded-full border border-gold/40 text-gold">
            {item.icon}
          </span>
          <div className="mt-2 text-[11.5px] font-bold text-ink">{item.title}</div>
          <div className="mt-1 whitespace-pre-line text-[10px] leading-[1.35] text-slate">{item.text}</div>
        </div>
      ))}
    </div>
  );
}

export function Footer({ variant = "method" }: { variant?: "method" | "full" }) {
  return (
    <footer className="bg-navy px-4 sm:px-6 py-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <TravelPayLogo tone="light" size="sm" />
          <p className="mt-1.5 text-[11px] text-white/60">Сервис безопасных платежей для путешествий</p>
          {variant === "full" && (
            <p className="mt-1 flex flex-wrap items-center gap-x-1 text-[10.5px] text-white/50">
              <Lock className="size-3 shrink-0" />
              <span>
                Данные защищены по стандарту <span className="whitespace-nowrap text-brandblue">PCI DSS</span>
              </span>
            </p>

          )}
        </div>
        <div className="text-right">
          <div className="text-[11px] text-white/60">
            {variant === "full" ? "Служба поддержки 24/7" : "Служба поддержки"}
          </div>
          <a href={`tel:${ORDER.phone}`} className="mt-0.5 block whitespace-nowrap text-[15px] font-bold text-white sm:text-[16px]">
            {ORDER.phone}
          </a>
          {variant === "full" ? (
            <a href={`mailto:${ORDER.email}`} className="text-[11px] text-white/60 hover:text-white">
              {ORDER.email}
            </a>
          ) : (
            <div className="text-[11px] text-white/60">Поддержка 24/7</div>
          )}
        </div>
      </div>
    </footer>
  );
}

export function BottomNav({ active }: { active: "home" | "orders" | "help" | "profile" }) {
  const items = [
    { id: "home", label: "Главная", icon: Home, to: "/" },
    { id: "orders", label: "Заказы", icon: FileText, to: "/success" },
    { id: "help", label: "Помощь", icon: Headphones, to: "/support" },
    { id: "profile", label: "Профиль", icon: User, to: "/profile" },
  ] as const;
  return (
    <nav className="flex items-stretch border-t border-line bg-card">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = item.id === active;
        return (
          <Link
            key={item.id}
            to={item.to}
            className={`flex flex-1 flex-col items-center gap-1 py-3 text-[10.5px] transition-colors ${
              isActive ? "text-brandblue" : "text-slate hover:text-ink"
            }`}
          >
            <Icon className="size-[18px]" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function HelpBar({ text = "Наши специалисты на связи 24/7" }: { text?: string }) {
  return (
    <div className="mt-4 flex items-center justify-between gap-4 rounded-[14px] bg-brandblue-soft px-5 py-4">
      <div className="flex items-center gap-3">
        <Headphones className="size-[22px] text-brandblue" />
        <div>
          <div className="text-[12.5px] font-bold text-ink">Нужна помощь?</div>
          <div className="text-[11px] text-slate">{text}</div>
        </div>
      </div>
      <Link
        to="/support"
        className="flex items-center gap-2 rounded-[10px] border border-line bg-card px-4 py-2.5 text-[12px] font-semibold text-ink transition-colors hover:border-brandblue hover:text-brandblue"
      >
        <ChatIcon />
        Написать в чат
      </Link>
    </div>
  );
}

export function ChatIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="5" width="18" height="13" rx="3" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 21l3-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="9" cy="11.5" r="1" fill="currentColor" />
      <circle cx="15" cy="11.5" r="1" fill="currentColor" />
    </svg>
  );
}

export function ProtectedNote() {
  return (
    <div className="flex items-start gap-3 rounded-[12px] border border-line bg-card px-4 py-3.5">
      <Shield className="mt-0.5 size-[18px] shrink-0 text-success" />
      <div>
        <div className="text-[12px] font-bold text-ink">Ваши данные под защитой</div>
        <div className="text-[11px] leading-[1.4] text-slate">
          Мы используем шифрование и передаём информацию только в банк-партнёр.
        </div>
      </div>
    </div>
  );
}

export function PageFrame({
  children,
  headerTone = "light",
  footer = "method",
  bottomNav,
}: {
  children: ReactNode;
  headerTone?: "light" | "dark";
  footer?: "method" | "full";
  bottomNav?: "home" | "orders" | "help" | "profile";
}) {
  return (
    <div className="min-h-screen bg-[oklch(0.93_0.005_250)] py-0 sm:py-8">
      <div className="tp-frame">
        <Header tone={headerTone} />
        {children}
        <Footer variant={footer} />
        {bottomNav && <BottomNav active={bottomNav} />}
      </div>
    </div>
  );
}

export function useGoBack() {
  const router = useRouter();
  return () => router.history.back();
}
