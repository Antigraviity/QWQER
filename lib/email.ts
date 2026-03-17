const RESEND_API_KEY = process.env.RESEND_API_KEY;
const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || 'qwqer.marketing@gmail.com';
const FROM_EMAIL = process.env.FROM_EMAIL || 'QWQER <onboarding@resend.dev>';

type EnquiryEmailData = {
    name: string;
    email: string;
    phone?: string;
    message: string;
};

async function sendEmail(payload: {
    from: string;
    to: string[];
    reply_to?: string;
    subject: string;
    html: string;
}) {
    const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        const error = await res.json();
        console.error('Resend API error:', error);
        return { success: false, error };
    }
    return { success: true };
}

export async function sendEnquiryNotification(data: EnquiryEmailData) {
    if (!RESEND_API_KEY) {
        console.error('RESEND_API_KEY not set, skipping email notifications');
        return { success: false, error: 'API key not configured' };
    }

    const { name, email, phone, message } = data;

    // 1. Admin notification email
    const adminHtml = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e5e7eb;">
        <div style="background: #ee3425; padding: 24px 32px;">
            <h1 style="color: white; margin: 0; font-size: 20px; font-weight: 700;">New Enquiry Received</h1>
            <p style="color: rgba(255,255,255,0.8); margin: 4px 0 0; font-size: 14px;">QWQER Contact Form</p>
        </div>
        <div style="padding: 32px;">
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-size: 13px; color: #6b7280; width: 100px; vertical-align: top;">Name</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-size: 14px; color: #111827; font-weight: 600;">${name}</td>
                </tr>
                <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-size: 13px; color: #6b7280; vertical-align: top;">Email</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-size: 14px; color: #111827;">
                        <a href="mailto:${email}" style="color: #ee3425; text-decoration: none;">${email}</a>
                    </td>
                </tr>
                ${phone ? `
                <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-size: 13px; color: #6b7280; vertical-align: top;">Phone</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-size: 14px; color: #111827;">
                        <a href="tel:${phone}" style="color: #ee3425; text-decoration: none;">${phone}</a>
                    </td>
                </tr>
                ` : ''}
                <tr>
                    <td style="padding: 12px 0; font-size: 13px; color: #6b7280; vertical-align: top;">Message</td>
                    <td style="padding: 12px 0; font-size: 14px; color: #111827; line-height: 1.6;">${message.replace(/\n/g, '<br>')}</td>
                </tr>
            </table>
            <div style="margin-top: 24px; padding: 16px; background: #fef2f2; border-radius: 8px; border-left: 4px solid #ee3425;">
                <p style="margin: 0; font-size: 13px; color: #991b1b;">
                    Reply directly to this email or view in the <a href="https://qwqer.antigraviity.com/admin/enquiries" style="color: #ee3425; font-weight: 600;">Admin Dashboard</a>
                </p>
            </div>
        </div>
        <div style="background: #f9fafb; padding: 16px 32px; text-align: center;">
            <p style="margin: 0; font-size: 12px; color: #9ca3af;">QWQER Admin Notification System</p>
        </div>
    </div>`;

    // 2. Auto-reply to customer
    const autoReplyHtml = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e5e7eb;">
        <div style="background: #ee3425; padding: 32px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 22px; font-weight: 700;">Thank You for Reaching Out!</h1>
        </div>
        <div style="padding: 32px;">
            <p style="font-size: 15px; color: #111827; margin: 0 0 16px; line-height: 1.6;">
                Hi <strong>${name}</strong>,
            </p>
            <p style="font-size: 14px; color: #4b5563; margin: 0 0 16px; line-height: 1.7;">
                Thank you for contacting QWQER. We have received your enquiry and our team will get back to you within <strong>24 hours</strong>.
            </p>
            <div style="background: #f9fafb; border-radius: 8px; padding: 20px; margin: 20px 0;">
                <p style="font-size: 12px; color: #6b7280; margin: 0 0 8px; text-transform: uppercase; font-weight: 600; letter-spacing: 0.05em;">Your Message</p>
                <p style="font-size: 14px; color: #374151; margin: 0; line-height: 1.6; font-style: italic;">"${message.length > 200 ? message.substring(0, 200) + '...' : message}"</p>
            </div>
            <p style="font-size: 14px; color: #4b5563; margin: 0 0 24px; line-height: 1.7;">
                In the meantime, feel free to explore our services:
            </p>
            <div style="text-align: center; margin: 24px 0;">
                <a href="https://qwqer.antigraviity.com/express" style="display: inline-block; background: #ee3425; color: white; text-decoration: none; padding: 12px 32px; border-radius: 8px; font-size: 14px; font-weight: 600; margin: 0 6px 8px;">Express Delivery</a>
                <a href="https://qwqer.antigraviity.com/fleet" style="display: inline-block; background: #111827; color: white; text-decoration: none; padding: 12px 32px; border-radius: 8px; font-size: 14px; font-weight: 600; margin: 0 6px 8px;">Fleet Services</a>
            </div>
            <hr style="border: none; border-top: 1px solid #f3f4f6; margin: 24px 0;" />
            <p style="font-size: 13px; color: #6b7280; margin: 0 0 4px;">Need urgent help?</p>
            <p style="font-size: 13px; color: #111827; margin: 0;">
                Call us at <a href="tel:02250534575" style="color: #ee3425; text-decoration: none; font-weight: 600;">022-50534575</a> or WhatsApp <a href="https://wa.me/917356124443" style="color: #ee3425; text-decoration: none; font-weight: 600;">+91 7356124443</a>
            </p>
        </div>
        <div style="background: #111827; padding: 24px 32px; text-align: center;">
            <p style="margin: 0 0 8px; font-size: 13px; color: #9ca3af;">Follow us</p>
            <div style="margin-bottom: 12px;">
                <a href="https://www.instagram.com/qwqerindia/" style="color: #9ca3af; text-decoration: none; font-size: 13px; margin: 0 8px;">Instagram</a>
                <a href="https://www.linkedin.com/company/qwqer-india/" style="color: #9ca3af; text-decoration: none; font-size: 13px; margin: 0 8px;">LinkedIn</a>
            </div>
            <p style="margin: 0; font-size: 11px; color: #6b7280;">&copy; ${new Date().getFullYear()} QWQER. Delivering. To the Point.</p>
        </div>
    </div>`;

    try {
        const [adminResult, autoReplyResult] = await Promise.allSettled([
            sendEmail({
                from: FROM_EMAIL,
                to: [NOTIFY_EMAIL],
                reply_to: email,
                subject: `New Enquiry from ${name}`,
                html: adminHtml,
            }),
            sendEmail({
                from: FROM_EMAIL,
                to: [email],
                subject: `Thank you for contacting QWQER, ${name}!`,
                html: autoReplyHtml,
            }),
        ]);

        console.log('Admin email:', adminResult.status);
        console.log('Auto-reply email:', autoReplyResult.status);

        return { success: true };
    } catch (error) {
        console.error('Failed to send email notifications:', error);
        return { success: false, error };
    }
}

