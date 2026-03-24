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
  async rewrites() {
    return [
      {
        source: "/Jag_Karnan_Resume.pdf",
        destination: "/api/resume",
      },
    ];
  },
};

export default nextConfig;
