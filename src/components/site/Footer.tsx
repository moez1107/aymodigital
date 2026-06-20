import { Link } from "@tanstack/react-router";
import { Mail, Phone, MessageCircle, MapPin } from "lucide-react";
import { Logo } from "./Logo";
import { PHONE_TEL, PHONE_INTL_DISPLAY, whatsappLink, EMAIL_PRIMARY, EMAIL_SECONDARY } from "@/lib/contact-info";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-white/60">
      <div className="container-px mx-auto max-w-7xl py-14 grid gap-10 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Logo showTagline />
          <p className="mt-4 max-w-md text-sm text-muted-foreground leading-relaxed">
            AYMO Digital is a global growth agency. We help businesses scale through AI
            automation, content systems and performance marketing — proudly partnered with{" "}
            <span className="font-semibold text-foreground">AM Enterprises</span>.
          </p>
          <div className="mt-5 space-y-2 text-sm">
            <a href={`mailto:${EMAIL_PRIMARY}`} className="flex items-center gap-2 text-foreground/80 hover:text-primary">
              <Mail size={14} className="text-primary" /> {EMAIL_PRIMARY}
            </a>
            <a href={`mailto:${EMAIL_SECONDARY}`} className="flex items-center gap-2 text-foreground/80 hover:text-primary">
              <Mail size={14} className="text-primary" /> {EMAIL_SECONDARY}
            </a>
            <a href={`tel:${PHONE_TEL}`} className="flex items-center gap-2 text-foreground/80 hover:text-primary">
              <Phone size={14} className="text-primary" /> {PHONE_INTL_DISPLAY}
            </a>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-foreground/80 hover:text-emerald-600">
              <MessageCircle size={14} className="text-emerald-500" /> WhatsApp us
            </a>
          </div>
        </div>

        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Company</div>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/about" className="text-foreground/80 hover:text-primary">About</Link></li>
            <li><Link to="/about/team" className="text-foreground/80 hover:text-primary">Team</Link></li>
            <li><Link to="/careers" className="text-foreground/80 hover:text-primary">Careers</Link></li>
            <li><Link to="/case-studies" className="text-foreground/80 hover:text-primary">Case Studies</Link></li>
            <li><Link to="/blog" className="text-foreground/80 hover:text-primary">Blog</Link></li>
          </ul>
        </div>

        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Services</div>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/services/$slug" params={{ slug: "youtube-automation" }} className="text-foreground/80 hover:text-primary">YouTube Automation</Link></li>
            <li><Link to="/services/$slug" params={{ slug: "ai-automation" }} className="text-foreground/80 hover:text-primary">AI Automation</Link></li>
            <li><Link to="/services/$slug" params={{ slug: "chatbots" }} className="text-foreground/80 hover:text-primary">Chatbots</Link></li>
            <li><Link to="/services/$slug" params={{ slug: "tiktok-growth" }} className="text-foreground/80 hover:text-primary">TikTok Growth</Link></li>
            <li><Link to="/services/$slug" params={{ slug: "branding-design" }} className="text-foreground/80 hover:text-primary">Branding & Design</Link></li>
            <li><Link to="/services/$slug" params={{ slug: "web-development" }} className="text-foreground/80 hover:text-primary">Web Development</Link></li>
          </ul>
        </div>

        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Locations</div>
          <ul className="mt-4 space-y-2 text-sm">
            <li className="flex items-start gap-2"><MapPin size={14} className="mt-0.5 text-primary shrink-0" /><span className="text-foreground/80">Islamabad (HQ), Rawalpindi, Bahawalnagar — Pakistan</span></li>
            <li className="flex items-start gap-2"><MapPin size={14} className="mt-0.5 text-primary shrink-0" /><span className="text-foreground/80">Tolworth & Wimbledon — UK</span></li>
          </ul>
          <Link
            to="/contact"
            className="mt-5 inline-flex rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:brightness-110"
          >
            Get in touch →
          </Link>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-px mx-auto max-w-7xl py-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} AYMO Digital. All rights reserved.</p>
          <p>Serving USA · UK · UAE · Saudi Arabia · Canada · Australia</p>
        </div>
      </div>
    </footer>
  );
}
