import { NextResponse } from "next/server";

export async function GET() {
  const token = process.env.PRINTIFY_API_TOKEN;

  if (!token) {
    return NextResponse.json(
      { error: "Printify API token is missing." },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(
      "https://api.printify.com/v1/shops.json",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: "Printify API request failed.", details: data },
        { status: response.status }
      );
    }

    const shops = Array.isArray(data)
      ? data.map((shop: Record<string, unknown>) => ({
          id: shop.id,
          title: shop.title,
          sales_channel: shop.sales_channel,
        }))
      : data;

    return NextResponse.json({ shops });
  } catch {
    return NextResponse.json(
      { error: "Could not connect to Printify." },
      { status: 500 }
    );
  }
}
