const express = require('express');
const router = express.Router();
const User = require('../models/User');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
require('dotenv').config();


// forgot password
router.post('/', async (req, res) => {
    try{
      const {email} = req.body;
      
      const validUser = await User.findOne({email});
  
      if(!validUser){
        return res.status(404).json({message: "User Not Found"});
      }

      //  Generate reset password token
      const resetToken = crypto.randomBytes(20).toString('hex');
      validUser.resetToken = resetToken;
      await validUser.save();

      // send mail with reset password token
      const resetUrl = `http://localhost:3000/forgotPassword/reset?token=${resetToken}`;

      // creating a transporter for sending mail
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465, 
        secure: true,
        auth: {
          user: process.env.GMAIL_USERNAME,
          pass: process.env.GMAIL_PASSWORD
        }
      });

      // structure of the E-Mail
      var mailOptions =  {
        from: "Secure Pay",
        to: email,
        subject: "Secure pay: Reset password",
        html: `<h1>Reset Password</h1><h2>Click on the link to reset your password</h2><h3>${resetUrl}</h3>`
      }

      // sending the Mail to the recipient
      const info = await transporter.sendMail(mailOptions);
      
      return res.status(200).json({message: "A link to reset your password has been sent to your email."})
    } 
    catch(err){
      console.log(err);
      return res.status(500).json({message: err});
    }
})


// reset password
router.post('/reset', async (req, res) => {

    const {password, token} = req.body;

    //verify reset token
    const validUser = await User.findOne({resetToken: token});

    if(!validUser){
      return res.status(404).json({message: "Invalid User or Token"});
    }

    //update password
    const hashedPassword = await bcrypt.hash(password, 10);
    validUser.password = hashedPassword;
    validUser.resetToken = null;
    await validUser.save();

    return res.json({message: "Password Reset Successful"});
})
  
module.exports = router;