import { MailtrapClient } from 'mailtrap';

const MAILTRAP_TOKEN = process.env.MAILTRAP;

if (!MAILTRAP_TOKEN) {
  throw new Error("MAILTRAP token not found in environment variables.");
}

export const client = new MailtrapClient({ token: MAILTRAP_TOKEN });


export const sender = {
  email: "hello@demomailtrap.co",
  name: "Haman Test Name",
};

