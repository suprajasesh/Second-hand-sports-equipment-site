const mongoose = require('mongoose');

let itemSchema = mongoose.Schema({
    name: String,
    email: String,
    item: String,
    yold: Number,
    price: Number,
    desc: String,
    image: { type: mongoose.Schema.Types.ObjectId, ref: 'Image' },
    sold: Boolean
});

let item = module.exports = mongoose.model('item', itemSchema);