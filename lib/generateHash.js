import bcrypt from "bcrypt";

const generateHash = async (password) => {
  const hasedPassword = await bcrypt.hash(password, 10);
  return hasedPassword;
};

export default generateHash;
