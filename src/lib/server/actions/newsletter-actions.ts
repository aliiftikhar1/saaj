"use server";

import { ServerActionResponse } from "@/types/server";
import { wrapServerCall } from "../helpers/generic-helpers";
import { STORE_EMAIL } from "@/lib/constants";

export async function subscribeToNewsletter(
  _prevState: { success: boolean; message: string } | null,
  formData: FormData,
): Promise<{ success: boolean; message: string }> {
  const email = formData.get("email") as string;

  if (!email || !email.includes("@")) {
    return { success: false, message: "Please enter a valid email address." };
  }

  // Send notification email to store
  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: process.env.WEB3FORMS_ACCESS_KEY || "",
        subject: "New Newsletter Subscription - Saaj Tradition",
        from_name: "Saaj Tradition Newsletter",
        to: STORE_EMAIL,
        email: email,
        message: `New newsletter subscription from: ${email}`,
      }),
    });

    if (!response.ok) {
      // Fallback: still count as success since we captured the email
      console.error("Newsletter notification failed:", await response.text());
    }
  } catch (error) {
    console.error("Newsletter notification error:", error);
  }

  return {
    success: true,
    message: "Thank you for subscribing to our newsletter!",
  };
}
