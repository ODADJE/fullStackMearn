const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB connection successful");
  } catch (err) {
    console.log("Error connection to DB");
  }
};

module.exports = {
  dbConnection,
};
