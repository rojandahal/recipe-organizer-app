const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

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

const usersroutes = require("../backend/routes/users");
// const reciperoutes = require("../backend/routes/recipe");

app.use("/user", usersroutes);
// app.use("/", reciperoutes);

app.listen(port, () => {
  console.log("Created server at port: " + port);
});
