import { cn } from "@/lib/utils";

function FieldLabel({
  label,
  required,
  htmlFor,
}: {
  label?: string;
  required?: boolean;
  htmlFor?: string;
}) {
  if (!label) return null;
  return (
    <label
      htmlFor={htmlFor}
      className="text-xs font-semibold uppercase tracking-wider text-cocoa-600"
    >
      {label}
      {required ? <span className="text-brand-600"> *</span> : null}
    </label>
  );
}

function FieldMessage({ error, hint }: { error?: string; hint?: string }) {
  if (error) {
    return (
      <p role="alert" className="text-xs font-medium text-brand-700">
        {error}
      </p>
    );
  }
  if (hint) {
    return <p className="text-xs text-cocoa-600">{hint}</p>;
  }
  return null;
}

const fieldClasses =
  "w-full rounded-2xl border bg-[#fdfaf2] px-4 py-3 text-sm text-cocoa-800 shadow-sm transition-all duration-200 placeholder:text-cocoa-600/60 focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-600";

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
      <FieldLabel label={label} required={props.required} htmlFor={inputId} />
      <input
        id={inputId}
        className={cn(fieldClasses, error ? "border-brand-500" : "border-cocoa-400/40", className)}
        {...props}
      />
      <FieldMessage error={error} hint={hint} />
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
      <FieldLabel label={label} required={props.required} htmlFor={inputId} />
      <select
        id={inputId}
        className={cn(fieldClasses, error ? "border-brand-500" : "border-cocoa-400/40", className)}
        {...props}
      >
        {children}
      </select>
      <FieldMessage error={error} />
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
      <FieldLabel label={label} required={props.required} htmlFor={inputId} />
      <textarea
        id={inputId}
        className={cn(fieldClasses, error ? "border-brand-500" : "border-cocoa-400/40", className)}
        {...props}
      />
      <FieldMessage error={error} />
    </div>
  );
}