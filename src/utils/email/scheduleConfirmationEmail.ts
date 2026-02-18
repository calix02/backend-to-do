import { sendEmail } from "./mail";

export const sendScheduleConfirmationEmail = async (email: string) => {
  await sendEmail({
    to: email,
    subject: `Schedule Confirmation`,
    text: `Dear,\n\nThis is to confirm your station assignment for.\n\nWorkplace:\n\nPlease check your dashboard for`,
    html: "Hello World",
  });
};
