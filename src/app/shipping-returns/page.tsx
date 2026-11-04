import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping & Returns",
  description: "Shipping, delivery, returns and refund information for LUNÉVIA Printify products.",
};

export default function ShippingReturnsPage() {
  return (
    <main className="min-h-screen bg-[#FAF6F1] text-[#2C1A0E]">
      <header className="bg-[#3A1825] px-6 py-8 text-center text-[#FAF6F1]">
        <a href="/" className="font-serif text-2xl tracking-[0.2em]">LUNÉVIA<span className="text-[#C9A96E]">.</span></a>
        <p className="mt-2 text-[10px] tracking-[0.16em] text-[#E8DCD5]">Elevate the everyday.</p>
        <nav aria-label="Main navigation" className="mx-auto mt-6 flex flex-wrap justify-center gap-x-7 gap-y-3 border-t border-[#C9A96E]/30 pt-5 text-[10px] uppercase tracking-[0.14em]">
          <a href="/" className="hover:text-[#C9A96E]">Home</a>
          <a href="/shop" className="hover:text-[#C9A96E]">Shop</a>
          <a href="/contact" className="hover:text-[#C9A96E]">Contact</a>
          <a href="/cart" className="hover:text-[#C9A96E]">Bag</a>
        </nav>
      </header>
      <div className="border-b border-[#3A1825]/10 bg-[#F2EBE3] px-4 py-2 text-center text-[9px] uppercase tracking-[0.12em] text-[#75675D]">
        Purchasing is temporarily unavailable. Displayed prices are for reference only.
      </div>
      <article className="mx-auto max-w-4xl px-6 py-16 md:py-24">
        <p className="text-[9px] tracking-[0.32em] text-[#A88753]">DELIVERY & CUSTOMER CARE</p>
        <h1 className="mt-5 font-serif text-4xl text-[#3A1825] md:text-6xl">Shipping & Returns<span className="text-[#C9A96E]">.</span></h1>
        <p className="mt-5 text-xs text-[#75675D]">Last updated: 4 November 2026</p>
        <p className="mt-8 text-sm leading-7 text-[#75675D]">
          This policy is for products fulfilled through Printify. LUNÉVIA is currently preparing its storefront and is not accepting orders or payments. The information below is provided so customers can understand the intended fulfilment process before purchasing is enabled.
        </p>
        <div className="mt-12 space-y-9 text-sm leading-7 text-[#66584F]">
          <section>
            <h2 className="font-serif text-2xl text-[#3A1825]">1. Order production</h2>
            <p className="mt-3">LUNÉVIA Printify products are made to order. Printify advises that most orders ship within approximately 2–7 business days after submission. Production can take longer depending on the product, print provider, order size, holidays and demand. Production estimates are not guaranteed delivery dates.</p>
          </section>
          <section>
            <h2 className="font-serif text-2xl text-[#3A1825]">2. Shipping times and costs</h2>
            <p className="mt-3">Shipping time and cost depend on the product, the Print Provider fulfilling it, the shipping method and the delivery destination. The applicable shipping options and charges will be displayed at checkout before an order is placed. We do not promise one flat shipping fee or one delivery timeframe for every product or destination.</p>
            <p className="mt-3">Products fulfilled by different Print Providers may be shipped separately and may arrive in more than one parcel. Where tracking is available, tracking details will be shared through the order or fulfilment updates.</p>
            <p className="mt-3">Any delivery dates shown by a carrier or fulfilment provider are estimates and may be affected by customs, local delivery services, weather, public holidays or other events outside LUNÉVIA’s control.</p>
          </section>
          <section>
            <h2 className="font-serif text-2xl text-[#3A1825]">3. Damaged, defective or incorrect items</h2>
            <p className="mt-3">If an item arrives damaged, has a manufacturing defect or is materially different from what was ordered, contact LUNÉVIA at <a className="text-[#3A1825] underline decoration-[#C9A96E] underline-offset-4" href="mailto:shoplunevias@gmail.com">shoplunevias@gmail.com</a> as soon as possible. Include your order number, a description of the issue and clear photographs of the affected item and packaging where relevant.</p>
            <p className="mt-3">Printify’s current policy generally requires an issue to be reported within 30 calendar days of delivery. If the issue is eligible, Printify may provide a free reprint or refund. A return of the affected product is generally not required for an eligible Printify quality claim. LUNÉVIA will review the information and coordinate the claim with the fulfilment provider.</p>
          </section>
          <section>
            <h2 className="font-serif text-2xl text-[#3A1825]">4. Change of mind, size and colour selection</h2>
            <p className="mt-3">Because Printify products are made to order, Printify does not generally support returns or exchanges where a customer changes their mind or selects the wrong size or colour. Please review the product description, sizing information, images and selected variant carefully before placing an order.</p>
          </section>
          <section>
            <h2 className="font-serif text-2xl text-[#3A1825]">5. Delivery problems</h2>
            <p className="mt-3">If tracking appears stalled, a parcel has not arrived, or delivery was unsuccessful, contact us with your order number and the latest tracking information. We will review the case with the fulfilment provider. Resolutions depend on the circumstances and the provider’s investigation.</p>
          </section>
          <section>
            <h2 className="font-serif text-2xl text-[#3A1825]">6. Contact</h2>
            <p className="mt-3">For shipping, delivery, damage or refund enquiries, email <a className="text-[#3A1825] underline decoration-[#C9A96E] underline-offset-4" href="mailto:shoplunevias@gmail.com">shoplunevias@gmail.com</a>.</p>
          </section>
        </div>
        <p className="mt-12 border-t border-[#3A1825]/15 pt-6 text-xs leading-6 text-[#75675D]">
          This summary reflects Printify’s published fulfilment and returns guidance at the time of writing and may change. It does not limit any rights or remedies that cannot lawfully be excluded under applicable consumer-protection law. The final policy and checkout settings must be reviewed before LUNÉVIA begins accepting orders.
        </p>
      </article>
    </main>
  );
}
