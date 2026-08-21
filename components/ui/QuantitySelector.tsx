"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
}

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 99,
  disabled = false,
  className,
  ariaLabel = "Cantidad",
}: QuantitySelectorProps) {
  const canDecrease = value > min;
  const canIncrease = value < max;

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-cocoa-400/40 bg-[#fdfaf2] shadow-sm",
        className,
      )}
    >
      <button
        type="button"
        aria-label={`Disminuir ${ariaLabel}`}
        disabled={disabled || !canDecrease}
        onClick={() => onChange(value - 1)}
        className="rounded-l-full p-2.5 text-cocoa-600 transition-colors hover:text-brand-600 disabled:opacity-30 focus-visible:outline-none"
      >
        <Minus className="h-4 w-4" aria-hidden="true" />
      </button>
      <span className="min-w-8 text-center txt-num text-sm font-semibold text-cocoa-800" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        aria-label={`Aumentar ${ariaLabel}`}
        disabled={disabled || !canIncrease}
        onClick={() => onChange(value + 1)}
        className="rounded-r-full p-2.5 text-cocoa-600 transition-colors hover:text-brand-600 disabled:opacity-30 focus-visible:outline-none"
      >
        <Plus className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}