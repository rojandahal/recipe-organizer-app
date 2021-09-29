const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const errorHandler = require("./errors/api-error-handler");

// Initializing environment vairables
require("dotenv").config();

const app = express();

//Body parser
// Use of cors
app.use(
  cors({
    origin: "http://localhost:3001",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

// Cookies parser
app.use(cookieParser());

//Connecting database
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;

connection.once("open", () => {
  console.log("Mongoose connection successfully!");
});

//Routes files
const usersRoutes = require("../backend/routes/users");
const authRoutes = require("../backend/routes/auth");
const recipeRoutes = require("../backend/routes/recipe");
const favouriteRoutes = require ("../backend/routes/favourite");

//Adding routes middleware
app.use("/api/v1/user", usersRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/recipe", recipeRoutes);
app.use("/api/v1/favourite",favouriteRoutes)

//Error handler
app.use(errorHandler);

//Environment variable
const port = process.env.PORT || 3000;

//Connecting to server
const server = app.listen(port, () => {
  console.log("Created server at port: " + port);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Unhandled Rejection: ${err.message}`.red);
  // Close server and Exit process
  server.close(() => process.exit(1));
});
