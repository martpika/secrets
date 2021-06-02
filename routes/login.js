const express = require("express");
const router = express.Router();
const {User} = require("../config/model/user");

// Hashing
const bcrypt = require("bcrypt");


router.get("/", (req, res)=>{
    res.render("login");
});

router.post("/", async(req, res)=>{
    try {
        const findUser = await User.findOne({email: req.body.username});
        bcrypt.compare(req.body.password, findUser.password, (err, result)=>{
            result? res.render("secrets") : res.redirect("/");
        }) 
    } catch(error) {
        res.send(error);
    } 
});

module.exports = router;