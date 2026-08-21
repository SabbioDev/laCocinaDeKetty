"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  position?: "right" | "bottom";
  className?: string;
  children: React.ReactNode;
}

const ease = [0.22, 1, 0.36, 1] as const;

export function Drawer({
  open,
  onClose,
  title,
  position = "right",
  className,
  children,
}: DrawerProps) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const isRight = position === "right";

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label={title}>
          <motion.div
            className="absolute inset-0 bg-cocoa-900/55 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />
          <motion.div
            className={cn(
              "absolute flex flex-col bg-manteca-50 shadow-2xl",
              isRight
                ? "right-0 top-0 h-full w-full max-w-md"
                : "bottom-0 left-0 right-0 max-h-[85vh] rounded-t-[2.5rem]",
              className,
            )}
            initial={isRight ? { x: "100%" } : { y: "100%" }}
            animate={isRight ? { x: 0 } : { y: 0 }}
            exit={isRight ? { x: "100%" } : { y: "100%" }}
            transition={{ duration: 0.4, ease }}
            onKeyDown={(e) => {
              if (e.key === "Escape") onClose();
            }}
          >
            <div className="flex items-center justify-between border-b border-cocoa-400/20 px-6 py-4">
              <h2 className="font-serif text-2xl font-bold text-cocoa-800">{title}</h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Cerrar"
                className="rounded-full p-2 text-cocoa-600 transition-colors hover:bg-manteca-200 hover:text-brand-600 focus-visible:outline-none"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            {children}
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}