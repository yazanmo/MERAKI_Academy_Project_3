const express = require("express");
const uuid  = require("uuidv4");
const axios = require("axios");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const db = require("./db")

const {users,articles,comments,roles} = require("./schema")

const app = express();
const port = 5000;
app.use(express.json());

const SECRET = process.env.SECRET


app.post("/users",(req,res)=>{
  const  {firstName,lastName,age,country,email,password,roles}= req.body
  const newUser = new  users( {firstName,lastName,age,country,email,password,roles})
  newUser.save().then((result)=>{
    res.status(201)
    res.json(result)
  }).catch((err) => {
    res.send(err);
  });
})


app.post("/articles",(req,res)=>{
  const {title,description,author} = req.body
  const {titledescription} = req.body
    const newArticle = new articles({title,description,author})
  
      newArticle.save()
      .then((result)=>{
        res.status(201)
        res.json(result)
      }).catch((err) => {
        res.send(err);
      });
  
  });

  app.post("/addRole",(req,res)=>{
    const {role,permissions} = req.body
    const newRole = new roles({role,permissions})
    newRole.save()
      .then((result)=>{
        res.status(201)
        res.json(result)
      }).catch((err) => {
        res.send(err);
      });
  });




  app.post("/login",(req,res,next)=>{
    const {email,password} = req.body;
    users.findOne({email:email}).populate("roles").then((response)=>{
      if (response){
      const hashedPassword = response.password
        bcrypt.compare(password, hashedPassword, (err, result) => {
          if (result){
            const payload = {
              userId: `${response._id}`,
              country: response.country,
              role:{role:response.roles.role,permissions:response.roles.permissions}
            };
            const  options =  { expiresIn: '2h' }
            const token = jwt.sign(payload, SECRET, options);
  
  
            res.status(200)
            res.json({token})
          }else{
            const err = new Error("The password is incorrect");
            err.status = 404;
            next(err);
          }
        });
      }else{
      const err = new Error("The email doesn't exist");
      err.status = 404;
      next(err);
    };
    }).catch((err) => {
      res.send(err);
    });
 
  



  app.get("/articles", (req,res)=>{
    articles.find({}).populate("comments","comment").populate("author","firstName")
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


app.get("/articles/search_2",(req,res)=>{
  const id = req.query.id;
  articles.find({_id:id}).populate("author","firstName").exec()
  .then((result)=>{
    res.status(200)
    res.json(result)
  }).catch((err) => {
    res.send(err);
  }); 
});


app.put("/articles/:id",(req,res)=>{
  const id = req.params.id;
  const {title,description,author} = req.body
  if (req.body.title && req.body.description && req.body.author){
  articles.findByIdAndUpdate(id,{title,description,author},{new:true})
  .then((result)=>{
    res.status(200)
    res.json(result)
  }).catch((err) => {
    res.send(err);
  });
 }else{
  res.status(404);
  res.json(" please enter title and  description ");
 }
});

  
app.delete("/articles/:id",(req,res)=>{
  const id = req.params.id;
  articles.findByIdAndDelete(id).then((result)=>{
    res.status(200)
    res.json({
      success: true,
      massage: ` Delete article with id Successfull => ${id}`,
    })
  }).catch((err) => {
    res.send(err);
  });
});

app.delete("/articles",(req,res)=>{
  const author = req.body.author;

  articles.deleteMany({author:author}).then(result=>{
    res.status(200)
    res.json({
      success: true,
      massage: `delete all the articles for the author Successfull => ${author}`,
    })
  }).catch((err) => {
    res.send(err);
  });
});

const authentication = (req,res,next)=>{
  const token = req.headers.authorization.split(" ")[1];
  console.log(token)

  jwt.verify(token, SECRET, (err, result) => {
    if (err) {
      res.status(403)
      return res.json({
        message : "the token is expired",
        status: 403
      });
    }
    if (result) {
      console.log(result)
      next();
    }
  });






  app.post("/articles/:id/comments",authentication,(req,res)=>{
    const id = req.params.id
    const {comment,commenter} = req.body
    const newComment = new comments({comment,commenter})
    newComment.save().then(async (result)=>{
     await articles.updateOne(
      { _id: id }, 
      { $push: { comments: result._id } }
  );
      res.status(201)
      res.json(result)
    }).catch((err) => {
      res.send(err);
    });
  });

  

  app.use((err, req, res, next) => {
    res.status(err.status);
    res.json({
      error: {
        status: err.status,
        message: err.message,
      },
    });
  });
  
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  })
