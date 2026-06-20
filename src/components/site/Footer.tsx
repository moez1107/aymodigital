import { Link } from "@tanstack/react-router";
import {
  Mail,
  Phone,
  MessageCircle,
  MapPin,
  CheckCircle,
} from "lucide-react";

import logo from "../../assets/logo.png";

import {
  PHONE_TEL,
  PHONE_INTL_DISPLAY,
  whatsappLink,
  EMAIL_PRIMARY,
  EMAIL_SECONDARY,
} from "@/lib/contact-info";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-white/60">
      <div className="container-px mx-auto max-w-7xl py-14 grid gap-10 md:grid-cols-2 lg:grid-cols-5">
        
        {/* ================= LOGO + ABOUT ================= */}
        <div className="lg:col-span-2">
          
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="AYMO Digital Logo"
              className="h-10 w-auto object-contain"
            />
          </Link>

          <p className="mt-4 max-w-md text-sm text-muted-foreground leading-relaxed">
            AYMO Digital is a global growth agency helping businesses scale
            through AI automation, content systems and performance marketing —
            delivering real results with execution-driven strategies.
          </p>

          {/* ================= PARTNER SECTION ================= */}
          <div className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm w-fit">
            <CheckCircle size={16} className="text-emerald-600" />

            <span className="text-emerald-700">
              Official Partner of{" "}
              <a
                href="https://amenterprises.tech"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-emerald-800 hover:underline"
              >
                AM Enterprises
              </a>
            </span>
          </div>

          {/* ================= CONTACT ================= */}
          <div className="mt-5 space-y-2 text-sm">
            <a
              href={`mailto:${EMAIL_PRIMARY}`}
              className="flex items-center gap-2 text-foreground/80 hover:text-primary"
            >
              <Mail size={14} className="text-primary" />
              {EMAIL_PRIMARY}
            </a>

            <a
              href={`mailto:${EMAIL_SECONDARY}`}
              className="flex items-center gap-2 text-foreground/80 hover:text-primary"
            >
              <Mail size={14} className="text-primary" />
              {EMAIL_SECONDARY}
            </a>

            <a
              href={`tel:${PHONE_TEL}`}
              className="flex items-center gap-2 text-foreground/80 hover:text-primary"
            >
              <Phone size={14} className="text-primary" />
              {PHONE_INTL_DISPLAY}
            </a>

            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-foreground/80 hover:text-emerald-600"
            >
              <MessageCircle size={14} className="text-emerald-500" />
              WhatsApp us
            </a>
          </div>
        </div>

        {/* ================= COMPANY ================= */}
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Company
          </div>

          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-primary text-foreground/80">About</Link></li>
            <li><Link to="/about/team" className="hover:text-primary text-foreground/80">Team</Link></li>
            <li><Link to="/careers" className="hover:text-primary text-foreground/80">Careers</Link></li>
            <li><Link to="/case-studies" className="hover:text-primary text-foreground/80">Case Studies</Link></li>
            <li><Link to="/blog" className="hover:text-primary text-foreground/80">Blog</Link></li>
          </ul>
        </div>

        {/* ================= SERVICES ================= */}
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Services
          </div>

          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/services/$slug" params={{ slug: "youtube-automation" }} className="hover:text-primary text-foreground/80">YouTube Automation</Link></li>
            <li><Link to="/services/$slug" params={{ slug: "ai-automation" }} className="hover:text-primary text-foreground/80">AI Automation</Link></li>
            <li><Link to="/services/$slug" params={{ slug: "chatbots" }} className="hover:text-primary text-foreground/80">Chatbots</Link></li>
            <li><Link to="/services/$slug" params={{ slug: "tiktok-growth" }} className="hover:text-primary text-foreground/80">TikTok Growth</Link></li>
            <li><Link to="/services/$slug" params={{ slug: "branding-design" }} className="hover:text-primary text-foreground/80">Branding & Design</Link></li>
            <li><Link to="/services/$slug" params={{ slug: "web-development" }} className="hover:text-primary text-foreground/80">Web Development</Link></li>
          </ul>
        </div>

        {/* ================= OFFICES (FIXED 3 CITIES) ================= */}
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Offices
          </div>

          <ul className="mt-4 space-y-4 text-sm">
            
            {/* Islamabad */}
            <li className="flex items-start gap-2">
              <MapPin size={14} className="mt-0.5 text-primary shrink-0" />
              <div className="text-foreground/80">
                <span className="font-medium">Islamabad (HQ)</span>
                <br />
                Blue Area, Islamabad, Pakistan
              </div>
            </li>

            {/* Rawalpindi */}
            <li className="flex items-start gap-2">
              <MapPin size={14} className="mt-0.5 text-primary shrink-0" />
              <div className="text-foreground/80">
                <span className="font-medium">Rawalpindi</span>
                <br />
                Saddar, Rawalpindi, Pakistan
              </div>
            </li>

            {/* Bahawalnagar */}
            <li className="flex items-start gap-2">
              <MapPin size={14} className="mt-0.5 text-primary shrink-0" />
              <div className="text-foreground/80">
                <span className="font-medium">Bahawalnagar</span>
                <br />
                City Center, Bahawalnagar, Pakistan
              </div>
            </li>
          </ul>

          <Link
            to="/contact"
            className="mt-5 inline-flex rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:brightness-110"
          >
            Get in touch →
          </Link>
        </div>
      </div>

      {/* ================= BOTTOM BAR ================= */}
      <div className="border-t border-border">
        <div className="container-px mx-auto max-w-7xl py-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} AYMO Digital. All rights reserved.</p>
          <p>
            Proudly partnered with{" "}
            <a
              href="https://amenterprises.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:underline"
            >
              AM Enterprises
            </a>
            {" "}· Serving USA · UK · UAE · Saudi Arabia · Canada · Australia
          </p>
        </div>
      </div>
    </footer>
  );
}