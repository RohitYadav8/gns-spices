import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Gmail App Password hona chahiye
  },
});

// ✅ Pehle se tha — Approved/Rejected status pe mail
export const sendB2BStatusEmail = async (details: {
  fullName: string;
  businessName: string;
  email: string;
  status: "Approved" | "Rejected";
}) => {
  const { fullName, businessName, email, status } = details;
  const isApproved = status === "Approved";

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `GNS Spices B2B Application ${status} - ${businessName}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2 style="color: ${isApproved ? "#22c55e" : "#ef4444"};">
          ${isApproved ? "Application Approved" : "Application Rejected"}
        </h2>

        <p>Dear <strong>${fullName}</strong>,</p>

        <p>
          ${
            isApproved
              ? `We are pleased to inform you that your B2B application for <strong>${businessName}</strong> has been <strong style="color:#22c55e;">approved</strong>. Our team will contact you shortly with further details.`
              : `We regret to inform you that your B2B application for <strong>${businessName}</strong> has been <strong style="color:#ef4444;">rejected</strong>. Please contact us for more information.`
          }
        </p>

        <div style="background:#FFF6DE; padding:15px; border-radius:8px; margin:20px 0;">
          <p><strong>Business Name:</strong> ${businessName}</p>
          <p><strong>Status:</strong> ${status}</p>
        </div>

        ${
          isApproved
            ? `
          <p><strong>Next steps:</strong></p>
          <ul style="margin:0; padding-left:20px;">
            <li>Our team will reach out within 1-2 business days</li>
            <li>You will receive your pricing tier details</li>
            <li>Account setup will be completed shortly</li>
          </ul>
        `
            : ""
        }

        <p style="margin-top:20px;">
          For any queries, contact us at <a href="mailto:${process.env.EMAIL_USER}">${process.env.EMAIL_USER}</a>
        </p>

        <p style="color:#888; font-size:12px; margin-top:30px;">
          GNS Spices Team<br/>Premium Indian Spices
        </p>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("B2B Status Email sent:", info.messageId);
  } catch (error) {
    console.error("Error sending B2B email:", error);
  }
};

// ✅ Naya — Form submit hone pe admin + user dono ko mail
export const sendNewB2BApplicationEmail = async (details: {
  fullName: string;
  businessName: string;
  email: string;
  phone: string;
  businessType: string;
  city: string;
  message?: string;
}) => {
  const { fullName, businessName, email, phone, businessType, city, message } = details;

  try {
    // Admin ko notification
    await transporter.sendMail({
      from: `"GNS Spices B2B" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `New B2B Application — ${businessName}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #d97f5f;">New B2B Application Received</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; font-weight: bold;">Full Name</td><td style="padding: 8px;">${fullName}</td></tr>
            <tr style="background:#f9f9f9;"><td style="padding: 8px; font-weight: bold;">Business Name</td><td style="padding: 8px;">${businessName}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Email</td><td style="padding: 8px;">${email}</td></tr>
            <tr style="background:#f9f9f9;"><td style="padding: 8px; font-weight: bold;">Phone</td><td style="padding: 8px;">${phone}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Business Type</td><td style="padding: 8px;">${businessType}</td></tr>
            <tr style="background:#f9f9f9;"><td style="padding: 8px; font-weight: bold;">City</td><td style="padding: 8px;">${city}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Message</td><td style="padding: 8px;">${message || "—"}</td></tr>
          </table>
          <p style="color: #999; font-size: 12px; margin-top: 20px;">GNS Spices Admin Panel</p>
        </div>
      `,
    });

    // User ko confirmation
    await transporter.sendMail({
      from: `"GNS Spices" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "We received your B2B application — GNS Spices",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #d97f5f;">Thank you, ${fullName}!</h2>
          <p>We've received your B2B application for <strong>${businessName}</strong>.</p>
          <p>Our team will review and get back within <strong>48 hours</strong>.</p>
          <div style="background:#FFF6DE; padding:15px; border-radius:8px; margin:20px 0;">
            <p><strong>Business Name:</strong> ${businessName}</p>
            <p><strong>Business Type:</strong> ${businessType}</p>
            <p><strong>City:</strong> ${city}</p>
          </div>
          <p style="margin-top:20px;">
            For any queries, contact us at <a href="mailto:${process.env.EMAIL_USER}">${process.env.EMAIL_USER}</a>
          </p>
          <p style="color: #999; font-size: 12px; margin-top: 20px;">GNS Spices Team<br/>Premium Indian Spices</p>
        </div>
      `,
    });

    console.log("New B2B Application emails sent successfully");
  } catch (error) {
    console.error("Error sending new B2B application email:", error);
  }
};