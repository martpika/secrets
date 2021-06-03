const {Schema, model} = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");


const userSchema = new Schema({
    email: String,
    password: String
});


userSchema.plugin(passportLocalMongoose);


module.exports = model("User", userSchema);