const express = require("express");
const router = express.Router();
const {User} = require("../config/model/user");

// Hashing
const bcrypt = require("bcrypt");
const saltRounds = 10;


router.get("/", (req, res)=>{
    res.render("register");
})

router.post("/", (req, res)=>{
    const {username, password} = req.body;

    try {
        bcrypt.hash(password, saltRounds, async(err, hash)=>{
            await User.create({
                email: username,
                password: hash
            });
        });
        res.render("secrets");
    } catch(error) {
        res.send(error);
    }
});

module.exports = router;