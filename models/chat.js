const mongoose= require("mongoose");
 
const Chatschema=new mongoose.Schema({
    from:{
        type:String,required:true},
     to:{
        type:String,required:true},
      message:{
        type:String,maxLength:50},
      create_at:{
        type:Date,required:true}
});
const Chat = new mongoose.model("Chat",Chatschema);
module.exports=Chat;