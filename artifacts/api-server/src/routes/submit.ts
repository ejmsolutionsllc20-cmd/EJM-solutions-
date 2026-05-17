import { Router, type IRouter, type Request, type Response } from "express";
import nodemailer from "nodemailer";
import { z } from "zod";

const router: IRouter = Router();

const submitSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phone: z.string().min(1),
  email: z.string().email(),
  make: z.string().min(1),
  model: z.string().min(1),
  year: z.number(),
  service: z.string().min(1),
  details: z.string().optional(),
});

function createTransporter() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
}

function buildEmailHtml(data: z.infer<typeof submitSchema>): string {
  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #0f1f3d; color: white; padding: 20px 24px; border-radius: 8px 8px 0 0;">
        <h2 style="margin: 0; font-size: 20px;">New Key Service Request</h2>
        <p style="margin: 4px 0 0; color: #aab; font-size: 14px;">EJM Keyless Entry Solutions</p>
      </div>
      <div style="background: #f9f9f9; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e2e2e2;">
        <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
          <tr><td style="padding: 8px 0; color: #555; width: 140px;">Name</td><td style="padding: 8px 0; font-weight: 600;">${data.firstName} ${data.lastName}</td></tr>
          <tr><td style="padding: 8px 0; color: #555;">Phone</td><td style="padding: 8px 0; font-weight: 600;"><a href="tel:${data.phone}" style="color: #e05c00;">${data.phone}</a></td></tr>
          <tr><td style="padding: 8px 0; color: #555;">Email</td><td style="padding: 8px 0;"><a href="mailto:${data.email}" style="color: #e05c00;">${data.email}</a></td></tr>
          <tr><td colspan="2" style="padding: 12px 0 4px; border-top: 1px solid #ddd; color: #555; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Vehicle</td></tr>
          <tr><td style="padding: 8px 0; color: #555;">Make</td><td style="padding: 8px 0; font-weight: 600;">${data.make}</td></tr>
          <tr><td style="padding: 8px 0; color: #555;">Model</td><td style="padding: 8px 0; font-weight: 600;">${data.model}</td></tr>
          <tr><td style="padding: 8px 0; color: #555;">Year</td><td style="padding: 8px 0; font-weight: 600;">${data.year}</td></tr>
          <tr><td colspan="2" style="padding: 12px 0 4px; border-top: 1px solid #ddd; color: #555; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Service</td></tr>
          <tr><td style="padding: 8px 0; color: #555;">Type</td><td style="padding: 8px 0; font-weight: 600;">${data.service}</td></tr>
          ${data.details ? `<tr><td style="padding: 8px 0; color: #555; vertical-align: top;">Details</td><td style="padding: 8px 0;">${data.details}</td></tr>` : ""}
        </table>
      </div>
    </div>
  `;
}

function buildSmsText(data: z.infer<typeof submitSchema>): string {
  return (
    `NEW REQUEST - EJM Keyless\n` +
    `${data.firstName} ${data.lastName} | ${data.phone}\n` +
    `${data.year} ${data.make} ${data.model}\n` +
    `Service: ${data.service}`
  );
}

router.post("/submit-form", async (req: Request, res: Response) => {
  const parsed = submitSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid form data", issues: parsed.error.issues });
    return;
  }

  const data = parsed.data;
  const transporter = createTransporter();

  if (!transporter) {
    req.log.warn("Email not configured — GMAIL_USER or GMAIL_APP_PASSWORD missing");
    res.status(200).json({ ok: true, warned: "notifications_not_configured" });
    return;
  }

  const gmailUser = process.env.GMAIL_USER!;
  const smsGateway = process.env.SMS_GATEWAY ?? "2038059220@tmomail.net";

  try {
    await transporter.sendMail({
      from: `"EJM Keyless Forms" <${gmailUser}>`,
      to: gmailUser,
      subject: `New Request: ${data.service} — ${data.firstName} ${data.lastName}`,
      html: buildEmailHtml(data),
    });

    await transporter.sendMail({
      from: `"EJM" <${gmailUser}>`,
      to: smsGateway,
      subject: "",
      text: buildSmsText(data),
    });

    req.log.info({ name: `${data.firstName} ${data.lastName}`, service: data.service }, "Form submission sent");
    res.status(200).json({ ok: true });
  } catch (err) {
    req.log.error({ err }, "Failed to send notification");
    res.status(500).json({ error: "Failed to send notification" });
  }
});

export default router;
