const express = require('express');
const { dirname } = require('path');
const app=express();
const path=require('path');
const redditData=require('./data.json')
app.set('veiw engine','ejs');
app.set('views',path.join(__dirname,'/views'))
app.use(express.static(path.join(__dirname,'/public')))
app.get('/',(req,res) => {
    res.render('home.ejs')
})

app.get('/random', (req,res) => {
    const num =Math.floor(Math.random() *10)+1;
    res.render('random.ejs' ,{num})
})
app.get('/r/:subreddit', (req,res) => {
    const {subreddit}=req.params;
    const data=redditData[subreddit]
    if(data)
    res.render('subreddit.ejs',{...data})
    else
        res.render('notfound.ejs',{subreddit})
})
app.get('/MOVIES', (req,res) => {
    const movies =[
        "GOT","MONEYHEIST","DEADPOOL","SEX EDUCATION","HELLBOUND","CHERNOBYL"
    ]
    res.render('movies.ejs' ,{movies})
}) 

app.get('/search',(req,res) => {
   const {q}=req.query
   if(!q){
       res.send('Nothing to found in search')
   }
    res.send(`<h2> Searching for ${q} </h2>`)
})
app.get('*', (req,res) => {
    res.send("Path not available")
})
app.listen(8080, () =>{
    console.log("Server is running on 8080");
});



