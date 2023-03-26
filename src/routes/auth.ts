import { Router } from "express";
import { login, profile, register } from "../controllers/auth";
import { authMiddleware } from "../middleware/auth";
import { profileValidation, registerValidation } from "../validations/auth";

const router = Router();

router.post("/login", login);

router.post("/register", authMiddleware, registerValidation, register);

router.post("/profile", profileValidation, profile)

export default router;
