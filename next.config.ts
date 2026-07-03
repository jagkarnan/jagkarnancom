import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

/** Pin file tracing to this app (avoids wrong root when a parent folder has another lockfile). */
const tracingRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  poweredByHeader: false,
  outputFileTracingRoot: tracingRoot,
  /** PDFKit reads `.afm` metrics from `node_modules/pdfkit/js/data` at runtime — keep it external + traced on Vercel. */
  serverExternalPackages: ["pdfkit", "fontkit"],
  outputFileTracingIncludes: {
    "/api/resume": ["./node_modules/pdfkit/js/data/**/*"],
  },
  /** Resume downloads are served as static files under /public/resume/.
   *  The legacy dynamic /api/resume and /api/resume-docx routes remain in
   *  place for the printable /resume page on /. */
  async rewrites() {
    return [
      {
        source: "/Jag_Karnan_Resume.pdf",
        destination: "/resume/Jag_Karnan_Resume.pdf",
      },
      {
        source: "/Jag_Karnan_Resume.docx",
        destination: "/resume/Jag_Karnan_Resume.docx",
      },
    ];
  },
};

export default nextConfig;
