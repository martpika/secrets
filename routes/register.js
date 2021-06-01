const express = require("express");
const router = express.Router();
const {User} = require("../config/model/user");

router.get("/", (req, res)=>{
    res.render("register");
})

router.post("/", async(req, res)=>{
    const {username, password} = req.body;
    try {
        await User.create({
            email: username,
            password: password
        });
        res.render("secrets");
    } catch(error) {
        res.send(error);
    }
});

module.exports = router;