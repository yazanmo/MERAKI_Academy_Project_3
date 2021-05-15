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




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});