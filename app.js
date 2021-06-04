require("dotenv").config();
require("ejs");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const app = express();

// Setup the middlewares
app.set("view engine", 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(session({
    secret: 'Out little secret.',
    resave: false,
    saveUninitialized: false,
    cookie: {}
}));
app.use(passport.initialize());
app.use(passport.session());

// Setup the database
const {setDatabase} = require("./config/database/database");
setDatabase(); 

// Passport Configuration
const User = require("./config/model/user");
passport.use(User.createStrategy());
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
// Google OAuth
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets",
    userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo'
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
    User.findOrCreate({googleId: profile.id, username: profile.id}, function (err, user) {
      return cb(err, user);
    });
  }
));
// Setup Routes
app.get("/", (req, res)=>{
    res.render("home");
});



// Setup routers
const register = require("./routes/register");
const login = require("./routes/login");
const secrets = require("./routes/secrets");
const logout = require("./routes/logout");
const auth = require("./routes/auth");
app.use("/register", register);
app.use("/login", login);
app.use("/secrets", secrets);
app.use("/logout", logout);
app.use("/auth", auth);


app.listen(3000, ()=>{
    console.log("We are in port 3000...");
});