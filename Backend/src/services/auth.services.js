


import { findUserByEmail, createUser } from "../dao/user.dao.js";
import { signToken } from "../utils/helper.js";
import bcrypt from "bcrypt";
import { ConflictError } from "../utils/errorHandler.js";

export const registerUser = async (name, email, password) => {
  if (await findUserByEmail(email)) throw new ConflictError("User already exists");

  const hashed = await bcrypt.hash(password, 10);
  const user = await createUser(name, email, hashed);

  const token = signToken({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
  return { token, user };
};

export const loginUser = async (email, password) => {
  const user = await findUserByEmail(email);
  if (!user) throw new Error("Invalid credentials");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Invalid credentials");

  const token = signToken({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
  return { token, user };
};
