// Load express module
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

// Initialize app
const app = express();
// app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     
    extended: true
  }));
app.use(express.static('public'));

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri='mongodb+srv://suprajasesh:<KaneWilliamson22%20>@cluster0.mrychgu.mongodb.net/?retryWrites=true&w=majority'
// mongoose.connect('mongodb://127.0.0.1:27017/testdb');
const db = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

const Contact = require('./contact_schema');
const item = require('./item_schema');

console.log(Contact)

// Check for DB connection
db.once('open', function(){
    console.log("Connected to MongoDB successfully!");
});
db.on('error', function(err){
    console.log(err);
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/success', (req, res) => {
    const data = new Contact({
        name: req.body.name,
        email: req.body.email,
        message: req.body.message
    });
    console.log(data);
    data.save()
    .then(() => {
        console.log('Message saved successfully!');
    })
    .catch(err => {
        console.log(err);
    });
    //res.send('Message saved successfully!<br>Message:<br>Name:', data.name,'<br>Email:',data.email,'<br>Message:',data.message);
});

app.post("/getdetails", function (req, res) {   
    Contact.find()
    .then(users => {
    //    res.render('test', { users });
    console.log(users)
        res.send(users)
    })
    .catch(err => console.error('Error fetching users', err));
})

// Start server with port 3000
const port = process.env.PORT || 3000;
app.listen(port, function(){
    console.log("Server started on localhost:3000");
});
