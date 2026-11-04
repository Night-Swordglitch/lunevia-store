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

export async function GET() {
  const token = process.env.PRINTIFY_API_TOKEN;
  const shopId = "29152028";
  const limit = 50;

  if (!token) {
    return NextResponse.json(
      { error: "Printify API token is missing." },
      { status: 500 }
    );
  }

  try {
    const products: any[] = [];
    let page = 1;
    let lastPage = 1;

    do {
      const response = await fetch(
        `https://api.printify.com/v1/shops/${shopId}/products.json?limit=${limit}&page=${page}`,
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
          { error: "Printify product request failed." },
          { status: response.status }
        );
      }

      const pageProducts = Array.isArray(result.data) ? result.data : [];
      products.push(...pageProducts);

      const reportedLastPage = Number(result.last_page);
      lastPage =
        Number.isFinite(reportedLastPage) && reportedLastPage >= page
          ? reportedLastPage
          : pageProducts.length === limit
            ? page + 1
            : page;

      page += 1;
    } while (page <= lastPage);

    // Only expose the ten Printify products approved for the current launch.
    // This prevents older, draft, or otherwise unapproved Printify catalogue
    // entries from appearing in the storefront or being opened directly.
    const launchProducts = products.filter((product: any) =>
      launchProductIds.has(product.id)
    );

    const formattedProducts = launchProducts.map((product: any) => ({
      id: product.id,
      title: product.title,
      created_at: product.created_at ?? null,
      description: product.description,
      options: product.options ?? [],
      images: (product.images ?? []).map((image: any) => ({
        src: image.src,
        variant_ids: image.variant_ids ?? [],
        is_default: image.is_default ?? false,
      })),
      variants: (product.variants ?? []).map((variant: any) => ({
        id: variant.id,
        price: variant.price,
        is_enabled: variant.is_enabled,
        is_available: variant.is_available,
        options: variant.options,
      })),
    }));

    return NextResponse.json({
      total: formattedProducts.length,
      products: formattedProducts,
    });
  } catch {
    return NextResponse.json(
      { error: "Could not retrieve Printify products." },
      { status: 500 }
    );
  }
}
