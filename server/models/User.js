const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  sender: {
    type: String,
    required: true,
  },
  receiver: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  Time: {
    type: String,
    required: true,
  },
});

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  resetToken:{
    type: String,
  },
  Pin: {
    type: String,
  },
  ledger: [transactionSchema],
});

module.exports = mongoose.model("User", userSchema);
