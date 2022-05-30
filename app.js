const express = require("express");
const path = require("path");
// const fs = require("fs");
const app = express();
var mongoose = require('mongoose');
const bodyparser = require('body-parser')
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true});
const port = 8000;

//Defining mongoose schema
var contactSchema = new mongoose.Schema({
    name: String,
    age: String,
    email: String,
    address: String,
    gender: String,
    address: String,
    contact: String
    
  });
var Contact = mongoose.model('Contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{
    const params = { }
    res.status(200).render('Home.pug', params);
})
app.get('/contact', (req, res)=>{
    const params = { }
    res.status(200).render('contact.pug', params);
})

app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved in the Database")
    }).catch(()=>{
        res.status(400).send("The item was not saved in the Database")
    })
    // res.status(200).render('contact.pug'); 
})







// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});