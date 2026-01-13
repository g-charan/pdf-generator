declare function formatCurrencyForPDF({ amount, currency, locale, maximumFractionDigits, }: {
    amount: number;
    currency: string;
    locale?: string;
    maximumFractionDigits?: number;
}): string;
declare function calculateTotal({ lineItems, taxRate, vatRate, discount, includeVat, includeTax, includeLineItemTax, }: {
    lineItems: Array<{
        price?: number;
        quantity?: number;
        taxRate?: number;
    }>;
    taxRate?: number;
    vatRate?: number;
    discount?: number;
    includeVat?: boolean;
    includeTax?: boolean;
    includeLineItemTax?: boolean;
}): {
    subTotal: number;
    total: number;
    vat: number;
    tax: number;
};
declare function calculateLineItemTotal({ price, quantity, }: {
    price?: number;
    quantity?: number;
}): number;
declare function isValidJSON(str: string | null | undefined): boolean;

export { calculateLineItemTotal, calculateTotal, formatCurrencyForPDF, isValidJSON };
