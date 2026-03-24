import { NextResponse } from "next/server";
import { generateResumePdfBuffer } from "@/lib/resumePdf";

export const runtime = "nodejs";

export async function GET() {
  try {
    const buffer = await generateResumePdfBuffer();
    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "application/pdf",
        'Content-Disposition': 'inline; filename="Jag_Karnan_Resume.pdf"',
        "Cache-Control": "public, max-age=0, must-revalidate",
      },
    });
  } catch (error) {
    console.error("Error generating résumé PDF:", error);
    return new NextResponse("PDF generation failed", { status: 500 });
  }
}
