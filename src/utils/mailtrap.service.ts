import { MailtrapClient } from "mailtrap"
import "dotenv/config"

export const mailtrapClient = new MailtrapClient({ token: process.env.MAILTRAP_TOKEN || 'not found' })

export const sender = {
  email: "auth@gestion_salud.com",
  name: "Gestion Salud"
}





{/*
  import * as EmailTemplate from "./emailsTemplate";
import { MailtrapClient } from "mailtrap";

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export class EmailService {
  private client: MailtrapClient;

  constructor() {
    const token = process.env.MAILTRAP_TOKEN;
    if (!token) throw new Error("MAILTRAP_TOKEN is not defined in environment variables")
    this.client = new MailtrapClient({ token });
  }

  async sendEmail(options: EmailOptions): Promise<boolean> {
    try {
      const sender = { name: "Tu Aplicación", email: "no-reply@tuaplicacion.com" };
      await this.client.send({
        from: sender,
        to: [{ email: options.to }],
        subject: options.subject,
        html: options.html
      });
      return true;
    } catch (error) {
      console.error("Error sending email:", error);
      return false;
    }
  }

  async sendVerificationEmail(email: string, verificationToken: string): Promise<boolean> {
    const verificationUrl = `${process.env.FRONTEND_URL}/verify/${verificationToken}`;
    const emailOptions: EmailOptions = {
      to: email,
      subject: "Verifica tu cuenta",
      html: EmailTemplate.VERIFICATION_EMAIL_TEMPLATE
    };
    return this.sendEmail(emailOptions);
  }
}

export const emailService = new EmailService();

   */}