import mongoose, { mongo } from "mongoose"

const subjectSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true,
        maxlength:30,
    },
    cards:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"cards"
    }]
},{timestamps:true})

const SubjectsModel=mongoose.models.subjects || mongoose.model("subjects",subjectSchema)

export default SubjectsModel