"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "");

export async function submitContactForm(formData: FormData) {
  try {
    const fullName = formData.get("fullName") as string;
    const emailAddress = formData.get("emailAddress") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    // 1. Strict Server-Side Validation
    if (!fullName || typeof fullName !== "string" || fullName.trim().length < 2 || fullName.length > 100) {
      return { success: false, error: "Please provide a valid full name." };
    }

    if (!emailAddress || typeof emailAddress !== "string" || emailAddress.length > 254) {
      return { success: false, error: "Please provide a valid email address." };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailAddress)) {
      return { success: false, error: "Please provide a valid email address." };
    }

    if (!subject || typeof subject !== "string" || subject.trim().length < 2 || subject.length > 200) {
      return { success: false, error: "Please provide a valid subject." };
    }

    if (!message || typeof message !== "string" || message.trim().length < 10 || message.length > 5000) {
      return { success: false, error: "Message must be between 10 and 5000 characters." };
    }

    // 2. Send emails via Resend
    if (!process.env.RESEND_API_KEY) {
      console.warn("RESEND_API_KEY is not set. Contact form submission skipped.");
      return { success: false, error: "Email service is currently unavailable. Please try again later." };
    }

    const { error: sendError } = await resend.emails.send({
      from: "UX With Motion <onboarding@resend.dev>",
      to: "gfxwithsahil@gmail.com",
      replyTo: emailAddress,
      subject: `New Contact Form Submission: ${subject.trim()}`,
      text: `Name: ${fullName.trim()}\nEmail: ${emailAddress.trim()}\nSubject: ${subject.trim()}\nMessage:\n${message.trim()}`,
    });

    if (sendError) {
      console.error("Resend error:", sendError);
      return { success: false, error: "Failed to send message. Please try again later." };
    }

    // Confirmation email to user
    const { error: userError } = await resend.emails.send({
      from: "UX With Motion <onboarding@resend.dev>",
      to: emailAddress.trim(),
      subject: "Thank you for reaching out to us",
      text: `Hi ${fullName.trim()},\n\nThank you for reaching out to us, we will get back to you soon.\n\nBest,\nUX With Motion Team`,
    });

    if (userError) {
       console.error("Resend user confirmation error:", userError);
       // We still return success to the user since the primary message was delivered to the admin
    }

    return { success: true };
  } catch (error: any) {
    console.error("Contact form error:", error);
    return { success: false, error: "An unexpected error occurred. Please try again later." };
  }
}
