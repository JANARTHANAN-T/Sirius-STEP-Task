const mongoose = require('mongoose');
const Product=require('./module/product')
mongoose.connect('mongodb://localhost:27017/farmDiary',{useNewUrlParser:true,useUnifiedTopology:true})
.then( () => {
    console.log("Connection open")
}).catch(err => {
    console.log("OOPS !! ERROR")
})

// const p =new Product({
//     name:"Grape",
//     price:50,
//     category:'fruit'
// })
const seedProducts = [
    {
        name:"apple",
        price:100,
        category:"fruit"
    },
    {
        name:"milk",
        price:30,
        category:"dairy"
    },
    {
        name:"potato",
        price:70,
        category:"vegetable"
    },
    {
        name:"cheese",
        price:120,
        category:"dairy"
    },
    {
        name:"radish",
        price:40,
        category:"vegetable"
    },

]
// Product.insertMany(seedProducts)
// .then(data => {
//     console.log(data)
// })
// .catch(err => {
//     console.log(err)
// })
