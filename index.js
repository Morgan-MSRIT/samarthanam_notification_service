const express=require("express");
const app=express();

const { WebSocketServer } = require("ws");



//connection for databse
const database=require("./configs/database");
const cors=require("cors");
// const { cloudinaryConnect }=require("./configs/cloudinary");
const dotenv=require("dotenv");
const { watchEvents } = require("./ws/eventNotifier");
const { watchVolunteers } = require("./ws/volunteerNotifier.js");
const { initializeCache } = require("./utils/cache.js");

dotenv.config();


//port no
const PORT=process.env.PORT || 4001;

//connect
database.connect();


//cloudinary connect
// cloudinaryConnect();


//to parse json
app.use(express.json());


//establishing connection between frontend and backend through cors
app.use(
    cors({
        origin:"*",
        // origin:"http://localhost:3000",
        credentials:true
    })
);


  
//default route
app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:"Notification Service running!"
    })
});


//Activate server
app.listen(PORT, async () => {
    await initializeCache();
    console.log(`App is running at ${PORT}`)
    watchEvents();
    watchVolunteers();
})
