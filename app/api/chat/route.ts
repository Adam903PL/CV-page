
import { env } from '@/app/config/env';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const API_KEY = env.DEEPSEEK_API;

export async function POST(request) {
  try {
    const { message } = await request.json();

    const openai = new OpenAI({
      baseURL: "https://api.deepseek.com",
      apiKey: `${API_KEY}`,
    });

    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful customer support assistant." },
        { role: "user", content: message }
      ],
      model: "deepseek-chat",
    });

    return NextResponse.json({ 
      response: completion.choices[0].message.content 
    });
  } catch (error) {
    console.error("Error calling language model API:", error);
    return NextResponse.json(
      { error: "Sorry, I encountered an error processing your request." },
      { status: 500 }
    );
  }
}