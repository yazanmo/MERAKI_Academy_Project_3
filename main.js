const express = require("express");
const { uuid } = require("uuidv4");

const db = require("./db")

const {users,articles} = require("./schema")

const app = express();
const port = 5000;
app.use(express.json());

//ticket 0
const articles = [
  {
    id: 1,
    title: "How I learn coding?",
    description: "Lorem, Quam, mollitia.",
    author: "Jouza",
  },
  {
    id: 2,
    title: "Coding Best Practices",
    description: "Lorem, ipsum dolor sit, Quam, mollitia.",
    author: "Besslan",
  },
  {
    id: 3,
    title: "Debugging",
    description: "Lorem, Quam, mollitia.",
    author: "Jouza",
  },
];

//ticket 1 

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





app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});