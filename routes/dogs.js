const express = require('express');
const { append } = require('express/lib/response');
const router = express.Router();

router.get('/',(req,res)=>{
    res.send("dogs HOME PAGE")
})
router.post('/',(req,res)=>{
    res.send("dogs POST PAGE")
})
router.get('/:id',(req,res)=>{
    res.send("dogs SHOw PAGE")
})
router.get('/:id/edit',(req,res)=>{
    res.send("dogs EDIT PAGE")
})

module.exports=router