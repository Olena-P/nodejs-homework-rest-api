const mongoose = require("mongoose");
require("dotenv").config();

const app = require("../app");

const { PORT = 3000 } = process.env;
const { DB_USER, DB_USER_PASS, DB_NAME } = process.env;
const DB_HOST = `mongodb+srv://${DB_USER}:${DB_USER_PASS}@cluster0.v3vel.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

mongoose
  .connect(DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.listen(PORT))
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
