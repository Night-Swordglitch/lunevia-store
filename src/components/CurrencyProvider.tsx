"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type StoreCurrency = "USD" | "SGD" | "GBP" | "EUR" | "AUD" | "CAD" | "JPY" | "MYR";

const currencies: StoreCurrency[] = ["USD", "SGD", "GBP", "EUR", "AUD", "CAD", "JPY", "MYR"];
const quoteCurrencies = currencies.filter((code) => code !== "USD").join(",");
const CurrencyContext = createContext<{
  currency: StoreCurrency;
  setCurrency: (currency: StoreCurrency) => void;
  formatPrice: (usdAmount: number) => string;
} | null>(null);

type FrankfurterRate = {
  base: string;
  quote: string;
  rate: number;
};

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
    fetch(`https://api.frankfurter.dev/v2/rates?base=USD&quotes=${quoteCurrencies}`)
      .then((response) => {
        if (!response.ok) throw new Error("Exchange rates unavailable");
        return response.json() as Promise<FrankfurterRate[]>;
      })
      .then((data) => {
        if (cancelled || !Array.isArray(data)) return;
        const next: Partial<Record<StoreCurrency, number>> = { USD: 1 };
        for (const row of data) {
          if (
            row.base === "USD" &&
            currencies.includes(row.quote as StoreCurrency) &&
            Number.isFinite(row.rate) &&
            row.rate > 0
          ) {
            next[row.quote as StoreCurrency] = row.rate;
          }
        }

        const missingRates = currencies.filter((code) => code !== "USD" && next[code] === undefined);
        if (missingRates.length > 0) throw new Error("One or more exchange rates are unavailable");
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
    const rate = rates[currency];
    if (rate === undefined) return "Loading rate…";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      currencyDisplay: "narrowSymbol",
    }).format(usdAmount * rate);
  }, [currency, rates]);

  const value = useMemo(() => ({ currency, setCurrency, formatPrice }), [currency, setCurrency, formatPrice]);
  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) throw new Error("useCurrency must be used within CurrencyProvider.");
  return context;
}
