import nodemailer from "nodemailer";

// Create a transport configuration for sending emails using nodemailer
const mailConfiguration = nodemailer.createTransport({
  // Define the SMTP host (e.g., Gmail, Outlook, custom SMTP server)
  host: process.env.MAIL_HOST,

  // Set the SMTP port (default is 587, or fallback if the environment variable is not set)
  port: Number(process.env.MAIL_PORT) || 587,

  // Set to true to use secure TLS connection
  secure: true,

  // Authentication details for connecting to the mail server
  auth: {
    user: process.env.MAIL, // SMTP user (e.g., email address)
    pass: process.env.MAIL_PASSWORD, // SMTP password (email password or app-specific password)
  },

  // TLS options for encrypted connections
  tls: {
    ciphers: "SSLv3", // Set the cipher suite (SSLv3 is deprecated, but used here for compatibility)
    rejectUnauthorized: false, // Allow self-signed certificates (usually used for local development)
  },

  // Uncomment these lines if you want to enable logging and debugging for the transport configuration
  // logger: true,
  // debug: true,
});

// Verify the SMTP configuration by testing the connection
mailConfiguration.verify((error: any) => {
  if (error) {
    // If an error occurs, log it to the console
    console.error("Error verifying SMTP configuration:", error);
  } else {
    // If the configuration is successful, log a success message
    console.log("SMTP configuration is valid. Ready to send messages.");
  }
});

// Export the mail configuration to be used elsewhere in the application
export default mailConfiguration;
