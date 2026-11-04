import type { Metadata } from "next";
export const metadata: Metadata = { title: "Terms of Service", description: "Terms for using the LUNÉVIA website." };
export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#FAF6F1] text-[#2C1A0E]">
      <header className="bg-[#3A1825] px-6 py-8 text-center text-[#FAF6F1]">
        <a href="/" className="font-serif text-2xl tracking-[0.2em]">LUNÉVIA<span className="text-[#C9A96E]">.</span></a>
        <p className="mt-2 text-[10px] tracking-[0.16em] text-[#E8DCD5]">Elevate the everyday.</p>
        <nav aria-label="Main navigation" className="mx-auto mt-6 flex flex-wrap justify-center gap-x-7 gap-y-3 border-t border-[#C9A96E]/30 pt-5 text-[10px] uppercase tracking-[0.14em]">
          <a href="/" className="hover:text-[#C9A96E]">Home</a><a href="/shop" className="hover:text-[#C9A96E]">Shop</a><a href="/contact" className="hover:text-[#C9A96E]">Contact</a><a href="/cart" className="hover:text-[#C9A96E]">Bag</a>
        </nav>
      </header>
      <div className="border-b border-[#3A1825]/10 bg-[#F2EBE3] px-4 py-2 text-center text-[9px] uppercase tracking-[0.12em] text-[#75675D]">Purchasing is temporarily unavailable. Displayed prices are for reference only.</div>
      <article className="mx-auto max-w-4xl px-6 py-16 md:py-24">
        <p className="text-[9px] tracking-[0.32em] text-[#A88753]">PLEASE READ</p>
        <h1 className="mt-5 font-serif text-4xl text-[#3A1825] md:text-6xl">Terms of Service<span className="text-[#C9A96E]">.</span></h1>
        <p className="mt-5 text-xs text-[#75675D]">Last updated: 4 November 2026</p>
        <p className="mt-8 text-sm leading-7 text-[#75675D]">These terms apply to your use of the LUNÉVIA website. By browsing the website, you agree to use it lawfully and in accordance with these terms. Online purchasing is currently disabled.</p>
        <div className="mt-12 space-y-9 text-sm leading-7 text-[#66584F]">
          <section><h2 className="font-serif text-2xl text-[#3A1825]">1. Website use</h2><p className="mt-3">You may browse the website for personal, lawful purposes. You must not misuse the website, attempt to interfere with its operation or security, or use its content in a way that infringes another person’s rights.</p></section>
          <section><h2 className="font-serif text-2xl text-[#3A1825]">2. Products and displayed prices</h2><p className="mt-3">Product descriptions, images, availability and prices are provided for general reference and may change. Prices are displayed in US dollars as the base reference currency. The website currently does not accept orders or payments. Adding an item to your shopping bag does not reserve stock, create a contract or place an order.</p></section>
          <section><h2 className="font-serif text-2xl text-[#3A1825]">3. Product fulfilment</h2><p className="mt-3">The current launch range is fulfilled through Printify and its independent Print Providers. Product, production, shipping and service information may change. LUNÉVIA does not control third-party websites or services linked from this website.</p></section>
          <section><h2 className="font-serif text-2xl text-[#3A1825]">4. Intellectual property</h2><p className="mt-3">Unless otherwise stated, the LUNÉVIA name, brand presentation, website design and original website content are intended for use by LUNÉVIA. You may not copy, reproduce or commercially exploit those materials without permission. Product images and third-party materials may belong to their respective owners.</p></section>
          <section><h2 className="font-serif text-2xl text-[#3A1825]">5. Availability and changes</h2><p className="mt-3">We may update, suspend or remove website content or features as the storefront develops. We aim to keep the website available and accurate, but do not guarantee uninterrupted access or that every item of information is error-free.</p></section>
          <section><h2 className="font-serif text-2xl text-[#3A1825]">6. Delivery, returns and consumer rights</h2><p className="mt-3">Information about Printify production, shipping, delivery issues and eligible returns or refunds is set out in our <a className="text-[#3A1825] underline decoration-[#C9A96E] underline-offset-4" href="/shipping-returns">Shipping &amp; Returns Policy</a>. Nothing in these terms or that policy is intended to exclude rights or remedies that cannot lawfully be excluded under applicable consumer-protection law. Any order-specific terms will be presented before purchasing is enabled.</p></section>
          <section><h2 className="font-serif text-2xl text-[#3A1825]">7. Contact</h2><p className="mt-3">For questions about these terms, contact <a className="text-[#3A1825] underline decoration-[#C9A96E] underline-offset-4" href="mailto:shoplunevias@gmail.com">shoplunevias@gmail.com</a>.</p></section>
        </div>
        <p className="mt-12 border-t border-[#3A1825]/15 pt-6 text-xs leading-6 text-[#75675D]">These terms are a basic website-use notice, not a jurisdiction-specific legal review. Business identity, governing law, delivery, returns, cancellations and refund provisions must be confirmed before accepting customer orders.</p>
      </article>
    </main>
  );
}