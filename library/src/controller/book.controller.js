const express = require("express");

const Book = require("../model/book.model")

const router = express.Router();

// ------------ COMMENTS CRUD -----------------
router.post("", async (req, res) => {
    try {
      const comment = await Book.create(req.body);
  
      return res.status(201).send(comment);
    } catch (e) {
      return res.status(500).json({ message: e.message, status: "Failed" });
    }
  });


  router.get("", async (req, res) => {
    try{
      const comments = await Book.find()
      .lean().exec();
      return res.send(comments);
    } catch (e){
      return res.status(500).json({ message: e.message, status: "Failed" });
    }
  });

  
  router.get("/:id", async (req, res) => {
    try {
      const comments = await Book.find()
      .populate({path: "author_id", select: "first_name"})
      .lean().exec();
      let arr = [];
      for(let i = 0; i < comments.length; i++){
        for(let j = 0; j < comments[i].author_id.length; j++){
          //console.log(comments[i].author_id[j].first_name);
          //console.log("request" + req.params.id);
          if(req.params.id == comments[i].author_id[j].first_name){
            //console.log(comments[i]);
             arr.push(comments[i]);
          
          }
        }
      }
      //console.log({arr});
      return res.send({arr});
      //console.log(comments[0].author_id[0].first_name);
      //return res.send({comments});
    } catch (e) {
      return res.status(500).json({ message: e.message, status: "Failed" });
    }
  });
  
  router.get("/:id", async (req, res) => {
    try {
      const comment = await Book.findById(req.params.id)
      .lean().exec();
      //console.log(comment.author_id[0].first_name);
      return res.send({comment});
    } catch (e) {
      return res.status(500).json({ message: e.message, status: "Failed" });
    }
  });
  
  router.patch("/:id", async (req, res) => {
    try {
      const comment = await Book.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      })
        .lean()
        .exec();
  
      return res.send(comment);
    } catch (e) {
      return res.status(500).json({ message: e.message, status: "Failed" });
    }
  });
  
  router.delete("/:id", async (req, res) => {
    try {
      const comment = await Book.findByIdAndDelete(req.params.id)
        .lean()
        .exec();
  
      return res.send(comment);
    } catch (e) {
      return res.status(500).json({ message: e.message, status: "Failed" });
    }
  });

  module.exports = router;