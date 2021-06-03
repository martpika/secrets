require("dotenv").config();
require("ejs");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const flash = require("connect-flash");
const app = express();

// Setup the middlewares
app.set("view engine", 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(flash());
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
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Setup Routes
app.get("/", (req, res)=>{
    res.render("home");
});

// Setup routers
const register = require("./routes/register");
const login = require("./routes/login");
const secrets = require("./routes/secrets");
const logout = require("./routes/logout");
app.use("/register", register);
app.use("/login", login);
app.use("/secrets", secrets);
app.use("/logout", logout);


app.listen(3000, ()=>{
    console.log("We are in port 3000...");
});