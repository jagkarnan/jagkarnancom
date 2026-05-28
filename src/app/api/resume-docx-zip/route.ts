import { NextResponse } from "next/server";
import { RESUME_DOCX_ZIP_FILENAME } from "@/lib/resumeDocumentOptions";
import { buildResumeDocxZipBuffer } from "@/lib/resumeZip";

export const runtime = "nodejs";

export async function GET() {
  try {
    const buffer = await buildResumeDocxZipBuffer();
    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="${RESUME_DOCX_ZIP_FILENAME}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Error generating résumé DOCX zip:", error);
    return new NextResponse("DOCX zip generation failed", { status: 500 });
  }
}
