const mongoose = require('mongoose');

let ContactSchema = mongoose.Schema({
    name: String,
    email: String,
    message: String
});

let Contact = module.exports = mongoose.model('Contact', ContactSchema);