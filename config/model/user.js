const {Schema, model} = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require('mongoose-findorcreate');


const userSchema = new Schema({
    email: String,
    password: String,
    googleId: String
});


userSchema.plugin(passportLocalMongoose, {usernameUnique: false});
userSchema.plugin(findOrCreate);


module.exports = model("User", userSchema);