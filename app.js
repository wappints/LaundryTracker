const dotenv = require('dotenv')
const express = require('express')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const path = require('path')
const db = require('./models/db.js'); 
//const fse = require('fs-extra')

const app = express()
const routes = require('./routes/routes.js')
//const { dialog } = require('electron')

//hbs
const hbs = exphbs.create({
    defaultLayout: 'loginLayout',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials'),
  })
 
//env
dotenv.config();
hostname = process.env.HOSTNAME;
port = process.env.PORT;


app.engine('hbs', hbs.engine)
app.set('view engine', '.hbs')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, '/public')))

app.use('/', routes)
/*
app.post('/login', function(req, res) {
  var acc = req.body.ACCType;
  var pass = req.body.PASSField;
  console.log("post received: %s %s", acc, pass)
});
*/
/*
app.use(function (req, res) {
    res.render('error', {
      css: ['global', 'error'],
      status: {
        code: '404',
        message: 'Not Found'
      },
      Level: parseInt(req.session.level)
    })
  })
  */db.connect();
  app.listen(port, hostname, function () {
    console.log('Server running at:')
    console.log('http://' + hostname + ':' + port)
  })
  
  module.export = app