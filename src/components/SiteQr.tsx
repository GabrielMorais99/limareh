import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { getSiteUrlForQr } from "../lib/links";

export function SiteQr() {
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(getSiteUrlForQr());
  }, []);

  if (!url) return <div className="h-48 w-48 animate-pulse rounded-xl bg-surface-container" />;

  return (
    <div className="inline-flex w-full max-w-[min(100%,280px)] flex-col items-center rounded-xl bg-surface-container-lowest p-4 shadow-[0_24px_64px_-32px_rgba(47,51,49,0.18)] sm:p-6">
      <div className="rounded-lg bg-white p-2 sm:p-3">
        <QRCode value={url} size={168} level="M" fgColor="#2f3331" bgColor="#ffffff" />
      </div>
      <p className="mt-4 max-w-[220px] text-center text-xs leading-relaxed text-on-surface-variant">
        Escaneie para abrir este site no celular
      </p>
      <p className="mt-1 max-w-[260px] break-all text-center text-[0.65rem] text-outline">
        {url}
      </p>
    </div>
  );
}
