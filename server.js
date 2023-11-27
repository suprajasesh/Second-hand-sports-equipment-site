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

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/testdb');
const db = mongoose.connection;

const Contact = require('./contact_schema');
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
    res.send('Message saved successfully!');



    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'supraja2809@gmail.com',
          pass: 'davschool'
        }
      });
      const { name, email, message } = req.body;
      // Configure email options
      const mailOptions = {
        from: `${name} <${email}>`,
        to: 'supraja2010341@ssn.edu.in',
        subject: 'Subject of your email',
        text: message
      };
    
      // Send email with transporter object
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          res.send('Error sending email');
        } else {
          console.log('Email sent: ' + info.response);
          res.send('Email sent successfully');
        }
      });
});


// const newUser = new Contact({
//     firstname: 'John Doe',
//   });
  
// newUser.save()
//     .then(() => {
//     console.log('User saved successfully!');
//     })
//     .catch(err => {
//     console.log(err);
// });


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
app.listen(3000, function(){
    console.log("Server started on localhost:3000");
});
