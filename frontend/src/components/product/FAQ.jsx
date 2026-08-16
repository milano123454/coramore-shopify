import site from "@/config/site";
import Reveal from "@/components/Reveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const FAQ = () => {
  const f = site.product.faq;
  return (
    <section id="faq" className="scroll-mt-24 bg-sand/50" data-testid="faq-section">
      <div className="mx-auto max-w-3xl px-4 py-16 md:px-6 md:py-28">
        <Reveal>
          <h2 className="text-center font-display text-3xl font-black tracking-tight md:text-5xl" data-testid="faq-heading">{f.heading}</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <Accordion type="single" collapsible className="mt-10 space-y-3" data-testid="faq-accordion">
            {f.items.map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="rounded-2xl border border-ink/10 bg-white px-6">
                <AccordionTrigger className="py-5 text-left font-display text-base font-bold hover:no-underline md:text-lg" data-testid={`faq-question-${i}`}>
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-sm leading-relaxed text-smoke md:text-base" data-testid={`faq-answer-${i}`}>
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
};

export default FAQ;
