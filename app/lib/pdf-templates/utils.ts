/**
 * Formats a number as a currency string.
 */
function formatAmount({
  amount,
  currency,
  locale = "en-US",
  maximumFractionDigits = 2,
}: {
  amount: number;
  currency: string;
  locale?: string;
  maximumFractionDigits?: number;
}): string {
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
      maximumFractionDigits: maximumFractionDigits,
      minimumFractionDigits: maximumFractionDigits,
    }).format(amount);
  } catch (error) {
    console.warn("Currency formatting failed", error);
    return `${currency} ${amount.toFixed(maximumFractionDigits)}`;
  }
}

export function formatCurrencyForPDF({
  amount,
  currency,
  locale,
  maximumFractionDigits,
}: {
  amount: number;
  currency: string;
  locale?: string;
  maximumFractionDigits?: number;
}): string {
  if (!currency) return "";

  const isNegative = amount < 0;
  const absoluteAmount = Math.abs(amount);

  const formatted = formatAmount({
    currency,
    amount: absoluteAmount,
    locale,
    maximumFractionDigits,
  });

  return isNegative ? `-${formatted}` : formatted || "";
}

export function calculateTotal({
  lineItems,
  taxRate = 0,
  vatRate = 0,
  discount = 0,
  includeVat = true,
  includeTax = true,
  includeLineItemTax = false,
}: {
  lineItems: Array<{ price?: number; quantity?: number; taxRate?: number }>;
  taxRate?: number;
  vatRate?: number;
  discount?: number;
  includeVat?: boolean;
  includeTax?: boolean;
  includeLineItemTax?: boolean;
}) {
  const safeLineItems = lineItems || [];

  const subTotal = safeLineItems.reduce((acc, item) => {
    if (!item) return acc;
    const safePrice = item.price ?? 0;
    const safeQuantity = item.quantity ?? 0;
    return acc + safePrice * safeQuantity;
  }, 0);

  const safeTaxRate = taxRate ?? 0;
  const safeVatRate = vatRate ?? 0;
  const safeDiscount = discount ?? 0;

  const totalVAT = includeVat ? (subTotal * safeVatRate) / 100 : 0;

  let tax = 0;
  if (includeLineItemTax) {
    tax = safeLineItems.reduce((acc, item) => {
      if (!item) return acc;
      const itemTotal = (item.price ?? 0) * (item.quantity ?? 0);
      const itemTaxRate = item.taxRate ?? 0;
      return acc + (itemTotal * itemTaxRate) / 100;
    }, 0);
  } else if (includeTax) {
    tax = (subTotal * safeTaxRate) / 100;
  }

  const total = subTotal + (includeVat ? totalVAT : 0) + tax - safeDiscount;

  return {
    subTotal,
    total,
    vat: totalVAT,
    tax,
  };
}

export function calculateLineItemTotal({
  price = 0,
  quantity = 0,
}: {
  price?: number;
  quantity?: number;
}) {
  const safePrice = price ?? 0;
  const safeQuantity = quantity ?? 0;
  return safePrice * safeQuantity;
}

export function isValidJSON(str: string | null | undefined): boolean {
  if (!str) return false;
  try {
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
}
