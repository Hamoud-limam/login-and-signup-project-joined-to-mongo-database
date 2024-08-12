import express from 'express'
import path from  'path'
import bcrypt from 'bcrypt'
import { collection, message } from './config.js';



const app = express();
app.use(express.static("public"))
app.use(express.json());
app.set('view engine','ejs');
app.use(express.urlencoded({extended: false}));


app.get("/",(req,res)=>{
    res.render('index');
})

app.get("/signup",(req,res)=>{
    res.render('signup');
})

app.get("/login",(req,res)=>{
    res.render('login');
})


app.post("/dashboard",  async(req,res)=>{
    try{
        const check = await collection.findOne({ name :req.body.username});
        const checkpass = await  collection.findOne({ passowrd :req.body.passowrd});
        if (check && checkpass ){
            res.send('welcome home')
            console.log('user checked')
        }
        else {
            console.log("wrong pass or name")
        }
    }
    catch (err){
console.log("wrong pass or name")
} 
})


app.post("/signup", async (req,res) =>{


    try{
        const data = {
            name : req.body.username,
            password : req.body.password
        }
const existuser =  await collection.findOne({name :data.name});

if (existuser){
    console.log("user already exists")
    res.send('user already exists')
    return
}


     const userData = await collection.insertMany(data);
   console.log('user added to database' );
  

   res.render("login")
   
   }
 
    catch(err){
        console.log(err)
    }
})
app.post('/message',async (req,res)=>{
    try{
        const messdata = {
            messagedata : req.body.messageinf 
           
        }
    
    const messageadded = await  message.create(messdata);
    
    console.log('message sent')
    res.send('message sended')
    
    }
    catch{
        console.log('error')
    }
})

app.listen(3000,()=>{
    console.log('i am listening to port 3000')
})