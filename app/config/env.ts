import dotenv from "dotenv"

// Load environment variables from .env file in development
if (process.env.NODE_ENV !== 'production') {
  dotenv.config()
}


const requiredEnvVars = ['NEXT_PUBLIC_DEEPSEEK_API'] as const;

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`Missing required environment variable: ${envVar}`);
  }
}

export const env = {
    API_URL: process.env.NEXT_PUBLIC_API_URL,
    DEEPSEEK_API: process.env.NEXT_PUBLIC_DEEPSEEK_API
};

