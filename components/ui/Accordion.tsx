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
    <div className="overflow-hidden rounded-2xl border border-cocoa-400/30 bg-white">
      <h3>
        <button
          type="button"
          id={`${panelId}-trigger`}
          aria-expanded={isOpen}
          aria-controls={`${panelId}-panel`}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
        >
          <span className="font-serif text-base font-semibold text-cocoa-800 sm:text-lg">
            {item.question}
          </span>
          <ChevronDown
            aria-hidden="true"
            className={cn(
              "h-5 w-5 shrink-0 text-brand-600 transition-transform duration-300",
              isOpen && "rotate-180",
            )}
          />
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
          <p className="px-5 pb-5 text-sm leading-relaxed text-cocoa-500">
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
    <div className="flex flex-col gap-3">
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