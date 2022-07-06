const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const CampgroundSchema = new Schema({
    Title:String,
    Price:Number,
    Discription:String,
    Location:String,
    Image:String
})

module.exports = mongoose.model("Campground",CampgroundSchema);