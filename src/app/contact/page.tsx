import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the LUNÉVIA team.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#FAF6F1] text-[#2C1A0E]">
      <header className="bg-[#3A1825] px-6 py-8 text-center text-[#FAF6F1]">
        <a href="/" className="font-serif text-2xl tracking-[0.2em]">
          LUNÉVIA<span className="text-[#C9A96E]">.</span>
        </a>
        <p className="mt-2 text-[10px] tracking-[0.16em] text-[#E8DCD5]">Elevate the everyday.</p>
        <nav aria-label="Main navigation" className="mx-auto mt-6 flex flex-wrap justify-center gap-x-7 gap-y-3 border-t border-[#C9A96E]/30 pt-5 text-[10px] uppercase tracking-[0.14em]">
          <a href="/" className="hover:text-[#C9A96E]">Home</a>
          <a href="/shop" className="hover:text-[#C9A96E]">Shop</a>
          <a href="/contact" aria-current="page" className="text-[#C9A96E]">Contact</a>
          <a href="/cart" className="hover:text-[#C9A96E]">Bag</a>
        </nav>
      </header>
      <div className="border-b border-[#3A1825]/10 bg-[#F2EBE3] px-4 py-2 text-center text-[9px] uppercase tracking-[0.12em] text-[#75675D]">
        Purchasing is temporarily unavailable. Displayed prices are for reference only.
      </div>
      <section className="mx-auto max-w-4xl px-6 py-20 md:py-28">
        <p className="text-[9px] tracking-[0.32em] text-[#A88753]">WE’RE HERE TO HELP</p>
        <h1 className="mt-5 font-serif text-4xl text-[#3A1825] md:text-6xl">Get in touch<span className="text-[#C9A96E]">.</span></h1>
        <p className="mt-6 max-w-2xl text-sm leading-7 text-[#75675D]">
          Have a question about LUNÉVIA, our collections or the website? Send us an email and include the details of your enquiry so we can understand how best to help.
        </p>
        <div className="mt-12 border-y border-[#3A1825]/15 py-8">
          <p className="text-[9px] uppercase tracking-[0.24em] text-[#A88753]">Customer enquiries</p>
          <a
            href="mailto:shoplunevias@gmail.com"
            className="mt-3 inline-block break-all font-serif text-xl text-[#3A1825] underline decoration-[#C9A96E] underline-offset-8 transition hover:text-[#A88753] md:text-2xl"
          >
            shoplunevias@gmail.com
          </a>
          <p className="mt-6 text-xs leading-6 text-[#75675D]">
            Please note that online purchasing is currently unavailable. Product prices shown on the website are for reference only, and adding an item to your bag does not place an order.
          </p>
        </div>
        <a href="/shop" className="mt-10 inline-flex border border-[#3A1825] px-6 py-3 text-[9px] uppercase tracking-[0.18em] text-[#3A1825] transition hover:bg-[#3A1825] hover:text-[#FAF6F1]">
          Return to the collection
        </a>
      </section>
    </main>
  );
}
