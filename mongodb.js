const express = require('express');
const mongoose = require('mongoose');
const {Schema,model} = mongoose;
const Repo = require('./models/repos')
require('dotenv').config();
const app =express();



const PORT= process.env.PORT
const MONGO_DB_URL= process.env.MONGO_DB_URL
mongoose.connect(MONGO_DB_URL)
mongoose.connection.once('open',()=>{
    console.log('Connected to database');
    app.listen(PORT,() => {
        console.log('listening on port @' + PORT)});
})
app.use(express.json());

app.get('/', (req, res)=>{
    res.send('Hello World');
})

app.post('/addtodb',async(req,res)=>{
    console.log(req.body)

await Repo.create({
    "title" : req.body.title,
    "stars" : req.body.stars, 
}).then((data)=>{res.status(201).json({
    "message":"Successfully Inserted",
    "data":data
})}).catch((err)=>{res.status(500).json( {"message" : "Failed to Insert",
"data": err})});
})