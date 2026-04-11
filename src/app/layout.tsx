import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FloatingWhatsAppButton } from "@/components/site/FloatingWhatsAppButton";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: { default: "Jag Karnan - AI Partner", template: "%s | Jag Karnan" },
  description:
    "AI-focused online resume: skills, certifications, experience, and projects.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  openGraph: {
    title: "Jag Karnan - AI Partner",
    description:
      "AI-focused online resume: skills, certifications, experience, and projects.",
    type: "website",
  },
  alternates: { canonical: "/" },
};
export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<Record<string, string | string[] | undefined>>;
}>) {
  await params;
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* One inline script: extensions often replace a *second* head script with their executor (breaks hydration). */}
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: [
              "try{var t=localStorage.getItem('theme');if(t==='light')document.documentElement.setAttribute('data-theme','light');}catch(e){}",
              "(function(){var a='bis_skin_checked';function s(e){try{if(!e||e.nodeType!==1)return;if(e.hasAttribute(a))e.removeAttribute(a);e.querySelectorAll('['+a+']').forEach(function(n){n.removeAttribute(a);});}catch(x){}}s(document.documentElement);if(typeof MutationObserver==='undefined')return;var o=new MutationObserver(function(r){for(var i=0;i<r.length;i++){var x=r[i];if(x.type==='attributes'&&x.attributeName===a&&x.target&&x.target.hasAttribute(a))x.target.removeAttribute(a);if(x.type==='childList')x.addedNodes.forEach(function(n){if(n.nodeType===1)s(n);});}});o.observe(document.documentElement,{subtree:true,attributes:true,attributeFilter:[a],childList:true});function d(){try{o.disconnect();}catch(x){}}if(document.readyState==='complete')setTimeout(d,8000);else window.addEventListener('load',function(){setTimeout(d,8000);});})();",
            ].join(";"),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <div className="ai-grid min-h-dvh">
          <Header />
          {children}
          <Footer />
          <FloatingWhatsAppButton />
        </div>
      </body>
    </html>
  );
}
