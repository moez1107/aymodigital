import { Link } from "@tanstack/react-router";
import logo from "../../assets/aymo-logo.asset.json";

export function Logo({
  variant = "full",
  className = "",
  showTagline = false,
}: {
  variant?: "full" | "mark";
  className?: string;
  showTagline?: boolean;
}) {
  return (
    <Link
      to="/"
      aria-label="AYMO Digital — Home"
      className={`group inline-flex items-center gap-3 ${className}`}
    >
      <img
        src={logo.url}
        alt="AYMO Digital monogram"
        width={48}
        height={48}
        className="h-9 w-9 sm:h-10 sm:w-10 shrink-0 object-contain transition-transform duration-300 group-hover:scale-105"
      />
      {variant === "full" && (
        <span className="flex flex-col leading-tight">
          <span className="font-display text-sm sm:text-base font-extrabold tracking-tight text-foreground">
            AYMO <span className="text-primary">DIGITAL</span>
          </span>
          {showTagline && (
            <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              Where Digital Meets Innovation
            </span>
          )}
        </span>
      )}
    </Link>
  );
}
