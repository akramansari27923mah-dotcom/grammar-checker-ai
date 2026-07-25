const getEnv = (key) => {
  const value = process.env[key];
  
  if (!value) {
    throw new Error(`${key} not found`);
  }

  return value.trim();
};

export const config = {
  MONGO_URI: getEnv("MONGO_URI"),
  JWT_ACCESS_SECRET: getEnv("JWT_ACCESS_SECRET"),
  EMAIL_USER: getEnv("EMAIL_USER"),
  EMAIL_PASS: getEnv("EMAIL_PASS"),
  GROQ_API_KEY: getEnv("GROQ_API_KEY"),
};
