import cron from "node-cron";
import nodemailer from "nodemailer";
import {
  getRequirements,
  updateRequirementById,
} from "./appwrite/requirements.js";
import dotenv from "dotenv";
import { checkFrequency } from "./utils/check-frequency.js";
import { isProcess } from "./utils/check-onprocess.js";
import {
  expirationMessage,
  expiredMessage,
} from "./components/expiration-message.js";
dotenv.config();

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.CRON_JOB_EMAIL,
    pass: process.env.CRON_JOB_APP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
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

// Schedule the cron job to run daily at 8:00 AM Philippine time (12:00 AM UTC)
cron.schedule("0 0 * * *", async () => {
  // 12:00 AM UTC is 8:00 AM UTC+8
  const now = new Date();
  const philippineTime = new Date(
    now.toLocaleString("en-US", { timeZone: "Asia/Manila" })
  );
  if (philippineTime.getHours() === 8 && philippineTime.getMinutes() === 0) {
    console.log("Cron job started at:", philippineTime.toISOString());
    try {
      const requirements = await getRequirements();
      const today = new Date();
      console.log(requirements);
      requirements.forEach((requirement) => {
        const expirationDate = new Date(requirement.expiration);
        const remainingDays = Math.ceil(
          (expirationDate - today) / (1000 * 60 * 60 * 24)
        );
        const frequency = requirement.frequencyOfCompliance;

        if (
          checkFrequency(requirement.status, remainingDays, frequency) &&
          isProcess(
            requirement.status,
            expirationDate,
            requirement.onProcessedDate,
            frequency
          ) &&
          requirement.status !== "Expired"
        ) {
          const emailData = {
            entity: requirement.entity,
            personInCharge: requirement.personInCharge,
            complianceList: requirement.complianceList,
            dateSubmitted: requirement.dateSubmitted,
            typeOfCompliance: requirement.typeOfCompliance,
            remainingDays,
            expirationDate,
            frequency,
          };
          const email = requirement.personInCharge;
          const subject = "Subscription Expiration Reminder";
          const text = `Dear ${requirement.personInCharge},\n\nYour subscription "${requirement.complianceList}" is expiring in ${remainingDays} days.\n\nPlease take the necessary actions.\n\nBest regards,\n${requirement.entity}`;
          const html = expirationMessage(emailData);
          sendEmail(email, subject, text, html);
        }
      });
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
      const requirements = await getRequirements();

      if (requirements && Array.isArray(requirements)) {
        const today = new Date();

        requirements.forEach(async (requirement) => {
          const expiration = new Date(requirement.expiration);
          const remainingDays = Math.ceil(
            (expiration - today) / (1000 * 60 * 60 * 24)
          );

          if (remainingDays <= 0 && requirement.status !== "Expired") {
            await updateRequirementById({ status: "Expired" }, requirement.$id);
            const email = requirement.personInCharge;
            const subject = "Subscription Expired";
            const text = `Dear ${requirement.personInCharge},\n\nYour subscription "${requirement.complianceList}" has expired.\n\nPlease take the necessary actions.\n\nBest regards,\n${requirement.entity}`;
            const html = expiredMessage({
              personInCharge: requirement.personInCharge,
              complianceList: requirement.complianceList,
            });
            sendEmail(email, subject, text, html);

            console.log(
              `Updated status to Expired for requirement ID: ${requirement.$id}`
            );
          }
        });
      } else {
        console.log("No requirements found or invalid data format.");
      }
    } catch (error) {
      console.log("Error in midnight cron job:", error);
    }
    console.log("Midnight cron job finished at:", philippineTime.toISOString());
  }
});

// Ensure the script keeps running
setInterval(() => {}, 1000);
