const mongoose=require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");

mongoose.connect('mongodb://localhost:27017/YelpCamp',{useNewUrlParser:true, useUnifiedTopology:true});

const db=mongoose.connection;
db.on("error",console.error.bind(console,"DB connection error"));
db.once("open",() => {
    console.log("DB Regenerated");
});

const sample = array => array[Math.floor(Math.random()*array.length)];

const seedDB = async ()=>{
    await Campground.deleteMany({});
    for(let i=0;i<50;i++)
    {
        const Random=Math.floor(Math.random()*1000);
        const price=Math.floor(Math.random()*20 +10);
        const camp= new Campground({
            Location:`${cities[Random].city},${cities[Random].state}`,
            Title: `${sample(descriptors)} ${sample(places)}`,
            Image: 'https://source.unsplash.com/collection/483251',
            Discription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut porro, similique quod labore fuga veritatis voluptatum at repudiandae totam expedita. Voluptates voluptatum provident iusto molestiae ipsa neque consequatur quasi aspernatur! ',
            Price: price
        });
        await camp.save();
    }
}

seedDB().then(()=>{
    mongoose.connection.close();
})