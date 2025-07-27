const mongoose= require("mongoose");
const Chat=require("./models/chat.js")

main().then(()=>{console.log("connect successfully")})
.catch((err)=>console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/whatsapp');}

   let allChats = [{ 
    from:"vikas",
    to:"vijay",
    message:"hello kaha hai",
    create_at:new Date()
},{
   from:"siddharth",
    to:"vijay",
    message:"chal bahar chalte hai",
    create_at:new Date() 
},
{from:"vikas",
    to:"siddharth",
    message:"chai peene chle",
    create_at:new Date()}
];
Chat.insertMany(allChats).then((res)=>console.log(res));