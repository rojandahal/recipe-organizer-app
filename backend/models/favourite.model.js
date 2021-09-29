const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const favouriteSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  userfrom: {
    type: mongoose.Schema.ObjectId,
    ref: "Users",
    required: true,
  },
  recipeid: {
    type: mongoose.Schema.ObjectId,
    ref: "recipes",
    required: true,
  }
});

module.exports = mongoose.model("favourite", favouriteSchema);
