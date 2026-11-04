import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

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

type Product = {
  id: string;
  title: string;
  blueprint_id: number;
  print_provider_id: number;
  variants?: Array<{ id: number; is_enabled: boolean; is_available: boolean }>;
};

type Profile = {
  variant_ids?: number[];
  countries?: string[];
  first_item?: { cost: number; currency: string };
  additional_items?: { cost: number; currency: string };
};

async function getPrintify<T>(path: string, token: string): Promise<T> {
  const response = await fetch(`https://api.printify.com/v1/${path}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Printify API error: ${response.status}`);
  return response.json() as Promise<T>;
}

export async function GET() {
  const token = process.env.PRINTIFY_API_TOKEN;
  if (!token) {
    return NextResponse.json({ error: "Printify API token is not configured." }, { status: 500 });
  }

  try {
    const shop = await getPrintify<{ data?: Product[]; last_page?: number }>(
      "shops/29152028/products.json?limit=50&page=1",
      token
    );
    const products = (shop.data ?? []).filter((p) => launchProductIds.has(p.id));

    const shippingCache = new Map<string, Promise<{ profiles?: Profile[]; handling_time?: unknown }>>();
    for (const product of products) {
      const key = `${product.blueprint_id}:${product.print_provider_id}`;
      if (!shippingCache.has(key)) {
        shippingCache.set(
          key,
          getPrintify(
            `catalog/blueprints/${product.blueprint_id}/print_providers/${product.print_provider_id}/shipping.json`,
            token
          )
        );
      }
    }

    const audited = await Promise.all(products.map(async (product) => {
      const key = `${product.blueprint_id}:${product.print_provider_id}`;
      const shipping = await shippingCache.get(key)!;
      const enabled = (product.variants ?? []).filter((v) => v.is_enabled);
      const profiles = (shipping.profiles ?? []).map((profile) => {
        const covered = new Set(profile.variant_ids ?? []);
        const enabledCovered = enabled.filter((v) => covered.has(v.id));
        return {
          countries: profile.countries ?? [],
          enabled_variants_covered: enabledCovered.length,
          enabled_variants_uncovered: enabled.length - enabledCovered.length,
          first_item: profile.first_item ?? null,
          additional_items: profile.additional_items ?? null,
        };
      });
      return {
        product_id: product.id,
        title: product.title,
        blueprint_id: product.blueprint_id,
        print_provider_id: product.print_provider_id,
        enabled_variant_count: enabled.length,
        available_enabled_variant_count: enabled.filter((v) => v.is_available).length,
        profiles,
      };
    }));

    const allCountries = Array.from(new Set(audited.flatMap((p) =>
      p.profiles.flatMap((profile) => profile.countries)
    ))).sort();

    return NextResponse.json({
      source: "Printify V1 Catalog shipping profiles",
      expected_launch_products: launchProductIds.size,
      audited_launch_products: audited.length,
      distinct_blueprint_provider_pairs: shippingCache.size,
      union_country_codes: allCountries,
      products: audited,
    });
  } catch (error) {
    return NextResponse.json({
      error: "Printify shipping audit failed.",
      detail: error instanceof Error ? error.message : "Unknown error",
    }, { status: 502 });
  }
}
