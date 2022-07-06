const express = require('express');
const app = express();
const shelterRoutes= require('./routes/shelter');
const dogRoutes= require('./routes/dogs');
app.use('/shelter',shelterRoutes)
app.use('/dogs',dogRoutes)
app.listen(8080,()=>{
    console.log("Server listening on port 8080");
})