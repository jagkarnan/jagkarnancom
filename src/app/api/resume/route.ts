import { NextRequest, NextResponse } from "next/server";
import { generateResumePdfBuffer } from "@/lib/resumePdf";
import { RESUME_FILE_BASENAME, type ResumeDocumentVariant } from "@/lib/resumeDocumentOptions";

export const runtime = "nodejs";

function parseVariant(request: NextRequest): ResumeDocumentVariant {
  const value = request.nextUrl.searchParams.get("variant");
  return value === "concise" ? "concise" : "detailed";
}

export async function GET(request: NextRequest) {
  try {
    const variant = parseVariant(request);
    const buffer = await generateResumePdfBuffer(variant);
    const suffix = variant === "concise" ? "concise" : "detailed";
    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${RESUME_FILE_BASENAME}_${suffix}.pdf"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Error generating résumé PDF:", error);
    return new NextResponse("PDF generation failed", { status: 500 });
  }
}
