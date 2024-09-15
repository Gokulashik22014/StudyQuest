import mongoose from "mongoose";

const aiSchema=new mongoose.Schema({
    subjectId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"subjects",
        required:true
    },
    summary:[{
        question:{
            type:String,
        },
        answer:{
            type:String
        }
    }]
},{
    timestamps:true
})

const AIModel=mongoose.models.ai || mongoose.model("ai",aiSchema)

export default AIModel