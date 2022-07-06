const express = require("express");
const path=require("path");
const mongoose=require("mongoose");
const methodOverride = require("method-override");
const ejsMate= require("ejs-mate");
const Campground = require("./models/campground");
mongoose.connect('mongodb://localhost:27017/YelpCamp',{useNewUrlParser:true, useUnifiedTopology:true});

const db=mongoose.connection;
db.on("error",console.error.bind(console,"DB connection error"));
db.once("open",() => {
    console.log("DB connected");
});


const app=express();

app.engine('ejs', ejsMate);
app.set("views",path.join(__dirname,"/views"));
app.set("view engine","ejs");
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))


app.get("/",(req,res)=>{
    res.render("home")
})

app.get("/campground", async (req,res) =>{
    const campground= await Campground.find({});
    res.render("Campground/index",{campground})
})



app.get("/campground/new", (req,res) =>{
    res.render("Campground/new");
})
app.post("/campground", async (req,res) =>{
     const camp=await new Campground(req.body.campground);
     camp.save();
     res.redirect(`/campground/${camp._id}`)
})

app.get("/campground/:id", async (req,res) =>{
    const campground= await Campground.findById(req.params.id);
    res.render("Campground/show",{campground})
})

app.get("/campground/:id/edit", async (req,res) =>{
    const campground= await Campground.findById(req.params.id);
    res.render("Campground/edit",{campground});
})

app.put("/campground/:id", async (req,res) =>{
    const {id}=req.params;
    const campground= await Campground.findByIdAndUpdate(id,{...req.body.campground})
    res.redirect(`/campground/${campground._id}`)
})

app.delete("/campground/:id", async (req,res) =>{
    const {id}= req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect("/campground") ;
})

app.listen(3000,()=>{
    console.log("Serving on port 3000")
})
