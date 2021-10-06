const mongoose = require("mongoose");
require("dotenv").config();

const connect = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://poly_dating:polydating123@cluster0.yvdeq.mongodb.net/poly_dating?retryWrites=true&w=majority`
    );
    console.log("Connect databse successful");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connect;
