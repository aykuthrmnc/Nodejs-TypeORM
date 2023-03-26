import { Router } from "express";
import { login, register } from "../controllers/auth";
import { authMiddleware } from "../middleware/auth";
import { registerValidation } from "../validations/auth";

const router = Router();

router.post("/login", login);

router.post("/register", authMiddleware, registerValidation, register);

export default router;
