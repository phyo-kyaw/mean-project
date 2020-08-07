const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const postsRoutes = require("./routes/posts");

const app = express();

mongoose.connect("mongodb+srv://admin:QWrqCrr7GgiqCjyo@cluster0.wrnba.mongodb.net/node-angular?retryWrites=true&w=majority")
  .then( () => {
    console.log('Connected to Mongo database!');
  })
  .catch( () => {
    console.log('Connection failed!');
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use( (req, res, next) => {
  res.setHeader("Access-Control-Allow-Orgin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Orgin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts", postsRoutes);

module.exports= app;
