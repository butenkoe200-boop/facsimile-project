import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import type { PaymentMethodId } from "./order";

type PaymentState = {
  method: PaymentMethodId;
  bankId: string;
  bankName: string;
  splitPlan: string;
  email: string;
};

const DEFAULT: PaymentState = {
  method: "card",
  bankId: "alfa",
  bankName: "Альфа-Банк",
  splitPlan: "4",
  email: "erik.inkerman@gmail.com",
};

const KEY = "tp-payment-state";

const Ctx = createContext<{
  state: PaymentState;
  update: (patch: Partial<PaymentState>) => void;
}>({ state: DEFAULT, update: () => {} });

export function PaymentStateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PaymentState>(DEFAULT);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(KEY);
      if (raw) setState((prev) => ({ ...prev, ...(JSON.parse(raw) as Partial<PaymentState>) }));
    } catch {
      /* ignore */
    }
  }, []);

  const update = useCallback((patch: Partial<PaymentState>) => {
    setState((prev) => {
      const next = { ...prev, ...patch };
      try {
        sessionStorage.setItem(KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const value = useMemo(() => ({ state, update }), [state, update]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function usePaymentState() {
  return useContext(Ctx);
}
