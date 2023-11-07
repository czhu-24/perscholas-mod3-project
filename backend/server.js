const express = require('express');
const mongoose = require("mongoose");
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
const Message = require('./models/Message.js');
const UserMessage = require('./models/UserMessage.js');

const ANONYMOUS = process.env.ANONYMOUS;

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

// Serve static files from the 'dist' folder

app.use(express.static(path.join(__dirname, "../client/dist")));

app.use(express.static(distPath));

// middleware

const verifyToken = async (req, res, next) => {
  const token = req.header('Authorization');
  try {
    if (!token) {
      // Hokey not great soln for now
      // TODO, change later, maybe middleware...?
      req.user = await User.findById(ANONYMOUS);
      next(); 
    }else{
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      //console.log(decoded);
      req.user = decoded.user;
      next();
    }
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).send({ message: 'Token expired' });
    }
    res.status(400).send(error);
  }
};

// END MIDDLEWARE //

// START ROUTES //


//                POST 



app.post('/signup', async (req, res) => {
  const newUser = req.body;
  try {
    // send a request for a duplicate user by id, if duplicateCheck exists, then username is taken
    const duplicateCheck = await User.findOne({ username: newUser.username });

    if (duplicateCheck) {
      //console.log("There is a duplicate", duplicateCheck);
      res.status(400).send({ message: "Sign up failed due to duplicate username" });
    } else {

      // Hashing takes time
      const hashedPassword = await bcrypt.hash(newUser.password, 10);

      //console.log(newUser);

      const dbUser = new User({
        username: newUser.username,
        password: hashedPassword,
      });

      await dbUser.save(); // Use await to handle the promise that's created by .save()
      //console.log("user added")
      res.status(201).send({ message: "User added!" });
    }

  } catch (err) {
    res.status(400).send(err);
  }
});

app.post('/login', async (req, res) => {
  const user = req.body;
  // 1. get the user with this username
  const dbUser = await User.findOne({ username: user.username });
  // 2. see if there is a user by the provided username
  if (!dbUser) {
    return res.status(400).send({ message: "no user by that username" })
  };
  // compare hashed version of front end entered pw & db's hashed pw
  bcrypt.compare(user.password, dbUser.password, (err, isMatch) => {
    //console.log(user, dbUser);
    if (isMatch) {
      // let the frontend know that the login was successful!
      // don't want hashed password to be passed to front end
      dbUser.password = "";
      // now just username
      const token = jwt.sign({ user: dbUser }, process.env.TOKEN_SECRET, { expiresIn: "3h" });
      res.status(200).send({ token, dbUser });
    } else {
      res.status(400).send({ message: "Username or password incorrect" })
    }
  })
});


app.post('/posts/create', async (req, res) => {
  try {
    const newPost = req.body;
    // if there's no posterId, for when you're not logged in, then give it the anonymous account's id
    if(!newPost.author){
      newPost.author = new mongoose.Types.ObjectId(ANONYMOUS);
    }

    //console.log(newPost);

    const dbResponse = await Post.create(newPost);
    res.status(201).send(dbResponse);
  } catch (err) {
    res.status(500).send(err);
  }
})

app.post('/messages/create', verifyToken, async (req, res) => {
  try {
    const receiverUsername = req.body.username;
    const message = req.body.content;

    const dbUser = await User.findOne({ username: receiverUsername });
    if (dbUser) {
      //console.log(`LOOK HERE`, req.user, message);
      const dbResponse = await Message.create({ content: message });

      await UserMessage.create({
        sender: req.user._id,
        receiver: dbUser._id,
        message: dbResponse._id
      })
      res.status(201).send(dbResponse);
    } else {
      res.status(404).send({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).send({ message: `error sending this msg, ${err}` });
  }
});


//                GET

app.get('/check_token', verifyToken, async (req, res) => {
  //console.log("CHECKING TOKEN", req.user);
  res.send(req.user);
})

app.get('/posts/read', verifyToken, async (req, res) => {
  //console.log(req.user._id);
  try {
    // check that req.user isn't anonymous (and not logged in)
    if(req.user._id != ANONYMOUS){
      //console.log("logged in");

      // first populate every post with the data from the User collection for author
      const postsWithAuthors = await Post.find({}).populate(
        {
          path: 'author', 
          select: "-password" // this field's now excluded
      });
      // Now, I can access the author._id part of each Post
      const filteredPosts = postsWithAuthors.filter(post => {
        // Check your conditions here, including post.author._id
        return (post.isPublic === true || 
          (post.isPublic === false && post.author._id == req.user._id));
      });
      const changedDbResponse = filteredPosts.map((post) => ({
      _id: post._id,
      author: post.author,
      content: post.content,
      isPublic: post.isPublic,
      isAnonymous: post.isAnonymous,
      // Access the virtual property
      formattedCreatedAt: post.formattedCreatedAt,
    }));
    res.status(200).send(changedDbResponse);
    }else{
      //console.log("logged out");
      const dbResponse = await Post.find({isPublic: true}).populate({
        path: "author", 
        select: "-password" // this field's now excluded
      });
      const changedDbResponse = dbResponse.map((post) => ({
      _id: post._id,
      author: post.author,
      content: post.content,
      isPublic: post.isPublic,
      isAnonymous: post.isAnonymous,
      // Access the virtual property
      formattedCreatedAt: post.formattedCreatedAt,
    }));
    //console.log(changedDbResponse);
    res.status(200).send(changedDbResponse);
    }
    
    } catch (err) {
    res.status(500).send("Error getting all posts", err);
  }
})

app.get('/messages/read', verifyToken, async (req, res) => {
  const receiverId = new mongoose.Types.ObjectId(req.user._id);
  try{
    const dbResponse = await UserMessage.find({ receiver: receiverId }).populate({
        path: 'message', // populates message field with data from Message collection
      }).populate({path: 'sender'}); 
    //console.log(dbResponse);
    res.send(dbResponse);
  }catch(error){
    res.status(500).send("Something went wrong with find the usermessages");
  }
})

//                PUT
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