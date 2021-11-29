const mongoose = require("mongoose");


const authorSchema = new mongoose.Schema(
    {
      first_name: { type: String, required: true },
      last_name: { type: String, required: true }
      // book_id: {
      //   type: mongoose.Schema.Types.ObjectId,
      //   ref: "book",
      //   required: true,
      // },
    },
    {
      versionKey: false,
      timestamps: true,
    }
  );
  
  module.exports = mongoose.model("author", authorSchema); // tags collection
  
