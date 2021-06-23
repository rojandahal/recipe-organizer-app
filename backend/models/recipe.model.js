const mongoose = require("mongoose");
const slugify = require("slugify");

const Schema = mongoose.Schema;

const recipeSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a title"],
    },
    description: {
      type: String,
      required: [true, "Please add description"],
      maxlength: [500, "Description  cannot be more than 50 characters."],
    },
    servings: {
      type: Number,
      required: [true, "Please add servings"],
    },
    ingredients: [{
      name: {
        type: String,
        required: [true, "Please add ingredients"],
      },
      quantity: {
        type: Number,
        required: [true, "Please add quantity"],
      },
    }],
    steps: {
      type: String,
      required: [true, "Please add steps"],
    },
    notes: {
      type: String,
      default: "Empty Notes",
    },
    image: {
      type: String,
      default: "no-photo.jpg",
      required: [true, "Please add image"],
    },
    ispublic: {
      type: Boolean,
      enum: [true, false],
      default: false,
    },
    averageRating: {
      type: Number,
      min: [1, "Rating must be at least 1"],
      max: [10, "Rating must cannot be more than 10"],
      default: 1
    },
    review: {
      type: String,
      default: "No Reviews",
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "Users",
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }
);

// Create bootcamp slug from the name
recipeSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

module.exports = mongoose.model("Recipe", recipeSchema);
