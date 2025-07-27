const express=require("express");
const mongoose= require("mongoose");
const path=require("path");
const app= express();
const Chat=require("./models/chat.js")
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.urlencoded({extended:true}));

main().then(()=>{console.log("connect successfully")})
.catch((err)=>console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/whatsapp');
    
}
app.get("/",(req,res)=>{
    res.send("req send ")
});
//index route
app.get("/chats",(async (req,res)=>{
  let chats= await  Chat.find();
    res.render("index.ejs",{chats})
}));
// new chat route 
app.get("/chats/new",(async (req,res)=>{
    res.render("new.ejs")
}));

//post new chat
app.post("/chats",(async (req,res)=>{
    let {from ,message,to,}=req.body;
   let newchat= new Chat({
    from:from,
    message:message,
    to:to,
    create_at:new Date()
   }) ;
   newchat.save().then((result)=>{console.log(result)});
   console.log(newchat);
    res.redirect("/chats")
}));
// edit chat
app.get("/chats/:id/edit",(async (req,res)=>{
    let {id}= req.params;
    // console.log(req.params.id);
let chat= await Chat.findById(id);
    res.render("edit.ejs",{chat});
}));
//UPDATE ROUTE
app.put("/chats/:id",async(req, res)=>{
    let {id}= req.params;
    let { message } = req.body;
await Chat.findByIdAndUpdate(id, { message }, {
  runValidators: true,
  new: true
});
        res.redirect("/chats")
});

app.delete("/chats/:id",async(req,res)=>{
     let {id}= req.params;
    let deletedchat= await Chat.findByIdAndDelete(id);
    console.log(deletedchat);
    res.redirect("/chats");

});
app.listen(8000,()=>{
    console.log("listen on port 8000")
});