import {
  findAccountS,
  getAccountS,
  registerS,
  updateAccountS,
} from "@/services/auth/auth.services";
import { compareHashed, hashValue } from "@/utils/bcrypt/bcrypt";
import { sendScheduleConfirmationEmail } from "@/utils/email/scheduleConfirmationEmail";
import { AppError } from "@/utils/error/app-error.util";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
  //Get body data
  const { name, email, password } = req.body;
  //   if (!name) throw new AppError("Name is required.", 400);
  //   if (!email) throw new AppError("Email is required.", 400);
  //   if (!password) throw new AppError("Password is required.", 400);

  //Check if fields have data
  if (!name || !email || !password)
    throw new AppError("All field are required.", 400);

  //Find existing email
  if (await findAccountS({ email })) {
    throw new AppError("Email already exist.", 400);
  }

  //Hashed Password
  const hashedPassword = await hashValue(password);

  const account = await registerS({
    name,
    email,
    password: hashedPassword,
  });

  console.log(email);

  await sendScheduleConfirmationEmail(email);

  //Return response
  res
    .status(200)
    .json({ message: "Account registered successfully.", account });
};

export const login = async (req: Request, res: Response) => {
  const JWT_SECRET = process.env.JWT_SECRET as string;

  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError("All fields are required.", 400);
  }

  const account = await findAccountS({ email });
  if (!account) {
    throw new AppError("Account not found.", 400);
  }

  const passwordCorrect = await compareHashed(password, account.password);
  if (!passwordCorrect) {
    throw new AppError("Incorrect Password", 400);
  }
  const { password: _, ...safeAccount } = account.toObject();

  // ✅ Generate token BEFORE sending response
  const token = jwt.sign(
    {
      userId: account._id,
      email: account.email,
    },
    JWT_SECRET,
    { expiresIn: "1h" },
  );

  // ✅ Send token + account
  res.status(200).json({
    message: "Login successfully.",
    token,
    account,
  });
};

export const logout = async (req: Request, res: Response) => {
  res.status(200).json({ message: "Logout successfully." });
};

/**
export const getAccount = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const { id } = req.params;

  const account = await getAccountS(id);

  res.status(200).json({
    message: "Account fetched successfully!",
    account,
  });
};
 */
export const getAccount = async (
  req: Request & { user?: any },
  res: Response,
) => {
  const userId = req.user.userId;

  const account = await getAccountS(userId);

  res.status(200).json({
    message: "Account fetched successfully!",
    account,
  });
};
/**
export const updateAccount = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const { id } = req.params;
  const data = req.body;

  if (!id) {
    throw new AppError("Task ID is required", 400);
  }

  if (!Object.keys(data).length) {
    throw new AppError("No update data provided", 400);
  }

  try {
    const updateTask = await updateAccountS(id, data);

    res.status(200).json({
      message: "Account updated successfully!",
      updateTask,
    });
  } catch (error: any) {
    throw new AppError(error.message || "Update failed", 404);
  }
};
 */

export const updateAccount = async (
  req: Request & { user?: any },
  res: Response,
) => {
  const userId = req.user.userId;
  const data = req.body;

  if (!Object.keys(data).length) {
    throw new AppError("No update data provided", 400);
  }

  const updatedAccount = await updateAccountS(userId, data);

  res.status(200).json({
    message: "Account updated successfully!",
    updatedAccount,
  });
};
