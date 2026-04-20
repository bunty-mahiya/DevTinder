require("dotenv").config();
const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses");

const sesClient = new SESClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const sendInterestedEmail = async (toEmail, toName, fromName) => {
  console.log("Sending email to:", toEmail, toName, fromName);

  const params = {
    Source: "poppingbunty@gmail.com", 
    Destination: {
      ToAddresses: ["buntymahiya777@gmail.com"], 
    },
    Message: {
      Subject: {
        Data: `${fromName} is interested in you! 👋`,
        Charset: "UTF-8",
      },
      Body: {
        Html: {
          Data: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #eee; border-radius: 8px;">
              <h2 style="color: #e05c5c;">You have a new connection request! 🔥</h2>
              <p>Hello <strong>${toName}</strong>,</p>
              <p><strong>${fromName}</strong> ne tumhe connection request bheji hai and more people.</p>
              <p>App pe jaake accept ya ignore karo.</p>
              <br/>
              <p style="color: #999; font-size: 12px;">FindDate — Find your dev partner</p>
            </div>
          `,
          Charset: "UTF-8",
        },
      },
    },
  };

  try {
    const result = await sesClient.send(new SendEmailCommand(params));
    console.log("✅ Email sent:", result.MessageId);
  } catch (err) {
    console.error("❌ Email failed:", err.message);
  }
};

module.exports = { sendInterestedEmail }; // ✅ fix