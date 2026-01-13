import { NextRequest, NextResponse } from "next/server";
import { renderToStream } from "@react-pdf/renderer";
import { CreditReferenceTemplate, CreditApplicationTemplate, LetterOfCreditTemplate, PdfTemplate } from "@/app/lib/pdf-templates/components";
import { DocumentType } from "@/app/lib/pdf-templates/types";
import { createElement } from "react";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, data } = body as { type: DocumentType; data: any };

    let Component;
    switch (type) {
      case "invoice":
        Component = PdfTemplate;
        break;
      case "credit_reference":
        Component = CreditReferenceTemplate;
        break;
      case "credit_application":
        Component = CreditApplicationTemplate;
        break;
      case "letter_of_credit":
        Component = LetterOfCreditTemplate;
        break;
      default:
        return NextResponse.json({ error: "Invalid document type" }, { status: 400 });
    }

    // @ts-ignore - Dynamic component usage
    const stream = await renderToStream(createElement(Component, type === "invoice" ? data : { data }));
    
    return new NextResponse(stream as unknown as BodyInit, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${type}-${Date.now()}.pdf"`,
      },
    });
  } catch (error) {
    console.error("PDF Generation Error:", error);
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 });
  }
}
