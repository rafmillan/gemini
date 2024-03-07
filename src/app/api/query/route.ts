import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: NextRequest) {
  // get prompt field from the request body
  const reqBody = await req.json();
  console.log(reqBody)
  const { query } = reqBody;
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
    const result = await model.generateContent(query);
    let { totalTokens } = await model.countTokens(query);
    console.log("User Prompt (%d tokens): %s", totalTokens, query);
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


// export async function POST(req: NextRequest) {
//   // get prompt field from the request body
//   const reqBody = await req.json();
//   console.log(reqBody)
//   const { query } = reqBody;
//   const { type } = reqBody;

//   const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY as string);
//   const model = genAI.getGenerativeModel({
//     model: "embedding-001",
//     // generationConfig: { 
//     //   maxOutputTokens: reqBody.maxOutputTokens,
//     //   temperature: reqBody.temp,
//     //   topK: reqBody.topK,
//     //   topP: reqBody.topP
//     // },
//   });

//   try {
//     // TS is complaining about EmbedContentRequest Type
//     // @ts-ignore
//     const result = await model.embedContent({
//       content: { parts: [{ text: query }] },
//       taskType: type,
//     });
//     const embedding = await result.embedding;
//     console.log("Response: %s", JSON.stringify(embedding));
//     return NextResponse.json({
//       embedding,
//     });
//   } catch (error) {
//     return NextResponse.json({
//       text: "Unable to process the prompt. Please try again.",
//     });
//   }
// }
