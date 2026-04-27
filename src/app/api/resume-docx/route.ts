import { generateResumeDocxBuffer } from "@/lib/resumeDocx";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  try {
    const buffer = await generateResumeDocxBuffer();
    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": 'attachment; filename="Jag_Karnan_Resume.docx"',
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Error generating résumé DOCX:", error);
    return new NextResponse("DOCX generation failed", { status: 500 });
  }
}
