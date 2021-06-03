const router = require("express").Router();
const User = require("../config/model/user");
const passport = require("passport");


router.get("/", (req, res)=>{
    res.render("login");
});


router.post("/", passport.authenticate("local", {
    successRedirect: "/secrets",
    failureRedirect: "/login"
}));


module.exports = router;