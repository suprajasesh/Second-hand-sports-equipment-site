const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//const { MongoClient, ServerApiVersion } = require('mongodb');

const routes = require('./routes'); // Import the router

const Contact = require('./contact_schema');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));
const uri = 'mongodb+srv://suprajasesh:KaneWilliamson22%23@cluster0.roakn3c.mongodb.net/';
mongoose.connect(uri, { useNewUrlParser: true}
    );
const db = mongoose.connection;
// const db = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

console.log(Contact);

db.once('open', function () {
  console.log("Connected to MongoDB successfully!");
});

db.on('error', function (err) {
  console.log(err);
});

app.use('/', routes); // Use the router

app.listen(3000, function () {
  console.log("Server started on localhost:3000");
});
