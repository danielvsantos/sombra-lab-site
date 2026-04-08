"use server";

interface LeadFormData {
  brandName: string;
  contactName: string;
  email: string;
  phone: string;
  industry: string;
  services: string[];
  budget: string;
  brief: string;
}

export async function submitLeadForm(data: LeadFormData) {
  const webhookUrl = process.env.WEBHOOK_URL;
  const apiKey = process.env.WEBHOOK_API_KEY;

  if (!webhookUrl || !apiKey) {
    console.error("WEBHOOK_URL or WEBHOOK_API_KEY not configured");
    return { success: false, error: "Server configuration error" };
  }

  // Map form fields to Sombra Hub API schema
  const payload = {
    name: data.contactName,
    email: data.email,
    phone: data.phone || undefined,
    company: data.brandName,
    industry: data.industry || undefined,
    service_interest: data.services.join(", "),
    budget: data.budget,
    message: data.brief,
  };

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": apiKey,
      },
      body: JSON.stringify(payload),
    });

    if (response.status === 201) {
      return { success: true };
    }

    if (response.status === 409) {
      return { success: true }; // Duplicate — still show success to user
    }

    if (response.status === 400) {
      return { success: false, error: "Missing required fields" };
    }

    if (response.status === 401) {
      return { success: false, error: "Authentication error" };
    }

    return { success: false, error: "Failed to submit" };
  } catch {
    return { success: false, error: "Network error" };
  }
}
