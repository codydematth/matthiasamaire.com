'use server';

import { Resend } from 'resend';

interface EmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function sendContactEmail(formData: EmailData) {
  const apiKey = process.env.RESEND_API_KEY;
  const send_from = process.env.RESEND_FROM_EMAIL;
  
  if (!apiKey) {
    console.error('RESEND_API_KEY is not defined in the environment variables.');
    return { success: false, error: 'Mail server API configuration is missing.' };
  }

  const resend = new Resend(apiKey);

  try {
    const { data, error } = await resend.emails.send({
      from: `Matthias Portfolio <${send_from || 'notification@matthiasamire.com'}>`,
      to: ['support@matthiasamire.com'],
      replyTo: formData.email,
      subject: `[Portfolio Contact] ${formData.subject}`,
      html: `
        <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #ffffff; color: #1e293b;">
          <h2 style="font-size: 20px; font-weight: 800; border-bottom: 2px solid #6366f1; padding-bottom: 10px; color: #4f46e5; margin-top: 0;">
            New Inbound Contact Inquiry
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 100px; color: #64748b;">From:</td>
              <td style="padding: 8px 0; color: #0f172a;">${formData.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Email:</td>
              <td style="padding: 8px 0; color: #0f172a;"><a href="mailto:${formData.email}" style="color: #4f46e5; text-decoration: none;">${formData.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Subject:</td>
              <td style="padding: 8px 0; color: #0f172a;">${formData.subject}</td>
            </tr>
          </table>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #f8fafc; border-left: 4px solid #6366f1; border-radius: 4px;">
            <p style="margin: 0; font-weight: bold; font-size: 13px; color: #64748b; text-transform: uppercase; tracking-wider;">Message Content</p>
            <p style="margin: 8px 0 0 0; line-height: 1.6; white-space: pre-wrap; font-size: 14px; color: #334155;">${formData.message}</p>
          </div>
          
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin-top: 25px; margin-bottom: 15px;" />
          <p style="font-size: 11px; color: #94a3b8; text-align: center; margin: 0;">
            This email was generated automatically by the contact module on matthiasamire.com.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend SDK send error:', error);
      return { success: false, error: error.message || 'Failed to dispatch email via Resend SDK.' };
    }

    return { success: true, data };
  } catch (error: any) {
    console.error('Server Action execution error:', error);
    return { success: false, error: error.message || 'An unexpected error occurred during mailing.' };
  }
}
