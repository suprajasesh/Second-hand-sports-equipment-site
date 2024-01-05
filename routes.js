const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const Contact = require('./contact_schema');
const Item = require('./item_schema');

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
  filename: function(req, file, cb) {
    // Generate a unique filename
    const itemId = req.body._id;

    // Generate filename using the item's _id
    const filename = `${req.body._id.toString()}${path.extname(file.originalname)}`;

    cb(null, filename);
  }
});
const upload = multer({ storage: storage, limits: { fileSize: 10 * 1024 * 1024  }});

// Set up a route to handle file uploads
router.post('/sellsuccess', upload.single('image'), async (req, res) => {
  try {
    //console.log(req.body,req.file);
    const newItem = new Item({
      name: req.body.name,
      email: req.body.email,
      item: req.body.item,
      yold: req.body.yold,
      price: req.body.price,
      desc: req.body.desc,
      image: {
        data: req.file.buffer,
        contentType: req.file.mimetype
      },
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
    const itemsWithImageURL = items.map(item => ({
      ...item._doc,
      imageUrl: `/uploads/${item._id.toString()}`
    }));    
    //console.log(itemsWithImageURL);
    res.json(itemsWithImageURL);
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
