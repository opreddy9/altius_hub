const { User, validate } = require('../models/user')
const bcrypt = require('bcrypt')
const express = require('express')
const router = express.Router()
const jwt=require('jsonwebtoken')


const registerRouter = router.post('/register', async (req, res) => {
    const { error } = validate(req.body)
    // console.log(req.body.email);
    
    if (error) {
        console.log(error)
        return res.status(403).send(error.details[0].message)
    }
    // if (!validator.equals(password, cfpassword)) {
    //     res.status(400).json({ message: 'Repeat password does not match'});
    // }
    let user = await User.findOne({ email: req.body.email })
    if (user) {
        return res.status(401).json({
            msg:"User already Exists"
        });
    } else {
        try {
            const salt = await bcrypt.genSalt(10)
            const password = await bcrypt.hash(req.body.password, salt)
            // console.log("Repassowrd:"+ Repassword);
            const Repassword= await bcrypt.hash(req.body.Repassword,salt)
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: password,
                Repassword:Repassword
            })
            await user.save()
            token = jwt.sign(
                {
                    userId: user.id,
                    email: user.email
                },
                "secretkeyappearshere",
                { expiresIn: "1h" }
            );
            return res
            .status(201)
            .json({
                msg:"user Register sucessfully",
                success: true,
                data: {
                    userId: user.id,
                    email: user.email,
                    token: token
                },
            });
        } catch (err) {
            console.log(err);
            return res.status(400).json({ message: err.message })
        }
    }
})

module.exports = registerRouter