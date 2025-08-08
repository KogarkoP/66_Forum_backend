import express from "express";
import { INSERT_USER, LOGIN_USER } from "../controllers/users.js";
import validate from "../middlewares/validation.js";
import userSchema from "../schemas/user.js";
import loginSchema from "../schemas/login.js";

const router = express.Router();

router.post("/register", validate(userSchema), INSERT_USER);
router.post("/login", validate(loginSchema), LOGIN_USER);

export default router;
