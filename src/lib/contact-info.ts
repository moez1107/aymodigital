// Single source of truth for all contact info / CTAs
export const PHONE_DISPLAY = "0325 6900925";
export const PHONE_INTL_DISPLAY = "+92 325 6900925";
export const PHONE_TEL = "+923256900925"; // for tel: links
export const WHATSAPP_NUMBER = "923256900925"; // for wa.me (no + / spaces)
export const WHATSAPP_DEFAULT_MESSAGE =
  "Hi AYMO Digital! I'd like to know more about your services.";

export const whatsappLink = (msg = WHATSAPP_DEFAULT_MESSAGE) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

export const EMAIL_PRIMARY = "info@aymo.digital";
export const EMAIL_SECONDARY = "info@amenterprises.tech";
