import jwt from "jsonwebtoken";
import { config } from "./config";

export const accessCookieOptions = {
  path: "/",
  expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
  httpOnly: true,
  secure: true,
  sameSite: "lax",
};

const generateToken = (userId) => {
  const accessToken = jwt.sign({ id: userId }, config.JWT_ACCESS_SECRET, {
    expiresIn: "1d",
  });

  return accessToken;
};

export default generateToken;
