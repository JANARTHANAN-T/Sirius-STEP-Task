const express = require('express');
const { append } = require('express/lib/response');
const router = express.Router();

router.get('/',(req,res)=>{
    res.send("SHELTERS HOME PAGE")
})
router.post('/',(req,res)=>{
    res.send("SHELTERS POST PAGE")
})
router.get('/:id',(req,res)=>{
    res.send("SHELTERS SHOw PAGE")
})
router.get('/:id/edit',(req,res)=>{
    res.send("SHELTERS EDIT PAGE")
})

module.exports=router