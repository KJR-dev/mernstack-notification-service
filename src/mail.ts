import config from "config";
import nodemailer, { Transporter } from "nodemailer";
import { Messages, NotificationTransfer } from "./types/notification-types";

export class MailTransport implements NotificationTransfer {
  private transporter: Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: config.get("mail.host"),
      port: config.get("mail.port"),
      secure: true, // Use true for port 465, false for port 587
      auth: {
        user: config.get("mail.auth.user"),
        pass: config.get("mail.auth.pass"),
      },
    });
  }
  async send(messages: Messages) {
    const info = await this.transporter.sendMail({
      from: config.get("mail.from"),
      // todo: validate for valid email.
      to: messages.to,
      subject: messages.subject,
      text: messages.text,
      html: messages.html,
    });

    console.log("Message sent:", info.messageId);
  }
}
