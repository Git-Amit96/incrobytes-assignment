require("dotenv").config();
const cookieParser = require('cookie-parser');
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const auth = require("./Routes/auth.route.js");
const items= require("./Routes/items.routes.js");

const port = process.env.PORT || 6000;
const mongoURL= process.env.MONGO_URL;

const app = express();
app.use(cookieParser());

app.use(cors({
    origin: ["http://localhost:5173", "https://zingy-blancmange-f93eac.netlify.app"],
    methods: ["GET", "POST", "PUT", "PATCH"],
    credentials: true
}));

app.use(express.json());


app.use("/auth/user", auth);
app.use("/item", items);

app.get("/",(_, res)=>{
    return res.send("Hii from server.");
})

const connect= async()=>{
    try {
        await mongoose.connect(mongoURL);
        app.listen(port, () => console.log(`Server running on port: ${port}`));
    } catch (error) {
        console.log("Error:", error.message);
    }
};

connect();




