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
          throw new Error(data.error || "Unable to load this product.");
        }

        const found = (data.products || []).find(
          (item: Product) => item.id === id
        );

        if (!found) {
          throw new Error("This product could not be found.");
        }

        setProduct(found);

        const firstAvailable = found.variants.find(
          (variant: Variant) => variant.is_enabled && variant.is_available
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
          We could not find this product
        </h1>
        <p className="mt-4 text-sm text-[#75675D]">
          {error || "Please return to the collection and choose another item."}
        </p>
        <a
          href="/shop"
          className="mt-8 border border-[#3A1825] px-7 py-3 text-xs uppercase tracking-widest"
        >
          Back to the Collection
        </a>
      </main>
    );
  }

  const availableVariants = product.variants.filter(
    (variant) => variant.is_enabled
  );

  const selectableVariants = availableVariants.filter(
    (variant) => variant.is_available
  );

  const activeVariant = product.variants.find(
    (variant) => variant.id === selectedVariant
  );

  const formatPrice = (price: number) => "$" + (price / 100).toFixed(2);
  const description = cleanDescription(product.description || "");

  const optionNames = Array.from(
    new Set(
      availableVariants.flatMap((variant) =>
        Object.keys(variant.options || {})
      )
    )
  );

  const optionGroups = optionNames.map((name) => ({
    name,
    values: Array.from(
      new Set(
        availableVariants
          .map((variant) => variant.options?.[name])
          .filter((value): value is string | number => value !== undefined)
          .map(String)
      )
    ),
  }));

  const colourGroup = optionGroups.find(({ name }) =>
    /colou?r/i.test(name)
  );
  const dropdownGroups = optionGroups.filter(
    ({ name }) => !/colou?r/i.test(name)
  );

  function chooseOption(optionName: string, value: string) {
    const currentOptions = activeVariant?.options || {};
    const exactMatch = selectableVariants.find((variant) =>
      Object.entries({ ...currentOptions, [optionName]: value }).every(
        ([name, selectedValue]) =>
          String(variant.options?.[name] ?? "") === String(selectedValue)
      )
    );

    const matchingOption = selectableVariants.find(
      (variant) => String(variant.options?.[optionName] ?? "") === value
    );

    const nextVariant = exactMatch || matchingOption;
    if (nextVariant) setSelectedVariant(nextVariant.id);
  }

  return (
    <main className="min-h-screen bg-[#FAF6F1] text-[#2C1A0E]">
      <div className="bg-[#3A1825] px-4 py-3 text-center text-[10px] tracking-[0.2em] text-[#F8E9D8]">
        Complimentary delivery on orders over $30
      </div>

      <header className="sticky top-0 z-50 border-b border-[#3A1825]/10 bg-[#FAF6F1]/95 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a href="/" className="font-serif text-2xl tracking-[0.18em] text-[#3A1825]">
            LUNÉVIA<span className="text-[#C9A96E]">.</span>
          </a>
          <div className="flex items-center gap-7 text-[10px] uppercase tracking-[0.15em]">
            <a href="/" className="transition hover:text-[#C9A96E]">Home</a>
            <a href="/shop" className="transition hover:text-[#C9A96E]">Shop</a>
            <a href="/#philosophy" className="transition hover:text-[#C9A96E]">Our Philosophy</a>
          </div>
        </nav>
      </header>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-8 sm:px-8 md:grid-cols-[1.08fr_0.92fr] md:gap-16 md:px-10 md:py-14">
        <div>
          <div className="aspect-[4/5] max-h-[760px] overflow-hidden bg-[#F0E9E1]">
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
            <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  aria-label={`View product image ${index + 1}`}
                  aria-pressed={selectedImage === index}
                  className={`h-20 w-20 shrink-0 overflow-hidden border ${
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

        <div className="flex flex-col justify-center py-4 md:py-8">
          <p className="text-[9px] tracking-[0.28em] text-[#A88753]">
            THE LUNÉVIA COLLECTION
          </p>

          <h1 className="mt-5 font-serif text-3xl leading-tight text-[#3A1825] md:text-4xl lg:text-5xl">
            {product.title}
          </h1>

          {activeVariant && (
            <p className="mt-6 text-lg tracking-[0.02em] text-[#3A1825]">
              {formatPrice(activeVariant.price)}
            </p>
          )}

          <div className="my-7 h-px bg-[#3A1825]/12" />

          <h2 className="text-[9px] uppercase tracking-[0.2em] text-[#3A1825]">
            About this piece
          </h2>

          <p className="mt-3 whitespace-pre-line text-sm leading-7 text-[#75675D]">
            {description || "Discover this piece from LUNÉVIA."}
          </p>

          <div className="mt-8 space-y-5 border-t border-[#3A1825]/10 pt-6">
            <h2 className="text-[10px] uppercase tracking-[0.2em] text-[#3A1825]">
              Personalise your selection
            </h2>

            {availableVariants.length > 0 && optionGroups.length > 0 ? (
              <>
                {colourGroup && (
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <label className="text-xs text-[#3A1825]">
                        {colourGroup.name}
                      </label>
                      <span className="text-xs text-[#75675D]">
                        {String(activeVariant?.options?.[colourGroup.name] ?? "Select")}
                      </span>
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2 [scrollbar-width:thin]">
                      {colourGroup.values.map((value) => {
                        const isSelected =
                          String(activeVariant?.options?.[colourGroup.name] ?? "") === value;
                        const isAvailable = selectableVariants.some(
                          (variant) =>
                            String(variant.options?.[colourGroup.name] ?? "") === value
                        );

                        return (
                          <button
                            key={value}
                            type="button"
                            disabled={!isAvailable}
                            aria-pressed={isSelected}
                            onClick={() => chooseOption(colourGroup.name, value)}
                            className={`shrink-0 whitespace-nowrap border px-3.5 py-2 text-[11px] transition ${
                              isSelected
                                ? "border-[#3A1825] bg-[#3A1825] text-[#FAF6F1]"
                                : "border-[#3A1825]/20 text-[#3A1825] hover:border-[#C9A96E]"
                            } disabled:cursor-not-allowed disabled:opacity-35`}
                          >
                            {value}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {dropdownGroups.map((group) => (
                  <div key={group.name}>
                    <label
                      htmlFor={`variant-${group.name}`}
                      className="mb-2 block text-xs text-[#3A1825]"
                    >
                      {group.name}
                    </label>
                    <select
                      id={`variant-${group.name}`}
                      value={String(activeVariant?.options?.[group.name] ?? "")}
                      onChange={(event) => chooseOption(group.name, event.target.value)}
                      className="w-full appearance-none rounded-none border border-[#3A1825]/20 bg-transparent px-4 py-3 text-sm text-[#3A1825] outline-none transition focus:border-[#C9A96E]"
                    >
                      <option value="" disabled>
                        Select {group.name.toLowerCase()}
                      </option>
                      {group.values.map((value) => {
                        const isAvailable = selectableVariants.some(
                          (variant) =>
                            String(variant.options?.[group.name] ?? "") === value
                        );
                        return (
                          <option key={value} value={value} disabled={!isAvailable}>
                            {value}{!isAvailable ? " — Unavailable" : ""}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                ))}
              </>
            ) : availableVariants.length > 0 ? (
              <div>
                <label
                  htmlFor="variant-fallback"
                  className="mb-2 block text-xs text-[#3A1825]"
                >
                  Available option
                </label>
                <select
                  id="variant-fallback"
                  value={String(selectedVariant ?? "")}
                  onChange={(event) => setSelectedVariant(Number(event.target.value))}
                  className="w-full appearance-none border border-[#3A1825]/20 bg-transparent px-4 py-3 text-sm text-[#3A1825] outline-none focus:border-[#C9A96E]"
                >
                  {availableVariants.map((variant) => (
                    <option
                      key={variant.id}
                      value={variant.id}
                      disabled={!variant.is_available}
                    >
                      {Object.values(variant.options || {}).join(" / ") ||
                        `Option ${variant.id}`}
                      {" — "}{formatPrice(variant.price)}
                      {!variant.is_available ? " — Unavailable" : ""}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <p className="text-sm text-[#75675D]">
                No options are currently available.
              </p>
            )}
          </div>

          <p className="mt-6 text-[11px] text-[#75675D]">
            {activeVariant?.is_available
              ? "This option is currently available."
              : "Please choose an available option."}
          </p>

          <div className="mt-7 border-t border-[#3A1825]/10 pt-5">
            <p className="text-[9px] leading-6 tracking-[0.16em] text-[#A88753]">
              THOUGHTFULLY CHOSEN. BEAUTIFULLY LIVED.
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#3A1825]/10 px-6 py-9 md:px-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 md:flex-row">
          <p className="font-serif text-xl tracking-[0.15em] text-[#3A1825]">
            LUNÉVIA<span className="text-[#C9A96E]">.</span>
          </p>
          <div className="flex gap-6 text-[10px] uppercase tracking-[0.15em] text-[#75675D]">
            <a href="/">Home</a>
            <a href="/shop">Shop</a>
            <a href="/#philosophy">Our Philosophy</a>
          </div>
        </div>
        <p className="mt-7 text-center text-[9px] tracking-[0.08em] text-[#75675D]">
          © {new Date().getFullYear()} LUNÉVIA. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
