"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type StoreCurrency = "USD" | "SGD" | "GBP" | "EUR" | "AUD" | "CAD" | "JPY" | "MYR";

const currencies: StoreCurrency[] = ["USD", "SGD", "GBP", "EUR", "AUD", "CAD", "JPY", "MYR"];
const CurrencyContext = createContext<{
  currency: StoreCurrency;
  setCurrency: (currency: StoreCurrency) => void;
  formatPrice: (usdAmount: number) => string;
} | null>(null);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<StoreCurrency>("USD");
  const [rates, setRates] = useState<Partial<Record<StoreCurrency, number>>>({ USD: 1 });

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("lunevia-currency");
      if (saved && currencies.includes(saved as StoreCurrency)) setCurrencyState(saved as StoreCurrency);
    } catch {
      // Keep USD as the safe default when browser storage is unavailable.
    }

    let cancelled = false;
    fetch("https://api.frankfurter.app/latest?from=USD&to=SGD,GBP,EUR,AUD,CAD,JPY,MYR")
      .then((response) => {
        if (!response.ok) throw new Error("Exchange rates unavailable");
        return response.json();
      })
      .then((data: { rates?: Record<string, number> }) => {
        if (cancelled || !data.rates) return;
        const next: Partial<Record<StoreCurrency, number>> = { USD: 1 };
        for (const code of currencies) {
          if (code !== "USD" && typeof data.rates[code] === "number") next[code] = data.rates[code];
        }
        setRates(next);
      })
      .catch(() => {
        if (cancelled) return;
        setCurrencyState("USD");
        try { window.localStorage.setItem("lunevia-currency", "USD"); } catch {
          // USD remains the in-memory fallback.
        }
      });

    return () => { cancelled = true; };
  }, []);

  const setCurrency = useCallback((next: StoreCurrency) => {
    setCurrencyState(next);
    try { window.localStorage.setItem("lunevia-currency", next); } catch {
      // Currency selection remains active for this session.
    }
  }, []);

  const formatPrice = useCallback((usdAmount: number) => {
    const rate = rates[currency] ?? 1;
    const displayAmount = usdAmount * rate;
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      currencyDisplay: "narrowSymbol",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(displayAmount);
  }, [currency, rates]);

  const value = useMemo(() => ({ currency, setCurrency, formatPrice }), [currency, setCurrency, formatPrice]);
  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) throw new Error("useCurrency must be used within CurrencyProvider.");
  return context;
}
