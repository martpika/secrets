require("dotenv").config();
require("ejs");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
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
require("./config/passport")(passport);

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
const submit = require("./routes/submit");
app.use("/register", register);
app.use("/login", login);
app.use("/secrets", secrets);
app.use("/logout", logout);
app.use("/auth", auth);
app.use("/submit", submit);


app.listen(3000, ()=>{
    console.log("We are in port 3000...");
});