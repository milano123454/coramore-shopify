import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ = ({ items }) => (
  <section id="faq" data-testid="faq-section" className="py-16 md:py-24">
    <div className="max-w-3xl mx-auto px-4 md:px-8">
      <p className="font-accent text-2xl text-primary -rotate-1 text-center">the need-to-knows</p>
      <h2 className="font-headings text-4xl md:text-5xl font-bold tracking-tight text-center mb-10">Quick questions</h2>
      <Accordion type="single" collapsible className="space-y-3">
        {items.map((f, i) => (
          <AccordionItem
            key={i}
            value={`faq-${i}`}
            data-testid={`faq-item-${i}`}
            className="bg-white border-2 border-foreground rounded-xl px-5 tactile-shadow-sm overflow-hidden"
          >
            <AccordionTrigger
              data-testid={`faq-trigger-${i}`}
              className="font-headings font-semibold text-left text-base md:text-lg hover:no-underline py-4"
            >
              {f.q}
            </AccordionTrigger>
            <AccordionContent data-testid={`faq-content-${i}`} className="text-muted-foreground pb-4">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

export default FAQ;
