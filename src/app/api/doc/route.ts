import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: NextRequest) {
  // get prompt field from the request body
  const reqBody = await req.json();
  console.log(reqBody)
  const { type } = reqBody;
  const { docs } = reqBody;

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY as string);
  const model = genAI.getGenerativeModel({
    model: "embedding-001",
    // generationConfig: { 
    //   maxOutputTokens: reqBody.maxOutputTokens,
    //   temperature: reqBody.temp,
    //   topK: reqBody.topK,
    //   topP: reqBody.topP
    // },
  });

  try {
    // TS is complaining about EmbedContentRequest Type
    // @ts-ignore
    const result = await model.batchEmbedContents({
      requests: docs.map((t: string) => ({
        content: { parts: [{ text: t }] },
        taskType: type,
      })),
    });
    const embedding = await result.embeddings;
    console.log("Response: %s", JSON.stringify(embedding));
    return NextResponse.json({
      embedding,
    });
  } catch (error) {
    return NextResponse.json({
      text: "Unable to process the prompt. Please try again.",
    });
  }
}