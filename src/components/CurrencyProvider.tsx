"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export const CURRENCIES = [
  { code: "USD", name: "US Dollar" },
  { code: "SGD", name: "Singapore Dollar" },
  { code: "GBP", name: "British Pound" },
  { code: "EUR", name: "Euro" },
  { code: "AUD", name: "Australian Dollar" },
  { code: "CAD", name: "Canadian Dollar" },
  { code: "JPY", name: "Japanese Yen" },
  { code: "MYR", name: "Malaysian Ringgit" },
] as const;

export type CurrencyCode = (typeof CURRENCIES)[number]["code"];

type CurrencyContextValue = {
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  formatPrice: (usdAmount: number) => string;
  rateDate: string | null;
  ratesStatus: "loading" | "ready" | "error";
};

const STORAGE_KEY = "lunevia-display-currency";
const SYMBOLS: Record<CurrencyCode, string> = {
  USD: "US$",
  SGD: "S$",
  GBP: "£",
  EUR: "€",
  AUD: "A$",
  CAD: "C$",
  JPY: "¥",
  MYR: "RM",
};

const CurrencyContext = createContext<CurrencyContextValue | undefined>(
  undefined
);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>("USD");
  const [rates, setRates] = useState<Partial<Record<CurrencyCode, number>>>({
    USD: 1,
  });
  const [rateDate, setRateDate] = useState<string | null>(null);
  const [ratesStatus, setRatesStatus] = useState<
    "loading" | "ready" | "error"
  >("loading");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (CURRENCIES.some((item) => item.code === saved)) {
        setCurrencyState(saved as CurrencyCode);
      }
    } catch {
      // Keep USD as the default when browser storage is unavailable.
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadRates() {
      try {
        const response = await fetch("/api/currency-rates");
        if (!response.ok) throw new Error("Exchange rates are unavailable.");

        const data = await response.json();
        const nextRates: Partial<Record<CurrencyCode, number>> = { USD: 1 };

        for (const item of CURRENCIES) {
          if (item.code === "USD") continue;
          const rate = Number(data.rates?.[item.code]);
          if (Number.isFinite(rate) && rate > 0) {
            nextRates[item.code] = rate;
          }
        }

        if (!cancelled) {
          setRates(nextRates);
          setRateDate(typeof data.date === "string" ? data.date : null);
          setRatesStatus(
            CURRENCIES.every((item) => Boolean(nextRates[item.code]))
              ? "ready"
              : "error"
          );
        }
      } catch {
        if (!cancelled) {
          setRatesStatus("error");
        }
      }
    }

    loadRates();
    return () => {
      cancelled = true;
    };
  }, []);

  const setCurrency = useCallback((nextCurrency: CurrencyCode) => {
    setCurrencyState(nextCurrency);
    try {
      window.localStorage.setItem(STORAGE_KEY, nextCurrency);
    } catch {
      // The selection still applies for the current session.
    }
  }, []);

  const formatPrice = useCallback(
    (usdAmount: number) => {
      const rate = currency === "USD" ? 1 : rates[currency];
      const effectiveCurrency = rate ? currency : "USD";
      const convertedAmount = usdAmount * (rate || 1);
      const digits = effectiveCurrency === "JPY" ? 0 : 2;
      const formattedAmount = new Intl.NumberFormat("en-US", {
        minimumFractionDigits: digits,
        maximumFractionDigits: digits,
      }).format(convertedAmount);

      return `${SYMBOLS[effectiveCurrency]} ${formattedAmount}`;
    },
    [currency, rates]
  );

  const value = useMemo(
    () => ({ currency, setCurrency, formatPrice, rateDate, ratesStatus }),
    [currency, setCurrency, formatPrice, rateDate, ratesStatus]
  );

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within CurrencyProvider.");
  }
  return context;
}
