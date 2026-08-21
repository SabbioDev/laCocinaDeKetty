import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "white" | "dark";
type ButtonSize = "sm" | "md" | "lg" | "icon";

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-600 text-white shadow-[0_14px_28px_-14px_rgb(168_58_36/0.7)] hover:bg-brand-700 hover:shadow-[0_18px_34px_-14px_rgb(139_45_27/0.75)] active:scale-[0.98]",
  secondary: "bg-manteca-200 text-cocoa-800 hover:bg-manteca-300 active:scale-[0.98]",
  outline:
    "border border-cocoa-400/60 text-cocoa-700 hover:border-brand-600 hover:text-brand-700 hover:bg-brand-600/5",
  ghost: "text-cocoa-700 hover:bg-manteca-200",
  white:
    "bg-[#fdfaf2] text-brand-700 shadow-sm hover:bg-white hover:shadow-card active:scale-[0.98]",
  dark: "bg-cocoa-800 text-manteca-100 shadow-[0_14px_28px_-16px_rgb(0_0_0/0.6)] hover:bg-cocoa-900 hover:text-white active:scale-[0.98]",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-3.5 text-base",
  icon: "p-2.5",
};

export interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

interface ButtonAsButton extends ButtonBaseProps, ButtonHTMLAttributes<HTMLButtonElement> {
  href?: undefined;
}

interface ButtonAsLink extends ButtonBaseProps, AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({ variant = "primary", size = "md", className, ...props }: ButtonProps) {
  const classes = cn(baseClasses, variants[variant], sizes[size], className);

  if (props.href !== undefined) {
    const { href, ...anchorProps } = props as ButtonAsLink;
    return (
      <Link href={href} className={classes} {...anchorProps}>
        {anchorProps.children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...(props as ButtonAsButton)} />
  );
}