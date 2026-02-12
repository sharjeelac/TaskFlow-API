import Mailgen from "mailgen";

const emailVerificationContent = (username, verificationUrl) => {
  return {
    body: {
      name: username,
      intro: "welcome to our App! we'are excited to have you on board",
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
      intro: "We got the request to rest the password of your account",
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

export { resetPasswordContent, emailVerificationContent };
