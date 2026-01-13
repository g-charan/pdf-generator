"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { PdfTemplate, CreditReferenceTemplate, CreditApplicationTemplate, LetterOfCreditTemplate } from "./lib/pdf-templates/components";
import { Invoice, LineItem, EditorDoc, DocumentType, CreditReference, CreditApplication, LetterOfCredit } from "./lib/pdf-templates/types";
import { calculateTotal } from "./utils/calculate"; // Keeping this as it might be app-specific logic, or should I verify?
// Actually calculateTotal uses types too? Let's check calculateTotal later.
// For now update component imports.

// Dynamic import for PDFViewer to avoid SSR issues
const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  {
    ssr: false,
    loading: () => <p>Loading PDF Viewer...</p>,
  }
);

// Helper to create simple text docs
const createEditorDoc = (text: string): EditorDoc => ({
  type: "doc",
  content: [
    {
      type: "paragraph",
      content: [{ type: "text", text }],
    },
  ],
});

const defaultTemplate = {
  customerLabel: "Bill To",
  title: "INVOICE",
  fromLabel: "From",
  invoiceNoLabel: "Invoice No",
  issueDateLabel: "Issue Date",
  dueDateLabel: "Due Date",
  descriptionLabel: "Description",
  priceLabel: "Price",
  quantityLabel: "Qty",
  totalLabel: "Total",
  totalSummaryLabel: "Total",
  vatLabel: "VAT",
  subtotalLabel: "Subtotal",
  taxLabel: "Tax",
  discountLabel: "Discount",
  timezone: "UTC",
  paymentLabel: "Payment Details",
  noteLabel: "Notes",
  logoUrl: null,
  currency: "USD",
  paymentDetails: createEditorDoc("Bank: Test Bank\nAccount: 123456789"),
  fromDetails: createEditorDoc("My Company Inc.\n123 Business Rd\nCity, Country"),
  noteDetails: createEditorDoc("Thank you for your business!"),
  dateFormat: "MM/dd/yyyy",
  includeVat: false,
  includeTax: true,
  includeDiscount: true,
  includeDecimals: true,
  includeUnits: false,
  includeQr: false,
  taxRate: 10,
  vatRate: 0,
  size: "a4" as const,
  deliveryType: "create" as const,
  locale: "en-US",
};
const defaultCreditReference: CreditReference = {
  // Config
  title: "SAMPLE BANK CREDIT REFERENCE LETTER",
  subtitle: "(Must be on Bank, Signed, Original letterhead in English or with translation)",
  salutation: "To whom it may concern:",
  introText: "This letter is to inform you that {subjectName} with ID number {subjectId} has been banking with us since {bankingSince}. He/She has an outstanding banking relationship with our organization.",
  conductText: "He/She has conducted his/hers affairs with us in a very satisfactory manner.",
  characterText: "At a personal level we feel he/she is of good character.",
  conclusionText: "Therefore, we feel that he/she would comply dutifully with any financial obligation incurred with your institution.",
  checkingLabel: "Checking Account number:",
  checkingBalanceLabel: "has a current balance of",
  savingsLabel: "Savings Account number:",
  savingsBalanceLabel: "has a current balance of",
  assistanceLabel: "Should you require further assistance, please feel free to contact me at Tel Number:",
  
  // Data
  date: new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' }),
  recipientName: "Juan Luis Rodriguez-Kohly, L.O.",
  recipientCompany: "Banking Mortgage Services Corp.",
  recipientAddress: "5820 SW 40th st\nMiami, FL 33155 U.S.A.",
  subjectName: "John Doe",
  subjectId: "123456789",
  bankingSince: "January 2020",
  checkingAccount: "987654321",
  checkingBalance: 5000.00,
  checkingDate: "01/15/2020",
  savingsAccount: "123123123",
  savingsBalance: 12000.50,
  savingsDate: "02/20/2021",
  currency: "USD",
  officerName: "Jane Smith",
  officerTitle: "Senior Branch Manager",
  officerContact: "(555) 123-4567 | jane.smith@bank.com",
};

