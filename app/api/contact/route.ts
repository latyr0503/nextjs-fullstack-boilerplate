import { neon } from "@neondatabase/serverless";
import { Resend } from "resend";
import { NextResponse } from "next/server";
import { z } from "zod";

// Schema de validation strict avec Zod
const contactSchema = z.object({
  name: z
    .string({ required_error: "Le nom est obligatoire." })
    .trim()
    .min(2, "Le nom doit comporter au moins 2 caractères.")
    .max(100, "Le nom ne peut pas dépasser 100 caractères."),
  email: z
    .string()
    .trim()
    .email("L'adresse email est invalide.")
    .max(255)
    .optional()
    .or(z.literal("")),
  telephone: z
    .string()
    .trim()
    .max(30, "Le numéro de téléphone est trop long.")
    .optional()
    .or(z.literal("")),
  message: z
    .string({ required_error: "Le message est obligatoire." })
    .trim()
    .min(5, "Le message doit comporter au moins 5 caractères.")
    .max(5000, "Le message est trop long (maximum 5000 caractères)."),
});

// Échappement HTML pour prévenir les injections dans les emails
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Rate Limiter simple en mémoire (5 requêtes par minute par IP)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  // Nettoyage régulier
  if (rateLimitMap.size > 1000) {
    rateLimitMap.forEach((val, key) => {
      if (val.resetTime < now) rateLimitMap.delete(key);
    });
  }

  if (!entry || entry.resetTime < now) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  entry.count++;
  return false;
}

// Initialisation idempotente de la table SQL (une seule fois par cycle serveur)
let tableInitialized = false;
async function ensureTable(sql: any) {
  if (tableInitialized) return;
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS contacts (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255),
        telephone VARCHAR(50),
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    tableInitialized = true;
  } catch (err) {
    console.error("Erreur d'initialisation de la table contacts:", err);
  }
}

export async function POST(req: Request) {
  try {
    // 1. Contrôle du Rate Limit
    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      "anonymous";

    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        { error: "Trop de requêtes. Veuillez patienter avant de réessayer." },
        { status: 429 }
      );
    }

    // 2. Validation du payload
    const body = await req.json();
    const parseResult = contactSchema.safeParse(body);

    if (!parseResult.success) {
      const firstError = parseResult.error.errors[0]?.message || "Données invalides.";
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const { name, email, telephone, message } = parseResult.data;

    // 3. Sauvegarde Neon PostgreSQL (si configuré)
    if (process.env.DATABASE_URL) {
      try {
        const sql = neon(process.env.DATABASE_URL);
        await ensureTable(sql);
        await sql`
          INSERT INTO contacts (name, email, telephone, message)
          VALUES (${name}, ${email || null}, ${telephone || null}, ${message})
        `;
      } catch (dbError) {
        console.error("Erreur de sauvegarde base de données:", dbError);
        // On continue pour ne pas bloquer l'envoi email si la base échoue
      }
    }

    // 4. Notification Email avec Resend (si configuré)
    const resendApiKey = process.env.NEXT_RESEND_API_KEY;
    const recipientEmail = process.env.NEXT_PUBLIC_EMAIL;

    if (resendApiKey && recipientEmail) {
      try {
        const resend = new Resend(resendApiKey);
        const safeName = escapeHtml(name);
        const safeEmail = email ? escapeHtml(email) : "Non renseigné";
        const safePhone = telephone ? escapeHtml(telephone) : "Non renseigné";
        const safeMessage = escapeHtml(message);

        await resend.emails.send({
          from: `Contact <${recipientEmail}>`,
          to: recipientEmail,
          replyTo: email || undefined,
          subject: `Nouveau message de ${safeName}`,
          html: `
            <!DOCTYPE html>
            <html lang="fr">
              <head>
                <meta charset="utf-8">
              </head>
              <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f4f4f5; padding: 32px 16px; margin: 0;">
                <div style="max-width: 580px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e4e4e7;">
                  <div style="background-color: #18181b; padding: 24px; text-align: center;">
                    <h1 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 600;">Nouveau message de contact</h1>
                  </div>
                  <div style="padding: 28px;">
                    <p style="margin: 0 0 4px; font-size: 12px; font-weight: 600; text-transform: uppercase; color: #71717a;">Nom</p>
                    <p style="margin: 0 0 20px; font-size: 16px; color: #09090b; font-weight: 500;">${safeName}</p>

                    <p style="margin: 0 0 4px; font-size: 12px; font-weight: 600; text-transform: uppercase; color: #71717a;">Email</p>
                    <p style="margin: 0 0 20px; font-size: 16px; color: #09090b;">${safeEmail}</p>

                    <p style="margin: 0 0 4px; font-size: 12px; font-weight: 600; text-transform: uppercase; color: #71717a;">Téléphone</p>
                    <p style="margin: 0 0 20px; font-size: 16px; color: #09090b;">${safePhone}</p>

                    <p style="margin: 0 0 4px; font-size: 12px; font-weight: 600; text-transform: uppercase; color: #71717a;">Message</p>
                    <div style="background-color: #f4f4f5; border-radius: 8px; padding: 16px; font-size: 14px; line-height: 1.6; color: #27272a; white-space: pre-wrap;">${safeMessage}</div>
                  </div>
                </div>
              </body>
            </html>
          `,
        });
      } catch (emailError) {
        console.error("Erreur d'envoi Resend:", emailError);
      }
    }

    // 5. Notification Telegram (optionnelle)
    if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
      try {
        const safeName = escapeHtml(name);
        const safeEmail = email ? escapeHtml(email) : "Non renseigné";
        const safePhone = telephone ? escapeHtml(telephone) : "Non renseigné";
        const safeMessage = escapeHtml(message);

        const telegramUrl = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;
        const text = `📬 <b>Nouveau message !</b>\n\n<b>Nom:</b> ${safeName}\n<b>Email:</b> ${safeEmail}\n<b>Téléphone:</b> ${safePhone}\n\n<b>Message:</b>\n${safeMessage}`;

        await fetch(telegramUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: process.env.TELEGRAM_CHAT_ID,
            text,
            parse_mode: "HTML",
          }),
        });
      } catch (tgError) {
        console.error("Erreur Telegram:", tgError);
      }
    }

    return NextResponse.json({ success: true, message: "Message envoyé avec succès." });
  } catch (error) {
    console.error("Erreur serveur dans /api/contact:", error);
    return NextResponse.json(
      { error: "Une erreur interne est survenue. Veuillez réessayer ultérieurement." },
      { status: 500 }
    );
  }
}
