import type { Metadata } from "next";
import { Crimson_Text, JetBrains_Mono, Montserrat, Outfit } from "next/font/google";
import "./globals.css";
import { FloatingWhatsAppButton } from "@/components/site/FloatingWhatsAppButton";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
const outfit = Outfit({ variable: "--font-outfit", subsets: ["latin"] });
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const crimsonText = Crimson_Text({
  variable: "--font-crimson",
  subsets: ["latin"],
  weight: ["400"],
});
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: {
    default:
      "Jag Karnan — AI Architect, Hands-on AI Engineer",
    template: "%s | Jag Karnan",
  },
  description:
    "AI-native thinker with deep practice in AI automation and professional AI coding. Skills, certifications, experience, and projects.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  openGraph: {
    title:
      "Jag Karnan — AI Architect, Hands-on AI Engineer",
    description:
      "AI-native thinker with deep practice in AI automation and professional AI coding.",
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
              "try{document.documentElement.setAttribute('data-theme','light');localStorage.setItem('theme','light');}catch(e){document.documentElement.setAttribute('data-theme','light');}",
              "(function(){var a='bis_skin_checked';function s(e){try{if(!e||e.nodeType!==1)return;if(e.hasAttribute(a))e.removeAttribute(a);e.querySelectorAll('['+a+']').forEach(function(n){n.removeAttribute(a);});}catch(x){}}s(document.documentElement);if(typeof MutationObserver==='undefined')return;var o=new MutationObserver(function(r){for(var i=0;i<r.length;i++){var x=r[i];if(x.type==='attributes'&&x.attributeName===a&&x.target&&x.target.hasAttribute(a))x.target.removeAttribute(a);if(x.type==='childList')x.addedNodes.forEach(function(n){if(n.nodeType===1)s(n);});}});o.observe(document.documentElement,{subtree:true,attributes:true,attributeFilter:[a],childList:true});function d(){try{o.disconnect();}catch(x){}}if(document.readyState==='complete')setTimeout(d,8000);else window.addEventListener('load',function(){setTimeout(d,8000);});})();",
            ].join(";"),
          }}
        />
      </head>
      <body
        className={`${outfit.variable} ${montserrat.variable} ${crimsonText.variable} ${jetbrainsMono.variable} antialiased`}
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
