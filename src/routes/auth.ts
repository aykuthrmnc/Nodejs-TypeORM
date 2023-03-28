import { Router } from "express";
import { login, profile, register } from "../controllers/auth";
import { profileValidation, registerValidation } from "../validations/auth";

const router = Router();

router.post("/login", login);

router.post("/register", registerValidation, register);

router.post("/profile", profileValidation, profile)

export default router;
