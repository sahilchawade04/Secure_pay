const express = require('express');
const router = express.Router();
const {SECRET} = require('../middleware/token')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

// signup 
router.post('/signup', async (req, res) => {

    const {firstName, lastName, email, password} = req.body;
    const userExist = await User.findOne({email});

    // check for the user email
    if(userExist){
        return res.json({message: "Email Already Exist"});
    }
    
    // generate password
    const hashedPassword = await bcrypt.hash(password, 10);
    // generate payment PIN
    const paymentPin = Math.floor(Math.random() * 999999) + 100000;

    // populating the user schema
    const user = await User.create({
        firstName, 
        lastName,
        email,
        password: hashedPassword,
        amount: 1000,
        Pin: paymentPin,
        image:  `https://api.dicebear.com/7.x/initials/svg?seed=${firstName} ${lastName}`,
    })
    
    const {amount, image} = user;
    // generating token
    const token = jwt.sign({email, password}, SECRET, {expiresIn: "4h"});

    return res.status(200).json({message:"User Created Successfully", email, amount, token, image, firstName, lastName, paymentPin});
});



// login
router.post('/login', async (req, res) => {

    try{
        const {email, password} = req.body; 

        // check for empty fields
        if(!email || !password ){
            return res.json({message:'All fields are Required'})
        }
        
        // check user in database
        const userExist = await User.findOne({email});

        if(!userExist){
            return res.json({message:'Incorrect Email or User does not Exists' }) 
        }

        // check for the password
        const passwordAuth = await bcrypt.compare(password, userExist.password);

        if (!passwordAuth) {
            return res.json({message:'Incorrect password' });
        }

        // user exists, generate jwt token and log-in
        if(userExist && passwordAuth){
            const token = jwt.sign({email, password}, SECRET, {expiresIn: "4h"});
            const {amount, image, firstName, lastName, Pin} = userExist;
            return res.status(200).json({ message: "Welcome to the Portal", email, amount, token, image, firstName, lastName, paymentPin: Pin });
        }
        
        return res.json({message: "Access Denied"});
    }
    catch(err){
        console.log(err);
    }
});



module.exports = router;