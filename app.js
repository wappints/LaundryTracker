const express = require('express'); 
const dotenv = require('dotenv'); 
const hbs = require('hbs'); 
const db = require('./models/db.js'); 
const routes = require('./routes/routes.js');
const app = express(); 

const session = require('express-session');
const MongoStore = require('connect-mongo');

app.set('view engine', 'hbs'); 
app.use(express.urlencoded({extended : true}));
app.use(express.static('public'));

dotenv.config(); 

hostname = process.env.HOSTNAME;
port = process.env.PORT || 3000; 

//register partials
hbs.registerHelper('IFEQUALS', function(v1, v2, options) {
    console.log(v1)
    console.log(v2)
    if(v1 == v2) {
      return options.fn(this);
    }
    return options.inverse(this);
  });
             
app.use(
    session({
        secret: 'LaundryTracker',
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl:"mongodb+srv://admin:admin@clickandship.qtova.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"})
    })
);

app.use('/', routes);

//path if it does not exist
app.use(function (req, res) {
    res.send('error');
});

//connect to database
db.connect();

app.listen(port, hostname, function () {
    console.log(`Server is running at:`);
    console.log(`http://localhost` + `:` + port);
});
