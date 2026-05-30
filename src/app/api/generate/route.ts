import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log("API KEY EXISTS:", !!process.env.OPENAI_API_KEY);

  export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log("API KEY EXISTS:", !!process.env.OPENAI_API_KEY);
const prompt = `
You are an elite social media strategist and copywriter.

Business Type: ${body.businessType}
Platform: ${body.platform}
Tone: ${body.tone}
Goal: ${body.goal}
Topic: ${body.topic}

Create a complete social media content package optimized specifically for ${body.platform}.

Requirements:

1. Attention-grabbing hook
2. Main content
3. Strong call-to-action
4. Relevant hashtags
5. Engagement question
6. Alternative headline
7. Platform-specific best practices

Format the response cleanly using sections and headings.

The content should feel professional, engaging, and ready to publish.
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