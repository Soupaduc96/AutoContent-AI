import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log("API KEY EXISTS:", !!process.env.OPENAI_API_KEY);

    const prompt = `
Business Type: ${body.businessType}
Platform: ${body.platform}
Tone: ${body.tone}
Goal: ${body.goal}
Topic: ${body.topic}

Create high-quality social media content.
`;

    const response = await openai.responses.create({
      model: "gpt-5",
      input: prompt,
    });

    console.log("OPENAI SUCCESS");

    return NextResponse.json({
      content: response.output_text,
    });

  } catch (error: any) {
    console.error("OPENAI ERROR:", error);

    return NextResponse.json(
      {
        error: error?.message || "Failed to generate content",
      },
      { status: 500 }
    );
  }
}