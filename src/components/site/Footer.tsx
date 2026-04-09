export function Footer() {
  return (
    <footer className="site-footer py-12 text-sm leading-relaxed text-foreground/60">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-2 px-4 sm:px-6 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Jag Karnan</p>
      </div>
    </footer>
  );
}
