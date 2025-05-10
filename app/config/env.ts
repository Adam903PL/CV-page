import dotenv from "dotenv"

// Load environment variables from .env file in development
if(!process.env.NEXT_PUBLIC_DEEPSEEK_API){
    console.error("DeepSeek API key is not configured");
}

export const env = {
    API_URL: process.env.NEXT_PUBLIC_API_URL,
    DEEPSEEK_API: process.env.NEXT_PUBLIC_DEEPSEEK_API,
    JWT_SECRET:process.env.JWT_SECRET,
    GITHUB_TOKEN:process.env.GITHUB_TOKEN
};

