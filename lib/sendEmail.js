import { transporter } from "./transporter";
import {
  GOOGLE_SIGNIN_TEMPLATE,
  LOGIN_SUCCESS_TEMPLATE,
  REGISTRATION_SUCCESS_TEMPLATE,
} from "./emailSendTemplet";

export const signInWithGoogleEmail = async (useremail, username) => {
  try {
    await transporter.sendMail({
      from: "'GrammarCheckerAI' <grammarcheckerai46@gmail.com>",
      to: useremail,
      subject: "🎉 Google Sign-In Successful",
      html: GOOGLE_SIGNIN_TEMPLATE.replace("{EMAIL}", useremail)
        .replace("{USERNAME}", username)
        .replace("{DATE}", new Date().toLocaleString()),
    });
  } catch (err) {
    console.log(err.message);
  }
};

export const registeredEmail = async (useremail, username) => {
  try {
    await transporter.sendMail({
      from: "'GrammarCheckerAI' <grammarcheckerai46@gmail.com>",
      to: useremail,
      subject: "🎉 Registration Successful - Welcome to GrammarCheckerAI!",
      html: REGISTRATION_SUCCESS_TEMPLATE.replace("{USERNAME}", username),
    });
  } catch (err) {
    console.log(err.message);
  }
};

export const loginEmail = async (useremail, username) => {
  try {
    await transporter.sendMail({
      from: "'GrammarCheckerAI' <grammarcheckerai46@gmail.com>",
      to: useremail,
      subject: "🎉 Login Successful - Welcome Back!",
      html: LOGIN_SUCCESS_TEMPLATE.replace("{USERNAME}", username)
        .replace("{DATE}", new Date().toLocaleString())
        .replace("{EMAIL}", useremail),
    });
  } catch (err) {
    console.log(err.message);
  }
};
