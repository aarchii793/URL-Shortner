

import wrapAsync from "../utils/tryCatchWrapper.js";
import { registerUser, loginUser } from "../services/auth.services.js";
import { cookieOptions } from "../config/config.js";

export const register_user = wrapAsync(async (req, res) => {
  const { name, email, password } = req.body;
  const { token, user } = await registerUser(name, email, password);

  res.cookie("accessToken", token, cookieOptions);
  res.status(200).json({ user, token });
});

export const login_user = wrapAsync(async (req, res) => {
  const { email, password } = req.body;
  const { token, user } = await loginUser(email, password);

  res.cookie("accessToken", token, cookieOptions);
  res.status(200).json({ user, token });
});

export const logout_user = (req, res) => {
  res.clearCookie("accessToken");
  res.status(200).json({ message: "Logged out successfully" });
};

export const get_current_user = wrapAsync(async (req, res) => {
  res.status(200).json({ user: req.user });
});
