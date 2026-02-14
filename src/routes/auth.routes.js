import { Router } from "express";
import { registerUser } from "../controllers/auth.controller";

const router = Router;

router.route("/register").postr(registerUser);

export default router;
