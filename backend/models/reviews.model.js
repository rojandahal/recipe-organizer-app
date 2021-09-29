const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reviewsSchema = new Schema({
  userid: {
    type: mongoose.Schema.ObjectID,
    ref: "Users",
    required: true,
  },
  recipeid: {
    type: mongoose.Schema.ObjectID,
    ref: "recipe",
    required: true,
  },
  responseTo:{
    type: mongoose.Schema.ObjectID,
    ref: "reviews",
  },
  content: {
      type: String,
      required: true
  }
});

module.exports = mongoose.model("reviews", reviewsSchema);
