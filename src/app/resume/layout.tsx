import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Resume",
  alternates: { canonical: "/resume" },
};
export default async function ResumeLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<Record<string, string | string[] | undefined>>;
}) {
  await params;
  return <div className="py-10">{children}</div>;
}
