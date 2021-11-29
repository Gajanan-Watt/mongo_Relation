const express = require("express");
const mongoose = require("mongoose");

/*   
1 - connect to mongodb server -- DONE
2 - create a schema for our data
3 - create a model from the schema
*/

// Step 1
const connect = require("./configs/db.js")

const User = require("./model/user.model")

const Section = require("./model/section.model")

const Author = require("./model/author.model")

const Book = require("./model/book.model")

const Checkout = require("./model/checkout.model")


const usersController = require("./controller/users.controller");
const sectionsControllers = require("./controller/section.controller");
const authorsControllers = require("./controller/author.controller");
const booksControllers = require("./controller/book.controller");
const checkoutsControllers = require("./controller/checkout.controller");

// // Users Mongoose
// const userSchema = new mongoose.Schema(
//   {
//     first_name: { type: String, required: true },
//     last_name: { type: String, required: false },
//     email: { type: String, required: true, unique: true },
//     gender: { type: String, required: false, default: "Male" },
//     age: { type: Number, required: true },
//   },
//   {
//     versionKey: false,
//     timestamps: true,
//   }
// );

// const User = mongoose.model("user", userSchema); // users



// Comment Mongoose => Post and comment are one to many relationship

// Tags Mongoose => Post and Tags are in a many to many relationship

const app = express();

app.use(express.json());

app.use("/section", sectionsControllers);
app.use("/user", usersController);
app.use("/author", authorsControllers);
app.use("/book", booksControllers);
app.use("/checkout", checkoutsControllers);

/*
  users
  post = /users
  get all = /users
  get one = /users/:id
  update one = /users/:id
  delete one = /users/:id
*/








app.listen(2345, async function () {
  await connect();
  console.log("listening on port 2345");
});