import { body } from "express-validator";

const userRegisterValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("email is invalid"),
    body("username")
      .trim()
      .isEmpty()
      .withMessage("username is required")
      .isLowercase()
      .isLength(3)
      .withMessage("username must be at least 3 character"),
    body("pasaword").trim().notEmpty().withMessage("password is required"),
    body("fullName").optional().trim(),
  ];
};

const userLoginValidator = () => {
  return [
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("invalid Email"),
    body("password").notEmpty().withMessage("Password is required"),
  ];
};

export {userRegisterValidator, userLoginValidator};
