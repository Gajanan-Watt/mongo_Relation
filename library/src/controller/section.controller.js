const express = require("express");

const Section = require("../model/section.model")
const Book = require("../model/book.model")
const router = express.Router();


// ------------ POSTS CRUD -----------------
router.post("", async (req, res) => {
    try {
      const post = await Section.create(req.body);
  
      return res.status(201).send(post);
    } catch (e) {
      return res.status(500).json({ message: e.message, status: "Failed" });
    }
  });
  
  router.get("", async (req, res) => {
    try {
      const posts = await Section.find()
        .lean()
        .exec();
      
      return res.send(posts);
    } catch (e) {
      return res.status(500).json({ message: e.message, status: "Failed" });
    }
  });

  router.get("/:id", async (req, res) => {
    try {
      const category = await Book.find()
      .populate({path: "section_id"})  
      .lean()
        .exec();
        //console.log(category);
        //console.log(category[0].section_id.section_name)
        var sectionContainsBooks = [];
        for(let i = 0; i < category.length; i++){
          if(req.params.id == category[i].section_id.section_name){
            sectionContainsBooks.push(category[i])
          }
        }
      return res.send({sectionContainsBooks});
    } catch (e) {
      return res.status(500).json({ message: e.message, status: "Failed" });
    }
  });
  
  router.get("/:id", async (req, res) => {
    try {
      const post = await Section.findById(req.params.id).lean().exec();
  
      return res.send(post);
    } catch (e) {
      return res.status(500).json({ message: e.message, status: "Failed" });
    }
  });
  
  router.patch("/:id", async (req, res) => {
    try {
      const post = await Section.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      })
        .lean()
        .exec();
  
      return res.send(post);
    } catch (e) {
      return res.status(500).json({ message: e.message, status: "Failed" });
    }
  });
  
  router.delete("/:id", async (req, res) => {
    try {
      const post = await Section.findByIdAndDelete(req.params.id).lean().exec();
  
      return res.send(post);
    } catch (e) {
      return res.status(500).json({ message: e.message, status: "Failed" });
    }
  });

  module.exports = router;