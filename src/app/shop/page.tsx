"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/components/CartProvider";

type Variant = {
  id: number;
  price: number;
  is_enabled: boolean;
  is_available: boolean;
};

type Product = {
  id: string;
  title: string;
  description: string;
  created_at?: string | null;
  images: { src: string; variant_ids?: number[]; is_default?: boolean }[];
  variants: Variant[];
};

function cleanDescription(description: string) {
  return description
    .replace(/<br\s*\/?\s*>/gi, "\n")
    .replace(/<\/(p|div|li|h[1-6])\s*>/gi, "\n")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/[ \t]+/g, " ")
    .replace(/ *\n */g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export default function ShopPage() {
  const { cartCount } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [category, setCategory] = useState<string | null>(null);

  useEffect(() => {
    setCategory(new URLSearchParams(window.location.search).get("category"));
  }, []);

  const shopCategories = [
    { slug: "new-arrivals", name: "New Arrivals" },
    { slug: "home-living", name: "Home & Living" },
    { slug: "accessories", name: "Accessories" },
    { slug: "everyday-essentials", name: "Everyday Essentials" },
    { slug: "beauty-care", name: "Beauty" },
    { slug: "men", name: "Men" },
    { slug: "women", name: "Women" },
    { slug: "fragrance", name: "Fragrance" },
    { slug: "gifts", name: "Gifts" },
    { slug: "room-decor", name: "Room Decor" },
    { slug: "travel", name: "Travel" },
    { slug: "footwear", name: "Footwear" },
  ];

  // Explicit Printify product ID assignments keep collections stable when titles change.
  // Products may belong to more than one relevant collection.
  const productCategories: Record<string, string[]> = {
    "6ac27ab0d796ffb48e0f2ad3": ["everyday-essentials", "men", "women", "travel"],
    "6ac25346d01a18442904d9dd": ["everyday-essentials", "accessories", "men", "travel"],
    "6ac0b394d8f8171df3095d77": ["everyday-essentials", "accessories", "gifts"],
    "6ac0b132705d92cac403452a": ["everyday-essentials", "accessories", "travel"],
    "6abf1a69add24cb68103efd0": ["everyday-essentials", "accessories", "gifts", "women"],
    "6abe1f77ab5f91622f04ee9a": ["home-living", "accessories", "room-decor"],
    "6abe1a041407957666064208": ["everyday-essentials", "women", "footwear"],
    "6abe08ed139455c65504a655": ["home-living", "fragrance", "gifts", "room-decor"],
    "6abe058e4da6532539083189": ["home-living", "accessories", "room-decor"],
    "6abdd441f79d4fc7940f66d1": ["everyday-essentials", "men"],
  };

  function belongsToCategory(product: Product, selectedCategory: string) {
    if (selectedCategory === "home-living" && /desk\s*mat/i.test(product.title)) {
      return false;
    }

    return productCategories[product.id]?.includes(selectedCategory) ?? false;
  }

  const visibleProducts = category === "new-arrivals"
    ? [...products]
        .filter((product) => Boolean(product.created_at))
        .sort(
          (a, b) =>
            new Date(b.created_at as string).getTime() -
            new Date(a.created_at as string).getTime()
        )
        .slice(0, 6)
    : category
      ? products.filter((product) => belongsToCategory(product, category))
      : products;

  const comingSoonCategory = category === "home-living" || category === "beauty-care";

  const categoryTitle =
    category === "home-living" ? "Home & Living" :
    category === "everyday-essentials" ? "Everyday Essentials" :
    category === "beauty-care" ? "Beauty & Care" :
    shopCategories.find((item) => item.slug === category)?.name ??
    "All Products";

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch("/api/printify/products");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Unable to load products.");
        }

        setProducts(data.products || []);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Something went wrong."
        );
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  function getPrice(product: Product) {
    const prices = product.variants
      .filter((variant) => variant.is_enabled && variant.is_available && variant.price > 0)
      .map((variant) => variant.price);

    if (prices.length === 0) return null;

    return Math.min(...prices) / 100;
  }

  return (
    <main className="min-h-screen w-full min-w-0 overflow-x-clip bg-[#FAF6F1] text-[#2C1A0E]">
      <header className="sticky top-0 z-50 bg-[#3A1825]">
        <div className="mx-auto max-w-7xl px-6 pt-5 md:px-10">
          <div className="flex flex-col items-center pb-5">
            <a href="/" aria-label="LUNÉVIA home" className="font-serif text-2xl tracking-[0.2em] text-[#FAF6F1]">
              LUNÉVIA<span className="text-[#C9A96E]">.</span>
            </a>
            <p className="mt-1 text-[10px] tracking-[0.14em] text-[#E8DCD5]">Elevate the everyday.</p>
          </div>
          <nav aria-label="Main navigation" className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-[#C9A96E]/40 py-4 font-serif text-[10px] font-bold uppercase tracking-[0.08em] text-[#FAF6F1] sm:gap-x-10 sm:text-[13px] sm:tracking-[0.12em] md:gap-x-14 md:text-sm md:tracking-[0.16em]">
            <a href="/" className="whitespace-nowrap transition hover:text-[#C9A96E]">Home</a>
            <a href="/shop" aria-current="page" className="whitespace-nowrap text-[#C9A96E]">Shop</a>
            <a href="/#philosophy" className="whitespace-nowrap transition hover:text-[#C9A96E]">Our Philosophy</a>
            <a href="/cart" aria-label={`Saved selection, ${cartCount} items`} className="inline-flex shrink-0 items-center gap-1.5 transition hover:text-[#C9A96E]">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px] sm:h-5 sm:w-5">
                <path d="M5 8h14l1 13H4L5 8Z" />
                <path d="M9 8V6a3 3 0 0 1 6 0v2" />
              </svg>
              {cartCount > 0 && <span className="text-[10px] font-semibold sm:text-xs">{cartCount}</span>}
            </a>
          </nav>
        </div>
      </header>
      <div className="border-b border-[#3A1825]/10 bg-[#F2EBE3] px-4 py-2 text-center text-[9px] uppercase tracking-[0.12em] text-[#75675D]">
        Purchasing is temporarily unavailable. Displayed prices are for reference only.
      </div>


      <section className="border-b border-[#3A1825]/10 px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-[9px] tracking-[0.32em] text-[#A88753]">THE LUNÉVIA COLLECTION</p>
          <h1 className="mt-5 max-w-3xl font-serif text-4xl leading-tight text-[#3A1825] md:text-6xl">Discover the Collection<span className="text-[#C9A96E]">.</span></h1>
          <p className="mt-5 max-w-lg text-sm leading-7 text-[#75675D]">Thoughtfully selected pieces to bring beauty, comfort and inspiration into everyday living.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pt-10 md:px-10">
        <div>
          <p className="text-[9px] tracking-[0.28em] text-[#A88753]">BROWSE BY CATEGORY</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <a
              href="/shop"
              aria-current={!category ? "page" : undefined}
              className={`border px-4 py-2 text-[9px] uppercase tracking-[0.14em] transition ${!category ? "border-[#3A1825] bg-[#3A1825] text-[#FAF6F1]" : "border-[#3A1825]/20 text-[#66584F] hover:border-[#C9A96E] hover:text-[#3A1825]"}`}
            >
              All
            </a>
            {shopCategories.map((item) => (
              <a
                key={item.slug}
                href={`/shop?category=${item.slug}`}
                aria-current={category === item.slug ? "page" : undefined}
                className={`border px-4 py-2 text-[9px] uppercase tracking-[0.14em] transition ${category === item.slug ? "border-[#3A1825] bg-[#3A1825] text-[#FAF6F1]" : "border-[#3A1825]/20 text-[#66584F] hover:border-[#C9A96E] hover:text-[#3A1825]"}`}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full min-w-0 max-w-7xl px-4 py-12 sm:px-6 md:px-10 md:py-20">
        <div className="mb-10 flex flex-col justify-between gap-4 border-b border-[#3A1825]/10 pb-5 md:flex-row md:items-end">
          <div>
            <p className="text-[9px] tracking-[0.28em] text-[#A88753]">
              DISCOVER LUNÉVIA
            </p>
            <h2 className="mt-3 font-serif text-4xl text-[#3A1825]">
              {categoryTitle}
            </h2>
          </div>

          <p className="text-xs text-[#75675D]">
            {comingSoonCategory ? "Coming soon" : loading ? "Loading the collection..." : `${visibleProducts.length} products`}
          </p>
        </div>

        {loading && !comingSoonCategory && (
          <div className="py-24 text-center">
            <p className="font-serif text-2xl text-[#3A1825]">
              Preparing your selection...
            </p>
            <p className="mt-3 text-xs text-[#75675D]">
              Just a moment.
            </p>
          </div>
        )}

        {error && !comingSoonCategory && (
          <div className="border border-red-200 bg-red-50 p-8 text-center">
            <p className="font-serif text-xl text-red-900">
              We could not load the collection
            </p>
            <p className="mt-3 text-sm text-red-700">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 border border-red-900 px-6 py-3 text-xs uppercase tracking-widest text-red-900"
            >
              Try again
            </button>
          </div>
        )}

        {(comingSoonCategory || (!loading && !error && visibleProducts.length === 0)) && (
          <div className="py-20 text-center">
            <p className="font-serif text-2xl text-[#3A1825]">
              {comingSoonCategory ? "Coming soon." : "No products in this collection yet."}
            </p>
            <p className="mt-3 text-sm text-[#75675D]">
              {comingSoonCategory
                ? "We're thoughtfully curating this collection. Please check back soon."
                : "Explore the full LUNÉVIA collection to discover all available pieces."}
            </p>
            <a href="/shop" className="mt-6 inline-block border-b border-[#3A1825] pb-2 text-[10px] uppercase tracking-[0.18em] text-[#3A1825]">
              View all pieces
            </a>
          </div>
        )}

        {!comingSoonCategory && !loading && !error && visibleProducts.length > 0 && (
          <div className="grid w-full min-w-0 grid-cols-[minmax(0,1fr)] gap-x-5 gap-y-10 sm:grid-cols-[repeat(2,minmax(0,1fr))] sm:gap-x-6 lg:grid-cols-[repeat(3,minmax(0,1fr))]">
            {visibleProducts.map((product) => {
              const price = getPrice(product);
              const image = product.images?.[0]?.src;
              const description = cleanDescription(product.description || "");

              return (
                <a
                  href={`/shop/${product.id}`}
                  key={product.id}
                  className="group block min-w-0 w-full max-w-full overflow-hidden"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#F0E9E1]">
                    {image ? (
                      <img
                        src={image}
                        alt={product.title}
                        className="block h-full w-full min-w-0 max-w-full object-contain p-2 transition duration-700 group-hover:scale-[1.02] sm:p-4"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-[#A88753]">
                        LUNÉVIA
                      </div>
                    )}

</div>

                  <div className="pt-4">
                    <h3 className="font-serif text-lg leading-snug text-[#3A1825] [overflow-wrap:anywhere] sm:text-xl">
                      {product.title}
                    </h3>

                    {description && (
                      <p className="mt-2 line-clamp-2 whitespace-pre-line text-xs leading-5 text-[#75675D]">
                        {description}
                      </p>
                    )}

                    <div className="mt-4 flex min-w-0 flex-wrap items-center justify-between gap-x-3 gap-y-2 pt-2">
                      <span className="text-sm text-[#3A1825]">
                        {price !== null
                          ? "From US$" + price.toFixed(2)
                          : "Price unavailable"}
                      </span>

                      <span className="border-b border-[#C9A96E] pb-1 text-[9px] uppercase tracking-[0.15em] text-[#3A1825]">
                        View details
                      </span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </section>

    </main>
  );
}
