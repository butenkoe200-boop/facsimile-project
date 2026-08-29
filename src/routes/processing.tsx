import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { CreditCard, Shield } from "lucide-react";

import processingBg from "@/assets/beach-processing.jpg";
import { Footer, Header, HelpBar, OrderSummary } from "@/components/travel/Chrome";
import { TravelPayLogo } from "@/components/travel/Brand";

export const Route = createFileRoute("/processing")({
  head: () => ({
    meta: [
      { title: "Обработка платежа — Travel Pay" },
      { name: "description", content: "Ваш платёж обрабатывается. Проверяем данные и подтверждаем оплату — обычно это занимает менее 30 секунд." },
      { property: "og:title", content: "Обработка платежа — Travel Pay" },
      { property: "og:description", content: "Не закрывайте страницу, платёж обрабатывается." },
    ],
  }),
  component: ProcessingPage,
});

function ProcessingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => navigate({ to: "/success" }), 4000);
    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[oklch(0.93_0.005_250)] py-0 sm:py-8">
      <div className="tp-frame">
        <Header tone="dark" />

        <div className="bg-navy px-5 pb-5">
          <OrderSummary />
        </div>

        <div className="relative isolate overflow-hidden">
          <img
            src={processingBg}
            alt="Тропический пляж с пальмами"
            width={1024}
            height={1024}
            className="absolute inset-0 size-full object-cover"
          />
          <div className="absolute inset-0 bg-card/45" />

          <div className="relative px-5 py-5">
            <div className="rounded-[16px] bg-card/92 px-6 py-7 text-center shadow-raised backdrop-blur-sm">
              <h1 className="text-[22px] font-bold text-ink">Обработка платежа</h1>
              <p className="mx-auto mt-2 max-w-[220px] text-[12px] leading-[1.45] text-slate">
                Ваш платеж обрабатывается
                <br />
                не закрывайте страницу
              </p>

              <div className="relative mx-auto mt-6 flex size-[150px] items-center justify-center">
                <span
                  className="tp-spin absolute inset-0 rounded-full"
                  style={{
                    background:
                      "conic-gradient(from 0deg, oklch(0.703 0.09 79) 0deg 70deg, transparent 70deg 360deg)",
                    mask: "radial-gradient(farthest-side, transparent calc(100% - 7px), #000 calc(100% - 7px))",
                    WebkitMask:
                      "radial-gradient(farthest-side, transparent calc(100% - 7px), #000 calc(100% - 7px))",
                  }}
                  aria-hidden="true"
                />
                <span
                  className="absolute inset-0 rounded-full border-[7px] border-dotted border-line"
                  aria-hidden="true"
                />
                <span className="flex flex-col items-center gap-1.5">
                  <span className="relative text-gold">
                    <CreditCard className="size-9" strokeWidth={1.4} />
                  </span>
                  <TravelPayLogo size="sm" />
                </span>
              </div>

              <div className="mt-6">
                <div className="text-[12.5px] font-bold text-ink">Проверяем данные и подтверждаем оплату...</div>
                <div className="mt-1 text-[11.5px] text-slate">Обычно это занимает менее 30 секунд.</div>
              </div>

              <div className="mt-6 flex items-center gap-3 rounded-[12px] border border-line bg-card px-4 py-3 text-left">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brandblue-soft">
                  <Shield className="size-[18px] text-brandblue" strokeWidth={1.7} />
                </span>
                <div>
                  <div className="text-[12px] font-bold text-ink">Безопасно и надежно</div>
                  <div className="text-[11px] text-slate">
                    Ваши данные защищены по стандарту <span className="text-brandblue">PCI DSS</span>
                  </div>
                </div>
              </div>
            </div>

            <HelpBar text="Служба поддержки готова помочь вам 24/7" />
          </div>
        </div>

        <Footer variant="method" />
      </div>
    </div>
  );
}
