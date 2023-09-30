//-------------------- importing mongo DB ----------------------//
const mongoose = require("mongoose");


//------------------- mongo db url ----------------------------//
const password = "12345";
const DB = `mongodb+srv://vishal:${password}@placement-cell.7vaoraz.mongodb.net/?retryWrites=true&w=majority`;

//--------------------- connecting to the mongo db ------------//
mongoose.connect(DB, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
const db = mongoose.connection;

//-------------------- error massage in mongo db -------------//
db.on('error', console.error.bind(console, "Error in connecting to MongoDB"));

//------------------- running mongo db ----------------------//
db.once('open', function () {
	console.log("Connected to Database :: MongoDB");
});

//-------------------- exporting db ------------------------//
module.exports = mongoose;