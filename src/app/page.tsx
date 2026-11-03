
const collections = [
  {
    number: "01",
    name: "Beauty & Care",
    description: "Thoughtful touches for your daily rituals.",
    image:
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=900",
  },
  {
    number: "02",
    name: "Home & Living",
    description: "Elevate the spaces you call yours.",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=900",
  },
  {
    number: "03",
    name: "Everyday Essentials",
    description: "Designed around the way you live.",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=900",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAF6F1] text-[#2C1A0E]">
      {/* Announcement */}
      <div className="bg-[#3A1825] px-4 py-2 text-center text-[10px] tracking-[0.2em] text-[#F8E9D8]">
        COMPLIMENTARY DELIVERY ON ORDERS OVER $30
      </div>

      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-[#3A1825]/10 bg-[#FAF6F1]/95 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a
            href="#home"
            className="text-2xl font-serif tracking-[0.18em] text-[#3A1825]"
          >
            LUNÉVIA<span className="text-[#C9A96E]">.</span>
          </a>

          <div className="hidden items-center gap-9 text-[11px] uppercase tracking-[0.18em] md:flex">
            <a href="#home" className="hover:text-[#C9A96E]">Home</a>
            <a href="#collections" className="hover:text-[#C9A96E]">Collections</a>
            <a href="#about" className="hover:text-[#C9A96E]">Our Story</a>
            <a href="#contact" className="hover:text-[#C9A96E]">Contact</a>
          </div>

          <a
            href="#collections"
            className="border border-[#3A1825] px-5 py-2.5 text-[10px] uppercase tracking-[0.15em] transition hover:bg-[#3A1825] hover:text-white"
          >
            Explore
          </a>
        </nav>
      </header>

      {/* Hero */}
      <section id="home" className="relative overflow-hidden bg-[#3A1825]">
        <div className="mx-auto grid min-h-[600px] max-w-7xl md:grid-cols-2">
          <div className="flex flex-col justify-center px-8 py-24 text-[#FAF6F1] md:px-16 lg:px-24">
            <p className="mb-7 text-[10px] tracking-[0.35em] text-[#C9A96E]">
              THE ART OF EVERYDAY LIVING
            </p>

            <h1 className="max-w-xl font-serif text-5xl leading-[1.15] md:text-7xl">
              Elevate the
              <br />
              everyday<span className="text-[#C9A96E]">.</span>
            </h1>

            <p className="mt-7 max-w-sm text-sm leading-7 text-[#E6D7D2]">
              Thoughtfully curated essentials for the moments that make
              everyday living extraordinary.
            </p>

            <div className="mt-10">
              <a
                href="#collections"
                className="inline-block border border-[#C9A96E] bg-[#C9A96E] px-9 py-4 text-[10px] uppercase tracking-[0.2em] text-[#3A1825] transition hover:bg-transparent hover:text-[#C9A96E]"
              >
                Discover LUNÉVIA
              </a>
            </div>

            <p className="mt-16 text-[9px] tracking-[0.3em] text-[#C9A96E]/70">
              THOUGHTFULLY CHOSEN. BEAUTIFULLY LIVED.
            </p>
          </div>

          <div
            className="min-h-[350px] bg-cover bg-center md:min-h-full"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1400')",
            }}
          />
        </div>
      </section>

      {/* Introduction */}
      <section id="about" className="px-6 py-24 text-center">
        <p className="text-[10px] tracking-[0.3em] text-[#A88753]">
          A LITTLE MORE INTENTION
        </p>

        <h2 className="mt-5 font-serif text-3xl leading-relaxed text-[#3A1825] md:text-5xl">
          More than things.
          <br />
          A way of living.
        </h2>

        <p className="mx-auto mt-6 max-w-lg text-sm leading-7 text-[#75675D]">
          At LUNÉVIA, we believe the smallest details can make the biggest
          difference. Discover thoughtfully selected pieces that bring
          beauty, function and inspiration into your everyday.
        </p>
      </section>

      {/* Collections */}
      <section id="collections" className="bg-[#F2EBE3] px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-[10px] tracking-[0.3em] text-[#A88753]">
                EXPLORE OUR WORLD
              </p>
              <h2 className="mt-4 font-serif text-4xl text-[#3A1825] md:text-5xl">
                Discover the collections
              </h2>
            </div>

            <p className="max-w-xs text-sm leading-6 text-[#75675D]">
              Curated categories for every corner of your lifestyle.
            </p>
          </div>

          <div className="grid gap-7 md:grid-cols-3">
            {collections.map((item) => (
              <a href="#contact" key={item.number} className="group">
                <div className="relative aspect-[4/5] overflow-hidden bg-[#E4D9CE]">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url('${item.image}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <span className="absolute bottom-7 left-7 text-[10px] tracking-[0.2em] text-white/70">
                    COLLECTION {item.number}
                  </span>
                </div>

                <h3 className="mt-6 font-serif text-2xl text-[#3A1825]">
                  {item.name}
                </h3>
                <p className="mt-2 text-xs leading-6 text-[#75675D]">
                  {item.description}
                </p>
                <span className="mt-4 inline-block border-b border-[#C9A96E] pb-1 text-[10px] uppercase tracking-[0.2em] text-[#3A1825]">
                  Explore collection →
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Brand statement */}
      <section className="bg-[#3A1825] px-6 py-24 text-center text-[#FAF6F1]">
        <p className="text-[10px] tracking-[0.3em] text-[#C9A96E]">
          THE LUNÉVIA PHILOSOPHY
        </p>
        <h2 className="mx-auto mt-7 max-w-3xl font-serif text-3xl leading-relaxed md:text-5xl">
          Thoughtfully chosen for everyday living.
        </h2>
        <p className="mt-6 text-xs tracking-[0.15em] text-[#E6D7D2]">
          SIMPLE DETAILS. MEANINGFUL DIFFERENCE.
        </p>
      </section>

      {/* Footer */}
      <footer id="contact" className="px-6 py-14">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-10 md:flex-row">
          <div>
            <h2 className="font-serif text-3xl tracking-[0.15em] text-[#3A1825]">
              LUNÉVIA<span className="text-[#C9A96E]">.</span>
            </h2>
            <p className="mt-3 text-xs text-[#75675D]">
              Elevate the everyday.
            </p>
          </div>

          <div className="flex flex-col gap-3 text-[10px] uppercase tracking-[0.15em] text-[#75675D]">
            <a href="#home">Home</a>
            <a href="#collections">Collections</a>
            <a href="#about">Our Story</a>
            <a href="mailto:hello@lunevia.com">Contact</a>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-7xl border-t border-[#3A1825]/15 pt-6 text-center text-[10px] text-[#75675D]">
          © {new Date().getFullYear()} LUNÉVIA. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
