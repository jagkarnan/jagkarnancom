export function isNavHrefActive(pathname: string, hash: string | null, href: string): boolean {
  if (href.startsWith("/#")) {
    const segment = href.slice(2);
    return pathname === "/" && hash === segment;
  }
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}
