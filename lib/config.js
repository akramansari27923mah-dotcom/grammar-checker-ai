const MONGO_URI = process.env.MONGO_URI;
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const GROQ_API_KEY = process.env.GROQ_API_KEY;

if (!MONGO_URI) {
  throw new Error("MONGO_URI not found");
}
if (!JWT_ACCESS_SECRET) {
  throw new Error("JWT_ACCESS_SECRET not found");
}
if (!EMAIL_USER) {
  throw new Error("EMAIL_USER not found");
}
if (!GROQ_API_KEY) {
  throw new Error("GROQ_API_KEY not found");
}
if (!EMAIL_PASS) {
  throw new Error("EMAIL_PASS not found");
}

export const config = {
  MONGO_URI,
  JWT_ACCESS_SECRET,
  EMAIL_USER,
  EMAIL_PASS,
  GROQ_API_KEY
};
