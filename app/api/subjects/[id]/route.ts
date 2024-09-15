import CardsModel from "@/app/models/cards";
import SubjectsModel from "@/app/models/subjects";
import { NextResponse } from "next/server";

interface ParamsType{
    params:{
        id:string;
    };
}
export async function GET(request:Request,{params}:ParamsType){
    try {
        const data=await SubjectsModel.findById(params.id)
        let result=[]
        for(let i:number=0;i<data.cards.length;i++){
            const card=await CardsModel.findById(data.cards[i])
            result.push(card)
        }
        return NextResponse.json({success:true,result})
    } catch (error) {
        return NextResponse.json({success:false,error})
    }
}
export async function PATCH(request:Request,{params}:ParamsType){
    try {
        const {type,cardId}=await request.json()
        let data=await SubjectsModel.findById(params.id)
        if(!data) return NextResponse.json({success:false,message:"subject is avaliable"})
        if(type){
            data.cards=[...data.cards,cardId]
        }else{
            data.cards=data.cards.filter((id:string)=>id!=cardId)
        }
        const result=await SubjectsModel.findByIdAndUpdate(params.id,data)
        return NextResponse.json({success:true,message:result})
    } catch (error) {
        return NextResponse.json({success:false,error})   
    }

}

export async function DELETE(request:Request,{params}:ParamsType){
    try {
        await SubjectsModel.findByIdAndDelete(params.id)
    } catch (error) {
        return NextResponse.json({success:false,error})   
    }
}