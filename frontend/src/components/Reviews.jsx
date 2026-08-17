import Stars from "@/components/Stars";

const Reviews = ({ reviews }) => (
  <section id="reviews" data-testid="reviews-section" className="py-16 md:py-24 border-t-2 border-foreground">
    <div className="max-w-7xl mx-auto px-4 md:px-8">
      <div className="flex items-end justify-between gap-6 flex-wrap mb-10">
        <div>
          <p className="font-accent text-2xl text-primary -rotate-1">from the group chat</p>
          <h2 className="font-headings text-4xl md:text-5xl font-bold tracking-tight">Squeezers say it best</h2>
        </div>
        <p className="text-muted-foreground font-medium">scroll for the real ones →</p>
      </div>
      <div data-testid="reviews-scroll" className="reviews-scroll flex gap-6 overflow-x-auto pb-6 snap-x">
        {reviews.map((r, i) => (
          <article
            key={i}
            data-testid={`review-card-${i}`}
            className="snap-start shrink-0 w-72 md:w-80 bg-white border-2 border-foreground rounded-xl p-6 tactile-shadow hover:-translate-y-1 transition-transform"
          >
            <div className="flex items-center gap-3 mb-4">
              <img
                src={r.photo}
                alt={r.name}
                className="w-12 h-12 rounded-full border-2 border-foreground object-cover"
                loading="lazy"
              />
              <div>
                <p className="font-bold text-sm">{r.name}</p>
                <Stars rating={r.rating} size={13} />
              </div>
            </div>
            <p className="text-sm md:text-base leading-relaxed">{r.text}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Reviews;
