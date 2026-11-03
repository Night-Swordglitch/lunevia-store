import { NextResponse } from "next/server";

export async function GET() {
  const token = process.env.PRINTIFY_API_TOKEN;
  const shopId = "29152028";

  if (!token) {
    return NextResponse.json(
      { error: "Printify API token is missing." },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(
      `https://api.printify.com/v1/shops/${shopId}/products.json?limit=50`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: "Printify product request failed.", details: result },
        { status: response.status }
      );
    }

    const products = (result.data ?? []).map((product: any) => ({
      id: product.id,
      title: product.title,
      description: product.description,
      options: product.options ?? [],
      images: (product.images ?? []).map((image: any) => image.src),
      variants: (product.variants ?? []).map((variant: any) => ({
        id: variant.id,
        price: variant.price,
        is_enabled: variant.is_enabled,
        is_available: variant.is_available,
        options: variant.options,
      })),
    }));

    return NextResponse.json({
      total: result.total ?? products.length,
      products,
    });
  } catch {
    return NextResponse.json(
      { error: "Could not retrieve Printify products." },
      { status: 500 }
    );
  }
}
