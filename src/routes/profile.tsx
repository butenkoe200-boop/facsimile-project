import { createFileRoute, Link } from "@tanstack/react-router";
import { User, Mail, Phone, FileText, Wallet, Clock, Landmark, ChevronRight, Shield } from "lucide-react";

import { BackLink, BottomNav, Footer, Header, HelpBar } from "@/components/travel/Chrome";
import { ORDER } from "@/lib/order";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Профиль — Travel Pay" },
      { name: "description", content: "Ваши данные и заказы в сервисе безопасных платежей Travel Pay." },
      { property: "og:title", content: "Профиль — Travel Pay" },
      { property: "og:description", content: "Контактные данные, заказы и документы в одном месте." },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  return (
    <div className="min-h-screen bg-[oklch(0.93_0.005_250)] py-0 sm:py-8">
      <div className="tp-frame">
        <Header tone="dark" />

        <div className="bg-surface px-5 py-5">
          <div className="flex items-start gap-2.5">
            <BackLink to="/" label="" />
            <div>
              <h1 className="text-[15px] font-bold text-ink">Профиль</h1>
              <p className="text-[10.5px] text-slate">Ваши данные и заказы</p>
            </div>
          </div>

          <div className="mt-3.5 flex items-center gap-4 rounded-[14px] border border-line bg-card px-5 py-4">
            <span className="flex size-[46px] items-center justify-center rounded-full bg-brandblue-soft">
              <User className="size-[22px] text-brandblue" strokeWidth={1.8} />
            </span>
            <div>
              <div className="text-[14px] font-bold text-ink">Эрик Инкерман</div>
              <div className="flex items-center gap-1.5 text-[10.5px] text-slate">
                <Mail className="size-[13px]" strokeWidth={1.8} />
                {ORDER.customerEmail}
              </div>
              <div className="flex items-center gap-1.5 text-[10.5px] text-slate">
                <Phone className="size-[13px]" strokeWidth={1.8} />
                {ORDER.whatsapp}
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-[14px] border border-line bg-card p-4">
            <h2 className="text-[12.5px] font-bold text-ink">Мои заказы</h2>
            <Link
              to="/success"
              className="mt-3 flex items-center gap-3 rounded-[12px] border border-line px-4 py-3.5 transition-colors hover:border-brandblue"
            >
              <span className="flex size-[32px] shrink-0 items-center justify-center rounded-[9px] bg-brandblue-soft">
                <Landmark className="size-[16px] text-brandblue" strokeWidth={1.8} />
              </span>
              <span className="flex-1">
                <span className="block text-[12px] font-bold text-ink">{ORDER.numberTR}</span>
                <span className="flex items-center gap-3 text-[10px] text-slate">
                  <span className="flex items-center gap-1">
                    <Wallet className="size-[12px]" strokeWidth={1.8} />
                    {ORDER.amount}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="size-[12px]" strokeWidth={1.8} />
                    {ORDER.dateTimeMsk}
                  </span>
                </span>
              </span>
              <span className="rounded-[6px] bg-success-soft px-2.5 py-1 text-[10px] font-semibold text-success">
                Оплачено
              </span>
              <ChevronRight className="size-[15px] shrink-0 text-slate" />
            </Link>
          </div>

          <div className="mt-4 rounded-[14px] border border-line bg-card p-4">
            <h2 className="text-[12.5px] font-bold text-ink">Документы</h2>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <Link
                to="/receipt"
                className="flex items-center gap-2.5 rounded-[12px] border border-line px-4 py-3 transition-colors hover:border-brandblue"
              >
                <FileText className="size-[16px] shrink-0 text-brandblue" strokeWidth={1.8} />
                <span className="text-[11px] font-semibold text-ink">Чек об оплате</span>
              </Link>
              <Link
                to="/receipt-email"
                className="flex items-center gap-2.5 rounded-[12px] border border-line px-4 py-3 transition-colors hover:border-brandblue"
              >
                <Mail className="size-[16px] shrink-0 text-brandblue" strokeWidth={1.8} />
                <span className="text-[11px] font-semibold text-ink">Отправка на email</span>
              </Link>
            </div>
          </div>

          <div className="mt-4 flex items-start gap-3 rounded-[14px] bg-brandblue-soft px-5 py-4">
            <Shield className="mt-0.5 size-[20px] shrink-0 text-brandblue" strokeWidth={1.8} />
            <div>
              <div className="text-[11.5px] font-bold text-ink">Ваши данные под защитой</div>
              <div className="text-[10px] leading-[1.4] text-slate">
                Мы используем шифрование и соответствуем стандарту PCI DSS.
              </div>
            </div>
          </div>

          <HelpBar text="Наши специалисты на связи 24/7" />
        </div>

        <Footer variant="full" />
        <BottomNav active="profile" />
      </div>
    </div>
  );
}
