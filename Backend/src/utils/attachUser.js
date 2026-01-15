import { findUserById } from "../dao/user.dao.js"
import { verifyToken } from "./helper.js"



export const attachUser = async (req, res, next) => {
  if (!req.cookies || !req.cookies.accessToken) {
    return next();
  }

  const token = req.cookies.accessToken;

  try {
    const decoded = verifyToken(token); // returns { id: ... }
    const user = await findUserById(decoded.id);
    if (!user) return next();

    req.user = user;
    next();
  } catch (error) {
    next(); // skip silently if token is invalid
  }
};
