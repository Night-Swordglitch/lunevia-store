"use client";

import { useCart } from "@/components/CartProvider";
import { useCurrency } from "@/components/CurrencyProvider";


export default function CartPage() {
  const { formatPrice } = useCurrency();
  const {
    items,
    cartCount,
    subtotal,
    updateQuantity,
    removeItem,
  } = useCart();

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
            <a href="/cart" aria-label={`Saved selection, ${cartCount} items`} className="inline-flex shrink-0 items-center gap-1.5 text-[#C9A96E]">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px] sm:h-5 sm:w-5">
                <path d="M5 8h14l1 13H4L5 8Z" />
                <path d="M9 8V6a3 3 0 0 1 6 0v2" />
              </svg>
              {cartCount > 0 && <span className="text-[10px] font-semibold sm:text-xs">{cartCount}</span>}
            </a>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-6 py-14 md:px-10 md:py-20">
        <p className="text-[9px] tracking-[0.32em] text-[#A88753]">SAVED SELECTION</p>
        <h1 className="mt-4 font-serif text-4xl text-[#3A1825] md:text-5xl">
          Your selection<span className="text-[#C9A96E]">.</span>
        </h1>
        <p className="mt-3 text-xs text-[#75675D]">
          {cartCount} {cartCount === 1 ? "item" : "items"} saved for reference
        </p>

        {items.length === 0 ? (
          <div className="mt-12 border-y border-[#3A1825]/10 py-16 text-center">
            <h2 className="font-serif text-2xl text-[#3A1825]">Your selection is currently empty.</h2>
            <p className="mt-3 text-sm text-[#75675D]">
              Discover something thoughtful for your everyday.
            </p>
            <a
              href="/shop"
              className="mt-8 inline-flex border border-[#3A1825] px-7 py-3 text-[10px] uppercase tracking-[0.16em] text-[#3A1825] transition hover:bg-[#3A1825] hover:text-[#FAF6F1]"
            >
              Explore the collection
            </a>
          </div>
        ) : (
          <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_300px]">
            <div className="divide-y divide-[#3A1825]/10 border-y border-[#3A1825]/10">
              {items.map((item) => (
                <article
                  key={item.productId + ":" + item.variantId}
                  className="flex gap-4 py-6 sm:gap-6"
                >
                  <a
                    href={"/shop/" + item.productId}
                    className="h-28 w-24 shrink-0 overflow-hidden bg-[#F0E9E1] sm:h-36 sm:w-32"
                  >
                    {item.image ? (
                      <img src={item.image} alt={item.title} className="h-full w-full object-contain p-2" />
                    ) : (
                      <div className="flex h-full items-center justify-center font-serif text-xs text-[#A88753]">LUNÉVIA</div>
                    )}
                  </a>

                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <a href={"/shop/" + item.productId} className="font-serif text-lg leading-snug text-[#3A1825] hover:text-[#A88753]">
                          {item.title}
                        </a>
                        {item.options.length > 0 && (
                          <p className="mt-2 text-xs leading-5 text-[#75675D]">
                            {item.options.join(" · ")}
                          </p>
                        )}
                      </div>
                      <p className="shrink-0 text-sm text-[#3A1825]">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>

                    <div className="mt-auto flex items-center justify-between gap-3 pt-4">
                      <div className="flex items-center border border-[#3A1825]/20">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.productId, item.variantId, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          aria-label={"Decrease quantity of " + item.title}
                          className="px-3 py-2 text-sm text-[#3A1825] disabled:opacity-30"
                        >
                          −
                        </button>
                        <span className="min-w-7 text-center text-xs">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.productId, item.variantId, item.quantity + 1)}
                          aria-label={"Increase quantity of " + item.title}
                          className="px-3 py-2 text-sm text-[#3A1825]"
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.productId, item.variantId)}
                        className="text-[9px] uppercase tracking-[0.14em] text-[#75675D] underline underline-offset-4 transition hover:text-[#3A1825]"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <aside className="h-fit border border-[#3A1825]/10 p-6">
              <h2 className="font-serif text-2xl text-[#3A1825]">Selection overview</h2>
              <div className="mt-6 flex items-center justify-between border-b border-[#3A1825]/10 pb-4 text-sm">
                <span className="text-[#75675D]">Displayed product total</span>
                <span className="text-[#3A1825]">{formatPrice(subtotal)}</span>
              </div>
              <p className="mt-4 text-xs leading-5 text-[#75675D]">
                This is a saved product selection only, not an order. LUNÉVIA is not currently accepting purchases or payments. Shipping and taxes have not been calculated, and displayed prices are for reference.
              </p>
              <div className="mt-7 w-full border border-[#3A1825]/20 px-5 py-4 text-center text-[10px] uppercase tracking-[0.18em] text-[#75675D]">
                Purchasing temporarily unavailable
              </div>
              <a href="/shop" className="mt-6 block text-center text-[9px] uppercase tracking-[0.15em] text-[#3A1825] underline underline-offset-4">
                Continue shopping
              </a>
            </aside>
          </div>
        )}
      </section>

    </main>
  );
}
