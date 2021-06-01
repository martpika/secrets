//jshint esversion:6
require("dotenv").config();
const express = require("express");
const ejs = require("ejs");

const app = express();

// Setup the middlewares
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

// Setup the database
const {setDatabase} = require("./config/database/database");
setDatabase(); 

app.get("/", (req, res)=>{
    res.render("home");
});

// Setup routers
const register = require("./routes/register");
const login = require("./routes/login");
app.use("/register", register);
app.use("/login", login);

app.listen(3000, ()=>{
    console.log("We are in port 3000...");
});