"use client";

import { useCart } from "@/components/CartProvider";

const collections = [
  {
    number: "01",
    name: "Beauty & Care",
    description: "Thoughtful touches for your daily rituals.",
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=900",
    href: "/shop?category=beauty-care",
    comingSoon: true,
  },
  {
    number: "02",
    name: "Home & Living",
    description: "Considered details for the spaces you call yours.",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=900",
    href: "/shop?category=home-living",
    comingSoon: false,
  },
  {
    number: "03",
    name: "Everyday Essentials",
    description: "Useful pieces for wherever the day takes you.",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=900",
    href: "/shop?category=everyday-essentials",
    comingSoon: false,
  },
];

export default function Home() {
  const { cartCount } = useCart();

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
            <a href="/" className="whitespace-nowrap text-[#C9A96E]">Home</a>
            <a href="/shop" className="whitespace-nowrap transition hover:text-[#C9A96E]">Shop</a>
            <a href="/#philosophy" className="whitespace-nowrap transition hover:text-[#C9A96E]">Our Philosophy</a>
            <a href="/cart" aria-label={`Shopping bag, ${cartCount} items`} className="inline-flex shrink-0 items-center gap-1.5 transition hover:text-[#C9A96E]">
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


      <section className="grid min-h-[620px] bg-[#3A1825] md:grid-cols-2">
        <div className="flex flex-col justify-center px-8 py-20 text-[#FAF6F1] md:px-14 lg:px-24">
          <p className="text-[9px] tracking-[0.34em] text-[#C9A96E]">THE ART OF EVERYDAY LIVING</p>
          <h1 className="mt-8 max-w-xl font-serif text-5xl leading-[1.12] md:text-6xl lg:text-7xl">
            Elevate the<br />everyday<span className="text-[#C9A96E]">.</span>
          </h1>
          <p className="mt-7 max-w-sm text-sm leading-7 text-[#E6D7D2]">
            Considered pieces that bring a little more beauty, comfort and inspiration to everyday living.
          </p>
          <div className="mt-10">
            <a href="/shop" className="inline-flex items-center gap-5 border border-[#C9A96E] px-7 py-4 text-[9px] uppercase tracking-[0.2em] text-[#FAF6F1] transition hover:bg-[#C9A96E] hover:text-[#3A1825]">
              Discover the collection <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
        <div
          role="img"
          aria-label="A calm, thoughtfully styled living space"
          className="min-h-[360px] bg-cover bg-center md:min-h-full"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1400')" }}
        />
      </section>

      <section id="philosophy" className="px-6 py-24 text-center md:py-32">
        <p className="text-[9px] tracking-[0.32em] text-[#A88753]">A LITTLE MORE INTENTION</p>
        <h2 className="mx-auto mt-6 max-w-2xl font-serif text-3xl leading-snug text-[#3A1825] md:text-5xl">
          More than products.<br />A considered way of living.
        </h2>
        <p className="mx-auto mt-7 max-w-xl text-sm leading-7 text-[#75675D]">
          We believe the smallest details can make a meaningful difference. Explore thoughtfully selected pieces that bring beauty, function and inspiration into everyday living.
        </p>
      </section>

      <section id="collections" className="bg-[#F2EBE3] px-6 py-20 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col justify-between gap-5 md:mb-14 md:flex-row md:items-end">
            <div>
              <p className="text-[9px] tracking-[0.32em] text-[#A88753]">EXPLORE OUR WORLD</p>
              <h2 className="mt-4 font-serif text-4xl text-[#3A1825] md:text-5xl">Discover the Collection</h2>
            </div>
            <p className="max-w-xs text-sm leading-6 text-[#75675D]">Thoughtfully selected pieces for every part of your day.</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3 md:gap-6">
            {collections.map((item) => {
              const cardContent = (
                <>
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#E4D9CE]">
                    <div className={`absolute inset-0 bg-cover bg-center transition duration-700 ${item.comingSoon ? "" : "group-hover:scale-[1.03]"}`} style={{ backgroundImage: `url('${item.image}')` }} />
                    {item.comingSoon && (
                      <div className="absolute inset-0 flex items-center justify-center bg-[#3A1825]/45">
                        <span className="border border-[#FAF6F1]/80 px-6 py-4 text-xs tracking-[0.28em] text-[#FAF6F1]">
                          COMING SOON
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-start justify-between gap-4 pt-5">
                    <div>
                      <p className="text-[9px] tracking-[0.2em] text-[#A88753]">{item.number}</p>
                      <h3 className="mt-2 font-serif text-2xl text-[#3A1825]">{item.name}</h3>
                      <p className="mt-2 text-xs leading-6 text-[#75675D]">{item.description}</p>
                    </div>
                    {!item.comingSoon && (
                      <span className="mt-1 text-lg text-[#A88753] transition group-hover:translate-x-1" aria-hidden="true">↗</span>
                    )}
                  </div>
                </>
              );

              return item.comingSoon ? (
                <div key={item.number} className="group block cursor-default" aria-disabled="true">
                  {cardContent}
                </div>
              ) : (
                <a key={item.number} href={item.href} className="group block">
                  {cardContent}
                </a>
              );
            })}
          </div>
          <div className="mt-14 text-center">
            <a href="/shop" className="inline-block border-b border-[#3A1825] pb-2 text-[10px] uppercase tracking-[0.2em] text-[#3A1825] transition hover:border-[#C9A96E] hover:text-[#A88753]">View all pieces</a>
          </div>
        </div>
      </section>

      <section className="bg-[#3A1825] px-6 py-24 text-center text-[#FAF6F1] md:py-28">
        <p className="text-[9px] tracking-[0.32em] text-[#C9A96E]">THE LUNÉVIA PHILOSOPHY</p>
        <h2 className="mx-auto mt-7 max-w-3xl font-serif text-3xl leading-snug md:text-5xl">Thoughtfully chosen for everyday living.</h2>
        <p className="mt-6 text-[9px] tracking-[0.25em] text-[#E6D7D2]">SIMPLE DETAILS. MEANINGFUL DIFFERENCE.</p>
      </section>

    </main>
  );
}
