const mongoose = require('mongoose');
require("dotenv").config();

const mongoURI = process.env.MONGO_URL;

const connectToMongo = async () => {  
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ Connected to MongoDB Atlas");
    } catch (err) {
        console.error("❌ MongoDB Connection Error:", err);
    }
};

module.exports = connectToMongo;
