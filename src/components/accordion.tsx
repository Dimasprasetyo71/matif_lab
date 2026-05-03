import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { cn } from "#/lib/utils";

interface FAQItem {
    q: string;
    a: string;
}

export function ZenDialogue() {
    const [active, setActive] = useState<number | null>(null);

    const faq: FAQItem[] = [
        {
            q: "Why focus on imperfection?",
            a: "Because digital perfection is sterile. By embracing the 'glitch' and the 'raw', we create products that feel human and alive."
        },
        {
            q: "What is the Ma principle?",
            a: "Ma is the 'negative space'. It prevents the user from being overwhelmed. It provides the literal room to breathe."
        },
        {
            q: "How does wabi sabi age?",
            a: "Gracefully. We build systems that don't break when they get old; they simply change their emotional resonance."
        }
    ];

    const toggleAccordion = (index: number) => {
        setActive(active === index ? null : index);
    };

    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleAccordion(index);
        }
    };

    return (
        <section className="py-32 md:py-64 bg-[#f0f0eb] px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-16 md:mb-32 text-center">
                    <span className="text-[8px] md:text-[10px] font-mono tracking-[0.15em] text-neutral-400 uppercase">
                       Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi, consequuntur perspiciatis? Tenetur quas nam fuga est incidunt dolor sequi impedit accusantium vero aliquid atque, rem labore soluta nihil voluptatibus! Dolorem?
                    </span>
                    <h2 className="font-serif text-4xl md:text-6xl mt-3 md:mt-4 text-neutral-800 italic leading-tight">
                      APA ITU MATIF LAB
                    </h2>
                </div>

                {/* Accordion */}
                <div className="space-y-0">
                    {faq.map((item, i) => (
                        <motion.div
                            key={i}
                            layout
                            className="border-b border-neutral-900/10 py-8 md:py-12 group"
                        >
                            {/* Question Button */}
                            <button
                                onClick={() => toggleAccordion(i)}
                                onKeyDown={(e) => handleKeyDown(e, i)}
                                aria-expanded={active === i}
                                aria-controls={`answer-${i}`}
                                className="w-full flex justify-between items-center gap-4 cursor-pointer transition-all duration-300 hover:pl-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-neutral-400"
                            >
                                <h4
                                    className={cn(
                                        "font-serif text-xl md:text-3xl text-left transition-all duration-500",
                                        active === i
                                            ? "pl-0 md:pl-6 text-neutral-800 italic"
                                            : "text-neutral-500 group-hover:text-neutral-600 group-hover:pl-2"
                                    )}
                                >
                                    {item.q}
                                </h4>
                                <div className="shrink-0">
                                    {active === i ? (
                                        <Minus
                                            size={20}
                                            className="opacity-30 transition-opacity duration-300"
                                        />
                                    ) : (
                                        <Plus
                                            size={20}
                                            className="opacity-20 group-hover:opacity-35 transition-opacity duration-300"
                                        />
                                    )}
                                </div>
                            </button>

                            {/* Answer */}
                            <AnimatePresence mode="wait">
                                {active === i && (
                                    <motion.div
                                        id={`answer-${i}`}
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{
                                            height: { duration: 0.4, ease: "easeInOut" },
                                            opacity: { duration: 0.3, ease: "easeInOut" }
                                        }}
                                        className="overflow-hidden"
                                    >
                                        <p
                                            className="pt-6 md:pt-12 pb-2 md:pb-4 pl-0 md:pl-6 text-base md:text-xl font-serif text-neutral-600 max-w-2xl leading-relaxed italic"
                                        >
                                            {item.a}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}