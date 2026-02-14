import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Taskflow",
      link: "https:taskflow.com",
    },
  });

  const emaiText = mailGenerator.generatePlaintext(options.mailgenContent);
  const emailHtml = mailGenerator.generate(options.mailgenContent);

  const transport = nodemailer.createTransport({
    host: process.env.MAILTRAP_SMTP_HOST,
    port: process.env.MAILTRAP_SMTP_PORT,
    auth: {
      user: process.env.MAILTRAP_SMTP_USER,
      pass: process.env.MAILTRAP_SMTP_PASS,
    },
  });

  const mail = {
    from: "no-reply@taskflow.com",
    to: options.email,
    subject: options.subject,
    text: emaiText,
    html: emailHtml,
  };

  try {
    await transport.sendMail(mail);
  } catch (error) {
    console.error("email serves failed", error);
    throw error
  }
};

const emailVerificationContent = (username, verificationUrl) => {
  return {
    body: {
      name: username,
      intro: "welcome to our App! we'ar excited to have you on board",
      action: {
        instructions:
          "To verify your email please click on the following button",
        button: {
          color: "#0fbe47",
          text: "Verify your Email",
          link: verificationUrl,
        },
      },
      outro:
        "Need help or any question just reply this email. we'd love to help",
    },
  };
};

const resetPasswordContent = (username, resetPasswordUrl) => {
  return {
    body: {
      name: username,
      intro: "We got the request to reset the password of your account",
      action: {
        instructions:
          "To reset your password please click on the following button",
        button: {
          color: "#d65214",
          text: "Reset Password",
          link: resetPasswordUrl,
        },
      },
      outro:
        "Need help or any question just reply this email. we'd love to help",
    },
  };
};

export { resetPasswordContent, emailVerificationContent, sendEmail };
