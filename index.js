const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const Product = require('./models/product')
mongoose.connect('mongodb://localhost:27017/productsdb' , {useNewUrlParser: true})
    .then(() => {
        console.log('Mongo connection successful')
    })
    .catch(err => {
        console.log(`Mongo Connection failed, Error:- ${err}`);
    })

