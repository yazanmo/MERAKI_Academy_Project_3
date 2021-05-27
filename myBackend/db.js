const mongoose = require("mongoose")
require("dotenv").config();

const option ={

    useCreateIndex:true,
    useIndAndModify:false,
    useUnifiedTopology:true,
    useNewUrlparser:true,
}

const url = process.env.DB_URI
mongoose.connect(url, option).then(
  () => {
    console.log(`DB connected`);
  },
  (err) => {
    console.log(err)})

    
