import { createError } from '../utils/errors.utils.js';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.BREVO_LOGIN,
    pass: process.env.BREVO_SMTP_KEY,
  },
});
export const sendEmail = async (req, res) => {
  const info = await transporter.sendMail({
    from: '"Jacob Cons" <jacobcons@gmail.com>', // sender address
    to: 'jacobcons@gmail.com, yuri31450@gmail.com', // list of receivers
    subject: 'Test email', // Subject line
    text: 'Hello there', // plain text body
  });
  res.json(info);
};
