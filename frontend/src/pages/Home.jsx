import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, BadgeCheck } from "lucide-react";
import { getContent } from "@/lib/api";
import MarqueeStrip from "@/components/MarqueeStrip";
import Stars from "@/components/Stars";

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.55, ease: "easeOut" },
};

const Home = () => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    getContent().then(setContent).catch(console.error);
  }, []);

  if (!content) {
    return (
      <div data-testid="home-loading" className="min-h-[60vh] flex items-center justify-center font-headings text-2xl font-semibold">
        squeezing…
      </div>
    );
  }

  const { hero, marquee, story } = content;
  const product = content.products[0];
  const off = Math.round((1 - product.price / product.compareAt) * 100);

  return (
    <div data-testid="home-page">
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pt-12 md:pt-20 pb-16 md:pb-24 grid md:grid-cols-12 gap-12 items-center">
        <motion.div
          className="md:col-span-7 space-y-6"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <span
            data-testid="hero-eyebrow"
            className="inline-block bg-secondary border-2 border-foreground rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest tactile-shadow-sm -rotate-1"
          >
            {hero.eyebrow}
          </span>
          <h1 className="font-headings text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter uppercase leading-[0.95]">
            {hero.titleLine1} {hero.titleLine2}{" "}
            <span className="relative inline-block text-primary">
              {hero.titleAccent}
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 120 10" preserveAspectRatio="none" aria-hidden="true">
                <path d="M2 7 Q 30 1 60 6 T 118 4" fill="none" stroke="hsl(var(--foreground))" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <p data-testid="hero-subtitle" className="text-base md:text-lg leading-relaxed font-medium max-w-xl text-foreground/80">
            {hero.subtitle}
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              to={`/product/${product.slug}`}
              data-testid="hero-primary-cta"
              className="tactile-btn bg-primary text-white font-headings uppercase text-lg tracking-wide rounded-full px-8 py-4 inline-flex items-center gap-2"
            >
              {hero.primaryCta} <ArrowRight size={20} />
            </Link>
            <a
              href="#story"
              data-testid="hero-secondary-cta"
              className="tactile-btn bg-white font-headings uppercase text-lg tracking-wide rounded-full px-8 py-4"
            >
              {hero.secondaryCta}
            </a>
          </div>
          <div className="flex items-center gap-3 pt-2">
            <Stars rating={5} />
            <span data-testid="hero-rating-text" className="text-sm font-semibold text-muted-foreground">{hero.ratingText}</span>
          </div>
        </motion.div>

        <motion.div
          className="md:col-span-5 relative"
          initial={{ opacity: 0, scale: 0.94, rotate: 4 }}
          animate={{ opacity: 1, scale: 1, rotate: 2 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
        >
          <svg className="absolute -top-8 -left-8 w-16 h-16 text-accent float-slow" style={{ "--float-rot": "12deg" }} viewBox="0 0 24 24" fill="currentColor" stroke="hsl(var(--foreground))" strokeWidth="1.2" aria-hidden="true">
            <path d="M12 2l2.4 6.6L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4z" />
          </svg>
          <div className="border-2 border-foreground rounded-2xl overflow-hidden tactile-shadow bg-white p-3">
            <img
              data-testid="hero-image"
              src={hero.image}
              alt="Hand holding a phone with a SqueezeCase covered in stickers"
              className="rounded-xl w-full h-[380px] md:h-[460px] object-cover"
            />
          </div>
          <span
            data-testid="hero-badge"
            className="absolute -bottom-5 -left-4 bg-secondary border-2 border-foreground rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider tactile-shadow-sm -rotate-3 inline-flex items-center gap-1.5"
          >
            <BadgeCheck size={15} /> {hero.badge}
          </span>
          <span className="absolute -top-4 -right-3 bg-primary text-white border-2 border-foreground rounded-full px-4 py-2 font-accent text-xl rotate-3 tactile-shadow-sm inline-flex items-center gap-1">
            <Sparkles size={15} /> made by Maya
          </span>
        </motion.div>
      </section>

      <MarqueeStrip items={marquee} />

      {/* STORY */}
      <section id="story" data-testid="story-section" className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-28 grid md:grid-cols-12 gap-12 items-center">
        <motion.div {...fadeUp} className="md:col-span-5 relative">
          <div className="bg-white border-2 border-foreground rounded-2xl p-4 tactile-shadow -rotate-3 hover:rotate-0 transition-transform duration-300">
            <img
              data-testid="story-image"
              src={story.image}
              alt="Maya, founder of SqueezeCase, smiling"
              className="rounded-xl w-full h-[340px] md:h-[420px] object-cover"
            />
            <p className="font-accent text-2xl text-center pt-3">hi, it's me — Maya</p>
          </div>
          <div
            data-testid="story-quote-card"
            className="absolute -bottom-10 -right-2 md:-right-8 bg-accent border-2 border-foreground rounded-xl p-4 max-w-[240px] tactile-shadow rotate-2"
          >
            <p className="font-accent text-xl md:text-2xl leading-snug">“{story.quote}”</p>
            <p className="font-accent text-lg text-primary mt-1">— {story.signature}</p>
          </div>
        </motion.div>
        <motion.div {...fadeUp} className="md:col-span-7 space-y-6 md:pl-6 pt-8 md:pt-0">
          <p className="font-accent text-2xl text-primary -rotate-1">{story.eyebrow}</p>
          <h2 className="font-headings text-4xl md:text-5xl font-bold tracking-tight">{story.heading}</h2>
          <div className="space-y-4 text-base md:text-lg leading-relaxed font-medium text-foreground/85">
            {story.lines.map((line, i) => (
              <p key={i} data-testid={`story-line-${i}`}>{line}</p>
            ))}
          </div>
          <div className="flex items-center gap-4 pt-2">
            <span className="bg-primary text-white border-2 border-foreground rounded-xl px-5 py-3 tactile-shadow-sm -rotate-1">
              <span data-testid="story-stat-value" className="font-headings text-3xl font-bold block">{story.statValue}</span>
            </span>
            <p className="font-semibold text-sm uppercase tracking-wide max-w-[160px]">{story.statLabel}</p>
          </div>
        </motion.div>
      </section>

      {/* FEATURED PRODUCT */}
      <section data-testid="featured-product-section" className="bg-secondary border-y-2 border-foreground py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid md:grid-cols-12 gap-12 items-center">
          <motion.div {...fadeUp} className="md:col-span-6 relative">
            <div className="bg-white border-2 border-foreground rounded-2xl p-3 tactile-shadow rotate-1 hover:rotate-0 transition-transform duration-300">
              <img
                data-testid="featured-product-image"
                src={product.images[0]}
                alt={product.name}
                className="rounded-xl w-full h-[340px] md:h-[440px] object-cover"
              />
            </div>
            <span className="absolute -top-4 right-6 bg-primary text-white text-sm font-bold px-3 py-1.5 rounded-md border-2 border-foreground rotate-3 tactile-shadow-sm">
              {off}% OFF
            </span>
          </motion.div>
          <motion.div {...fadeUp} className="md:col-span-6 space-y-5">
            <p className="font-accent text-2xl text-primary -rotate-1">the one everyone asks about</p>
            <h2 className="font-headings text-4xl md:text-5xl font-bold tracking-tight">{product.name}</h2>
            <div className="flex items-center gap-2">
              <Stars rating={product.rating} />
              <span className="text-sm font-semibold text-muted-foreground">({product.reviewCount} reviews)</span>
            </div>
            <p className="text-base md:text-lg leading-relaxed font-medium text-foreground/85">{product.tagline}</p>
            <div className="flex items-baseline gap-3">
              <span data-testid="featured-price" className="font-headings text-4xl font-bold text-primary">
                {product.currency}{product.price.toFixed(2)}
              </span>
              <span className="text-xl text-muted-foreground line-through font-semibold">
                {product.currency}{product.compareAt.toFixed(2)}
              </span>
            </div>
            <ul className="space-y-2">
              {product.features.slice(0, 3).map((f, i) => (
                <li key={i} className="flex items-start gap-2 font-medium text-sm md:text-base">
                  <BadgeCheck size={18} className="text-primary shrink-0 mt-0.5" /> {f}
                </li>
              ))}
            </ul>
            <Link
              to={`/product/${product.slug}`}
              data-testid="featured-product-cta"
              className="tactile-btn bg-foreground text-white font-headings uppercase text-lg tracking-wide rounded-full px-8 py-4 inline-flex items-center gap-2"
            >
              Grab yours <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CHOOSE YOUR DESIGN */}
      <section id="designs" data-testid="designs-section" className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-28">
        <motion.div {...fadeUp} className="mb-12 md:mb-16">
          <p className="font-accent text-2xl text-primary -rotate-1">pick your fighter</p>
          <h2 className="font-headings text-4xl md:text-5xl font-bold tracking-tight">Choose your design</h2>
          <p className="text-base md:text-lg font-medium text-foreground/80 max-w-xl mt-3">
            Same indestructible case, four different personalities. Which one sounds like you?
          </p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {content.products.map((p, i) => {
            const rotations = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2"];
            const offsets = ["lg:mt-0", "lg:mt-10", "lg:mt-3", "lg:mt-12"];
            const pOff = Math.round((1 - p.price / p.compareAt) * 100);
            return (
              <motion.div
                key={p.slug}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={offsets[i % 4]}
              >
                <Link
                  to={`/product/${p.slug}`}
                  data-testid={`design-card-${p.slug}`}
                  className={`block bg-white border-2 border-foreground rounded-2xl p-3 tactile-shadow hover:rotate-0 hover:-translate-y-1 transition-transform ${rotations[i % 4]}`}
                >
                  <div className="relative">
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      loading="lazy"
                      className="rounded-xl w-full h-56 object-cover border-2 border-foreground"
                    />
                    <span className="absolute -top-3 -right-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded-md border-2 border-foreground rotate-6">
                      {pOff}% OFF
                    </span>
                  </div>
                  <div className="px-1 pt-4 pb-1 space-y-2">
                    <p data-testid={`design-name-${p.slug}`} className="font-headings text-xl font-bold">{p.name}</p>
                    <div className="flex items-center gap-1.5">
                      <Stars rating={p.rating} size={12} />
                      <span className="text-xs font-semibold text-muted-foreground">
                        {p.rating} · {p.reviewCount.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span data-testid={`design-price-${p.slug}`} className="font-headings text-lg font-bold text-primary">
                        {p.currency}{p.price.toFixed(2)}
                      </span>
                      <span className="text-sm text-muted-foreground line-through font-semibold">
                        {p.currency}{p.compareAt.toFixed(2)}
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide border-2 border-foreground rounded-full px-3 py-1 bg-accent tactile-shadow-sm">
                      Peek the details <ArrowRight size={12} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CLOSING CTA */}
      <section data-testid="closing-cta" className="max-w-5xl mx-auto px-4 md:px-8 py-16 md:py-24 text-center">
        <motion.div {...fadeUp} className="space-y-6">
          <p className="font-accent text-3xl text-primary -rotate-1">your phone deserves a backbone too</p>
          <h2 className="font-headings text-4xl md:text-6xl font-bold tracking-tighter uppercase leading-none">
            Join 10,000+ brave ones
          </h2>
          <Link
            to={`/product/${product.slug}`}
            data-testid="closing-cta-button"
            className="tactile-btn bg-primary text-white font-headings uppercase text-lg tracking-wide rounded-full px-10 py-4 inline-flex items-center gap-2"
          >
            Shop The Brave One <ArrowRight size={20} />
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
