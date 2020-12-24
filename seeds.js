const mongoose = require('mongoose')
const Product = require('./models/product')
mongoose.connect('mongodb://localhost:27017/productsdb' , {useNewUrlParser: true})
    .then(() => {
        console.log('Mongo connection successful')
    })
    .catch(err => {
        console.log(`Mongo Connection failed, Error:- ${err}`);
    })


const productArr = [
    {
        name: 'Watermelon',
        price: 1.5,
        categories: 'fruit'
    },
    {
        name: 'Mango',
        price: 1.99,
        categories: 'fruit'
    },
    {
        name: 'Potato',
        price: 0.5,
        categories: 'vegetable'
    },
    {
        name: 'Cheese',
        price: 2.99,
        categories: 'dairy'
    }
];

Product.insertMany(productArr)
.then(res => {
    console.log(res)
})
.catch(err => {
    console.log(err)
})