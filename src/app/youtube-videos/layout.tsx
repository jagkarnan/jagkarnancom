export default async function YoutubeVideosLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<Record<string, string | string[] | undefined>>;
}) {
  await params;
  return <div className="py-10 md:py-12">{children}</div>;
}
