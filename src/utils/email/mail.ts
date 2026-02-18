import mailConfiguration from "@/config/mail.config";

/**
 * @function sendEmail
 * @description Sends an email using nodemailer.
 * This function allows you to send both plain text and HTML formatted emails.
 * It uses an SMTP server configuration specified in the environment variables.
 *
 * @param {Object} emailOptions - The email configuration options.
 * @param {string} emailOptions.to - The recipient's email address.
 * @param {string} emailOptions.subject - The subject of the email.
 * @param {string} emailOptions.text - The plain text content of the email.
 * @param {string} [emailOptions.html] - The HTML content of the email (optional).
 *
 * @returns {Promise<Object>} The result of sending the email, which includes feedback from the mail server.
 *
 * @throws {Error} If the email cannot be sent or if any parameter is missing/invalid.
 *
 * @example
 * const emailOptions = {
 *   to: "recipient@example.com",
 *   subject: "Hello World",
 *   text: "This is a test email",
 *   html: "<p>This is a <b>test</b> email.</p>"
 * };
 *
 * sendEmail(emailOptions)
 *   .then(feedback => {
 *     console.log("Email sent successfully", feedback);
 *   })
 *   .catch(error => {
 *     console.error("Failed to send email", error);
 *   });
 */
export const sendEmail = async (emailOptions: {
  to: string;
  subject: string;
  text: string;
  html?: string;
}) => {
  const transporter = mailConfiguration;

  try {
    // Send the email using the nodemailer transporter configuration
    const feedback = await transporter.sendMail({
      from: process.env.MAIL, // sender address (configured in .env)
      to: emailOptions.to, // recipient's email
      subject: emailOptions.subject, // subject line
      text: emailOptions.text, // plain text version of the message
      html: emailOptions.html, // HTML version of the message (optional)
    });

    return feedback;
  } catch (error) {
    // Log and throw the error for better traceability
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};
