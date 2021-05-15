const express = require("express");
const { uuid } = require('uuidv4');
const app = express();
const port = 5000;


app.use(express.json());


const articles = [
    {
    id: 1,
    title: 'How I learn coding?',
    description:
    'Lorem, Quam, mollitia.',
    author: 'Jouza',
    },
    {
    id: 2,
    title: 'Coding Best Practices',
    description:
    'Lorem, ipsum dolor sit, Quam, mollitia.',
    author: 'Besslan',
    },
    {
    id: 3,
    title: 'Debugging',
    description:
    'Lorem, Quam, mollitia.',
    author: 'Jouza',
    },
];


const getAllArticles = (req, res) => {
  res.status(200);
  res.json(articles);
};

app.get("/articles", getAllArticles);

/////ticket 2
const getArticlesByAuthor = (req, res) => {
  const author = req.query.author;

  const arr = articles.filter((ele, i) => {
    return author === ele.author;
  });
  res.status(200);
  res.json(arr);
};
app.get("/articles/search_1", getArticlesByAuthor);

//ticket 3 

const getAnArticleById = (req, res) => {
  const id = req.query.id;
  const found = articles.find((ele, i) => {
    return ele.id === parseInt(id);
  });
  if (found) {
    console.log(found);
    res.status(200);
    res.json(found);
  } else {
    res.status(404);
    res.json("not found");
  }
};

app.get("/articles/search_2", getAnArticleById);

//ticket 4 

const createNewArticle =  (req,res)=>{
  const newobj = {
      title: req.body.title,
      description:req.body.description,
      author: req.body.author,
      id : uuid(),
  }
  articles.push(newobj)

  res.status(201)
  res.json(newobj)
}
app.post("/articles",createNewArticle)

//ticket 5 

const updateAnArticleById = (req,res)=>{
  id =  req.params.id
  for (let i=0; i < articles.length ; i++){
      if (id == articles[i].id ){
          if (req.body.title&&req.body.description&&req.body.author){
              articles[i].title= req.body.title
              articles[i].description= req.body.description
              articles[i].author= req.body.author
              res.status(200)
              res.json(articles[i])
              return
          }
          res.status(404)
          res.json("please enter title, description and author")
      }
  }
  res.status(404);
  res.json("not found");
}

app.put("/articles/:id",updateAnArticleById)

//ticket 6

const deleteArticleById = (req,res)=>{
  id =  req.params.id
  for (let i=0; i < articles.length ; i++){
    if (id == articles[i].id ){
      articles.splice(i,1);
      res.status(200)
      const obj = {success : true,massage :`Success Delete article with id => ${id}`}
      res.json(obj)
    }
  }
  res.status(404);
    res.json(`not found article with id => ${id} `);
}
app.delete("/articles/:id",deleteArticleById)

//ticket 7 

const deleteArticlesByAuthor = (req,res)=>{
  const author = req.body.author
  for (let i=0; i < articles.length ; i++) {
    if (author === articles[i].author){
      articles.splice(i,1)
      i=i-1
    }
  }
  const obj = {success : true,massage :`Success delete all the articles for the author => ${author}`}
  res.json(obj)
}


app.delete("/articles",deleteArticlesByAuthor)


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});