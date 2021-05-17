const mongoose = require("mongoose")

const option ={

    useCreateIndex:true,
    useIndAndModify:true,
    useUnifiedTopology:true,
    useNewUrlparser:true,
}

mongoose.connect("mongodb://localhost:27017/project3",option)
.then(()=>{
       
    console.log("db connected")
},
(err)=>{

    console.log(err)
}
)