import cron from "node-cron";
import nodemailer from "nodemailer";

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.CRON_JOB_EMAIL,
    pass: process.env.CRON_JOB_APP_PASSWORD,
  },
});

// Function to send email
const sendEmail = (email, subject, text, html) => {
  const mailOptions = {
    from: process.env.CRON_JOB_EMAIL,
    to: email,
    subject: subject,
    text: text,
    html: html,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

// Schedule the cron job to run daily at 12:00 AM UTC (8:00 AM UTC+8)
cron.schedule("0 0 * * *", async () => {
  // 12:00 AM UTC is 8:00 AM UTC+8
  const now = new Date();
  const philippineTime = new Date(
    now.toLocaleString("en-US", { timeZone: "Asia/Manila" })
  );
  if (philippineTime.getHours() === 8 && philippineTime.getMinutes() === 0) {
    console.log("Cron job started at:", philippineTime.toISOString());
    try {
      const today = new Date();

      const email = requirement.personInCharge;
      const subject = "Subscription Expiration Reminder";
      const text = `Dear ${requirement.personInCharge},\n\nYour subscription "${requirement.complianceList}" is expiring in ${remainingDays} days.\n\nPlease take the necessary actions.\n\nBest regards,\n${requirement.entity}`;
      const html = `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
              <h2>Subscription Expiration Reminder</h2>
              <p>Dear ${requirement.personInCharge},</p>
              <p>Your subscription "<strong>${requirement.complianceList}</strong>" is expiring in ${remainingDays} days.</p>
              <p>Please take the necessary actions.</p>
              <p>Best regards,</p>
              <p>Your Company</p>
              <a href="http://example.com" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Click Me!</a>
            </div>
          `;
      sendEmail(email, subject, text, html);
    } catch (error) {
      console.log("Error in cron job:", error);
    }
    console.log("Cron job finished at:", philippineTime.toISOString());
  }
});

// Schedule the cron job to run daily at midnight Philippine time (UTC+8)
cron.schedule("0 16 * * *", async () => {
  // 4:00 PM UTC is 12:00 AM UTC+8
  const now = new Date();
  const philippineTime = new Date(
    now.toLocaleString("en-US", { timeZone: "Asia/Manila" })
  );
  if (philippineTime.getHours() === 0 && philippineTime.getMinutes() === 0) {
    console.log("Midnight cron job started at:", philippineTime.toISOString());
    try {
    } catch (error) {
      console.log("Error in midnight cron job:", error);
    }
    console.log("Midnight cron job finished at:", philippineTime.toISOString());
  }
});

// Ensure the script keeps running
setInterval(() => {}, 1000);
