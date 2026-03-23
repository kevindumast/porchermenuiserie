"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendDevisEmail(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const projet = formData.get("projet") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    return { success: false, error: "Champs obligatoires manquants." };
  }

  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: process.env.EMAIL_TO!,
      subject: `Demande de devis — ${projet || "Projet"}`,
      html: `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Demande de devis</title>
</head>
<body style="margin:0;padding:0;background-color:#fff8f4;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:#221a11;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#fff8f4;padding:48px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;">

          <!-- Header -->
          <tr>
            <td style="background-color:#A48654;padding:40px 48px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <p style="margin:0 0 4px 0;font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:rgba(255,255,255,0.7);">Nouvelle demande</p>
                    <h1 style="margin:0;font-size:28px;font-weight:300;color:#ffffff;letter-spacing:0.05em;">Demande de devis</h1>
                  </td>
                  <td align="right" style="vertical-align:middle;">
                    <div style="width:48px;height:48px;border:1px solid rgba(255,255,255,0.4);display:inline-flex;align-items:center;justify-content:center;text-align:center;line-height:48px;">
                      <span style="font-size:22px;color:#ffffff;font-family:Georgia,serif;">P</span>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Intro -->
          <tr>
            <td style="padding:40px 48px 0 48px;">
              <p style="margin:0;font-size:13px;letter-spacing:0.2em;text-transform:uppercase;color:#A48654;">Porcher Menuiserie</p>
              <div style="width:32px;height:1px;background-color:#A48654;margin:12px 0 24px 0;opacity:0.4;"></div>
              <p style="margin:0;font-size:15px;color:#4d463a;line-height:1.75;">Un nouveau client souhaite obtenir un devis. Voici ses coordonnées et les détails de son projet.</p>
            </td>
          </tr>

          <!-- Fields -->
          <tr>
            <td style="padding:40px 48px;">
              <table width="100%" cellpadding="0" cellspacing="0">

                <tr>
                  <td style="padding-bottom:24px;border-bottom:1px solid #F3E4D5;">
                    <p style="margin:0 0 4px 0;font-size:10px;letter-spacing:0.25em;text-transform:uppercase;color:#A48654;">Nom</p>
                    <p style="margin:0;font-size:18px;font-weight:300;color:#221a11;">${name}</p>
                  </td>
                </tr>

                <tr>
                  <td style="padding:24px 0;border-bottom:1px solid #F3E4D5;">
                    <p style="margin:0 0 4px 0;font-size:10px;letter-spacing:0.25em;text-transform:uppercase;color:#A48654;">Email</p>
                    <p style="margin:0;font-size:18px;font-weight:300;color:#221a11;">
                      <a href="mailto:${email}" style="color:#A48654;text-decoration:none;">${email}</a>
                    </p>
                  </td>
                </tr>

                <tr>
                  <td style="padding:24px 0;border-bottom:1px solid #F3E4D5;">
                    <p style="margin:0 0 4px 0;font-size:10px;letter-spacing:0.25em;text-transform:uppercase;color:#A48654;">Type de projet</p>
                    <p style="margin:0;font-size:18px;font-weight:300;color:#221a11;">${projet || "Non précisé"}</p>
                  </td>
                </tr>

                <tr>
                  <td style="padding:24px 0;">
                    <p style="margin:0 0 12px 0;font-size:10px;letter-spacing:0.25em;text-transform:uppercase;color:#A48654;">Message</p>
                    <p style="margin:0;font-size:15px;font-weight:300;color:#4d463a;line-height:1.75;background-color:#fff8f4;padding:24px;border-left:2px solid #A48654;">${message.replace(/\n/g, "<br/>")}</p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding:0 48px 48px 48px;">
              <a href="mailto:${email}" style="display:inline-block;background-color:#A48654;color:#ffffff;text-decoration:none;padding:16px 32px;font-size:11px;letter-spacing:0.25em;text-transform:uppercase;font-weight:700;">
                Répondre au client
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#F3E4D5;padding:24px 48px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <p style="margin:0;font-size:11px;color:#4d463a;letter-spacing:0.1em;">Porcher Menuiserie · Loire-Atlantique &amp; Vendée</p>
                    <p style="margin:4px 0 0 0;font-size:11px;color:#A48654;letter-spacing:0.1em;">06 68 13 32 45 · porcher-menuiserie@outlook.fr</p>
                  </td>
                  <td align="right">
                    <p style="margin:0;font-size:10px;color:#7f7669;letter-spacing:0.15em;text-transform:uppercase;">© 2025</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Erreur envoi email:", error);
    return { success: false, error: "Erreur lors de l'envoi. Réessayez." };
  }
}
