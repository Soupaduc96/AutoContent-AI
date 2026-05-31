import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";
import { createDraft } from "@/lib/db/content-drafts";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  console.log("===== GENERATE START =====");

  try {
    const body = await request.json();

    console.log("BODY:", body);

    // TEMPORARY DEMO MODE
   const userId =
  "b7f01ee9-2678-4c4c-bb76-91be2471fab8";

    console.log("USING DEMO USER");

    console.log(
      "API KEY EXISTS:",
      !!process.env.OPENAI_API_KEY
    );

    const prompt = `
You are a world-class social media strategist.

Business Type: ${body.businessType}
Platform: ${body.platform}
Tone: ${body.tone}
Goal: ${body.goal}
Topic: ${body.topic}

Generate:

# Hook
# Main Content
# CTA
# Hashtags
# Engagement Question
# Alternative Headline

Optimize specifically for ${body.platform}.

Return ready-to-publish content.
`;

    console.log("CALLING OPENAI...");

    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: prompt,
    });

    console.log("OPENAI RESPONSE RECEIVED");

    console.log("SAVING DRAFT...");

    await createDraft(userId, {
      title: body.topic || "Untitled Draft",
      businessType: body.businessType,
      platform: body.platform,
      tone: body.tone,
      goal: body.goal,
      content: response.output_text,
    });

    console.log("DRAFT SAVED");
    console.log("===== SUCCESS =====");

    return NextResponse.json({
      content: response.output_text,
    });
  } catch (error: any) {
    console.error("===== OPENAI ERROR =====");
    console.error(error);
    console.error("MESSAGE:", error?.message);
    console.error("========================");

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