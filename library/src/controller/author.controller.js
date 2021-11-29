const express = require("express");

const Author = require("../model/author.model")

const router = express.Router();

// ------------ TAGS CRUD -----------------
router.post("", async (req, res) => {
    try {
      const tag = await Author.create(req.body);
  
      return res.status(201).send(tag);
    } catch (e) {

      return res.status(500).json({ message: e.message, status: "Failed" });
    }
  });
  
  router.get("", async (req, res) => {
    try {
      const tags = await Author.find().lean().exec();
  
      return res.send(tags);
    } catch (e) {
      return res.status(500).json({ message: e.message, status: "Failed" });
    }
  });
  
  router.get("/:id", async (req, res) => {
    try {
      const tag = await Author.findById(req.params.id).lean().exec();
  
      return res.send(tag);
    } catch (e) {
      return res.status(500).json({ message: e.message, status: "Failed" });
    }
  });
  
  router.patch("/:id", async (req, res) => {
    try {
      const tag = await Author.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      })
        .lean()
        .exec();
  
      return res.status(200).send(tag);
    } catch (e) {
      return res.status(500).json({ message: e.message, status: "Failed" });
    }
  });
  
  router.delete("/:id", async (req, res) => {
    try {
      const tag = await Author.findByIdAndDelete(req.params.id).lean().exec();
  
      return res.status(200).send(tag);
    } catch (e) {
      return res.status(500).json({ message: e.message, status: "Failed" });
    }
  });
  
  router.get("/:id/posts", async (req, res) => {
    try {
      const tag = await Author.findById(req.params.id).lean().exec();
      const posts = await Post.find({ tag_ids: tag._id })
        .populate("tag_ids")
        .lean()
        .exec();
  
      return res.status(200).send({ posts, tag });
    } catch (e) {
      return res.status(500).json({ message: e.message, status: "Failed" });
    }
  });

  module.exports = router;