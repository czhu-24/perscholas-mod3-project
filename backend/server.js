const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet'); // adds a bunch of standard security to server
require('./config/db.js');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const PORT = 3000;
const app = express();

const User = require('./models/User.js');
const Post = require('./models/Post.js');

// START MIDDLEWARE //
app.use(express.json());
app.use(cors({
  origin: "*"
}));
app.use(morgan('dev'));
app.use(helmet());

app.use((req, res, next) => {
  if (req.path.startsWith('/server')) {
    req.url = req.url.replace('/server', ''); // strip /server from the path
  }
  next();
})

// END MIDDLEWARE //

// START ROUTES //
app.use(express.static(path.join(__dirname, "../client/dist")));

//                CREATE 



app.post('/signup', async (req, res) => {
  try {
    const newUser = req.body;
    // Hashing takes time
    const hashedPassword = await bcrypt.hash(newUser.password, 10);

    //console.log(newUser);

    const dbUser = new User({
      username: newUser.username,
      password: hashedPassword,
    });

    await dbUser.save(); // Use await to handle the promise that's created by .save()
    console.log("user added")
    res.status(201).send({ message: "User added!" });
  } catch (err) {
    if (err.code === 11000) {
      console.log("error duplicate username")
      res.status(400).send({ message: "Error: duplicate username" });

    } else {
      console.log("sometign else")
      res.status(400).send({ message: `Other error:  + ${err.message}` };
    }
  }
});

app.post('/login', async (req, res) => {
  const newUser = req.body;
  // 1. get the user with this username
  const dbUser = await User.findOne({ username: newUser.username });
  // compare
  // 2. see if there is a user by the provided username
  if (!dbUser) {
    return res.status(400).send("username or password incorrect")
  };
  // compare hashed version of front end entered pw & db's hashed pw
  bcrypt.compare(newUser.password, dbUser.password, (err, isMatch) => {
    if (isMatch) {
      // let the frontend know that the login was successful!
      // don't want hashed password to be passed to front end
      dbUser.password = "";
      // now just username
      const token = jwt.sign({ dbUser }, process.env.TOKEN_SECRET, { expiresIn: "3h" });
      res.status(200).send({ token, dbUser });

      // log them in ( on frontend can do certain things, get info related to account, can do BACKEND stuff related to their account, permissions for CRUD functionality related to their account, allow only certain users to do certain things )
    } else {
      res.status(400).send("username or password incorrect")
    }
  })
});


app.post('/posts/create', async (req, res) => {
  try {
    const newPost = req.body;
    const dbResponse = await Post.create(newPost);
    res.status(201).send(dbResponse);
  } catch (err) {
    res.status(500).send("Error adding post to db", err);
  }
})


//                READ

app.get('/posts/read', async (req, res) => {
  try {
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
  } catch (err) {
    res.status(500).send("Error getting all posts", err);
  }
})

//                UPDATE
app.put('/posts/edit/:postId', async (req, res) => {
  try {
    const postId = req.params.postId;
    const newPost = req.body;
    //console.log(postId, newPost);
    const dbResponse = await Post.findByIdAndUpdate(postId, newPost, { new: true });
    res.status(200).send(dbResponse);
  } catch (err) {
    res.status(400).send("Error editing post", err);
  }
})

//                DELETE

app.delete('/posts/delete/:postId', async (req, res) => {
  try {
    const postId = req.params.postId;
    const dbResponse = await Post.findByIdAndDelete(postId);
    res.status(200).send(dbResponse);
  } catch (err) {
    res.status(500).send("Error deleting post", err);
  }
})

/*            Catch all route             */

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// END ROUTES //

app.listen(PORT, () => {
  console.log(`Server LIVE on port ${PORT}`);
});