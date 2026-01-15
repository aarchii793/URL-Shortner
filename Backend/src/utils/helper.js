import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";

// Generate a short ID
export const generateNanoId = (length = 7) => {
  return nanoid(length);
};

// Sign a JWT
export const signToken = (payload, secret, options = {}) => {
  return jwt.sign(payload, secret, options);
};

// Verify a JWT
export const verifyToken = (token) => {
  
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  // console.log(decoded.id)
  return decoded.id
  
};
