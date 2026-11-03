
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Variant = {
  id: number;
  price: number;
  is_enabled: boolean;
  is_available: boolean;
  options?: Record<string, string | number>;
};

type Product = {
  id: string;
  title: string;
  description: string;
  images: string[];
  variants: Variant[];
};

export default function ProductPage() {
  const params = useParams();
  const id = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProduct() {
      try {
        const response = await fetch("/api/printify/products");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Unable to load product.");
        }

        const found = (data.products || []).find(
          (item: Product) => item.id === id
        );

        if (!found) {
          throw new Error("Product not found.");
        }

        setProduct(found);

        const firstAvailable = found.variants.find(
          (variant: Variant) =>
            variant.is_enabled && variant.is_available
        );

        if (firstAvailable) {
          setSelectedVariant(firstAvailable.id);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Something went wrong."
        );
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FAF6F1]">
        <p className="font-serif text-2xl text-[#3A1825]">
          Preparing your selection...
        </p>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#FAF6F1] px-6 text-center">
        <h1 className="font-serif text-3xl text-[#3A1825]">
          Something went wrong
        </h1>
        <p className="mt-4 text-sm text-[#75675D]">
          {error || "Product not found."}
        </p>
        <a href="/shop" className="mt-8 border border-[#3A1825] px-7 py-3 text-xs uppercase tracking-widest">
          Return to shop
        </a>
      </main>
    );
  }

  const availableVariants = product.variants.filter(
    (variant) => variant.is_enabled
  );

  const activeVariant = product.variants.find(
    (variant) => variant.id === selectedVariant
  );

  const formatPrice = (price: number) => `$${(price / 100).toFixed(2)}`;

  return (
    <main className="min-h-screen bg-[#FAF6F1] text-[#2C1A0E]">
      <div className="bg-[#3A1825] px-4 py-3 text-center text-[10px] tracking-[0.2em] text-[#F8E9D8]">
        COMPLIMENTARY DELIVERY ON ORDERS OVER $30
      </div>

      <header className="border-b border-[#3A1825]/10 bg-[#FAF6F1]">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a href="/" className="font-serif text-2xl tracking-[0.18em] text-[#3A1825]">
            LUNÉVIA<span className="text-[#C9A96E]">.</span>
          </a>
          <a href="/shop" className="text-[10px] uppercase tracking-[0.15em] hover:text-[#A88753]">
            Back to shop
          </a>
        </nav>
      </header>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-14 md:grid-cols-2 md:gap-16 md:py-20">
        {/* Product images */}
        <div>
          <div className="aspect-[4/5] overflow-hidden bg-[#F0E9E1]">
            {product.images?.[selectedImage] ? (
              <img
                src={product.images[selectedImage]}
                alt={product.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center font-serif text-2xl text-[#A88753]">
                LUNÉVIA
              </div>
            )}
          </div>

          {product.images?.length > 1 && (
            <div className="mt-4 grid grid-cols-4 gap-3">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square overflow-hidden border ${
                    selectedImage === index
                      ? "border-[#3A1825]"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.title} view ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product information */}
        <div className="flex flex-col justify-center">
          <p className="text-[10px] tracking-[0.3em] text-[#A88753]">
            THE LUNÉVIA COLLECTION
          </p>

          <h1 className="mt-5 font-serif text-3xl leading-relaxed text-[#3A1825] md:text-5xl">
            {product.title}
          </h1>

          {activeVariant && (
            <p className="mt-5 text-xl text-[#3A1825]">
              {formatPrice(activeVariant.price)}
            </p>
          )}

          <div className="my-8 h-px bg-[#3A1825]/15" />

          <h2 className="text-[10px] uppercase tracking-[0.2em] text-[#3A1825]">
            Description
          </h2>

          <p className="mt-4 whitespace-pre-line text-sm leading-8 text-[#75675D]">
            {product.description || "Discover this piece from LUNÉVIA."}
          </p>

          <div className="mt-9">
            <h2 className="text-[10px] uppercase tracking-[0.2em] text-[#3A1825]">
              Available options
            </h2>

            {availableVariants.length > 0 ? (
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {availableVariants.map((variant) => (
                  <button
                    key={variant.id}
                    disabled={!variant.is_available}
                    onClick={() => setSelectedVariant(variant.id)}
                    className={`border px-4 py-4 text-left text-xs transition ${
                      selectedVariant === variant.id
                        ? "border-[#3A1825] bg-[#3A1825] text-[#FAF6F1]"
                        : "border-[#3A1825]/20 text-[#3A1825] hover:border-[#C9A96E]"
                    } disabled:cursor-not-allowed disabled:opacity-40`}
                  >
                    <span className="block">
                      {Object.values(variant.options || {}).join(" / ") ||
                        `Option ${variant.id}`}
                    </span>
                    <span className="mt-2 block">
                      {formatPrice(variant.price)}
                      {!variant.is_available && " · Unavailable"}
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-sm text-[#75675D]">
                No options are currently available.
              </p>
            )}
          </div>

          <p className="mt-8 text-xs text-[#75675D]">
            {activeVariant?.is_available
              ? "This option is currently available."
              : "Please select an available option."}
          </p>

          <div className="mt-8 border-t border-[#3A1825]/15 pt-6">
            <p className="text-[10px] leading-6 tracking-[0.1em] text-[#75675D]">
              THOUGHTFULLY CHOSEN. BEAUTIFULLY LIVED.
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#3A1825]/10 px-6 py-10 text-center">
        <p className="font-serif text-xl tracking-[0.15em] text-[#3A1825]">
          LUNÉVIA<span className="text-[#C9A96E]">.</span>
        </p>
        <p className="mt-3 text-[10px] text-[#75675D]">
          © {new Date().getFullYear()} LUNÉVIA. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
