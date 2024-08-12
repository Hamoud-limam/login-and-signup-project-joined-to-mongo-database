import mongoose from "mongoose";

const connect = mongoose.connect("mongodb://localhost:27017/login-information");
connect.then(()=>{
    console.log('connected successful to  database')
})
connect.catch(()=>{
    console.log('connectde failed to  database')
})

const loginShema = new mongoose.Schema({
name : {
    type: String,
    required : true

},
password : {
    type : String,
    required : true 
}

});

const messshema = new mongoose.Schema({
    messagedata : {
        type: String,
        required : true
    }
    });
    const collection = new mongoose.model("users", loginShema);
    const message = new mongoose.model("messages", messshema);
    export { collection, message };
