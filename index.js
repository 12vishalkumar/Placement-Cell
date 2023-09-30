//---------------------- importing required libaries --------------------------//
const express = require('express');
const dotenv = require('dotenv');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-startegy');
dotenv.config({ path: 'config/.env' });
const app = express();

//------------------- require connect flash ------------------------//
const flash = require("connect-flash");

//------------------- require custom middleware -------------------//
const customMiddleware = require("./config/flash");


//----------------------- defining port -------------------------------------//
const port = process.env.PORT || 8001;


//-------------------------------- set ejs as view engine -------------------//
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(
	session({
		secret: "I Love You",  //Defining SECRET is stored in the system veriable
		resave: false,
		saveUninitialized: false,
		cookie: { maxAge: 1000 * 60 * 100 },
	})
);

//-------------- extract styles and scripts from sub pages into the layout -----//
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
app.use(express.urlencoded({ extended: true }));

//----------------------------- for static file use ----------------------------//
app.use(express.static('./assets'));

//------------------------------- for authentication ---------------------------//
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMiddleware.setflash);

//------------------------------ express router --------------------------------//
app.use('/', require('./routes'));

//----------------------------- listen to the port ---------------------------------//
app.listen(port, function (error) {
	if (error) {
		console.log(`Error in connecting to server: ${error}`);
		return;
	}
	console.log(`Server is running on port: ${port}`);
});