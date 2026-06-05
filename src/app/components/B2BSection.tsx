import Image from "next/image";
import Link from "next/link";

const cards = [
  {

    title: "Wholesale & B2B",
    description:
      "Tiered pricing, credit terms, and a dedicated account manager. From restaurants to national retail chains.",
    image: "/wholesale-&-B2B.png",
    href: "/B2B",
  },
  {
    title: "Private Label",
    description:
      "Launch your own spice range. We handle sourcing, blending, packaging, and compliance — your brand, our craft.",
    image: "/private-label.png",
    href: "/PrivateLabel",
  },
];

export default function B2BCards() {
  return (
    <section className="bg-black py-24 px-6">
      <div className="mx-auto max-w-6xl grid gap-6 lg:grid-cols-2">
        {cards.map((card) => (
          <div
            key={card.title}
            className="group overflow-hidden rounded-[28px] border border-white/10 bg-[#0a0a0a] transition-all duration-500 hover:border-white/20 hover:shadow-[0_20px_80px_rgba(255,255,255,0.06)]"
          >
            {/* Image */}
            <div className="relative h-[320px] overflow-hidden">
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Small badge on image */}

            </div>

            {/* Content */}
            <div className="relative p-5 md:p-6">
              {/* Decorative line */}
              <div className="mb-4 h-px w-12 bg-white/20" />

              <h3 className="text-xl md:text-3xl font-bold text-white">
                {card.title}
              </h3>

              <p className="mt-3 text-sm md:text-base text-zinc-400 leading-relaxed">
                {card.description}
              </p>

              <Link
                href={card.href}
                className="mt-2 inline-flex items-center gap-2 group"
              >
                <span className="underline decoration-white underline-offset-4 text-white">
                  Learn More
                </span>

                <span className="flex items-center justify-center text-white text-lg font-bold transition-all duration-300 group-hover:text-amber-400">
                  →
                </span>
              </Link>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
}