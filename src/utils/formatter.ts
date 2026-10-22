export function formatDate(date: Date, options: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat(undefined, options).format(date);
}

export function formatRuntime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return [
    hours > 0 ? `${hours}h` : "",
    remainingMinutes > 0 ? `${remainingMinutes}m` : "",
  ]
    .filter(Boolean)
    .join(" ");
}

export function formatCurreny(amount: number) {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    currencyDisplay: "symbol",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPlural(
  count: number,
  { singular, plural }: { singular: string; plural: string },
  { includeCount = true } = {},
) {
  const word = count === 1 ? singular : plural;

  return includeCount ? `${count} ${word}` : word;
}
