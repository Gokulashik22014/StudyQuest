import AIModel from "@/app/models/ai";
import { NextResponse } from "next/server";
import ollama from "ollama";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const subId = searchParams.get("subId");
    // console.log(subId)
    const result = await AIModel.findOne({ subjectId: subId });
    return NextResponse.json({ success: true, result: result.summary });
  } catch (error) {
    return NextResponse.json({ success: false, error });
  }
}

export async function POST(request: Request) {
  try {
    const { subId, question } = await request.json();

    // Find the AI document for the given subjectId or create a new one
    let result = await AIModel.findOne({ subjectId: subId });
    if (!result) {
      result = await AIModel.create({ subjectId: subId });
    }

    // Use the Ollama API to get the answer for the question
    const query = "Summarize the content and give it in short: " + question;
    const answer = await ollama.chat({
      model: "tinyllama",//change it to your model
      messages: [{ role: "user", content: query }],
    });

    await AIModel.findOneAndUpdate(
      { subjectId: subId },
      { $push: { summary: { question, answer: answer.message.content } } },
      { new: true }
    );

    return NextResponse.json({ message: true, answer: answer.message.content });
  } catch (error) {
    return NextResponse.json({ success: false, error });
  }
}
