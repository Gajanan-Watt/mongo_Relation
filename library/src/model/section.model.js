const mongoose = require("mongoose");

// Post Mongoose
const sectionSchema = new mongoose.Schema(
    {
      section_name: { type: String, required: true },
    },
    {
      versionKey: false,
      timestamps: true,
    }
  );
  
  module.exports = mongoose.model("section", sectionSchema); // posts collection
  