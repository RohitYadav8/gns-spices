import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOrderEmail = async (orderDetails: any) => {
  const { customer, items, total, orderId } = orderDetails;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'forsatyam2018@gmail.com', // Admin Email
    subject: `New Order Received - ${orderId}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #F48F68;">New Order Received! 🚀</h2>
        <p>A new order has been placed on your store.</p>
        
        <div style="background: #FFF6DE; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="margin-top: 0;">Customer Details</h3>
          <p><strong>Name:</strong> ${customer.fullName}</p>
          <p><strong>Email:</strong> ${customer.email}</p>
          <p><strong>Phone:</strong> ${customer.phone}</p>
          <p><strong>Address:</strong> ${customer.addressLine}, ${customer.city}, ${customer.postalCode}</p>
        </div>

        <h3>Order Items:</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <thead>
            <tr style="background: #eee; text-align: left;">
              <th style="padding: 10px; border: 1px solid #ccc;">Item</th>
              <th style="padding: 10px; border: 1px solid #ccc;">Qty</th>
              <th style="padding: 10px; border: 1px solid #ccc;">Price</th>
            </tr>
          </thead>
          <tbody>
            ${items.map((item: any) => `
              <tr>
                <td style="padding: 10px; border: 1px solid #ccc;">${item.name}</td>
                <td style="padding: 10px; border: 1px solid #ccc;">${item.quantity}</td>
                <td style="padding: 10px; border: 1px solid #ccc;">£${item.price}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <h3 style="background: #8BDFDD; display: inline-block; padding: 10px; border-radius: 5px;">
          Total Amount: £${total}
        </h3>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Admin Email sent successfully:', info.messageId);
  } catch (error) {
    console.error('Error sending Admin email:', error);
  }
};
