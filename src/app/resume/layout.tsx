import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Resume",
  alternates: { canonical: "/resume" },
};
export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="py-10">{children}</div>;
}
