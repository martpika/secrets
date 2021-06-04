const router = require("express").Router();
const User = require("../config/model/user");


router.get("/", (req, res)=>{
    if (req.isAuthenticated()) {
        res.render("submit");
    } else {
        res.redirect("/login");
    }
});


router.post("/", async(req, res)=>{
    const id = req.user.id;
    const secret = req.body.secret;
    try {   
        const user = await User.findById(id);
        user.secrets.push(secret);
        await user.save();
        res.redirect('/submit');
    } catch (error) {
        res.send(error);
    }
})

module.exports = router;