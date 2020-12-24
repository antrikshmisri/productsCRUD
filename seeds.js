const mongoose = require('mongoose')
const Product = require('./models/product')
mongoose.connect('mongodb://localhost:27017/productsdb' , {useNewUrlParser: true})
    .then(() => {
        console.log('Mongo connection successful')
    })
    .catch(err => {
        console.log(`Mongo Connection failed, Error:- ${err}`);
    })


const testproduct = new Product({
    name: 'Test Product',
    price: 9.99,
    categories: 'fruit'
})
testproduct.save().then(testproduct => {
    console.log(testproduct)
})
.catch(err => {
    console.log(err)
})