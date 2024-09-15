import CardsModel from "@/app/models/cards";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, status } = await request.json();
    const response = await CardsModel.create({ name, status });
    return NextResponse.json({ success: true, message: response });
  } catch (error) {
    return NextResponse.json({ success: false, error: error });
  }
}

