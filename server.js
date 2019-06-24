const express = require('express');
const mongoose = require('mongoose');

const signup = require("./routes/api/signup");
const login = require("./routes/api/login");

const app = express();

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to mongodb
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Successfully Connected"))
  .catch(err => console.log(err))

app.get('/', (req, res) => res.send('<h1>Hello World!!</h1>'))

// Routes
app.use('/api/signup', signup);
app.use('/api/login', login);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));