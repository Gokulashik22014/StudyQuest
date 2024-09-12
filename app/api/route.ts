import { NextResponse } from "next/server";
import { connectToDataBase } from "../database/database";

export  async function GET(){
    await connectToDataBase()
    return NextResponse.json({message:"Hello World"});
}

export  async function POST(request:Request){
    const data=await request.json()
    return NextResponse.json({message:data});
}