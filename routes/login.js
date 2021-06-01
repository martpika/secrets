const express = require("express");
const router = express.Router();
const {User} = require("../config/model/user");

router.get("/", (req, res)=>{
    res.render("login");
});

router.post("/", async(req, res)=>{
    try {
        const findUser = await User.findOne({email: req.body.username});
        if (findUser && findUser.password == req.body.password) {
            res.render("secrets");
        }
    } catch(error) {
        res.send(error);
    } 
});

module.exports = router;