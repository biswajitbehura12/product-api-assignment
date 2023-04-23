const express = require('express');
const colors = require('colors');
const mongoose = require('mongoose')
const PORT =  8088;

const app = express();

app.use(express.json({extended: false}));

const connectDB = async () => {
    try{
        const conn = await mongoose.connect("mongodb+srv://dpuser:dpUser@blog-app2.hfxckhs.mongodb.net/?retryWrites=true&w=majority");
        console.log(`MongoDB Connected: ${conn.connection.host}`.green.underline.bold);
    }catch(err){
        console.log(`ERROR: ${err.message}`.bgRed.underline.bold);
        process.exit(1);
    }
}

connectDB();
app.get("/",(req,res)=>{
          res.send("working fine");
})

app.use ('/product', require('./routes/productRoutes'));

app.listen(PORT, () => console.info(`Server is running on port ${PORT}`.green.underline.bold));