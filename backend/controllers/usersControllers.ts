import type { Request, Response } from "express";
import { UsersModel } from "../models/usersModel";
import { validationResult } from "express-validator";

export async function createUser(
  req: Request,
  res: Response
): Promise<Response | void> {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password } = req.body;

  console.log("Request body:", req.body); // Debug log

  try {
    const existingUser = await UsersModel.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists." });
    }

    const user = await UsersModel.create({
      username,
      email,
      password,
    });

    const userResponse = {
      id: user._id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    console.log("User created:", userResponse); // Debug log
    return res.json(userResponse);
  } catch (error: any) {
    console.error("Error creating user:", error); // Debug log
    return res
      .status(500)
      .json({ message: "Failed to create user.", error: error.message });
  }
}
