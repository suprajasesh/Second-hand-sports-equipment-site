const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const path = require('path');
const router = express.Router();
const Contact = require('./contact_schema');
const Item = require('./item_schema');

const imageSchema = new mongoose.Schema({
  filename: String,
  data: Buffer,
  contentType: String,
});

const Image = mongoose.model('Image', imageSchema);

router.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

router.post('/contactsuccess', async (req, res) => {
  const data = new Contact({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message
  });

  console.log(data);

  try {
    await data.save();
    console.log('Message saved successfully!');
    res.redirect('/#!/contact');
  } catch (err) {
    console.log(err);
  }
});

const storage = multer.diskStorage({
  destination: './uploads/',  // Specify the destination folder
  filename: function (req, file, cb) {
    const uniqueFilename = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueFilename + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage, limits: { fileSize: 10 * 1024 * 1024  }});

// Set up a route to handle file uploads
router.post('/sellsuccess', upload.single('image'), async (req, res) => {
  try {
    console.log(req.file.filename);
    const imagedeets= new Image({
      filename: req.file.filename,
      data: req.file.buffer,
      contentType: req.file.mimetype,
    });
    imagedeets.save();
    const newItem = new Item({
      name: req.body.name,
      email: req.body.email,
      item: req.body.item,
      yold: req.body.yold,
      price: req.body.price,
      desc: req.body.desc,
      image: imagedeets._id,
      sold: 0
    });

    await newItem.save();
    console.log('Item saved successfully!');
    res.redirect('/#!/sell');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/getitems', async (req, res) => {
  try {
    const items = await Item.find();
    console.log(items);
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post("/getdetails", function (req, res) {
  Contact.find()
    .then(users => {
      // res.render('test', { users });
      console.log(users);
      res.send(users);
    })
    .catch(err => console.error('Error fetching users', err));
});

module.exports = router;
