/** Número WhatsApp: +55 31 9291-5190 (apenas dígitos para wa.me) */
export const WHATSAPP_DIGITS = "553192915190";

const defaultMessage =
  "Olá! Vim pelo site da Limaréh e gostaria de mais informações sobre o Jardim de Cristal.";

export function getWhatsAppUrl(message: string = defaultMessage): string {
  const params = new URLSearchParams({ text: message });
  return `https://wa.me/${WHATSAPP_DIGITS}?${params.toString()}`;
}

export function getSiteUrlForQr(): string {
  const fromEnv = import.meta.env.VITE_SITE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, "");
  if (typeof window !== "undefined") {
    return `${window.location.origin}${window.location.pathname}`.replace(/\/$/, "") || window.location.origin;
  }
  return "";
}
