const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const Product = require('./models/product')
const { urlencoded } = require('express')
const methodOverride = require('method-override')
const allCategories = ['fruit' , 'vegetable' , 'dairy']
app.set('views' , path.join(__dirname , 'views'))
app.set('view engine' , 'ejs')
app.use(urlencoded({extended:true}))
app.use(methodOverride('_method'))
app.use(express.static(__dirname + '/public'));
app.use('/styles', express.static(__dirname + '/public'));
mongoose.connect('mongodb://localhost:27017/productsdb' , {useNewUrlParser: true})
    .then(() => {
        console.log('Mongo connection successful')
    })
    .catch(err => {
        console.log(`Mongo Connection failed, Error:- ${err}`);
    })

app.get('/products' , async (req , res) =>{
    const {category} = req.query;
    if(category)
    {
        const products = await Product.find({categories: category})
        res.render('products/index' , {products , allCategories , category})
    }
    else
    {
        const products = await Product.find({})
        res.render('products/index' , {products , allCategories , category: 'All'})
    }
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

app.get('/products/:id/edit' , async (req , res)=>{
    const {id} = req.params;
    const product = await Product.findById(id);
    res.render('products/edit' , {product})
})

app.put('/products/:id' , async (req , res)=>{
    const {id} = req.params
    const updateProduct = await Product.findByIdAndUpdate(id , req.body , {runValidators: true})
    res.redirect(`/products/${updateProduct._id}`)
})

app.get('/products/:id/delete' , async (req , res)=>{
    const {id} = req.params
    const product = await Product.findById(id)
    res.render('products/delete' , {product})
})

app.delete('/products/:id' , async (req , res)=>{
    const {id} = req.params
    await Product.findByIdAndDelete(id)
    res.redirect('/products')
})
app.listen(5050 , ()=>{
    console.log("Listening on port 5050")
})