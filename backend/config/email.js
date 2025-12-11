import nodemailer from "nodemailer";

const {
  SMTP_HOST = "smtp.office365.com",
  SMTP_PORT = 587,
  MAIL_USER,
  MAIL_PASS,
  MAIL_FROM,
} = process.env;

if (!MAIL_USER || !MAIL_PASS) {
  console.error("❌ MAIL_USER or MAIL_PASS missing — emails will fail!");
}

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: Number(SMTP_PORT),
  secure: false, // M365 uses TLS, not SSL
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS, // MUST BE M365 App Password
  },
  requireTLS: true,
  tls: {
    rejectUnauthorized: false,
  },
  pool: true,
  maxConnections: 5,
  maxMessages: 100,
});

console.log("📧 Verifying SMTP connection...");
transporter.verify((err) => {
  if (err) {
    console.error("❌ SMTP ERROR:", err.message);
  } else {
    console.log("✅ SMTP server ready to send emails!");
  }
});

export const mailFrom = MAIL_FROM || MAIL_USER;
export default transporter;
