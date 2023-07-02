const express = require("express");

require("dotenv").config();
const morgan = require("morgan");
const cors = require("cors");
const { dbConnection } = require("./database/db");
const app = express();
const PORT = process.env.PORT || 4000;

//Connect to database
dbConnection();

//Middlewares
app.use(express.json()).use(cors()).use(morgan("dev"));

//Routes
app.use("/api/article", require("./routes/article.routes"));
app.use("/api/user", require("./routes/user.routes"));

app.listen(PORT, () => {
  console.log(`Server running on : ${PORT}`);
});
