const currencyFormatter = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export function formatPrice(value: number): string {
  return currencyFormatter.format(value);
}

/** Formatea sin el símbolo de moneda para mensajes/types: 8500 -> "8.500" */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat("es-AR").format(value);
}