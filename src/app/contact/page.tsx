import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the LUNÉVIA team.",
};

const contactEmail = "shoplunevias@gmail.com";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#FAF6F1] text-[#2C1A0E]">
      <header className="bg-[#3A1825]">
        <div className="mx-auto max-w-7xl px-6 py-7 text-center md:px-10">
          <a href="/" aria-label="LUNÉVIA home" className="font-serif text-2xl tracking-[0.2em] text-[#FAF6F1]">
            LUNÉVIA<span className="text-[#C9A96E]">.</span>
          </a>
          <p className="mt-1 text-[10px] tracking-[0.14em] text-[#E8DCD5]">Elevate the everyday.</p>
          <nav aria-label="Main navigation" className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-[#C9A96E]/30 pt-5 text-[10px] uppercase tracking-[0.16em] text-[#FAF6F1]">
            <a href="/" className="transition hover:text-[#C9A96E]">Home</a>
            <a href="/shop" className="transition hover:text-[#C9A96E]">Shop</a>
            <a href="/#philosophy" className="transition hover:text-[#C9A96E]">Our Philosophy</a>
            <a href="/cart" className="transition hover:text-[#C9A96E]">Saved Selection</a>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-4xl px-6 py-20 text-center md:px-10 md:py-28">
        <p className="text-[9px] tracking-[0.32em] text-[#A88753]">WE WOULD LOVE TO HEAR FROM YOU</p>
        <h1 className="mt-5 font-serif text-4xl text-[#3A1825] md:text-6xl">
          Get in touch<span className="text-[#C9A96E]">.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-[#75675D]">
          Have a question about LUNÉVIA or our collection? Send us an email and we’ll be happy to hear from you.
        </p>
        <div className="mx-auto mt-12 max-w-xl border-y border-[#3A1825]/15 px-6 py-10">
          <p className="text-[9px] uppercase tracking-[0.24em] text-[#A88753]">Email</p>
          <a href={`mailto:${contactEmail}`} className="mt-4 inline-block break-all font-serif text-xl text-[#3A1825] underline decoration-[#C9A96E] underline-offset-8 transition hover:text-[#A88753] md:text-2xl">
            {contactEmail}
          </a>
        </div>
        <p className="mt-8 text-xs leading-6 text-[#75675D]">
          Please note that purchasing is temporarily unavailable while we complete our store checks.
        </p>
      </section>
    </main>
  );
}
