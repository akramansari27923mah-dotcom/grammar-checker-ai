import jwt from "jsonwebtoken";

export const accessCookieOptions = {
  path: "/",
  expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
  httpOnly: true,
  secure: true,
  sameSite: "lax",
};

const generateToken = (userId) => {
  const accessToken = jwt.sign({ id: userId }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "1d",
  });

  return accessToken;
};

export default generateToken;
