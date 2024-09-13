import CardsModel from "../models/cards"

export const addCard=async(name:string,status:string)=>{
    const result=await CardsModel.create({name,status})
    return result
}
