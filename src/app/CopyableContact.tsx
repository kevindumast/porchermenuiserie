"use client";

import { useState } from "react";

export default function CopyableContact() {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = (text: string, type: string) => {
    if (typeof window !== "undefined" && navigator?.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(type);
        setTimeout(() => setCopied(null), 2000);
      });
    } else {
      // Fallback pour les vieux navigateurs
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    }
  };

  return (
    <>
      <button
        onClick={() => copy("06 68 13 32 45", "phone")}
        className="w-full flex items-start gap-3 hover:opacity-70 transition-opacity group"
      >
        <span className="material-symbols-outlined text-base font-thin flex-shrink-0" aria-hidden="true">
          call
        </span>
        <div className="flex-1 text-left">
          <div className="text-base font-light tracking-widest">
            06&nbsp;68&nbsp;13&nbsp;32&nbsp;45
          </div>
          <div className="text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
            {copied === "phone" ? "✓ Copié" : "Copier"}
          </div>
        </div>
      </button>

      <button
        onClick={() => copy("porcher-menuiserie@outlook.fr", "email")}
        className="w-full flex items-start gap-3 hover:opacity-70 transition-opacity group"
      >
        <span className="material-symbols-outlined text-base font-thin flex-shrink-0" aria-hidden="true">
          mail
        </span>
        <div className="flex-1 text-left">
          <div className="text-xs font-light tracking-wide whitespace-nowrap">
            porcher-menuiserie@outlook.fr
          </div>
          <div className="text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
            {copied === "email" ? "✓ Copié" : "Copier"}
          </div>
        </div>
      </button>
    </>
  );
}
