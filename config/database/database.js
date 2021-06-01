const mongoose = require('mongoose');

const setDatabase = ()=>{
    mongoose.connect('mongodb://localhost:27017/userDB', {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    });
};

exports.setDatabase = setDatabase;