const defaultCreditApplication: CreditApplication = {
  // Headers
  mainTitle: "APPLICATION FOR CREDIT",
  subTitle: "MAHER TERMINALS, LLC.",
  firmNameLabel: "*Firm Name:",
  addressLabel: "*Address:",
  cityLabel: "*City:",
  stateLabel: "*State / Province:",
  zipLabel: "*Zip Code:",
  phoneLabel: "*Telephone:",
  faxLabel: "Fax:",
  websiteLabel: "Website:",
  businessInfoTitle: "BUSINESS INFORMATION",
  bankInfoTitle: "BANK INFORMATION",
  tradeReferencesTitle: "TRADE REFERENCES",
  agreementTitle: "PLEASE ATTACH BUSINESS PROFILE AND NAME(S) OF OWNER(S) AND OFFICER(S)",

  // Data
  firmName: "Acme Logistics Inc.",
  address: "123 Supply Chain Blvd",
  city: "Newark",
  state: "NJ",
  zip: "07102",
  phone: "(555) 987-6543",
  fax: "(555) 987-6544",
  website: "www.acmelogistics.com",
  email: "accounts@acmelogistics.com",
  typeOfBusiness: "Forwarder",
  apContact: "Alice Johnson",
  apTitle: "Accounts Manager",
  companyRegState: "Delaware",
  federalId: "99-9999999",
  bankName: "Global Trade Bank",
  bankAccount: "1122334455",
  bankAddress: "45 Wall St, New York, NY",
  bankContact: "Robert Banker",
  tradeReferences: [
    { name: "Ocean Carriers Ltd", address: "10 Port Rd", contact: "Shipping Dept", phone: "555-111-2222", email: "ref@ocean.com" },
    { name: "Trucking Co", address: "50 Highway Way", contact: "Dispatch", phone: "555-333-4444", email: "ref@trucking.com" },
    { name: "", address: "", contact: "", phone: "", email: "" },
  ],
  agreementDate: new Date().toISOString().split('T')[0],
  signature: "",
  title: "CF0",
};

const defaultLetterOfCredit: LetterOfCredit = {
  // Config
  title: "Letter Of Credit Example",
  fromLabel: "From,",
  dateLabel: "Date:",
  toLabel: "To,",
  subjectLabel: "Subject :",
  bodyText1: "We have opened the Irrevocable letter of credit in your favour and available to you by your draft(s) drawn on {drawnOn}, payable at sights for any sums not exceeding {amount} (the principal amount) for the account of {accountOf}. The drafts made against the above Credit letter lead to the following:",
  bodyText2: "Each draft against the Irrevocable letter of credit {drawnUnder} must be accompanied by a written certificate of {commission} (commission) that the draft is presented resulting in DEFAULT having defaulted or failed to complete the following improvements on or before the expiration of {expirationDate} the estimated costs of meeting the specifications required modifications secured by this letter of Credit.",
  closingText: "Thanking you.\nWarm regards,",

  // Data
  from: "Global Import Corp",
  date: new Date().toLocaleDateString(),
  to: "Export Goods Ltd",
  subject: "LC/2023/001",
  drawnOn: "International Bank of Commerce",
  amount: 250000,
  currency: "USD",
  accountOf: "Global Import Corp",
  drawnUnder: "LC/2023/001",
  commission: "0.1%",
  expirationDate: "12/31/2024",
  senderName: "Michael Scott",
  organizationName: "Global Import Corp",
};


