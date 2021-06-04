const router = require("express").Router();
const User = require("../config/model/user");


router.get("/", async(req, res)=>{
    const users = await User.find({secrets: {$ne: null}});
    res.render("secrets", {users: users});
});


module.exports = router;
