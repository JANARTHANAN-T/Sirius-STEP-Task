const express = require('express');
const app=express();
const path=require('path');
const Product=require('./module/product')
const Farm=require('./module/farm')
const mongoose = require('mongoose');
const methodOverride=require('method-override')
mongoose.connect('mongodb://localhost:27017/farmDiary2',{useNewUrlParser:true,useUnifiedTopology:true})
.then( () => {
    console.log("Connection open")
}).catch(err => {
    console.log("OOPS !! ERROR")
})
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'))
const categories =['fruit','vegetable','dairy']
app.get('/',(req,res)=>{
    res.redirect('/products');
})

//farm
app.get('/farms',async (req,res)=>{
    const farms = await Farm.find({})
    res.render('farms/index.ejs',{farms})
})
app.get('/farms/new',(req,res) => {
    res.render('farms/new.ejs')
})
app.post('/farms',async (req,res)=> {
    const farm = await new Farm(req.body);
    await farm.save();
    res.redirect('/farms');
})
app.get('/farms/:id',async(req,res)=>{
    const {id} = req.params
    const farm = await Farm.findById(id).populate('products');
    res.render('farms/show.ejs',{farm})
})
app.get('/farms/:id/products/new',async (req,res) => {
    const {id} = req.params;
    const farm = await Farm.findById(id);
    res.render('farms/farmproduct.ejs',{categories,id,farm})
})
app.post('/farms/:id/products',async (req,res) => {
    const {id} = req.params
    const farm = await Farm.findById(id);
    const {name,price,category} = req.body;
    const product = new Product({name,price,category});
    farm.products.push(product);
    product.farm=farm;
    await product.save();
    await farm.save();
    res.redirect(`/farms/${id}`);
})
app.delete('/farms/:id' , async (req,res) => {
    const {id}=req.params;
    const farm = await Farm.findByIdAndDelete(id);
    res.redirect('/farms')
})
//product
app.get('/products',async (req,res) => {
    const {category}=req.query;
    if(category){
        const products= await Product.find({category});
        res.render('index.ejs',{products,category})
    }else{
    const products= await Product.find({});
    res.render('index.ejs',{products,category:'All'})
    }
})
app.get('/products/new', (req,res) => {
    
    res.render('products/new.ejs',{categories});
})
app.post('/products', async(req,res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`);
})
app.get('/products/:id',async (req,res) => {
    const{id}=req.params;
    const product= await Product.findById(id).populate('farm','name');
    res.render('products/show.ejs',{product})
})
app.get('/products/:id/edit',async (req,res) => {
    const{id}=req.params;
    const product= await Product.findById(id);
    res.render('products/edit.ejs',{product,categories})
})
app.put('/products/:id',async (req,res) => {
    const{id}=req.params;
    const product= await Product.findByIdAndUpdate(id,req.body,{runValidators:true,new:true});
    res.redirect(`/products/${product._id}`)
})
app.delete('/products/:id',async (req,res) => {
    const {id}=req.params;
    const deletedProduct= await Product.findByIdAndDelete(id);
    res.redirect('/products');

})
app.listen(8080, () =>{
    console.log("Listening on server 8080")
})

