import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Shield, Zap, PieChart, Gift, Lock, ChevronRight } from "lucide-react";

import {
  BackLink,
  FeatureQuad,
  Footer,
  Header,
  OrderSummary,
  PageTitle,
  SecureLine,
} from "@/components/travel/Chrome";
import { YaPayMark } from "@/components/travel/Brand";
import { usePaymentState } from "@/lib/payment-state";

export const Route = createFileRoute("/yandex-pay")({
  head: () => ({
    meta: [
      { title: "Оплата через Яндекс Pay — Travel Pay" },
      { name: "description", content: "Оплатите путешествие в одно касание с помощью аккаунта Яндекс — быстро и безопасно." },
      { property: "og:title", content: "Оплата через Яндекс Pay — Travel Pay" },
      { property: "og:description", content: "Оплата в одно касание без ввода данных карты." },
    ],
  }),
  component: YandexPayPage,
});

const STEPS = ["Нажмите кнопку\n«Оплатить через Яндекс Pay»", "Выберите способ оплаты\nв приложении Яндекс", "Подтвердите оплату"];

function PhoneMock() {
  return (
    <div className="mx-auto w-[150px] rounded-[22px] border-[5px] border-navy bg-card p-2 shadow-card">
      <div className="mx-auto mb-2 h-1 w-8 rounded-full bg-navy" />
      <div className="flex items-center justify-between px-1 text-[7px] text-slate">
        <span>9:41</span>
        <span>▮▮</span>
      </div>
      <div className="mt-1 text-center text-[10px] font-bold text-ink">Яндекс</div>
      <div className="mt-2 space-y-1.5">
        <div className="rounded-[8px] bg-warning-soft px-2 py-1.5">
          <div className="text-[8px] font-bold text-ink">Карта Пэй</div>
          <div className="flex items-center justify-between text-[7px] text-slate">
            <span>•• 1234</span>
            <span>12 480 ₽</span>
          </div>
        </div>
        <div className="flex items-center justify-between rounded-[8px] border border-line px-2 py-1.5">
          <span>
            <span className="block text-[8px] font-bold text-ink">Сплит</span>
            <span className="block text-[7px] text-slate">Оплата частями</span>
          </span>
          <ChevronRight className="size-3 text-slate" />
        </div>
        <div className="flex items-center justify-between rounded-[8px] border border-line px-2 py-1.5">
          <span>
            <span className="block text-[8px] font-bold text-ink">Баланс</span>
            <span className="block text-[7px] text-slate">3 200 ₽</span>
          </span>
          <ChevronRight className="size-3 text-slate" />
        </div>
      </div>
      <div className="mt-2 flex items-center justify-around border-t border-line pt-1.5 text-[6px] text-slate">
        <span>Главная</span>
        <span className="font-bold text-gold">Платежи</span>
        <span>Пэй</span>
        <span>Профиль</span>
      </div>
    </div>
  );
}

function YandexPayPage() {
  const navigate = useNavigate();
  const { update } = usePaymentState();

  const pay = () => {
    update({ method: "yandex-pay" });
    navigate({ to: "/processing" });
  };

  return (
    <div className="min-h-screen bg-[oklch(0.93_0.005_250)] py-0 sm:py-8">
      <div className="tp-frame">
        <Header tone="light" />

        <div className="px-6 pb-6 pt-4">
          <BackLink to="/" label="Назад к способам оплаты" />
          <PageTitle
            icon={<YaPayMark size={22} />}
            title="Оплата через Яндекс Pay"
            subtitle="Быстро и безопасно с помощью вашего аккаунта Яндекс"
          />
          <OrderSummary />

          <div className="mt-4 rounded-[14px] border border-line bg-card p-5">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h2 className="text-[12.5px] font-bold text-ink">Как оплатить через Яндекс Pay</h2>
                <ol className="mt-3 space-y-3">
                  {STEPS.map((step, index) => (
                    <li key={step} className="flex items-start gap-2.5">
                      <span className="flex size-[19px] shrink-0 items-center justify-center rounded-full bg-gold/15 text-[10.5px] font-bold text-gold-deep">
                        {index + 1}
                      </span>
                      <span className="whitespace-pre-line text-[11.5px] leading-[1.4] text-ink">{step}</span>
                    </li>
                  ))}
                </ol>

                <div className="mt-4 flex items-start gap-2.5 rounded-[12px] bg-surface px-3.5 py-3">
                  <Shield className="mt-0.5 size-[18px] shrink-0 text-ink" strokeWidth={1.6} />
                  <div>
                    <div className="text-[11.5px] font-bold text-ink">Безопасно и удобно</div>
                    <div className="text-[10px] leading-[1.4] text-slate">
                      Ваши данные защищены Яндекс и соответствуют международным стандартам
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-center text-[12px] font-semibold text-ink">Оплатить с помощью Яндекс Pay</h2>
                <div className="mt-3 rounded-[14px] border border-line bg-surface-2 p-4">
                  <div className="grid grid-cols-[1fr_auto] items-center gap-3">
                    <PhoneMock />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <YaPayMark size={22} />
                        <span className="text-[16px] font-bold text-ink">Pay</span>
                      </div>
                      <p className="mt-2 text-[11px] leading-[1.4] text-ink">
                        Оплачивайте быстро и удобно в приложении Яндекс
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={pay}
                    className="mt-4 flex w-full items-center justify-center gap-2.5 rounded-[10px] bg-navy py-3 text-[13px] font-semibold text-white transition-opacity hover:opacity-90"
                  >
                    <YaPayMark size={18} />
                    <span>Pay</span>
                    <span className="text-white/40">|</span>
                    Оплатить через Яндекс Pay
                  </button>

                  <p className="mt-2.5 flex items-start justify-center gap-1.5 text-center text-[9.5px] leading-[1.4] text-slate">
                    <Lock className="mt-px size-3 shrink-0" />
                    Нажимая кнопку, вы перейдёте в приложение Яндекс для подтверждения оплаты
                  </p>
                </div>
              </div>
            </div>

            <SecureLine text="Безопасное соединение. Данные защищены по стандарту PCI DSS" />
          </div>

          <FeatureQuad
            items={[
              {
                icon: <Shield className="size-[18px]" strokeWidth={1.6} />,
                title: "Безопасно",
                text: "Платежи защищены\nпо стандартам\nЯндекс и PCI DSS",
              },
              { icon: <Zap className="size-[18px]" strokeWidth={1.6} />, title: "Быстро", text: "Оплата в одно\nкасание" },
              {
                icon: <PieChart className="size-[18px]" strokeWidth={1.6} />,
                title: "Удобно",
                text: "Не нужно вводить\nданные карты",
              },
              {
                icon: <Gift className="size-[18px]" strokeWidth={1.6} />,
                title: "Выгодно",
                text: "Доступна оплата частями\nчерез Яндекс Сплит",
              },
            ]}
          />
        </div>

        <Footer variant="method" />
      </div>
    </div>
  );
}