// Job Application Notifications
type JobApplicationEmailData = {
    name: string;
    email: string;
    phone?: string;
    coverNote?: string;
    careerTitle: string;
    resumeUrl?: string;
};

export async function sendJobApplicationNotification(data: JobApplicationEmailData) {
    if (!RESEND_API_KEY) {
        console.error('RESEND_API_KEY not set, skipping email notifications');
        return { success: false, error: 'API key not configured' };
    }

    const { name, email, phone, coverNote, careerTitle, resumeUrl } = data;

    // Admin notification
    const adminHtml = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e5e7eb;">
        <div style="background: #ee3425; padding: 24px 32px;">
            <h1 style="color: white; margin: 0; font-size: 20px; font-weight: 700;">New Job Application</h1>
            <p style="color: rgba(255,255,255,0.8); margin: 4px 0 0; font-size: 14px;">Position: ${careerTitle}</p>
        </div>
        <div style="padding: 32px;">
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-size: 13px; color: #6b7280; width: 100px; vertical-align: top;">Name</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-size: 14px; color: #111827; font-weight: 600;">${name}</td>
                </tr>
                <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-size: 13px; color: #6b7280; vertical-align: top;">Email</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-size: 14px; color: #111827;">
                        <a href="mailto:${email}" style="color: #ee3425; text-decoration: none;">${email}</a>
                    </td>
                </tr>
                ${phone ? `
                <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-size: 13px; color: #6b7280; vertical-align: top;">Phone</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-size: 14px; color: #111827;">
                        <a href="tel:${phone}" style="color: #ee3425; text-decoration: none;">${phone}</a>
                    </td>
                </tr>
                ` : ''}
                <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-size: 13px; color: #6b7280; vertical-align: top;">Position</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-size: 14px; color: #111827; font-weight: 600;">${careerTitle}</td>
                </tr>
                ${resumeUrl ? `
                <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-size: 13px; color: #6b7280; vertical-align: top;">Resume</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-size: 14px;">
                        <a href="${resumeUrl}" style="color: #ee3425; text-decoration: none; font-weight: 600;">Download Resume</a>
                    </td>
                </tr>
                ` : ''}
                ${coverNote ? `
                <tr>
                    <td style="padding: 12px 0; font-size: 13px; color: #6b7280; vertical-align: top;">Cover Note</td>
                    <td style="padding: 12px 0; font-size: 14px; color: #111827; line-height: 1.6;">${coverNote.replace(/\n/g, '<br>')}</td>
                </tr>
                ` : ''}
            </table>
            <div style="margin-top: 24px; padding: 16px; background: #fef2f2; border-radius: 8px; border-left: 4px solid #ee3425;">
                <p style="margin: 0; font-size: 13px; color: #991b1b;">
                    View all applications in the <a href="https://qwqer.antigraviity.com/admin/careers?tab=applications" style="color: #ee3425; font-weight: 600;">Admin Dashboard</a>
                </p>
            </div>
        </div>
        <div style="background: #f9fafb; padding: 16px 32px; text-align: center;">
            <p style="margin: 0; font-size: 12px; color: #9ca3af;">QWQER Careers Notification</p>
        </div>
    </div>`;

    // Auto-reply to applicant
    const autoReplyHtml = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e5e7eb;">
        <div style="background: #ee3425; padding: 32px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 22px; font-weight: 700;">Application Received!</h1>
        </div>
        <div style="padding: 32px;">
            <p style="font-size: 15px; color: #111827; margin: 0 0 16px; line-height: 1.6;">
                Hi <strong>${name}</strong>,
            </p>
            <p style="font-size: 14px; color: #4b5563; margin: 0 0 16px; line-height: 1.7;">
                Thank you for applying for the <strong>${careerTitle}</strong> position at QWQER. We have received your application and our team will review it carefully.
            </p>
            <div style="background: #f9fafb; border-radius: 8px; padding: 20px; margin: 20px 0;">
                <p style="font-size: 12px; color: #6b7280; margin: 0 0 4px; text-transform: uppercase; font-weight: 600; letter-spacing: 0.05em;">Position Applied</p>
                <p style="font-size: 16px; color: #111827; margin: 0; font-weight: 700;">${careerTitle}</p>
            </div>
            <p style="font-size: 14px; color: #4b5563; margin: 0 0 8px; line-height: 1.7;">
                <strong>What happens next?</strong>
            </p>
            <ul style="font-size: 14px; color: #4b5563; margin: 0 0 24px; padding-left: 20px; line-height: 1.8;">
                <li>Our team will review your application within <strong>3-5 business days</strong></li>
                <li>If shortlisted, we'll reach out for a screening call</li>
                <li>You'll be updated at every stage of the process</li>
            </ul>
            <hr style="border: none; border-top: 1px solid #f3f4f6; margin: 24px 0;" />
            <p style="font-size: 13px; color: #6b7280; margin: 0 0 4px;">Questions about your application?</p>
            <p style="font-size: 13px; color: #111827; margin: 0;">
                Email us at <a href="mailto:qwqer.marketing@gmail.com" style="color: #ee3425; text-decoration: none; font-weight: 600;">qwqer.marketing@gmail.com</a>
            </p>
        </div>
        <div style="background: #111827; padding: 24px 32px; text-align: center;">
            <p style="margin: 0 0 8px; font-size: 13px; color: #9ca3af;">Follow us</p>
            <div style="margin-bottom: 12px;">
                <a href="https://www.instagram.com/qwqerindia/" style="color: #9ca3af; text-decoration: none; font-size: 13px; margin: 0 8px;">Instagram</a>
                <a href="https://www.linkedin.com/company/qwqer-india/" style="color: #9ca3af; text-decoration: none; font-size: 13px; margin: 0 8px;">LinkedIn</a>
            </div>
            <p style="margin: 0; font-size: 11px; color: #6b7280;">&copy; ${new Date().getFullYear()} QWQER. Delivering. To the Point.</p>
        </div>
    </div>`;

    try {
        const [adminResult, autoReplyResult] = await Promise.allSettled([
            sendEmail({
                from: FROM_EMAIL,
                to: [NOTIFY_EMAIL],
                reply_to: email,
                subject: `New Application: ${careerTitle} — ${name}`,
                html: adminHtml,
            }),
            sendEmail({
                from: FROM_EMAIL,
                to: [email],
                subject: `Your application for ${careerTitle} at QWQER`,
                html: autoReplyHtml,
            }),
        ]);

        console.log('Job app admin email:', adminResult.status);
        console.log('Job app auto-reply:', autoReplyResult.status);

        return { success: true };
    } catch (error) {
        console.error('Failed to send job application emails:', error);
        return { success: false, error };
    }
}
