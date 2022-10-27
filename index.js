const express = require('express')
const bodyparser = require('body-parser')
const path = require('path')
const app = express()
require('dotenv').config() 

 
const stripe = require('stripe')(process.env.Secret_Key)
 
const port = process.env.PORT || 3000
 
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())
 
// View Engine Setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
 
app.get('/', function(req, res){
    res.render('Home', {
    key: process.env.publishable_Key
    })
})
 
app.post('/payment', function(req, res){
 
    // Moreover you can take more details from user
    // like Address, Name, etc from form
    stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken,
        name: 'Gautam Sharma',
        address: {
            line1: 'Futa Junction',
            postal_code: '110092',
            city: 'Akure',
            state: 'Ondo State',
            country: 'Nigeria',
        }
    })
    .then((customer) => {
 
        return stripe.charges.create({
            amount: 7000,    // Charing Rs 25
            description: 'Web Development Product',
            currency: 'NGN',
            customer: customer.id
        });
    })
    .then((charge) => {
        res.send("Success") // If no error occurs
    })
    .catch((err) => {
        res.send(err)    // If some error occurs
    });
})
 
app.listen(port, function(error){
    if(error) throw error
    console.log("Server created Successfully")
})
