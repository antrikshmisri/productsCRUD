const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const Product = require('./models/product')
const { urlencoded } = require('express')

app.set('views' , path.join(__dirname , 'views'))
app.set('view engine' , 'ejs')
app.use(urlencoded({extended:true}))
mongoose.connect('mongodb://localhost:27017/productsdb' , {useNewUrlParser: true})
    .then(() => {
        console.log('Mongo connection successful')
    })
    .catch(err => {
        console.log(`Mongo Connection failed, Error:- ${err}`);
    })

app.get('/products' , async (req , res) =>{
    const products = await Product.find({})
    res.render('products/index' , {products})
})

app.get('/products/new' , (req , res)=>{
    res.render('products/new')
})

app.post('/products' , async (req , res)=>{
    const newProduct = new Product(req.body)
    await newProduct.save()
        .then(p => {
            console.log(`Product Saved!::- ${p}`)
        })
        .catch(err => {
            console.log(`Error:- ${err}`)
        })
    res.redirect('/products')
})
app.get('/products/:id' , async (req , res)=>{
    const {id} = req.params;
    const product = await Product.findById(id)
    res.render('products/show' , {product})
})


app.listen(5050 , ()=>{
    console.log("Listening on port 5050")
})