if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const path=require("path");
const mongoose=require("mongoose");
const methodOverride = require("method-override");
const ejsMate= require("ejs-mate");
const sendMail = require('./public/js/mail.js');
const Feedback = require('./models/feedback.js');
const Product = require('./models/product.js');
const Gallery = require('./models/gallery.js');
const flash = require('connect-flash');
const session = require('express-session');
const { ppid } = require('process');
const db1=process.env.DB_URl;
const sessionConfig = {
    name: 'fabrics',
    secret:"it's secret", 
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}


mongoose.connect(db1,{useNewUrlParser:true, useUnifiedTopology:true})
.then( () => {
    console.log("DB Connected")
}).catch(err => {
    console.log(err)
    console.log("DB Error")
})

const app=express();
app.engine('ejs', ejsMate);
app.set("views",path.join(__dirname,"/views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.use(flash())
app.use(session(sessionConfig));

app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

let access1=0;
let access2=0;
let display;

app.get("/",(req,res)=>{
    req.flash("success",'Welcome!');
    access1=0
    access2=0
    res.render("home")
})

app.post("/",(req,res) =>{
    const feedback=new Feedback(req.body.feed);
    if(feedback.save())
    {
    req.flash("success",'Feedback send');
    }
    else{
        req.flash("error",'Feedback not send')
    }
    res.redirect(`/`)
})

app.get("/about",(req,res)=>{
    access1=0
    access2=0
    res.render("about")
})

app.get("/product",async(req,res)=>{
    access2=0
    const product= await Product.find({});
    let arr=[]
    for(let p of product){
        arr.push(p.type)
    }
    display=true;
    let products =[...new Set(arr)]
    res.render("product",{product,access1,products,display})
})



app.get("/productForm",(req,res)=>{
    access1=0
    access2=0
    res.render("./form/productForm")
})

app.post("/productForm",(req,res)=>{
    const product=new Product(req.body.product);
    if(product.save())
    {
    req.flash("success",'Post created');
    }
    else{
        req.flash("error",'Post not created')
    }
    res.redirect(`/product`)
})
app.get('/product/:type',async(req,res)=>{
    access2=0
    const {type}=req.params;
    const product1= await Product.find({});
    let arr=[]
    for(let p of product1){
        arr.push(p.type)
    }
    display=true;
    let products =[...new Set(arr)]
    const product = await Product.find({type})
    display=false
    res.render("product",{product,access1,display,products})
})
app.get("/gallery",async(req,res)=>{
    access1=0
    const gallery=await Gallery.find({});
    res.render("gallery",{gallery,access2})
})

app.get("/galleryForm",(req,res)=>{
    access1=0
    access2=0
    res.render("./form/galleryForm")
})

app.post("/galleryForm",(req,res)=>{
    const gallery=new Gallery(req.body.gallery);
    if(gallery.save())
    {
    req.flash("success",'Gallery photo created');
    }
    else{
        req.flash("error",'Gallery not photo created')
    }
    res.redirect(`/gallery`)
})

app.get("/security",(req,res)=>{
    res.render("./form/securityForm")
})

app.post("/security",(req,res)=>{
    const code=req.body;
    const scode=code.sc;
    if(scode==process.env.SECURITYproduct)
    {
        access1=1
        res.redirect('/product')
    }
    else if(scode==process.env.SECURITYgallery){
        access2=2
        res.redirect('/gallery')
    }
    else{
        req.flash("error",'Not Allowed')
        res.redirect('/product')
    }
})

app.get("/contact",(req,res)=>{
    access1=0
    access2=0  
    res.render("contact")
})

app.post('/contact', (req, res) => {
    const { subject, email, text, name, mobile } = req.body;
    console.log('Data: ', req.body);

    sendMail(email, subject, text, name, mobile, function(err, data) {
        if (err) {
            console.log('ERROR: ', err);
            req.flash("error",'Mail and Send')
            return res.redirect('/contact');
        }
        req.flash("success",'Mail send');
        return res.redirect('/contact');
    });
});

app.delete("/product/:id", async (req,res) =>{
    const {id}= req.params;
    await Product.findByIdAndDelete(id);
    res.redirect("/product") ;
})

app.delete("/gallery/:id", async (req,res) =>{
    const {id}= req.params;
    await Gallery.findByIdAndDelete(id);
    res.redirect("/product") ;
})

const port =process.env.PORT || 5000
app.listen(port,()=>{
    console.log("Serving on port 5000")
})


