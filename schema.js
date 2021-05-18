const mongoose=require("mongoose")

const usersSchema= new mongoose.Schema({


    firstName: {type:String,required:true},

    lastName:{type:String,requried:true},

    age:{type:number,requried:true},

    country:{type:String,requried:true},

    email:{type:String,requried:true},

    password:{type:String,requried:true}, 

})

const articlesSchema = new mongoose.Schema({


title:{type:String,requried:true,unique:true},
descreption:{type:String,requried:true},
author:{type:mongoose.Schema.ObjectId,ref:"users"},
comments : [{type:mongoose.Schema.ObjectId,ref:"comments"}]
})


const commentsSchema = new mongoose.Schema({
    comment : {type:String, required:true},
    commenter : {type:mongoose.Schema.ObjectId,ref:"users"}
})

const users = mongoose.model("users",usersSchema)

const articles = mongoose.model("articles",articlesSchema)

const comments = mongoose.model("comments", commentsSchema)

module.exports.users = users

module.exports.articles = articles

module.exports.comments = comments
