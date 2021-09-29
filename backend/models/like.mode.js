const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const likeSchema = new Schema({
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
  reviewsid:{
    type: mongoose.Schema.ObjectID,
    ref: "reviews",
    required: true,
  }
});

module.exports = mongoose.model("like", likeSchema);
