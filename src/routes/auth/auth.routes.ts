import {
  getAccount,
  login,
  logout,
  register,
  updateAccount,
} from "@/controller/auth/auth.controller";
import { Router } from "express";

export const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.get("/:id", getAccount);
authRouter.put("/update/:id", updateAccount);
