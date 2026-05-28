import { NextResponse } from "next/server";
import { RESUME_PDF_ZIP_FILENAME } from "@/lib/resumeDocumentOptions";
import { buildResumePdfZipBuffer } from "@/lib/resumeZip";

export const runtime = "nodejs";

export async function GET() {
  try {
    const buffer = await buildResumePdfZipBuffer();
    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="${RESUME_PDF_ZIP_FILENAME}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Error generating résumé PDF zip:", error);
    return new NextResponse("PDF zip generation failed", { status: 500 });
  }
}
