import CurrencySelector from "@/components/CurrencySelector";

export default function SiteFooter() {
  return (
    <footer className="bg-[#765B60] px-6 py-12 text-[#FAF6F1] md:px-10">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <a href="/" className="font-serif text-2xl tracking-[0.18em] text-[#FAF6F1]">
            LUNÉVIA<span className="text-[#C9A96E]">.</span>
          </a>
          <p className="mt-3 max-w-xs text-xs leading-6 text-[#D8C9C0]">
            Thoughtfully chosen for everyday living.
          </p>
          <CurrencySelector />
        </div>
        <div>
          <h2 className="text-[9px] uppercase tracking-[0.24em] text-[#C9A96E]">Explore</h2>
          <nav aria-label="Footer navigation" className="mt-4 flex flex-col items-start gap-3 text-xs text-[#F0E7E1]">
            <a href="/" className="transition hover:text-[#C9A96E]">Home</a>
            <a href="/shop" className="transition hover:text-[#C9A96E]">Shop</a>
            <a href="/contact" className="transition hover:text-[#C9A96E]">Contact</a>
          </nav>
        </div>
        <div>
          <h2 className="text-[9px] uppercase tracking-[0.24em] text-[#C9A96E]">Information</h2>
          <nav aria-label="Policies" className="mt-4 flex flex-col items-start gap-3 text-xs text-[#F0E7E1]">
            <a href="/shipping-returns" className="transition hover:text-[#C9A96E]">Shipping &amp; Returns</a>
            <a href="/privacy-policy" className="transition hover:text-[#C9A96E]">Privacy Policy</a>
            <a href="/terms" className="transition hover:text-[#C9A96E]">Terms of Service</a>
            <a href="mailto:shoplunevias@gmail.com" className="transition hover:text-[#C9A96E]">shoplunevias@gmail.com</a>
          </nav>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-[#FAF6F1]/15 pt-5 text-[10px] tracking-[0.08em] text-[#C8B8AE]">
        © {new Date().getFullYear()} LUNÉVIA. All rights reserved.
      </div>
    </footer>
  );
}
