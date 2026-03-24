export function Footer() {
  return (
    <footer className="site-footer border-t border-white/10 py-10 text-sm text-foreground/60 ">
      {" "}
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 sm:px-6 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Jag Karnan</p>
      </div>{" "}
    </footer>
  );
}
