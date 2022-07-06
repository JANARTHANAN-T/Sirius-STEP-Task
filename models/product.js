const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const productSchema = new Schema({
    image:{
        type:String,
      },
        name:{
        type: String,
      },
      type:{
        type: String,
      },
      prize:{
          type:Number,
      },
      description:{
          type:String
      }

    
})

module.exports = mongoose.model("Product",productSchema);
