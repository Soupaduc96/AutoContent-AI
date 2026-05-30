import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createDraft } from "@/lib/db/content-drafts";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    console.log(
      "API KEY EXISTS:",
      !!process.env.OPENAI_API_KEY
    );

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

    await createDraft(userId, {
      title: body.topic,
      businessType: body.businessType,
      platform: body.platform,
      tone: body.tone,
      goal: body.goal,
      content: response.output_text,
    });

    console.log("OPENAI SUCCESS");

    return NextResponse.json({
      content: response.output_text,
    });
  } catch (error: any) {
    console.error("OPENAI ERROR:", error);

    return NextResponse.json(
      {
        error:
          error?.message ||
          "Failed to generate content",
      },
      { status: 500 }
    );
  }
}