const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
    {
      title: { type: String, require: true},
      body: { type: String, required: true },
      section_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "section",
        required: true,
      },
      author_id: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "author",
          required: true,
        }
      ],
      user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: false,
      },
    },
    {
      versionKey: false,
      timestamps: true,
    }
  );
  
  module.exports = mongoose.model("book", bookSchema); // book collection
  