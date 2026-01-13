type LineItem = {
    name: string;
    quantity: number;
    price: number;
    unit?: string;
    productId?: string;
    taxRate?: number;
};
type InvoiceProduct = {
    id: string;
    createdAt: string;
    updatedAt: string | null;
    teamId: string;
    createdBy: string | null;
    name: string;
    description: string | null;
    price: number | null;
    currency: string | null;
    unit: string | null;
    taxRate: number | null;
    isActive: boolean;
    usageCount: number;
    lastUsedAt: string | null;
};
type Invoice = {
    id: string;
    dueDate: string | null;
    invoiceNumber: string | null;
    createdAt: string;
    amount: number | null;
    currency: string | null;
    lineItems: LineItem[];
    paymentDetails: EditorDoc | null;
    customerDetails: EditorDoc | null;
    reminderSentAt: string | null;
    updatedAt: string | null;
    note: string | null;
    internalNote: string | null;
    paidAt: string | null;
    vat: number | null;
    tax: number | null;
    filePath: string[] | null;
    status: "draft" | "overdue" | "paid" | "unpaid" | "canceled" | "scheduled" | "refunded";
    viewedAt: string | null;
    fromDetails: EditorDoc | null;
    issueDate: string | null;
    sentAt: string | null;
    template: Template;
    noteDetails: EditorDoc | null;
    customerName: string | null;
    token: string;
    sentTo: string | null;
    discount: number | null;
    topBlock: EditorDoc | null;
    bottomBlock: EditorDoc | null;
    customer: {
        name: string | null;
        website: string | null;
        email: string | null;
    } | null;
    customerId: string | null;
    team: {
        name: string | null;
    } | null;
};
type Template = {
    customerLabel: string;
    title: string;
    fromLabel: string;
    invoiceNoLabel: string;
    issueDateLabel: string;
    dueDateLabel: string;
    descriptionLabel: string;
    priceLabel: string;
    quantityLabel: string;
    totalLabel: string;
    totalSummaryLabel: string;
    vatLabel: string;
    subtotalLabel: string;
    taxLabel: string;
    discountLabel: string;
    timezone: string;
    paymentLabel: string;
    noteLabel: string;
    logoUrl: string | null;
    currency: string;
    paymentDetails: EditorDoc | null;
    fromDetails: EditorDoc | null;
    noteDetails: EditorDoc | null;
    dateFormat: string;
    includeVat: boolean;
    includeTax: boolean;
    includeDiscount: boolean;
    includeDecimals: boolean;
    includeUnits: boolean;
    includeQr: boolean;
    includeLineItemTax?: boolean;
    lineItemTaxLabel?: string;
    taxRate: number;
    vatRate: number;
    size: "a4" | "letter";
    deliveryType: "create" | "create_and_send" | "scheduled";
    locale: string;
    paymentEnabled?: boolean;
};
interface EditorDoc {
    type: "doc";
    content: EditorNode[];
}
interface EditorNode {
    type: string;
    content?: InlineContent[];
}
interface InlineContent {
    type: string;
    text?: string;
    marks?: Mark[];
}
interface Mark {
    type: string;
    attrs?: {
        href?: string;
    };
}
interface TextStyle {
    fontSize: number;
    fontWeight?: number;
    fontStyle?: "normal" | "italic" | "oblique";
    color?: string;
    textDecoration?: string;
}
interface CreditReference {
    title: string;
    subtitle: string;
    salutation: string;
    introText: string;
    conductText: string;
    characterText: string;
    conclusionText: string;
    checkingLabel: string;
    savingsLabel: string;
    assistanceLabel: string;
    checkingBalanceLabel: string;
    savingsBalanceLabel: string;
    date: string;
    recipientName: string;
    recipientCompany: string;
    recipientAddress: string;
    subjectName: string;
    subjectId: string;
    bankingSince: string;
    checkingAccount: string;
    checkingBalance: number;
    checkingDate: string;
    currency: string;
    savingsAccount: string;
    savingsBalance: number;
    savingsDate: string;
    officerName: string;
    officerTitle: string;
    officerContact: string;
}
interface CreditApplication {
    mainTitle: string;
    subTitle: string;
    firmNameLabel: string;
    addressLabel: string;
    cityLabel: string;
    stateLabel: string;
    zipLabel: string;
    phoneLabel: string;
    faxLabel: string;
    websiteLabel: string;
    businessInfoTitle: string;
    bankInfoTitle: string;
    tradeReferencesTitle: string;
    agreementTitle: string;
    firmName: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
    fax: string;
    website: string;
    email: string;
    typeOfBusiness: "Agent" | "NVOCC" | "Forwarder" | "Other";
    apContact: string;
    apTitle: string;
    companyRegState: string;
    federalId: string;
    bankName: string;
    bankAccount: string;
    bankAddress: string;
    bankContact: string;
    tradeReferences: Array<{
        name: string;
        address: string;
        contact: string;
        phone: string;
        email: string;
    }>;
    agreementDate: string;
    signature: string;
    title: string;
}
interface LetterOfCredit {
    title: string;
    fromLabel: string;
    dateLabel: string;
    toLabel: string;
    subjectLabel: string;
    bodyText1: string;
    bodyText2: string;
    closingText: string;
    from: string;
    date: string;
    to: string;
    subject: string;
    drawnOn: string;
    amount: number;
    currency: string;
    accountOf: string;
    drawnUnder: string;
    commission: string;
    expirationDate: string;
    senderName: string;
    organizationName: string;
}
type DocumentType = "invoice" | "credit_reference" | "credit_application" | "letter_of_credit";

export type { CreditApplication, CreditReference, DocumentType, EditorDoc, EditorNode, InlineContent, Invoice, InvoiceProduct, LetterOfCredit, LineItem, Mark, Template, TextStyle };
