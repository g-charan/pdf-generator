var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// utils.ts
function formatAmount({
  amount,
  currency,
  locale = "en-US",
  maximumFractionDigits = 2
}) {
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      maximumFractionDigits,
      minimumFractionDigits: maximumFractionDigits
    }).format(amount);
  } catch (error) {
    console.warn("Currency formatting failed", error);
    return `${currency} ${amount.toFixed(maximumFractionDigits)}`;
  }
}
function formatCurrencyForPDF({
  amount,
  currency,
  locale,
  maximumFractionDigits
}) {
  if (!currency) return "";
  const isNegative = amount < 0;
  const absoluteAmount = Math.abs(amount);
  const formatted = formatAmount({
    currency,
    amount: absoluteAmount,
    locale,
    maximumFractionDigits
  });
  return isNegative ? `-${formatted}` : formatted || "";
}
function calculateTotal({
  lineItems,
  taxRate = 0,
  vatRate = 0,
  discount = 0,
  includeVat = true,
  includeTax = true,
  includeLineItemTax = false
}) {
  const safeLineItems = lineItems || [];
  const subTotal = safeLineItems.reduce((acc, item) => {
    var _a, _b;
    if (!item) return acc;
    const safePrice = (_a = item.price) != null ? _a : 0;
    const safeQuantity = (_b = item.quantity) != null ? _b : 0;
    return acc + safePrice * safeQuantity;
  }, 0);
  const safeTaxRate = taxRate != null ? taxRate : 0;
  const safeVatRate = vatRate != null ? vatRate : 0;
  const safeDiscount = discount != null ? discount : 0;
  const totalVAT = includeVat ? subTotal * safeVatRate / 100 : 0;
  let tax = 0;
  if (includeLineItemTax) {
    tax = safeLineItems.reduce((acc, item) => {
      var _a, _b, _c;
      if (!item) return acc;
      const itemTotal = ((_a = item.price) != null ? _a : 0) * ((_b = item.quantity) != null ? _b : 0);
      const itemTaxRate = (_c = item.taxRate) != null ? _c : 0;
      return acc + itemTotal * itemTaxRate / 100;
    }, 0);
  } else if (includeTax) {
    tax = subTotal * safeTaxRate / 100;
  }
  const total = subTotal + (includeVat ? totalVAT : 0) + tax - safeDiscount;
  return {
    subTotal,
    total,
    vat: totalVAT,
    tax
  };
}
function calculateLineItemTotal({
  price = 0,
  quantity = 0
}) {
  const safePrice = price != null ? price : 0;
  const safeQuantity = quantity != null ? quantity : 0;
  return safePrice * safeQuantity;
}
function isValidJSON(str) {
  if (!str) return false;
  try {
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
}

export {
  __require,
  __commonJS,
  __toESM,
  formatCurrencyForPDF,
  calculateTotal,
  calculateLineItemTotal,
  isValidJSON
};
