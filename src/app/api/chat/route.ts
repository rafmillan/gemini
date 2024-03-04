import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: NextRequest) {
  // get prompt field from the request body
  const reqBody = await req.json();
  console.log(reqBody)
  const { userPrompt } = reqBody;
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY as string);
  const model = genAI.getGenerativeModel({
    model: "gemini-pro",
    generationConfig: { 
      maxOutputTokens: reqBody.maxOutputTokens,
      temperature: reqBody.temp,
      topK: reqBody.topK,
      topP: reqBody.topP
    },
  });

  try {
    const result = await model.generateContent(userPrompt);
    let { totalTokens } = await model.countTokens(userPrompt);
    console.log("User Prompt (%d tokens): %s", totalTokens, userPrompt);
    const response = await result.response;
    const text = response.text();
    console.log("Response: %s", JSON.stringify(response));
    return NextResponse.json({
      text,
    });
  } catch (error) {
    return NextResponse.json({
      text: "Unable to process the prompt. Please try again.",
    });
  }
}
