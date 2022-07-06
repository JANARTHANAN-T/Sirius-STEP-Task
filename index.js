const express =require('express');
const app=express();
var methodOverride=require('method-override');
const path=require('path')
const { v4: uuid } = require('uuid');
uuid(); 
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')
let comments =[
    {
        id:uuid(),
        username:'karthi',
        comment:'Hello everyone'
    },{
        id:uuid(),
        username:'Harini',
        comment:'Hi there'
    },{
        id:uuid(),
        username:'Lewandowski',
        comment:'A goal!!'
    },{
        id:uuid(),
        username:'Neymar',
        comment:'Rainbow skill'
    }
] 
app.get('/comments',(req,res) => {
    res.render('comments/index.ejs',{comments})
})
app.get('/comments/new',(req,res) => {
    res.render('comments/new.ejs')
})
app.post('/comments',(req,res) => {
    const{username,comment}=req.body;
    comments.push({username,comment,id:uuid()});
    res.redirect('/comments')
})
app.get('/comments/:id', (req,res) => {
    const {id} = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/show', {comment})
})
app.get('/comments/:id/edit', (req,res) => {
    const {id} =req.params;
    const comment= comments.find(c => c.id === id);
    res.render('comments/edit.ejs',{comment});
})
app.patch('/comments/:id', (req,res) => {
    const {id} =req.params;
    const newComment=req.body.comment;
    const foundComment= comments.find(c => c.id === id);
    foundComment.comment=newComment;
    res.redirect('/comments');
})
app.delete('/comments/:id', (req,res) => {
    const {id} =req.params;
    comments= comments.filter(c => c.id !== id);
    res.redirect("/comments");
})
app.listen(8080,() => {
    console.log("Sever run on port 8080")
})