import JSZip from "jszip";
import { generateResumeDocxBuffer } from "@/lib/resumeDocx";
import { generateResumePdfBuffer } from "@/lib/resumePdf";
import { RESUME_FILE_BASENAME } from "@/lib/resumeDocumentOptions";

export async function buildResumePdfZipBuffer(): Promise<Buffer> {
  const zip = new JSZip();
  const [concise, detailed] = await Promise.all([
    generateResumePdfBuffer("concise"),
    generateResumePdfBuffer("detailed"),
  ]);

  zip.file(`${RESUME_FILE_BASENAME}_concise.pdf`, concise);
  zip.file(`${RESUME_FILE_BASENAME}_detailed.pdf`, detailed);

  return zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" });
}

export async function buildResumeDocxZipBuffer(): Promise<Buffer> {
  const zip = new JSZip();
  const [concise, detailed] = await Promise.all([
    generateResumeDocxBuffer("concise"),
    generateResumeDocxBuffer("detailed"),
  ]);

  zip.file(`${RESUME_FILE_BASENAME}_concise.docx`, concise);
  zip.file(`${RESUME_FILE_BASENAME}_detailed.docx`, detailed);

  return zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" });
}
