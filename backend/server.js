const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet'); // adds a bunch of standard security to server
require('./config/db.js');
const path = require('path');
const User = require('./models/User.js');
const Post = require('./models/Post.js');
const PORT = 3000;
const app = express();

// START MIDDLEWARE //
app.use(express.json());
app.use(cors({
    origin: "*"
}));
app.use(morgan('dev'));
app.use(helmet());

app.use((req, res, next)=> {
    if (req.path.startsWith('/server')) {
        req.url = req.url.replace('/server', ''); // strip /server from the path
    }
    next();
})

// END MIDDLEWARE //

// START ROUTES //
app.use(express.static(path.join(__dirname, "../client/dist")));

//                CREATE 

app.post('/posts/create', async (req, res) => {
  try{
    const newPost = req.body;
    const dbResponse = await Post.create(newPost);
    res.status(201).send(dbResponse);
  }catch(err){
    res.status(500).send("Error adding post to db", err);
  }
})


//                READ

app.get('/posts/read', async (req, res) => {
  try{
    const dbResponse = await Post.find();

    const changedDbResponse = dbResponse.map((post) => ({
      _id: post._id,
      // author is not required
      author: post.author || "Anonymous",
      content: post.content,
      isPublic: post.isPublic,
      // Access the virtual property
      formattedCreatedAt: post.formattedCreatedAt,
    }));

    res.status(200).send(changedDbResponse);
  }catch(err){
    res.status(500).send("Error getting all posts", err);
  }
})

  /* catch all route */

//                UPDATE

//                DELETE

// catch all route

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// END ROUTES //

app.listen(PORT, () => {
    console.log(`Server LIVE on port ${PORT}`);
});