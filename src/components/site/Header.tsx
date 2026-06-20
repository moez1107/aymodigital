import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Logo } from "./Logo";

type NavItem =
  | { to: string; label: string; children?: undefined }
  | { label: string; children: { to: string; label: string }[]; to?: undefined };

const nav: NavItem[] = [
  { to: "/", label: "Home" },
  {
    label: "About",
    children: [
      { to: "/about", label: "About Our Company" },
      { to: "/about/team", label: "Team" },
      { to: "/careers", label: "Careers" },
    ],
  },
  { to: "/services", label: "Services" },
  { to: "/blog", label: "Blog" },
  { to: "/faq", label: "FAQ" },
  { to: "/case-studies", label: "Case Studies" },
  { to: "/industries", label: "Industries" },
  { to: "/pricing", label: "Pricing" },
  { to: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <header className="sticky top-3 z-50 px-3 sm:px-4 md:px-6">
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-full border border-white/60 bg-white/90 px-3 py-2 backdrop-blur-xl transition-shadow sm:px-4 sm:py-2.5 ${
          scrolled
            ? "shadow-[0_15px_50px_rgba(15,50,70,0.10)]"
            : "shadow-[0_10px_40px_rgba(15,50,70,0.06)]"
        }`}
      >
        <Logo />

        <nav ref={dropdownRef} className="hidden xl:flex items-center gap-5">
          {nav.map((n) =>
            n.children ? (
              <div key={n.label} className="relative">
                <button
                  onClick={() => setOpenDropdown((v) => (v === n.label ? null : n.label))}
                  className="flex items-center gap-1 text-sm font-medium text-foreground/70 transition-colors hover:text-primary"
                >
                  {n.label}
                  <ChevronDown
                    size={14}
                    className={`transition-transform ${openDropdown === n.label ? "rotate-180" : ""}`}
                  />
                </button>
                {openDropdown === n.label && (
                  <div className="absolute left-1/2 top-full mt-3 w-56 -translate-x-1/2 rounded-2xl border border-border bg-white p-2 shadow-xl">
                    {n.children.map((c) => (
                      <Link
                        key={c.to}
                        to={c.to}
                        onClick={() => setOpenDropdown(null)}
                        className="block rounded-xl px-3 py-2 text-sm text-foreground/80 hover:bg-secondary hover:text-primary"
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={n.to}
                to={n.to}
                className="text-sm font-medium text-foreground/70 transition-colors hover:text-primary"
                activeProps={{ className: "text-primary" }}
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/contact"
            className="hidden md:inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-[oklch(0.68_0.13_210)] px-4 py-2 text-xs font-semibold text-white shadow-[0_10px_25px_-8px_oklch(0.68_0.13_210)] transition hover:-translate-y-0.5 hover:brightness-110 sm:px-5 sm:py-2.5 sm:text-sm"
          >
            Book a Call
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            className="xl:hidden inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-white"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="xl:hidden mt-2 mx-auto max-w-7xl rounded-3xl border border-border bg-white/95 backdrop-blur shadow-xl max-h-[80vh] overflow-y-auto">
          <div className="p-3 flex flex-col gap-1">
            {nav.map((n) =>
              n.children ? (
                <div key={n.label} className="flex flex-col">
                  <div className="px-3 pt-2 pb-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    {n.label}
                  </div>
                  {n.children.map((c) => (
                    <Link
                      key={c.to}
                      to={c.to}
                      onClick={() => setOpen(false)}
                      className="rounded-xl px-3 py-2.5 text-sm text-foreground/80 hover:bg-secondary"
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-2.5 text-sm text-foreground/80 hover:bg-secondary"
                >
                  {n.label}
                </Link>
              ),
            )}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-gradient-to-r from-primary to-[oklch(0.68_0.13_210)] px-4 py-2.5 text-center text-sm font-semibold text-white"
            >
              Book a Call
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
