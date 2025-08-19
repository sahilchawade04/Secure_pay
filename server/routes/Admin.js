const express = require("express");
const router = express.Router();
const { authenticateJwt } = require("../middleware/token");
const User = require("../models/User");


// data format function
const formatDate = (dateString) => {
  const originalDate = new Date(dateString);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: "Asia/Kolkata",
  };
  return new Intl.DateTimeFormat("en-US", options).format(originalDate);
};


// get all the users, ready to transact
router.get("/availableUsers", authenticateJwt, async (req, res) => {
  try {
    const { email } = req.headers;
    // get all the users expect logged in user
    const filteredUsers = await User.find({ email: { $ne: email } });
    // only show the generic information
    const simplifiedUsers = filteredUsers.map(({ firstName, lastName, image, email }) => ({
      firstName,
      lastName,
      email,
      image,
    }));

    return res.status(200).json(simplifiedUsers);
  }
  catch (error) {
    console.error("Error fetching available users:", error);
    return res.status(500).json({ error: "Internal Server Error", message: "Oops! Something went wrong on our end. Please try again later." });
  }
});

 
// transaction logic
router.post("/transaction", authenticateJwt, async (req, res) => {

  const { sender, receiver, amount, pin } = req.body; 

  try {
    const isValidSender = await User.findOne({ email: sender });
    const isValidReceiver = await User.findOne({ email: receiver });

    // check for valid sender and receiver
    if (!isValidSender || !isValidReceiver) {
      return res.status(404).json({ message: "User Not Found" });
    }

    // check for valid amount
    if (amount <= 0) {
      return res.status(401).json({ message: "Enter Valid Amount!" });
    }
    if (!amount) {
      return res.status(404).json({ message: "Enter Valid Amount" });
    }
    
    // check for empty PIN
    if(pin <= 0){
      return res.status(401).json({ message: "Enter Valid PIN!" });
    }

    // check for valid PIN
    const validPin = isValidSender.Pin === pin
    if(!validPin){
      return res.status(200).json({message: "Invalid PIN"})
    }

    const senderName = `${isValidSender.firstName} ${isValidSender.lastName}`;
    const receiverName = `${isValidReceiver.firstName} ${isValidReceiver.lastName}`;

    const numericAmount = parseFloat(amount);
    //check for insufficient balance
    if (isValidSender.amount < numericAmount) {
      const paymentEntry = {
        amount: amount,
        sender: senderName,
        receiver: receiverName,
        message: "Insufficient Balance",
        Time: formatDate(new Date().toISOString()),
      };

      // update and save Insufficient Balance entry into the database
      isValidSender.ledger.push(paymentEntry);
      isValidReceiver.ledger.push(paymentEntry);
      await isValidSender.save();
      await isValidReceiver.save();

      return res
        .status(400)
        .json({ message: "Insufficient Balance", status: false });
    }

    // valid transaction
    isValidSender.amount -= numericAmount;
    isValidReceiver.amount += numericAmount;

    // populate the database
    const paymentEntry = {
      sender: senderName,
      receiver: receiverName,
      message: "Transaction Successfull",
      amount: amount,
      Time: formatDate(new Date().toISOString()),
    };

    // update and save into the database
    isValidSender.ledger.push(paymentEntry);
    isValidReceiver.ledger.push(paymentEntry);
    await isValidSender.save();
    await isValidReceiver.save();


    
    return res.status(200).json({
      message: `Transaction Successfull`,
      status: true,
      amount: isValidSender.amount,
      sender: isValidSender.email,
      receiver: isValidReceiver.email,
    });
  }
  catch (error) {
    console.error("Error during transaction:", error);
    return res.status(500).json({ error: "Internal Server Error" , message: "Internal server error, try afer a while!"});
  }
});


// show all the ledger data to user
router.get("/ledger", authenticateJwt, async (req, res) => {
  const { email } = req.headers;
  const user = await User.findOne({ email });

  if (user) {
    return res.json(user.ledger);
  }

  return res.json("User Not Found");
});

module.exports = router;
