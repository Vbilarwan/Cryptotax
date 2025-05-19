import nodemailer from "nodemailer";
import { InsertContactMessage } from "@shared/schema";

// Configure email transport
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER || "",
    pass: process.env.EMAIL_PASSWORD || "",
  },
});

// Email target
const CONTACT_EMAIL = "vvkbilarwan@gmail.com";

export async function sendContactEmail(message: InsertContactMessage): Promise<void> {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER || "noreply@cryptoaimanager.com",
      to: CONTACT_EMAIL,
      subject: "New Contact Message from Crypto AI Manager",
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${message.name}</p>
        <p><strong>Email:</strong> ${message.email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.message.replace(/\n/g, "<br>")}</p>
        <hr>
        <p><em>This message was sent from the Crypto AI Manager contact form.</em></p>
      `,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Failed to send email:", error);
    throw new Error("Failed to send email");
  }
}