export default function InvoiceEditor() {
  const [isClient, setIsClient] = useState(false);
  
  // Document Type State
  const [documentType, setDocumentType] = useState<DocumentType>("invoice");
  const [creditReference, setCreditReference] = useState<CreditReference>(defaultCreditReference);
  const [creditApplication, setCreditApplication] = useState<CreditApplication>(defaultCreditApplication);
  const [letterOfCredit, setLetterOfCredit] = useState<LetterOfCredit>(defaultLetterOfCredit);

  // Invoice State
  const [invoice, setInvoice] = useState<Invoice>({
    id: "1",
    invoiceNumber: "INV-001",
    issueDate: new Date().toISOString(),
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString(),
    amount: 0,
    currency: "USD",
    lineItems: [
      {
        name: '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Consulting Services"}]}]}', 
        quantity: 10, 
        price: 150 
      },
      {
        name: '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Software License"}]}]}', 
        quantity: 1, 
        price: 500 
      },
    ],
    paymentDetails: defaultTemplate.paymentDetails,
    customerDetails: createEditorDoc("Client Company\n456 Client St\nCity, Country"),
    fromDetails: defaultTemplate.fromDetails,
    noteDetails: defaultTemplate.noteDetails,
    template: defaultTemplate,
    customerName: "Client Company",
    token: "demo-token",
    status: "draft",
    vat: 0,
    tax: 0,
    discount: 0,
    // Nullable fields required by type
    reminderSentAt: null,
    updatedAt: null,
    note: null,
    internalNote: null,
    paidAt: null,
    filePath: null,
    viewedAt: null,
    sentAt: null,
    sentTo: null,
    topBlock: null,
    bottomBlock: null,
    customer: null,
    customerId: null,
    team: null,
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Recalculate totals whenever relevant fields change
  useEffect(() => {
    const { total, tax, vat } = calculateTotal({
      lineItems: invoice.lineItems,
      taxRate: invoice.template.taxRate,
      vatRate: invoice.template.vatRate,
      discount: invoice.discount || 0,
      includeVat: invoice.template.includeVat,
      includeTax: invoice.template.includeTax,
      includeLineItemTax: invoice.template.includeLineItemTax,
    });

    if (total !== invoice.amount || tax !== invoice.tax || vat !== invoice.vat) {
      setInvoice((prev) => ({ ...prev, amount: total, tax, vat }));
    }
  }, [
    invoice.lineItems,
    invoice.template.taxRate,
    invoice.template.vatRate,
    invoice.discount,
    invoice.template.includeVat,
    invoice.template.includeTax,
    invoice.template.includeLineItemTax,
    invoice.amount, // safe dependency
    invoice.tax,
    invoice.vat
  ]);

  const updateLineItem = (index: number, field: keyof LineItem, value: any) => {
    const newItems = [...invoice.lineItems];
    newItems[index] = { ...newItems[index], [field]: value };
    // Special handling for name to keep it JSON stringified for the template
    if (field === "name") {
       newItems[index].name = JSON.stringify(createEditorDoc(value));
    }
    setInvoice({ ...invoice, lineItems: newItems });
  };

  const addLineItem = () => {
    setInvoice({
      ...invoice,
      lineItems: [
        ...invoice.lineItems,
        { 
          name: JSON.stringify(createEditorDoc("New Item")), 
          quantity: 1, 
          price: 0 
        },
      ],
    });
  };

  const removeLineItem = (index: number) => {
    setInvoice({
      ...invoice,
      lineItems: invoice.lineItems.filter((_, i) => i !== index),
    });
  };

  const updateTemplate = (field: keyof typeof defaultTemplate, value: any) => {
    setInvoice({
      ...invoice,
      template: { ...invoice.template, [field]: value },
    });
  };

  // Helper to safely extract text from the JSON stringified doc
  const getLineItemName = (jsonString: string) => {
    try {
      const doc = JSON.parse(jsonString);
      return doc.content?.[0]?.content?.[0]?.text || "";
    } catch {
      return jsonString;
    }
  };

  if (!isClient) return null;

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* LEFT SIDEBAR - EDITOR */}
      <aside className="w-[500px] bg-white border-r border-slate-200 h-full overflow-y-auto flex flex-col">
        <div className="p-6 border-b border-slate-100 sticky top-0 bg-white z-10 space-y-4">
          <div>
            <h1 className="text-xl font-bold text-slate-800">Document Editor</h1>
            <p className="text-sm text-slate-500">Select and edit document</p>
          </div>
          <select
            value={documentType}
            onChange={(e) => setDocumentType(e.target.value as DocumentType)}
            className="w-full p-2 border rounded text-sm bg-slate-50 font-medium text-slate-700"
          >
            <option value="invoice">Invoice</option>
            <option value="credit_reference">Credit Reference Letter</option>
            <option value="credit_application">Credit Application</option>
            <option value="letter_of_credit">Letter of Credit</option>
          </select>
        </div>

        <div className="p-6 space-y-8">
          {documentType === "invoice" && (
            <div className="space-y-8">
          {/* Meta Info */}
          <section className="space-y-4">
            <h2 className="text-sm font-bold uppercase text-slate-400 tracking-wider">
              Information
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Invoice No
                </label>
                <input
                  type="text"
                  value={invoice.invoiceNumber || ""}
                  onChange={(e) =>
                    setInvoice({ ...invoice, invoiceNumber: e.target.value })
                  }
                  className="w-full p-2 border rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Currency
                </label>
                <select
                  value={invoice.currency || "USD"}
                  onChange={(e) =>
                    setInvoice({ ...invoice, currency: e.target.value })
                  }
                  className="w-full p-2 border rounded text-sm"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Issue Date
                </label>
                <input
                  type="date"
                  value={invoice.issueDate ? invoice.issueDate.split('T')[0] : ""}
                  onChange={(e) =>
                    setInvoice({ ...invoice, issueDate: new Date(e.target.value).toISOString() })
                  }
                  className="w-full p-2 border rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Due Date
                </label>
                <input
                  type="date"
                  value={invoice.dueDate ? invoice.dueDate.split('T')[0] : ""}
                    onChange={(e) =>
                    setInvoice({ ...invoice, dueDate: new Date(e.target.value).toISOString() })
                  }
                  className="w-full p-2 border rounded text-sm"
                />
              </div>
            </div>
          </section>

          {/* Line Items */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase text-slate-400 tracking-wider">
                Line Items
              </h2>
              <button
                onClick={addLineItem}
                className="text-indigo-600 text-xs font-medium hover:underline flex items-center gap-1"
              >
                <PlusIcon className="w-3 h-3" /> Add Item
              </button>
            </div>

            <div className="space-y-3">
              {invoice.lineItems.map((item, index) => (
                <div
                  key={index}
                  className="p-3 border border-slate-200 rounded-lg bg-slate-50 relative group"
                >
                  <button
                    onClick={() => removeLineItem(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition shadow-sm"
                  >
                    <TrashIcon className="w-3 h-3" />
                  </button>
                  <div className="grid grid-cols-12 gap-2">
                    <div className="col-span-12 mb-2">
                         <label className="block text-[10px] text-slate-500 mb-1">Description</label>
                        <input
                            type="text"
                            placeholder="Description"
                            value={getLineItemName(item.name)}
                            onChange={(e) => updateLineItem(index, "name", e.target.value)}
                            className="w-full p-1.5 border rounded text-sm"
                        />
                    </div>
                    <div className="col-span-4">
                        <label className="block text-[10px] text-slate-500 mb-1">Qty</label>
                        <input
                            type="number"
                            placeholder="Qty"
                            value={item.quantity}
                            onChange={(e) => updateLineItem(index, "quantity", Number(e.target.value))}
                            className="w-full p-1.5 border rounded text-sm"
                        />
                    </div>
                    <div className="col-span-4">
                         <label className="block text-[10px] text-slate-500 mb-1">Price</label>
                        <input
                            type="number"
                            placeholder="Price"
                            value={item.price}
                            onChange={(e) => updateLineItem(index, "price", Number(e.target.value))}
                            className="w-full p-1.5 border rounded text-sm"
                        />
                    </div>
                    <div className="col-span-4 flex items-end justify-end">
                        <span className="text-sm font-medium text-slate-700">
                           {((item.quantity || 0) * (item.price || 0)).toFixed(2)}
                        </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Settings */}
          <section className="space-y-4">
            <h2 className="text-sm font-bold uppercase text-slate-400 tracking-wider">
              Settings & Totals
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm text-slate-600">Tax Rate (%)</label>
                <input
                  type="number"
                  value={invoice.template.taxRate}
                  onChange={(e) => updateTemplate("taxRate", Number(e.target.value))}
                  className="w-20 p-1 border rounded text-sm text-right"
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm text-slate-600">Discount</label>
                <input
                  type="number"
                  value={invoice.discount || 0}
                  onChange={(e) => setInvoice({ ...invoice, discount: Number(e.target.value) })}
                  className="w-20 p-1 border rounded text-sm text-right"
                />
              </div>
               <div className="flex items-center justify-between pt-2 border-t">
                  <span className="font-bold text-slate-800">Total Amount</span>
                  <span className="font-bold text-xl text-indigo-600">
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: invoice.currency || 'USD' }).format(invoice.amount || 0)}
                  </span>
               </div>
            </div>

            <div className="pt-4 border-t space-y-2">
                 <label className="flex items-center gap-2 text-sm text-slate-600">
                    <input 
                        type="checkbox" 
                        checked={invoice.template.includeQr}
                        onChange={(e) => updateTemplate("includeQr", e.target.checked)}
                        className="rounded text-indigo-600"
                    />
                    Include QR Code (Link)
                 </label>
                  <label className="flex items-center gap-2 text-sm text-slate-600">
                    <input 
                        type="checkbox" 
                        checked={invoice.template.includeTax}
                        onChange={(e) => updateTemplate("includeTax", e.target.checked)}
                         className="rounded text-indigo-600"
                    />
                    Include Tax
                 </label>
            </div>
          </section>
            </div>
          )}

          {documentType === "credit_reference" && (
            <div className="space-y-4">
               <h2 className="text-sm font-bold uppercase text-slate-400 tracking-wider">Reference Details</h2>
               {Object.keys(defaultCreditReference).map((key) => (
                  <div key={key}>
                     <label className="block text-xs font-medium text-slate-700 mb-1 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</label>
                     <input
                        type="text"
                        value={String((creditReference as any)[key])}
                        onChange={(e) => setCreditReference({...creditReference, [key]: e.target.value})}
                        className="w-full p-2 border rounded text-sm"
                     />
                  </div>
               ))}
            </div>
          )}

          {documentType === "credit_application" && (
            <div className="space-y-4">
                <h2 className="text-sm font-bold uppercase text-slate-400 tracking-wider">Application Details</h2>
                {Object.keys(defaultCreditApplication).map((key) => {
                    if (key === 'tradeReferences') return null;
                    return (
                        <div key={key}>
                            <label className="block text-xs font-medium text-slate-700 mb-1 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</label>
                            <input
                                type="text"
                                value={String((creditApplication as any)[key])}
                                onChange={(e) => setCreditApplication({...creditApplication, [key]: e.target.value})}
                                className="w-full p-2 border rounded text-sm"
                            />
                        </div>
                    )
                })}
            </div>
          )}

           {documentType === "letter_of_credit" && (
            <div className="space-y-4">
               <h2 className="text-sm font-bold uppercase text-slate-400 tracking-wider">Letter Details</h2>
               {Object.keys(defaultLetterOfCredit).map((key) => (
                  <div key={key}>
                     <label className="block text-xs font-medium text-slate-700 mb-1 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</label>
                     <input
                         type="text"
                         value={String((letterOfCredit as any)[key])}
                         onChange={(e) => setLetterOfCredit({...letterOfCredit, [key]: e.target.value})}
                         className="w-full p-2 border rounded text-sm"
                     />
                  </div>
               ))}
            </div>
          )}
        </div>
      </aside>

      {/* RIGHT SIDE - PREVIEW */}
      <main className="flex-1 bg-slate-800 flex flex-col h-full">
         <div className="h-full w-full">
            <PDFViewer width="100%" height="100%" className="w-full h-full border-none">
                {(() => {
                  switch (documentType) {
                    case "invoice": return <PdfTemplate {...invoice} />;
                    case "credit_reference": return <CreditReferenceTemplate data={creditReference} />;
                    case "credit_application": return <CreditApplicationTemplate data={creditApplication} />;
                    case "letter_of_credit": return <LetterOfCreditTemplate data={letterOfCredit} />;
                    default: return <PdfTemplate {...invoice} />;
                  }
                })()}
            </PDFViewer>
         </div>
      </main>
    </div>
  );
}
