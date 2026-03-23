"use client";

import { useRef, useState } from "react";
import { sendDevisEmail } from "./actions/sendEmail";

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
    <form ref={formRef} className="md:col-span-8 grid grid-cols-1 gap-12" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="sr-only">Votre nom</label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            required
            className="w-full bg-transparent border-0 border-b border-ocre/30 py-4 px-0 focus:ring-0 focus:border-ocre transition-colors font-light text-lg placeholder:text-outline/40"
            placeholder="Votre Nom"
            type="text"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="sr-only">Votre email</label>
          <input
            id="email"
            name="email"
            autoComplete="email"
            required
            className="w-full bg-transparent border-0 border-b border-ocre/30 py-4 px-0 focus:ring-0 focus:border-ocre transition-colors font-light text-lg placeholder:text-outline/40"
            placeholder="Email"
            type="email"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="projet" className="sr-only">Type de projet</label>
        <input
          id="projet"
          name="projet"
          className="w-full bg-transparent border-0 border-b border-ocre/30 py-4 px-0 focus:ring-0 focus:border-ocre transition-colors font-light text-lg placeholder:text-outline/40"
          placeholder="Type de projet (Cuisine, Parquet, Cloison…)"
          type="text"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="message" className="sr-only">Votre message</label>
        <textarea
          id="message"
          name="message"
          required
          className="w-full bg-transparent border-0 border-b border-ocre/30 py-4 px-0 focus:ring-0 focus:border-ocre transition-colors font-light text-lg placeholder:text-outline/40 resize-none"
          placeholder="Votre message…"
          rows={4}
        />
      </div>

      <div>
        <button
          className="bg-ocre text-on-primary px-12 py-5 text-xs uppercase tracking-widest font-bold hover:opacity-90 active:scale-95 transition-all disabled:opacity-50"
          type="submit"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Envoi en cours…" : "Envoyer ma demande"}
        </button>

        {status === "success" && (
          <p className="mt-4 text-sm text-ocre tracking-wide">
            Message envoyé ! Nous vous répondrons sous 48 h.
          </p>
        )}
        {status === "error" && (
          <p className="mt-4 text-sm text-red-500 tracking-wide">{errorMsg}</p>
        )}
        {status === "idle" && (
          <p className="mt-4 text-[11px] text-on-surface-variant/60 tracking-wide">
            Réponse sous 48&nbsp;h · Devis gratuit et sans engagement
          </p>
        )}
      </div>
    </form>
  );
}
