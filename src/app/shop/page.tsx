"use client";

import { useEffect, useState } from "react";

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
  images: string[];
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
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
      .filter((variant) => variant.is_enabled && variant.price > 0)
      .map((variant) => variant.price);

    if (prices.length === 0) return null;

    return Math.min(...prices) / 100;
  }

  return (
    <main className="min-h-screen bg-[#FAF6F1] text-[#2C1A0E]">
      <div className="bg-[#3A1825] px-4 py-3 text-center text-[10px] tracking-[0.2em] text-[#F8E9D8]">
        Complimentary delivery on orders over $30
      </div>

      <header className="sticky top-0 z-50 border-b border-[#3A1825]/10 bg-[#FAF6F1]/95 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a
            href="/"
            className="font-serif text-2xl tracking-[0.18em] text-[#3A1825]"
          >
            LUNÉVIA<span className="text-[#C9A96E]">.</span>
          </a>

          <div className="flex items-center gap-7 text-[10px] uppercase tracking-[0.15em]">
            <a href="/" className="transition hover:text-[#C9A96E]">
              Home
            </a>
            <a href="/shop" className="text-[#A88753]">
              Shop
            </a>
            <a href="/#philosophy" className="transition hover:text-[#C9A96E]">
              Our Philosophy
            </a>
          </div>
        </nav>
      </header>

      <section className="bg-[#3A1825] px-6 py-24 text-center text-[#FAF6F1]">
        <p className="text-[10px] tracking-[0.35em] text-[#C9A96E]">
          THE LUNÉVIA COLLECTION
        </p>

        <h1 className="mt-6 font-serif text-5xl md:text-7xl">
          Discover the Collection
        </h1>

        <p className="mx-auto mt-6 max-w-lg text-sm leading-7 text-[#E6D7D2]">
          Thoughtfully selected pieces to bring beauty, comfort and inspiration
          into everyday living.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">
        <div className="mb-10 flex flex-col justify-between gap-4 border-b border-[#3A1825]/10 pb-5 md:flex-row md:items-end">
          <div>
            <p className="text-[9px] tracking-[0.28em] text-[#A88753]">
              DISCOVER LUNÉVIA
            </p>
            <h2 className="mt-3 font-serif text-4xl text-[#3A1825]">
              Thoughtfully selected
            </h2>
          </div>

          <p className="text-xs text-[#75675D]">
            {loading ? "Loading the collection..." : `${products.length} products`}
          </p>
        </div>

        {loading && (
          <div className="py-24 text-center">
            <p className="font-serif text-2xl text-[#3A1825]">
              Preparing your selection...
            </p>
            <p className="mt-3 text-xs text-[#75675D]">
              Just a moment.
            </p>
          </div>
        )}

        {error && (
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

        {!loading && !error && products.length === 0 && (
          <p className="py-20 text-center text-[#75675D]">
            There are no products to display right now.
          </p>
        )}

        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => {
              const price = getPrice(product);
              const image = product.images?.[0];
              const description = cleanDescription(product.description || "");

              return (
                <a
                  href={`/shop/${product.id}`}
                  key={product.id}
                  className="group block"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#F0E9E1]">
                    {image ? (
                      <img
                        src={image}
                        alt={product.title}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-[#A88753]">
                        LUNÉVIA
                      </div>
                    )}

                    <span className="absolute left-4 top-4 bg-[#FAF6F1] px-3 py-2 text-[9px] uppercase tracking-[0.15em] text-[#3A1825]">
                      LUNÉVIA
                    </span>
                  </div>

                  <div className="pt-4">
                    <h3 className="font-serif text-xl leading-snug text-[#3A1825]">
                      {product.title}
                    </h3>

                    {description && (
                      <p className="mt-2 line-clamp-2 whitespace-pre-line text-xs leading-5 text-[#75675D]">
                        {description}
                      </p>
                    )}

                    <div className="mt-4 flex items-center justify-between pt-2">
                      <span className="text-sm text-[#3A1825]">
                        {price !== null
                          ? `From $${price.toFixed(2)}`
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

      <section className="bg-[#3A1825] px-6 py-20 text-center text-[#FAF6F1]">
        <p className="text-[10px] tracking-[0.3em] text-[#C9A96E]">
          THE LUNÉVIA PHILOSOPHY
        </p>

        <h2 className="mx-auto mt-6 max-w-2xl font-serif text-3xl leading-relaxed md:text-4xl">
          Elevate the everyday.
        </h2>
      </section>

      <footer className="px-6 py-12">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h2 className="font-serif text-2xl tracking-[0.15em] text-[#3A1825]">
              LUNÉVIA<span className="text-[#C9A96E]">.</span>
            </h2>
            <p className="mt-2 text-xs text-[#75675D]">
              Elevate the everyday.
            </p>
          </div>

          <div className="flex gap-7 text-[9px] uppercase tracking-[0.16em] text-[#75675D]">
            <a href="/">Home</a>
            <a href="/shop">Shop</a>
            <a href="/#philosophy">Our Philosophy</a>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-7xl border-t border-[#3A1825]/15 pt-5 text-center text-[9px] tracking-[0.08em] text-[#75675D]">
          © {new Date().getFullYear()} LUNÉVIA. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
