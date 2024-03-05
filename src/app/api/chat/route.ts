import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: NextRequest) {
  // get request body
  const reqBody = await req.json();
  console.log(reqBody);

  // get user msg, chat history and chat params
  const { msg } = reqBody;
  const { history } = reqBody;
  const { params } = reqBody;

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY as string);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  try {
    const chat = model.startChat({
      history: history,
      generationConfig: params,
    });
    const result = await chat.sendMessage(msg);
    let { totalTokens } = await model.countTokens(msg);
    console.log("User (%d tokens): %s", totalTokens, msg);
    const response = await result.response;
    const newHistory = await chat.getHistory()
    const text = response.text();
    console.log("Model: %s", JSON.stringify(response));
    return NextResponse.json({
      text: text,
      history: newHistory,
    });
  } catch (error) {
    return NextResponse.json({
      text: `Unable to process the prompt. Please try again. [${error}]`
    });
  }
}
