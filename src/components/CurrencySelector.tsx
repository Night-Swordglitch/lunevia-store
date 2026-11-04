"use client";

import { useCurrency, type StoreCurrency } from "@/components/CurrencyProvider";

const options: { code: StoreCurrency; label: string }[] = [
  { code: "USD", label: "USD — US Dollar" },
  { code: "SGD", label: "SGD — Singapore Dollar" },
  { code: "GBP", label: "GBP — British Pound" },
  { code: "EUR", label: "EUR — Euro" },
  { code: "AUD", label: "AUD — Australian Dollar" },
  { code: "CAD", label: "CAD — Canadian Dollar" },
  { code: "JPY", label: "JPY — Japanese Yen" },
  { code: "MYR", label: "MYR — Malaysian Ringgit" },
];

export default function CurrencySelector() {
  const { currency, setCurrency } = useCurrency();
  return (
    <label className="mt-5 flex flex-col items-start gap-2 text-xs text-[#F0E7E1]">
      <span className="text-[9px] uppercase tracking-[0.2em] text-[#C9A96E]">Display currency · Base USD</span>
      <select
        aria-label="Display currency"
        value={currency}
        onChange={(event) => setCurrency(event.target.value as StoreCurrency)}
        className="min-w-48 border border-[#FAF6F1]/25 bg-transparent px-3 py-2 text-xs text-[#FAF6F1] outline-none focus:border-[#C9A96E]"
      >
        {options.map((option) => (
          <option key={option.code} value={option.code} className="bg-[#3A1825] text-[#FAF6F1]">
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
