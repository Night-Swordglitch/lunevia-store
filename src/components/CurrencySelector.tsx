"use client";

import { CURRENCIES, useCurrency } from "@/components/CurrencyProvider";

export default function CurrencySelector() {
  const { currency, setCurrency, rateDate, ratesStatus } = useCurrency();

  return (
    <div className="flex flex-col gap-2 sm:items-end">
      <label
        htmlFor="display-currency"
        className="text-[9px] uppercase tracking-[0.18em] text-[#E6D7D2]"
      >
        Display currency
      </label>
      <select
        id="display-currency"
        value={currency}
        onChange={(event) =>
          setCurrency(event.target.value as (typeof CURRENCIES)[number]["code"])
        }
        className="min-w-48 border border-[#C9A96E]/50 bg-[#3A1825] px-3 py-2 text-xs text-[#FAF6F1] outline-none focus:border-[#C9A96E]"
      >
        {CURRENCIES.map((item) => (
          <option key={item.code} value={item.code}>
            {item.code} — {item.name}
          </option>
        ))}
      </select>
      <p className="max-w-xs text-[10px] leading-4 text-[#D7C7C1] sm:text-right">
        {ratesStatus === "error"
          ? "Exchange rates unavailable. Prices are shown in USD."
          : ratesStatus === "loading"
            ? "Loading daily reference rates..."
            : `Approximate daily reference rates${rateDate ? ` · ${rateDate}` : ""}. Original prices remain in USD.`}
      </p>
    </div>
  );
}
