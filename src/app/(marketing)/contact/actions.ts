"use server";

import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_SECRET_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const supabase = createClient(supabaseUrl, supabaseKey);
const resend = new Resend(process.env.RESEND_API_KEY || "");

export async function submitContactForm(formData: FormData) {
  try {
    const fullName = formData.get("fullName") as string;
    const emailAddress = formData.get("emailAddress") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    if (!fullName || !emailAddress || !subject || !message) {
      return { success: false, error: "All fields are required" };
    }

    // 1. Store in Supabase
    if (supabaseUrl && supabaseKey) {
      const { error: dbError } = await supabase
        .from("contact_submissions")
        .insert([{ full_name: fullName, email: emailAddress, subject, message }]);

      if (dbError) {
        console.error("Supabase insert error:", dbError);
        return { success: false, error: "Failed to store submission in database: " + dbError.message };
      }
    } else {
      console.warn("Supabase credentials not found. Skipping database insert.");
    }

    // 2. Send emails via Resend
    if (process.env.RESEND_API_KEY) {
      // Email to owner
      await resend.emails.send({
        from: "UX With Motion <onboarding@resend.dev>",
        to: "gfxwithsahil@gmail.com",
        subject: `New Contact Form Submission: ${subject}`,
        text: `Name: ${fullName}\nEmail: ${emailAddress}\nSubject: ${subject}\nMessage:\n${message}`,
      });

      // Confirmation email to user
      // NOTE: Resend test API keys can only send emails to the verified email address (owner).
      // For this to actually reach the user, you need a verified domain in Resend.
      await resend.emails.send({
        from: "UX With Motion <onboarding@resend.dev>",
        to: emailAddress,
        subject: "Thank you for reaching out to us",
        text: `Hi ${fullName},\n\nThank you for reaching out to us, we will get back to you soon.\n\nBest,\nUX With Motion Team`,
      });
    } else {
      console.warn("RESEND_API_KEY is not set. Emails were not sent.");
    }

    return { success: true };
  } catch (error: any) {
    console.error("Action error:", error);
    return { success: false, error: error.message || "An unexpected error occurred" };
  }
}
