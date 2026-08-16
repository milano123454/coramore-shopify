import site from "@/config/site";
import TrustpilotStars from "@/components/TrustpilotStars";
import Reveal from "@/components/Reveal";

// Aggregated rating + customers + trust logos strip
export const SocialProof = () => {
  const d = site.socialProof;
  return (
    <section className="border-y border-ink/10 bg-white" data-testid="social-proof-section">
      <div className="container-sc flex flex-col items-center gap-8 py-14 md:flex-row md:justify-between">
        <Reveal className="flex items-center gap-5">
          <p className="font-display text-6xl font-black tracking-tight" data-testid="social-proof-average">{d.average}</p>
          <div>
            <TrustpilotStars value={d.average} size={14} testId="social-proof-stars" />
            <p className="mt-1.5 text-sm font-bold">{d.label}</p>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="text-center">
          <p className="font-display text-4xl font-black tracking-tight text-flame" data-testid="social-proof-customers">{d.customers}</p>
          <p className="text-sm font-semibold text-smoke">{d.customersLabel}</p>
        </Reveal>
        <Reveal delay={0.2} className="flex flex-wrap items-center justify-center gap-2" >
          {d.logos.map((l) => (
            <span key={l} className={`rounded-full border px-4 py-2 text-sm font-black ${l === "Trustpilot" ? "border-trustpilot/30 text-trustpilot" : l === "Klarna" ? "border-klarna bg-klarna/20 text-ink" : "border-ink/10 text-smoke"}`} data-testid={`trust-logo-${l.toLowerCase().replace(/\s/g, "-")}`}>
              {l}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
};

export default SocialProof;
