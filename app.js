const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const ejs = require('ejs');

const Photo = require('./models/Photo');
const app = express();

mongoose.connect('mongodb://localhost/pcat', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=> {
  console.log('DB CONNECTED!')
}).catch((err)=> {
  console.log(err)
})

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.set("view engine", "ejs");

app.post('/photos', async (req, res) => { // async - await yapısı kullanacğız.
  await Photo.create(req.body)            // body bilgisini Photo modeli sayesinde veritabanında dökümana dönüştürüyoruz.
  res.redirect('/')
});

app.get('/', async (req, res) => {
  const photos = await Photo.find({})
  res.render('index', {
    photos
  });
});

app.get("/", (req, res) => {
  res.render('index');
});

app.get("/about", (req, res) => {
  res.render('about');
});

app.get("/add_post", (req, res) => {
  res.render('add_post');
});

app.listen(5000, () => {
  console.log('server is up')
});
