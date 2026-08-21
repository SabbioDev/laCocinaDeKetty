"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionItem {
  id: string;
  question: string;
  answer: string;
}

function AccordionRow({
  item,
  isOpen,
  onToggle,
  panelId,
}: {
  item: AccordionItem;
  isOpen: boolean;
  onToggle: () => void;
  panelId: string;
}) {
  return (
    <div className="overflow-hidden rounded-3xl border border-cocoa-400/25 bg-[#fdfaf2] shadow-sm transition-shadow hover:shadow-card">
      <h3>
        <button
          type="button"
          id={`${panelId}-trigger`}
          aria-expanded={isOpen}
          aria-controls={`${panelId}-panel`}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left focus-visible:outline-none"
        >
          <span className="font-serif text-lg font-semibold text-cocoa-800 sm:text-xl">
            {item.question}
          </span>
          <span
            className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-cocoa-400/30 text-brand-600 transition-transform duration-300",
              isOpen && "rotate-180 bg-brand-600 text-white border-brand-600",
            )}
          >
            <ChevronDown aria-hidden="true" className="h-4 w-4" />
          </span>
        </button>
      </h3>
      <div
        id={`${panelId}-panel`}
        role="region"
        aria-labelledby={`${panelId}-trigger`}
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-out",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-6 text-sm leading-relaxed text-cocoa-600 sm:text-base">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export function Accordion({ items }: { items: AccordionItem[] }) {
  const baseId = useId();
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="flex flex-col gap-4">
      {items.map((item, index) => (
        <AccordionRow
          key={item.id}
          item={item}
          panelId={`${baseId}-${index}`}
          isOpen={openId === item.id}
          onToggle={() => setOpenId(openId === item.id ? null : item.id)}
        />
      ))}
    </div>
  );
}