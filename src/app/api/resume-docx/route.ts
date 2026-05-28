import { generateResumeDocxBuffer } from "@/lib/resumeDocx";
import { NextRequest, NextResponse } from "next/server";
import { RESUME_FILE_BASENAME, type ResumeDocumentVariant } from "@/lib/resumeDocumentOptions";

export const runtime = "nodejs";

function parseVariant(request: NextRequest): ResumeDocumentVariant {
  const value = request.nextUrl.searchParams.get("variant");
  return value === "concise" ? "concise" : "detailed";
}

export async function GET(request: NextRequest) {
  try {
    const variant = parseVariant(request);
    const buffer = await generateResumeDocxBuffer(variant);
    const suffix = variant === "concise" ? "concise" : "detailed";
    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": `attachment; filename="${RESUME_FILE_BASENAME}_${suffix}.docx"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Error generating résumé DOCX:", error);
    return new NextResponse("DOCX generation failed", { status: 500 });
  }
}
