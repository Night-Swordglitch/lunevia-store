import { NextResponse } from "next/server";

const launchProductIds = new Set([
  "6ac27ab0d796ffb48e0f2ad3",
  "6ac25346d01a18442904d9dd",
  "6ac0b394d8f8171df3095d77",
  "6ac0b132705d92cac403452a",
  "6abf1a69add24cb68103efd0",
  "6abe1f77ab5f91622f04ee9a",
  "6abe1a041407957666064208",
  "6abe08ed139455c65504a655",
  "6abe058e4da6532539083189",
  "6abdd441f79d4fc7940f66d1",
]);

async function printifyGet(url: string, token: string) {
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  const body = await response.json();
  if (!response.ok) {
    throw new Error(`Printify API ${response.status}: ${JSON.stringify(body).slice(0, 300)}`);
  }
  return body;
}

export async function GET() {
  const token = process.env.PRINTIFY_API_TOKEN;
  if (!token) return NextResponse.json({ error: "Printify API token is missing." }, { status: 500 });

  try {
    const shopId = "29152028";
    const firstPage = await printifyGet(
      `https://api.printify.com/v1/shops/${shopId}/products.json?limit=50&page=1`,
      token
    );
    const allProducts = Array.isArray(firstPage.data) ? [...firstPage.data] : [];
    const lastPage = Math.max(1, Number(firstPage.last_page) || 1);

    for (let page = 2; page <= lastPage; page += 1) {
      const result = await printifyGet(
        `https://api.printify.com/v1/shops/${shopId}/products.json?limit=50&page=${page}`,
        token
      );
      if (Array.isArray(result.data)) allProducts.push(...result.data);
    }

    const selected = allProducts.filter((p: any) => launchProductIds.has(p.id));
    const audit = await Promise.all(selected.map(async (p: any) => {
      const base = {
        product: p.title,
        productId: p.id,
        blueprintId: p.blueprint_id,
        printProviderId: p.print_provider_id,
        variantCount: Array.isArray(p.variants) ? p.variants.filter((v: any) => v.is_enabled).length : 0,
      };
      try {
        const [provider, shipping] = await Promise.all([
          printifyGet(
            `https://api.printify.com/v1/catalog/blueprints/${p.blueprint_id}/print_providers/${p.print_provider_id}.json`,
            token
          ),
          printifyGet(
            `https://api.printify.com/v2/catalog/blueprints/${p.blueprint_id}/print_providers/${p.print_provider_id}/shipping/standard.json`,
            token
          ),
        ]);
        const rows = Array.isArray(shipping.data) ? shipping.data : [];
        const countryCodes = [...new Set(rows.map((x: any) => x?.attributes?.country?.code).filter(Boolean))].sort();
        return {
          ...base,
          provider: provider.title ?? provider.name ?? null,
          countryCodes,
          shippingRows: rows.length,
          shippingDataVerified: rows.length > 0,
        };
      } catch (error) {
        return {
          ...base,
          shippingDataVerified: false,
          error: error instanceof Error ? error.message : "Unknown Printify API error",
        };
      }
    }));

    return NextResponse.json({
      source: "Printify API v1 shop products + v1 provider catalog + v2 standard shipping",
      productCount: audit.length,
      products: audit,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Printify shipping audit failed." },
      { status: 502 }
    );
  }
}
