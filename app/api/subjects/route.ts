import SubjectsModel from "@/app/models/subjects";
import { NextResponse } from "next/server";

export async function POST(request:Request){
    try {
        const {name}=await request.json()
        const result=await SubjectsModel.create({name})
        return NextResponse.json({success:true,message:result})
    } catch (error) {
        return NextResponse.json({success:false,error})
    }
}