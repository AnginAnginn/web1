require("dotenv"). config();

const mongoose = require("mongoose"); 
const express = require("express"); 
const cors = require("cors");

const app = express(); //urutan ke 2

mongoose.connect(process.env.URL,{
    useNewUrlParser: true
});

const db = mongoose.connection; 
db.on("error", ()=> console.error(error)); 
db.once("open", ()=> console.log("Database terkoneksi")); 

app.use(express.json());

// Mengizinkan akses ke folder 'images' sebagai konten statis
app.use('/images', express.static('images'));

app.use(cors({credentials:true, origin:'http://localhost:3000'}));

const akunRouter = require("./routes/userRoute.js");
app.use("/user", akunRouter);

const itemRouter = require("./routes/itemRoute.js");
app.use("/item", itemRouter);

const Port = 5000
app.listen(Port, ()=> console.log(`Server terkoneksi port ${Port}`));