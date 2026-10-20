"use client";

import { useRef, useState } from "react";
import { sendDevisEmail } from "./actions/sendEmail";

// Libellé visible au-dessus du champ ; le placeholder ne sert plus que d'exemple
const LABEL_CLASS = "type-caps text-on-surface-variant";
const FIELD_CLASS =
  "w-full bg-transparent border-0 border-b border-ocre/30 py-3 px-0 focus:ring-0 focus:border-ocre-dark transition-colors text-lg placeholder:text-on-surface-variant/80";

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(e.currentTarget);
    const result = await sendDevisEmail(formData);

    if (result.success) {
      setStatus("success");
      formRef.current?.reset();
    } else {
      setStatus("error");
      setErrorMsg(result.error || "Erreur inconnue.");
    }
  }

  return (
    // id="devis" : cible des boutons « Devis », sous la nav fixe grâce au scroll-mt
    <form id="devis" ref={formRef} className="grid grid-cols-1 gap-10 scroll-mt-32" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className={LABEL_CLASS}>Votre nom</label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            required
            className={FIELD_CLASS}
            type="text"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className={LABEL_CLASS}>Votre email</label>
          <input
            id="email"
            name="email"
            autoComplete="email"
            required
            className={FIELD_CLASS}
            placeholder="nom@exemple.fr"
            type="email"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="projet" className={LABEL_CLASS}>
          Type de projet <span className="normal-case tracking-normal">(facultatif)</span>
        </label>
        <input
          id="projet"
          name="projet"
          className={FIELD_CLASS}
          placeholder="Cuisine, parquet, cloison…"
          type="text"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="message" className={LABEL_CLASS}>Votre projet en quelques mots</label>
        <textarea
          id="message"
          name="message"
          required
          className={`${FIELD_CLASS} resize-none`}
          placeholder="Pièce, dimensions, délais souhaités…"
          rows={4}
        />
      </div>

      <div>
        <button
          className="bg-ocre-dark text-on-primary px-12 py-5 type-button hover:bg-on-surface active:scale-95 transition-[background-color,transform] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocre-dark focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:opacity-50"
          type="submit"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Envoi en cours…" : "Envoyer ma demande"}
        </button>

        {/* Annoncé aux lecteurs d'écran à chaque changement d'état */}
        <div role="status" aria-live="polite">
          {status === "success" && (
            <p className="mt-4 text-sm text-ocre-dark tracking-wide">
              Message envoyé ! Nous vous répondrons sous 48 h.
            </p>
          )}
          {status === "error" && (
            <p className="mt-4 text-sm text-red-700 dark:text-red-400 tracking-wide">{errorMsg}</p>
          )}
        </div>
        {status === "idle" && (
          <p className="mt-4 text-xs text-on-surface-variant tracking-wide">
            Réponse sous 48&nbsp;h · Devis gratuit et sans engagement
          </p>
        )}
      </div>
    </form>
  );
}
