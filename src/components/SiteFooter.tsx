import CurrencySelector from "@/components/CurrencySelector";

export default function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-[#C9A96E]/30 bg-[#3A1825] text-[#FAF6F1]">
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-10">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <a
              href="/"
              aria-label="LUNÉVIA home"
              className="font-serif text-2xl tracking-[0.2em]"
            >
              LUNÉVIA<span className="text-[#C9A96E]">.</span>
            </a>
            <p className="mt-3 text-xs tracking-[0.08em] text-[#E6D7D2]">
              Thoughtfully chosen for everyday living.
            </p>
          </div>

          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap gap-x-7 gap-y-3 text-[10px] uppercase tracking-[0.16em] text-[#E6D7D2]"
          >
            <a href="/" className="transition hover:text-[#C9A96E]">Home</a>
            <a href="/shop" className="transition hover:text-[#C9A96E]">Shop</a>
            <a href="/#philosophy" className="transition hover:text-[#C9A96E]">Our Philosophy</a>
            <a href="/contact" className="transition hover:text-[#C9A96E]">Contact</a>
          </nav>
        </div>

        <div className="mt-10 border-t border-[#FAF6F1]/15 pt-5 text-[10px] leading-5 text-[#D7C7C1]">
          <p>© {new Date().getFullYear()} LUNÉVIA. All rights reserved.</p>
          <p className="mt-1">
            <a href="mailto:shoplunevias@gmail.com" className="transition hover:text-[#C9A96E]">shoplunevias@gmail.com</a>
          </p>
          <p className="mt-1">
            Purchasing is temporarily unavailable. Displayed prices are for reference only.
          </p>
        </div>
      </div>
    </footer>
  );
}
