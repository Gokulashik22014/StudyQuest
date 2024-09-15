import CardsModel from "@/app/models/cards";
import { NextResponse } from "next/server";

interface ParamsType {
  params: {
    id: string;
  };
}
export async function PATCH(request: Request, { params }: ParamsType) {
    try {
        const {name,status,completed}=await request.json()
        let data;
        if(name) data={name:name}
        else if(status) data={status:status}
        else if(completed) data={completed:completed}
        const response=await CardsModel.findByIdAndUpdate(params.id,data)
        return NextResponse.json({success:true,message:response})
    } catch (error) {
        return NextResponse.json({success:false,error})
    }
}
export async function DELETE(request:Request,{params}:ParamsType){
    try {
        const response=await CardsModel.findByIdAndDelete(params.id)
        return NextResponse.json({success:true,message:response})
    } catch (error) {
        return NextResponse.json({success:false,error:error})
    }
}

