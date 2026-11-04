"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useCart } from "@/components/CartProvider";

type Variant = {
  id: number;
  price: number;
  is_enabled: boolean;
  is_available: boolean;
  options?: Array<string | number> | Record<string, string | number>;
};

type ProductOptionValue = { id: string | number; title: string };
type ProductOption = { name: string; type?: string; values?: ProductOptionValue[] };
type ProductImage = { src: string; variant_ids?: number[]; is_default?: boolean };

type Product = {
  id: string;
  title: string;
  description: string;
  images: ProductImage[];
  options?: ProductOption[];
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
  const { addItem, cartCount } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [addedToCart, setAddedToCart] = useState(false);

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

  const formatPrice = (price: number) => "US$" + (price / 100).toFixed(2);
  const description = cleanDescription(product.description || "");

  const optionNames = product.options?.length
    ? product.options.map((option) => option.name)
    : Array.from(
        new Set(
          availableVariants.flatMap((variant) =>
            Array.isArray(variant.options)
              ? []
              : Object.keys(variant.options || {}).filter((key) => !/^\d+$/.test(key))
          )
        )
      );

  const getOptionValue = (variant: Variant | undefined, name: string) => {
    if (!variant) return undefined;
    const optionIndex = product.options?.findIndex((option) => option.name === name) ?? -1;
    const rawValue = Array.isArray(variant.options)
      ? variant.options[optionIndex]
      : variant.options?.[name] ?? (optionIndex >= 0 ? variant.options?.[String(optionIndex)] : undefined);
    if (rawValue === undefined) return undefined;
    const matchingChoice = optionIndex >= 0
      ? product.options?.[optionIndex]?.values?.find((choice) => String(choice.id) === String(rawValue))
      : undefined;
    return matchingChoice?.title ?? rawValue;
  };

  const optionGroups = optionNames.map((name) => ({
    name,
    values: Array.from(
      new Set(
        selectableVariants
          .map((variant) => getOptionValue(variant, name))
          .filter((value): value is string | number => value !== undefined)
          .map(String)
      )
    ),
  }));

  const colourGroup = optionGroups.find(({ name }) => {
    const option = product.options?.find((item) => item.name === name);
    return /colou?r/i.test(name) || /color/i.test(option?.type || "");
  });
  const dropdownGroups = optionGroups.filter(
    ({ name }) => !/colou?r/i.test(name)
  );

  function chooseOption(optionName: string, value: string) {
    const exactMatch = selectableVariants.find((variant) =>
      optionNames.every((name) =>
        String(name === optionName ? value : getOptionValue(activeVariant || undefined, name) ?? "") ===
        String(getOptionValue(variant, name) ?? "")
      )
    );

    const matchingOption = selectableVariants.find(
      (variant) => String(getOptionValue(variant, optionName) ?? "") === value
    );

    const nextVariant = exactMatch || matchingOption;
    if (nextVariant) {
      setSelectedVariant(nextVariant.id);
      setAddedToCart(false);
    }
  }

  const matchingImageIndex = product.images.findIndex((image) =>
    image.variant_ids?.includes(selectedVariant ?? -1)
  );
  const displayedImageIndex = matchingImageIndex >= 0 ? matchingImageIndex : selectedImage;
  const displayedImage = product.images[displayedImageIndex];

  return (
    <main className="min-h-screen bg-[#FAF6F1] text-[#2C1A0E]">
      <header className="sticky top-0 z-50 bg-[#3A1825]">
        <div className="mx-auto max-w-7xl px-6 pt-5 md:px-10">
          <div className="flex flex-col items-center pb-5">
            <a href="/" aria-label="LUNÉVIA home" className="font-serif text-2xl tracking-[0.2em] text-[#FAF6F1]">
              LUNÉVIA<span className="text-[#C9A96E]">.</span>
            </a>
            <p className="mt-1 text-[10px] tracking-[0.14em] text-[#E8DCD5]">Elevate the everyday.</p>
          </div>
          <nav aria-label="Main navigation" className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-[#C9A96E]/30 py-4 font-serif text-[10px] font-bold uppercase tracking-[0.08em] text-[#FAF6F1] sm:gap-x-10 sm:text-[13px] sm:tracking-[0.12em] md:gap-x-14 md:text-sm md:tracking-[0.16em]">
            <a href="/" className="whitespace-nowrap transition hover:text-[#C9A96E]">Home</a>
            <a href="/shop" className="whitespace-nowrap transition hover:text-[#C9A96E]">Shop</a>
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


      <section className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-7 px-4 py-6 sm:gap-10 sm:px-8 sm:py-10 md:grid-cols-[1.05fr_0.95fr] md:gap-14 md:px-10 md:py-14">
        <div>
          <div className="mx-auto flex aspect-square w-full max-w-[540px] items-center justify-center overflow-hidden bg-[#F3EDE7]">
            {displayedImage?.src ? (
              <img
                src={displayedImage.src}
                alt={product.title}
                className="h-full w-full object-contain p-4 sm:p-7"
              />
            ) : (
              <div className="flex h-full items-center justify-center font-serif text-2xl text-[#A88753]">
                LUNÉVIA
              </div>
            )}
          </div>

          {product.images?.length > 1 && (
            <div className="mx-auto mt-3 flex w-full max-w-[560px] gap-2 overflow-x-auto pb-2 sm:gap-3">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  aria-label={`View product image ${index + 1}`}
                  aria-pressed={selectedImage === index}
                  className={`h-16 w-16 shrink-0 overflow-hidden border sm:h-20 sm:w-20 ${
                    displayedImageIndex === index
                      ? "border-[#3A1825]"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={image.src}
                    alt={`${product.title} view ${index + 1}`}
                    className="h-full w-full object-contain bg-[#F0E9E1] p-1"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="mx-auto flex w-full max-w-2xl flex-col justify-center py-2 sm:py-4 md:py-8">
          <h1 className="break-words font-serif text-2xl leading-tight text-[#3A1825] sm:text-3xl md:text-4xl lg:text-[2.75rem]">
            {product.title}
          </h1>

          {activeVariant && (
            <p className="mt-3 text-base tracking-[0.02em] text-[#3A1825]">
              {formatPrice(activeVariant.price)}
            </p>
          )}

          <div className="my-6 h-px bg-[#3A1825]/12" />

          <div className="space-y-5">
            <h2 className="text-[10px] uppercase tracking-[0.2em] text-[#3A1825]">
              Choose your options
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
                        {String(getOptionValue(activeVariant || undefined, colourGroup.name) ?? "Select")}
                      </span>
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2 [scrollbar-width:thin]">
                      {colourGroup.values.map((value) => {
                        const isSelected =
                          String(getOptionValue(activeVariant || undefined, colourGroup.name) ?? "") === value;
                        const isAvailable = selectableVariants.some(
                          (variant) =>
                            String(getOptionValue(variant, colourGroup.name) ?? "") === value
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

                {dropdownGroups.map((group) => {
                  const isSizeOption = /size/i.test(group.name);
                  const hasSingleSize = isSizeOption && group.values.length === 1;
                  const selectedValue = String(
                    getOptionValue(activeVariant || undefined, group.name) ?? group.values[0] ?? ""
                  );

                  return (
                    <div key={group.name}>
                      <label
                        htmlFor={`variant-${group.name}`}
                        className="mb-2 block text-xs text-[#3A1825]"
                      >
                        {group.name}
                      </label>
                      <select
                        id={`variant-${group.name}`}
                        value={selectedValue}
                        onChange={(event) => chooseOption(group.name, event.target.value)}
                        className="w-full appearance-none rounded-none border border-[#3A1825]/20 bg-transparent px-4 py-3 text-sm text-[#3A1825] outline-none transition focus:border-[#C9A96E]"
                      >
                        <option value="" disabled>
                          Select {group.name.toLowerCase()}
                        </option>
                        {group.values.map((value) => (
                          <option key={value} value={value}>
                            {hasSingleSize ? "One size" : value}
                          </option>
                        ))}
                      </select>
                    </div>
                  );
                })}
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
                  onChange={(event) => {
                    setSelectedVariant(Number(event.target.value));
                    setAddedToCart(false);
                  }}
                  className="w-full appearance-none border border-[#3A1825]/20 bg-transparent px-4 py-3 text-sm text-[#3A1825] outline-none focus:border-[#C9A96E]"
                >
                  {availableVariants.map((variant) => (
                    <option
                      key={variant.id}
                      value={variant.id}
                      disabled={!variant.is_available}
                    >
                      Selection {availableVariants.findIndex((item) => item.id === variant.id) + 1}
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

          <p className="mt-3 text-[11px] text-[#75675D]">
            {activeVariant?.is_available
              ? "Selected option available."
              : "Please choose an available option."}
          </p>

          <button
            type="button"
            disabled={!activeVariant || !activeVariant.is_available}
            onClick={() => {
              if (!activeVariant || !activeVariant.is_available) return;
              addItem({
                productId: product.id,
                variantId: activeVariant.id,
                title: product.title,
                price: activeVariant.price,
                image: displayedImage?.src || product.images?.[0]?.src || "",
                options: optionNames
                  .map((name) => {
                    const value = getOptionValue(activeVariant, name);
                    if (value === undefined) return "";
                    const group = optionGroups.find((item) => item.name === name);
                    const displayValue =
                      /size/i.test(name) && group?.values.length === 1
                        ? "One size"
                        : String(value);
                    return name + ": " + displayValue;
                  })
                  .filter(Boolean),
              });
              setAddedToCart(true);
            }}
            className="mt-5 w-full bg-[#3A1825] px-6 py-4 text-[10px] uppercase tracking-[0.18em] text-[#FAF6F1] transition hover:bg-[#542638] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {addedToCart ? "Saved to selection" : "Save to selection"}
          </button>

          <div className="mt-8 border-t border-[#3A1825]/10 pt-6">
            <h2 className="text-[9px] uppercase tracking-[0.2em] text-[#3A1825]">
              About this piece
            </h2>
            <p className="mt-3 max-w-prose whitespace-pre-line text-sm leading-7 text-[#75675D]">
              {description || "Discover this piece from LUNÉVIA."}
            </p>
          </div>

        </div>
      </section>

    </main>
  );
}
