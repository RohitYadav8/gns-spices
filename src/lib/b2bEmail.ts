import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// B2B Status email (Approved/Rejected)
export const sendB2BStatusEmail = async (details: {
  fullName: string;
  businessName: string;
  email: string;
  status: "Approved" | "Rejected";
}) => {
  const { fullName, businessName, email, status } = details;
  const isApproved = status === "Approved";

  try {
    await transporter.sendMail({
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
            ${isApproved
              ? `We are pleased to inform you that your B2B application for <strong>${businessName}</strong> has been <strong style="color:#22c55e;">approved</strong>. Our team will contact you shortly.`
              : `We regret to inform you that your B2B application for <strong>${businessName}</strong> has been <strong style="color:#ef4444;">rejected</strong>. Please contact us for more information.`
            }
          </p>
          <div style="background:#FFF6DE; padding:15px; border-radius:8px; margin:20px 0;">
            <p><strong>Business Name:</strong> ${businessName}</p>
            <p><strong>Status:</strong> ${status}</p>
          </div>
          ${isApproved ? `
            <p><strong>Next steps:</strong></p>
            <ul style="margin:0; padding-left:20px;">
              <li>Our team will reach out within 1-2 business days</li>
              <li>You will receive your pricing tier details</li>
              <li>Account setup will be completed shortly</li>
            </ul>
          ` : ""}
          <p style="margin-top:20px;">
            For any queries, contact us at <a href="mailto:${process.env.EMAIL_USER}">${process.env.EMAIL_USER}</a>
          </p>
          <p style="color:#888; font-size:12px; margin-top:30px;">GNS Spices Team</p>
        </div>
      `,
    });
    console.log("B2B Status Email sent");
  } catch (error) {
    console.error("Error sending B2B status email:", error);
  }
};

// B2B New Application email (Admin + User)
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
          <p style="color: #999; font-size: 12px; margin-top: 20px;">GNS Spices Team</p>
        </div>
      `,
    });

    console.log("New B2B Application emails sent successfully");
  } catch (error) {
    console.error("Error sending new B2B application email:", error);
  }
};

// Private Label Inquiry email (Admin + User)
export const sendNewPLInquiryEmail = async (details: {
  name: string;
  email: string;
  phone?: string;
  brandName: string;
  country: string;
  productType: string;
  quantity: string;
  message?: string;
}) => {
  const { name, email, phone, brandName, country, productType, quantity, message } = details;

  try {
    await transporter.sendMail({
      from: `"GNS Spices PL" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `New Private Label Inquiry — ${brandName}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #d97f5f;">New Private Label Inquiry</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; font-weight: bold;">Name</td><td style="padding: 8px;">${name}</td></tr>
            <tr style="background:#f9f9f9;"><td style="padding: 8px; font-weight: bold;">Brand Name</td><td style="padding: 8px;">${brandName}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Email</td><td style="padding: 8px;">${email}</td></tr>
            <tr style="background:#f9f9f9;"><td style="padding: 8px; font-weight: bold;">Phone</td><td style="padding: 8px;">${phone || "—"}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Country</td><td style="padding: 8px;">${country}</td></tr>
            <tr style="background:#f9f9f9;"><td style="padding: 8px; font-weight: bold;">Product Type</td><td style="padding: 8px;">${productType}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Quantity</td><td style="padding: 8px;">${quantity}</td></tr>
            <tr style="background:#f9f9f9;"><td style="padding: 8px; font-weight: bold;">Message</td><td style="padding: 8px;">${message || "—"}</td></tr>
          </table>
          <p style="color: #999; font-size: 12px; margin-top: 20px;">GNS Spices Admin Panel</p>
        </div>
      `,
    });

    await transporter.sendMail({
      from: `"GNS Spices" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "We received your Private Label inquiry — GNS Spices",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #d97f5f;">Thank you, ${name}!</h2>
          <p>We've received your Private Label inquiry for <strong>${brandName}</strong>.</p>
          <p>Our team will review and get back within <strong>48 hours</strong>.</p>
          <div style="background:#FFF6DE; padding:15px; border-radius:8px; margin:20px 0;">
            <p><strong>Brand Name:</strong> ${brandName}</p>
            <p><strong>Product Type:</strong> ${productType}</p>
            <p><strong>Quantity:</strong> ${quantity}</p>
            <p><strong>Country:</strong> ${country}</p>
          </div>
          <p style="color: #999; font-size: 12px; margin-top: 20px;">GNS Spices Team</p>
        </div>
      `,
    });

    console.log("PL Inquiry emails sent successfully");
  } catch (error) {
    console.error("Error sending PL inquiry email:", error);
  }
};

// PL Status email (pending/reviewed/contacted)
export const sendPLStatusEmail = async (details: {
  name: string;
  email: string;
  brandName: string;
  status: string;
}) => {
  const { name, email, brandName, status } = details;

  const statusColors: Record<string, string> = {
    pending: "#f59e0b",
    reviewed: "#3b82f6",
    contacted: "#22c55e",
  };

  const statusMessages: Record<string, string> = {
    pending: "Your inquiry is pending review. We will get back to you soon.",
    reviewed: "Your Private Label inquiry has been reviewed by our team. We will contact you shortly.",
    contacted: "Our team has contacted you regarding your Private Label inquiry. Please check your inbox.",
  };

  try {
    await transporter.sendMail({
      from: `"GNS Spices" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `GNS Spices — Private Label Inquiry Update: ${status.charAt(0).toUpperCase() + status.slice(1)}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: ${statusColors[status] || "#d97f5f"};">Inquiry Status Update</h2>
          <p>Dear <strong>${name}</strong>,</p>
          <p>${statusMessages[status] || "Your inquiry status has been updated."}</p>
          <div style="background:#FFF6DE; padding:15px; border-radius:8px; margin:20px 0;">
            <p><strong>Brand Name:</strong> ${brandName}</p>
            <p><strong>Status:</strong> <span style="color: ${statusColors[status]}; font-weight: bold;">${status.charAt(0).toUpperCase() + status.slice(1)}</span></p>
          </div>
          <p style="margin-top:20px;">
            For any queries, contact us at <a href="mailto:${process.env.EMAIL_USER}">${process.env.EMAIL_USER}</a>
          </p>
          <p style="color: #999; font-size: 12px; margin-top: 20px;">GNS Spices Team</p>
        </div>
      `,
    });
    console.log("PL Status Email sent");
  } catch (error) {
    console.error("Error sending PL status email:", error);
  }
};