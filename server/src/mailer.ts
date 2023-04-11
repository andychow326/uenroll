/* eslint-disable import/prefer-default-export */
import ejs from "ejs";
import nodemailer from "nodemailer";

const mailer = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    type: "OAuth2",
    user: process.env.GMAIL_USER,
    clientId: process.env.GMAIL_CLIENT_ID,
    clientSecret: process.env.GMAIL_CLIENT_SECRET,
    refreshToken: process.env.GMAIL_REFRESH_TOKEN,
  },
});

export const sendRegistrationEmail = async (
  email: string,
  firstName: string,
  redirectURL: string
) => {
  const html = await ejs.renderFile("./src/templates/registration_email.html", {
    firstName,
    redirectURL,
  });

  await mailer.sendMail({
    from: process.env.GMAIL_USER,
    to: email,
    subject: "[Uenroll] New User Registration",
    html,
  });
};

export const sendForgotPasswordEmail = async (
  email: string,
  firstName: string,
  redirectURL: string
) => {
  const html = await ejs.renderFile(
    "./src/templates/forgot_password_email.html",
    {
      firstName,
      email,
      redirectURL,
    }
  );

  await mailer.sendMail({
    from: process.env.GMAIL_USER,
    to: email,
    subject: "[Uenroll] Forgot Password Instruction",
    html,
  });
};
