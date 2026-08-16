import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";
import site from "@/config/site";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const Footer = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const f = site.footer;

  const subscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await axios.post(`${API}/newsletter`, { email });
      toast.success(f.newsletter.success);
      setEmail("");
    } catch (err) {
      toast.error(err.response?.data?.detail || "Qualcosa è andato storto. Riprova.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-ink text-cream" data-testid="footer">
      <div className="container-sc py-16 md:py-28">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-4xl font-black tracking-tight md:text-5xl">
              Squeeze<span className="text-flame">Case</span>
            </p>
            <p className="mt-3 text-sm text-cream/70">{site.brand.tagline}</p>
            <div className="mt-10">
              <p className="font-display text-2xl font-bold">{f.newsletter.title}</p>
              <p className="mt-2 text-sm text-cream/70">{f.newsletter.text}</p>
              <form onSubmit={subscribe} className="mt-5 flex max-w-md gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={f.newsletter.placeholder}
                  className="h-12 flex-1 rounded-full border border-cream/20 bg-cream/10 px-5 text-sm text-cream placeholder:text-cream/40 focus:border-flame"
                  data-testid="newsletter-email-input"
                  aria-label={f.newsletter.placeholder}
                />
                <button type="submit" disabled={loading} className="flex h-12 items-center gap-2 rounded-full bg-cta px-6 text-sm font-bold text-white transition-colors duration-200 hover:bg-cta-dark disabled:opacity-60" data-testid="newsletter-submit-button">
                  {f.newsletter.button} <ArrowRight size={16} />
                </button>
              </form>
            </div>
          </div>

          {f.columns.map((col) => (
            <div key={col.title}>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-cream/70">{col.title}</p>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-sm font-semibold text-cream/80 transition-colors duration-200 hover:text-flame" data-testid={`footer-link-${l.label.toLowerCase().replace(/\s/g, "-")}`}>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap items-center gap-2" data-testid="footer-payments">
          {f.payments.map((p) => (
            <span key={p} className="rounded-md border border-cream/20 px-3 py-1.5 text-xs font-bold text-cream/70">{p}</span>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-cream/10 pt-8 text-xs text-cream/70 md:flex-row md:items-center md:justify-between">
          <p data-testid="footer-info">{f.info}</p>
          <p>{f.copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
