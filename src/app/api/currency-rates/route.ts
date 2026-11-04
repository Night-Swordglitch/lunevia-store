import { NextResponse } from "next/server";

export const revalidate = 86400;

const CURRENCIES = ["SGD", "GBP", "EUR", "AUD", "CAD", "JPY", "MYR"];

type FrankfurterRate = {
  date: string;
  base: string;
  quote: string;
  rate: number;
};

export async function GET() {
  try {
    const url = new URL("https://api.frankfurter.dev/v2/rates");
    url.searchParams.set("base", "USD");
    url.searchParams.set("quotes", CURRENCIES.join(","));

    const response = await fetch(url, {
      next: { revalidate: 86400 },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Daily exchange rates are temporarily unavailable." },
        { status: 502 }
      );
    }

    const rows = (await response.json()) as FrankfurterRate[];
    const rates: Record<string, number> = { USD: 1 };

    for (const row of rows) {
      if (
        CURRENCIES.includes(row.quote) &&
        Number.isFinite(row.rate) &&
        row.rate > 0
      ) {
        rates[row.quote] = row.rate;
      }
    }

    return NextResponse.json({
      base: "USD",
      date: rows[0]?.date ?? null,
      rates,
    });
  } catch {
    return NextResponse.json(
      { error: "Could not retrieve daily exchange rates." },
      { status: 502 }
    );
  }
}
