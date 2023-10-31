const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet'); // adds a bunch of standard security to server
require('./config/db.js');
const path = require('path');
const User = require('./models/User.js');
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

// create
  app.post('/users', async (req, res) => {
    try{
        const dbResponse = await User.create(req.body);
        res.status(201).send(dbResponse);
    }catch(err){
        res.status(400).send("Error getting user", err);
    }
  })


  // read

  // read states from DB route

  // update

  // delete

  /* catch all route */

  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });

// END ROUTES //

app.listen(PORT, () => {
    console.log(`Server LIVE on port ${PORT}`);
});