import {
  findAccountS,
  getAccountS,
  registerS,
} from "@/services/auth/auth.services";
import { compareHashed, hashValue } from "@/utils/bcrypt/bcrypt";
import { AppError } from "@/utils/error/app-error.util";
import { Request, Response } from "express";

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

  //Return response
  res
    .status(200)
    .json({ message: "Account registered successfully.", account });
};

export const login = async (req: Request, res: Response) => {
  //Get body data
  const { email, password } = req.body;

  //   if (!name) throw new AppError("Name is required.", 400);
  //   if (!email) throw new AppError("Email is required.", 400);
  //   if (!password) throw new AppError("Password is required.", 400);

  // Check if fields have data
  if (!email || !password) throw new AppError("All fields are required.", 400);

  //Find account
  const account = await findAccountS({ email });

  if (!account) {
    throw new AppError("Account not found.", 400);
  }

  //Check password
  const passwordCorrect = await compareHashed(password, account.password);
  if (!passwordCorrect) {
    throw new AppError("Incorrect Password", 400);
  }

  // Return response
  res.status(200).json({ message: "Login successfully.", account });
};
export const logout = async (req: Request, res: Response) => {
  //Get body data
  const { email } = req.body;
  //Check if has an email logged in

  const account = await findAccountS({ email });
  if (!account) {
    throw new AppError("Account not found", 400);
  }
  res.status(200).json({ message: "Logout successfully.", account });
};

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
