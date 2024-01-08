const mongoose = require("mongoose")
mongoose.connect(process.env.MONGOOSE)

const db = mongoose.connection;
db.on('error', console.error.bind(console, "Something went Wrong in DB"))
db.once('open', () => {
    console.log("Database Connected")
})      