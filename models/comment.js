const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
       content:{
        type:String,
       },
       createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
       },
       blogId:{
         type:mongoose.Schema.Types.ObjectId
       }
},{timestamps:true})

const Comment = mongoose.model("comment",commentSchema)

module.exports = Comment;