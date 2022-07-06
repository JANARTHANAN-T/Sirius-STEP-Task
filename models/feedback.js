const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const feedbackSchema = new Schema({
    mail:{
        type: String,
      },
    feedback:{
        type: String,
      }
    
})

module.exports = mongoose.model("Feedback",feedbackSchema);
