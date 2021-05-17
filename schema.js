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
author:{type:mongoose.Schema.objectId,ref:"users"},
})

const users = mongoose.model("users",usersSchema)

const articles = mongoose.model("articles",articlesSchema)

module.exports.users=users

module.exports.articles=articles
