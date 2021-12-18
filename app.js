const {createWindow} = require('./main')
const {app} = require('electron')

app.whenReady().then(createWindow)
app.allowRendererProcesesReuse = false;


const express = require('express'); 
var exp = express();
const dotenv = require('dotenv'); 
const db = require('./models/db.js'); 
const routes = require('./routes/routes.js');


const session = require('express-session');
const MongoStore = require('connect-mongo');

exp.set('view engine', 'hbs'); 
exp.use(express.urlencoded({extended : true}));
exp.use(express.static('public'));

dotenv.config(); 

hostname = process.env.HOSTNAME;
port = process.env.PORT || 3000; 

//hbs
exp.set('view engine', 'hbs');

exp.listen(port, hostname, function () {
    console.log(`Server is running at:`);
    console.log(`http://localhost` + `:` + port);
});

exp.use('views/login', routes)

