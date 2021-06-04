const router = require("express").Router();
const passport = require("passport");
const User = require("../config/model/user");


router.get("/", (req, res)=>{
    res.render("register");
})


router.post("/", async(req, res)=>{      
    const {username, password} = req.body;
    try {
        await User.register({username: username}, password, (err, account)=>{
            if (err) {
                console.log(err);
                res.redirect("/register");
            }
            passport.authenticate("local")(req, res, ()=>{
                res.redirect("/secrets");
            });
        });
    } catch(error) {
        res.send(error);
    }
});


module.exports = router;