const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  },
  () => console.log("Connected to MongoDB")
);

// Router
const usersRouter = require("./routes/users");
const shirtsRouter = require("./routes/shirts");

app.use("/users", usersRouter);
app.use("/shirt", shirtsRouter);

app.listen(port, () => {
  console.log(`Listening on Port ${port}`);
});
