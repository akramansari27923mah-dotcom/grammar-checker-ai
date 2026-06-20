import nodemailer from "nodemailer";
import { emailTemplet } from "./emailSendTemplet";

export const sendEmail = async (useremail, username) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    console.log(username, useremail);
    

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: useremail,
      subject: "🎉 Login Successful - Welcome Back!",
      html: emailTemplet({username, useremail}),
    });
  } catch (err) {
    console.log(err.message);
  }
};
