const express= require('express');
const dotenv= require('dotenv').config()
const cors= require('cors');
const app=express();
const {mongoose}=require('mongoose')
const cookieParser=require('cookie-parser')
//database connection
mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log('Database connected'))
.catch((err)=> console.log('not connected',err))
//middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}))
app.use('/',require('./routes/authRouter'))
const port=8000;
app.listen(port, ()=> console.log(`Server is running on port ${port}`))
