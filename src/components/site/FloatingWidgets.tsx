import { useEffect, useState } from "react";
import { MessageCircle, ArrowUp, Phone, X, Send, Loader2 } from "lucide-react";
import { PHONE_TEL, PHONE_INTL_DISPLAY, whatsappLink } from "@/lib/contact-info";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function FloatingWidgets() {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [msg, setMsg] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !msg.trim()) {
      toast.error("Please enter your name and message");
      return;
    }
    setSending(true);
    try {
      const { error } = await supabase.from("messages").insert({
        name: name.trim(),
        phone: phone.trim() || null,
        message: msg.trim(),
        source: "floating_widget",
        whatsapp_sent: true,
      });
      if (error) throw error;
      const waText = `Hi AYMO Digital!\n\nName: ${name}\n${phone ? `Phone: ${phone}\n` : ""}Message: ${msg}`;
      window.open(whatsappLink(waText), "_blank", "noopener,noreferrer");
      setName("");
      setPhone("");
      setMsg("");
      toast.success("Message sent — we'll reply on WhatsApp");
      setOpen(false);
    } catch (err: any) {
      toast.error(err?.message ?? "Failed to send");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {open && (
        <div className="animate-fade-in w-[300px] rounded-2xl border border-border bg-white p-4 shadow-[0_20px_60px_-15px_rgba(15,50,70,0.25)]">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-emerald-500 text-white">
                <MessageCircle size={18} />
              </div>
              <div>
                <div className="text-sm font-semibold text-foreground">AYMO Digital</div>
                <div className="text-[11px] text-emerald-600">● Online now</div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close" className="text-muted-foreground hover:text-foreground">
              <X size={16} />
            </button>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Hi there 👋 Send a message — it lands on WhatsApp & our dashboard.
          </p>
          <form onSubmit={sendMessage} className="mt-3 space-y-2">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name *"
              maxLength={100}
              className="w-full rounded-lg border border-border bg-white px-3 py-2 text-xs outline-none focus:border-emerald-500"
            />
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone (optional)"
              maxLength={30}
              className="w-full rounded-lg border border-border bg-white px-3 py-2 text-xs outline-none focus:border-emerald-500"
            />
            <textarea
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              placeholder="Your message *"
              rows={2}
              maxLength={500}
              className="w-full resize-none rounded-lg border border-border bg-white px-3 py-2 text-xs outline-none focus:border-emerald-500"
            />
            <button
              type="submit"
              disabled={sending}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-3 py-2.5 text-xs font-semibold text-white transition hover:bg-emerald-600 disabled:opacity-60"
            >
              {sending ? <Loader2 className="animate-spin" size={14} /> : <Send size={14} />}
              {sending ? "Sending…" : "Send & Open WhatsApp"}
            </button>
          </form>
          <a
            href={`tel:${PHONE_TEL}`}
            className="mt-2 flex items-center justify-center gap-2 rounded-xl border border-border px-3 py-2 text-xs font-semibold text-foreground transition hover:bg-secondary"
          >
            <Phone size={12} /> Call {PHONE_INTL_DISPLAY}
          </a>
        </div>
      )}

      {show && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="grid h-11 w-11 place-items-center rounded-full border border-border bg-white text-foreground shadow-lg transition hover:-translate-y-0.5 hover:border-primary/40"
        >
          <ArrowUp size={18} />
        </button>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Chat with us on WhatsApp"
        className="group relative grid h-14 w-14 place-items-center rounded-full bg-emerald-500 text-white shadow-[0_15px_40px_-10px_rgba(16,185,129,0.6)] transition hover:scale-105"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500 opacity-30" />
        <MessageCircle size={24} className="relative" />
      </button>
    </div>
  );
}
