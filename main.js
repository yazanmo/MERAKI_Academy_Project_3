const express = require("express");
const { uuid } = require("uuidv4");

const db = require("./db")

const {users,articles} = require("./schema")

const app = express();
const port = 5000;
app.use(express.json());



app.post("/users",(req,res)=>{
  const  {firstName,lastName,age,country,email,password}= req.body
  const newUser = new  users( {firstName,lastName,age,country,email,password})
  newUser.save().then((result)=>{
    res.status(201)
    res.json(result)
  }).catch((err) => {
    res.send(err);
  });
})


app.post("/articles",async (req,res)=>{
  let userId 
  
  await users.findOne({firstName:"ali"})
  .then((result)=>{
    userId = result._id
  }).catch((err) => {
    res.send(err);
  });
  
  const {title,description} = req.body
    const newArticle = new articles({
      title,
      description,
      author:userIdid})
  
      newArticle.save()
      .then((result)=>{
        res.status(201)
        res.json(result)
      }).catch((err) => {
        res.send(err);
      });
  
  });


  app.get("/articles", (req,res)=>{
    articles.find({})
    .then(result=>{
      res.status(200)
      res.json(result)
    }).catch((err) => {
      res.send(err);
    });
  });



  
  app.get("/articles/search_1", async (req,res)=>{
  
    const userId = req.query.author;
    articles.find({author:userId}).then((result)=>{
      res.status(200);
      res.json(result)
    }).catch((err) => {
      res.send(err);
    }); 
  
  });



  


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});