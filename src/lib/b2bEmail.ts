import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

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
    to: email, // User ko email jayegi
    subject: `GNS Spices B2B Application ${status} - ${businessName}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2 style="color: ${isApproved ? '#22c55e' : '#ef4444'};">
          ${isApproved ? '✅ Application Approved!' : '❌ Application Rejected'}
        </h2>

        <p>Dear <strong>${fullName}</strong>,</p>

        <p>
          ${isApproved
            ? `We are pleased to inform you that your B2B application for <strong>${businessName}</strong> has been <strong style="color: #22c55e;">approved</strong>. Our team will contact you shortly with further details.`
            : `We regret to inform you that your B2B application for <strong>${businessName}</strong> has been <strong style="color: #ef4444;">rejected</strong>. Please contact us for more information.`
          }
        </p>

        <div style="background: #FFF6DE; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Business Name:</strong> ${businessName}</p>
          <p><strong>Status:</strong> ${status}</p>
        </div>

        ${isApproved ? `
          <p>Next steps:</p>
          <ul>
            <li>Our team will reach out within 1-2 business days</li>
            <li>You will receive your pricing tier details</li>
            <li>Account setup will be completed shortly</li>
          </ul>
        ` : ''}

        <p style="margin-top: 20px;">For any queries, contact us at <a href="mailto:${process.env.EMAIL_USER}">${process.env.EMAIL_USER}</a></p>

        <p style="color: #888; font-size: 12px; margin-top: 30px;">
          GNS Spices Team<br/>
          Premium Indian Spices
        </p>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('B2B Status Email sent:', info.messageId);
  } catch (error) {
    console.error('Error sending B2B email:', error);
  }
};