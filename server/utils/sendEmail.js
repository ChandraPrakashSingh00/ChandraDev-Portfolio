import nodemailer from 'nodemailer'

let transporter

function getTransporter() {
  if (transporter) return transporter
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 465,
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
  return transporter
}

export default async function sendEmail({ to, subject, html, replyTo }) {
  const t = getTransporter()
  await t.sendMail({
    from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html,
    replyTo,
  })
}
