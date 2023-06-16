const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");
const Repo = require("./models/repos");
require("dotenv").config();
const app = express();

const PORT = process.env.PORT;
const MONGO_DB_URL = process.env.MONGO_DB_URL;

//Connect to MongoDB
mongoose.connect(MONGO_DB_URL);
mongoose.connection.once("open", () => {
  console.log("Connected to database");
  app.listen(PORT, () => {
    console.log("listening on port @" + PORT);
  });
});


app.use(express.json());
app.use(cors());


//default route 
app.get("/", (req, res) => {
  res.send("Hello World");
});

//function to add data into mongoDB
function addToDB(data) {
  Repo.create(data)
    .then((msg) => {
      console.log({
        message: "Successfully Inserted",
        data: msg,
      });
    })
    .catch((err) => {
      console.log({ message: "Failed to Insert", data: err });
    });
}

//route to get all repositories
app.get("/getAll", async (req, res) => {
  Repo.find({}).then((err, documents) => {
    if (err) {
      console.error(err);
      res.status(200).json(err);
      // Handle the error appropriately
    } else {
      console.log(documents);
      res.status(200).json(documents);
      // Handle the retrieved documents
    }
  });
});


//route to add data 
app.post("/addtodb", async (req, res) => {
  console.log(req.body);
  await Repo.create({
    title: req.body.title,
    stars: req.body.stars,
  })
    .then((data) => {
      res.status(201).json({
        message: "Successfully Inserted",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to Insert", data: err });
    });
});


//Function to delete all the documents
const deleteAll = async () => {
  console.log("hello del world");
  await Repo.deleteMany({})
    .then((msg) => {
      console.log({
        message: "Successfully Deleted",
        data: msg,
      });
    })
    .catch((err) => {
      console.log({ message: "Failed to Delete", data: err });
    });
};
module.exports = { addToDB, deleteAll };
