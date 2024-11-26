const express = require('express');
const { User, validate } = require('../models/user')
const dotenv = require('dotenv');
const router = express.Router()
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const login=router.post('/login', async (req,res)=>{
    let { email, password } = req.body;
    let existingUser;
    try {
        existingUser =
            await User.findOne({ email: email });
    } catch {
        const error =
            new Error(
                "Error! Something went wrong."
            );
        return next(error);
    }
    if(!existingUser){
        const error =
            Error(
                "Enter valid details"
            );
        return next(error);
    }
    if (!bcrypt.compare(existingUser.password, password)  ){
        const error =
            Error(
                "Wrong details please check at once"
            );
        return next(error);
    }
    let token;
    try {
        //Creating jwt token
        token = jwt.sign(
            {
                userId: existingUser.id,
                email: existingUser.email
            },
            "secretkeyappearshere",
            { expiresIn: "1h" }
        );
    } catch (err) {
        console.log(err);
        const error =
            new Error("Error! Something went wrong.");
        return next(error);
    }

    res
        .status(200)
        .json({
            success: true,
            data: {
                userId: existingUser.id,
                email: existingUser.email,
                token: token,
            },
        });
    
});
module.exports=login;