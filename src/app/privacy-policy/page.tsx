import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Learn how LUNÉVIA handles information when you use this website.",
};

export default function PrivacyPolicyPage() {
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
        <p className="text-[9px] tracking-[0.32em] text-[#A88753]">YOUR INFORMATION</p>
        <h1 className="mt-5 font-serif text-4xl text-[#3A1825] md:text-6xl">Privacy Policy<span className="text-[#C9A96E]">.</span></h1>
        <p className="mt-5 text-xs text-[#75675D]">Last updated: 4 November 2026</p>
        <p className="mt-8 text-sm leading-7 text-[#75675D]">
          This policy explains the limited information involved when you visit the LUNÉVIA website. Online purchasing is currently unavailable. This policy describes the website’s current functionality and will be updated before any customer checkout or additional data collection is introduced.
        </p>
        <div className="mt-12 space-y-9 text-sm leading-7 text-[#66584F]">
          <section>
            <h2 className="font-serif text-2xl text-[#3A1825]">1. Information you choose to share</h2>
            <p className="mt-3">If you contact LUNÉVIA by email, the information you include in your message—such as your email address, name if provided, and enquiry details—will be available to us so we can read and respond to your enquiry. Please avoid sending sensitive personal information unless it is necessary for your request.</p>
          </section>
          <section>
            <h2 className="font-serif text-2xl text-[#3A1825]">2. Shopping bag storage</h2>
            <p className="mt-3">The website currently uses your browser’s local storage to remember items you add to your shopping bag on that device. This information stays in your browser and is used to display your saved selections. The shopping bag does not submit an order or process a payment.</p>
          </section>
          <section>
            <h2 className="font-serif text-2xl text-[#3A1825]">3. Website operation and security</h2>
            <p className="mt-3">The website is hosted online. The hosting and infrastructure providers may process technical information, such as request and diagnostic data, as part of delivering, maintaining and protecting the website. We do not use information from your shopping bag to identify you.</p>
          </section>
          <section>
            <h2 className="font-serif text-2xl text-[#3A1825]">4. Sharing and third parties</h2>
            <p className="mt-3">We do not sell your personal information. When you choose to email us, your message is handled by the email service you use and the services involved in delivering it. The storefront retrieves product catalogue information from Printify through our hosting service and requests daily reference exchange rates from Frankfurter in your browser to display your selected currency. These requests do not include your saved shopping bag or submit an order. Product and editorial images are hosted by third-party image providers, which your browser contacts to load those images.</p>
          </section>
          <section>
            <h2 className="font-serif text-2xl text-[#3A1825]">5. Your choices</h2>
            <p className="mt-3">You can clear the website’s saved shopping bag by clearing this site’s local storage or browser site data. You can choose not to email us. Applicable privacy laws may give you additional rights regarding personal information; these depend on your location and circumstances.</p>
          </section>
          <section>
            <h2 className="font-serif text-2xl text-[#3A1825]">6. Contact</h2>
            <p className="mt-3">For privacy questions or requests, contact <a className="text-[#3A1825] underline decoration-[#C9A96E] underline-offset-4" href="mailto:shoplunevias@gmail.com">shoplunevias@gmail.com</a>.</p>
          </section>
        </div>
        <p className="mt-12 border-t border-[#3A1825]/15 pt-6 text-xs leading-6 text-[#75675D]">This page describes the website’s current features. It is not a substitute for a jurisdiction-specific legal review. The policy must be reviewed and expanded before checkout, analytics, advertising or additional customer-data features are enabled.</p>
      </article>
    </main>
  );
}
