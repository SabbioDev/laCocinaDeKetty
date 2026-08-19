import { cn } from "@/lib/utils";

export function Input({
  label,
  error,
  hint,
  className,
  id,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  hint?: string;
}) {
  const inputId = id ?? props.name;
  return (
    <div className="flex flex-col gap-1.5">
      {label ? (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-cocoa-700"
        >
          {label}
          {props.required ? <span className="text-brand-600"> *</span> : null}
        </label>
      ) : null}
      <input
        id={inputId}
        className={cn(
          "w-full rounded-xl border bg-white px-4 py-3 text-sm text-cocoa-800 shadow-sm transition-colors placeholder:text-cocoa-400 focus:outline-none focus:ring-2",
          error
            ? "border-brand-500 focus:ring-brand-500"
            : "border-cocoa-400/50 focus:border-brand-600 focus:ring-brand-600",
          className,
        )}
        {...props}
      />
      {error ? (
        <p role="alert" className="text-xs font-medium text-brand-600">
          {error}
        </p>
      ) : hint ? (
        <p className="text-xs text-cocoa-400">{hint}</p>
      ) : null}
    </div>
  );
}

export function Select({
  label,
  error,
  className,
  id,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  error?: string;
}) {
  const inputId = id ?? props.name;
  return (
    <div className="flex flex-col gap-1.5">
      {label ? (
        <label htmlFor={inputId} className="text-sm font-medium text-cocoa-700">
          {label}
        </label>
      ) : null}
      <select
        id={inputId}
        className={cn(
          "w-full rounded-xl border bg-white px-4 py-3 text-sm text-cocoa-800 shadow-sm transition-colors focus:outline-none focus:ring-2",
          error
            ? "border-brand-500 focus:ring-brand-500"
            : "border-cocoa-400/50 focus:border-brand-600 focus:ring-brand-600",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      {error ? (
        <p role="alert" className="text-xs font-medium text-brand-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function Textarea({
  label,
  error,
  className,
  id,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
}) {
  const inputId = id ?? props.name;
  return (
    <div className="flex flex-col gap-1.5">
      {label ? (
        <label htmlFor={inputId} className="text-sm font-medium text-cocoa-700">
          {label}
        </label>
      ) : null}
      <textarea
        id={inputId}
        className={cn(
          "w-full rounded-xl border bg-white px-4 py-3 text-sm text-cocoa-800 shadow-sm transition-colors placeholder:text-cocoa-400 focus:outline-none focus:ring-2",
          error
            ? "border-brand-500 focus:ring-brand-500"
            : "border-cocoa-400/50 focus:border-brand-600 focus:ring-brand-600",
          className,
        )}
        {...props}
      />
      {error ? (
        <p role="alert" className="text-xs font-medium text-brand-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}