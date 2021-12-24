const dotenv = require('dotenv')
const express = require('express')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const path = require('path')
const db = require('./models/db.js'); 
const {Handlebars} = require('handlebars')
//const fse = require('fs-extra')

const app = express()
const routes = require('./routes/routes.js')
//const { dialog } = require('electron')

//hbs
var helperIF = {
  'if_neq' : function(a, b, opts) {
  if(a != b) // Or === depending on your needs
      return opts.fn(this);
  else
      return opts.inverse(this);
  },
  
  'if_eq' : function(a, b, opts) {
    if(a === b) // Or === depending on your needs
        return opts.fn(this);
    else
        return opts.inverse(this);
    }
}


const hbs = exphbs.create({
    defaultLayout: 'loginLayout',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials'),
    helpers: helperIF
  })

//env
dotenv.config();
hostname = process.env.HOSTNAME;
port = process.env.PORT;


app.engine('hbs', hbs.engine)
app.set('view engine', '.hbs')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname)))

app.use('/', routes)

db.connect();
  app.listen(port, hostname, function () {
    console.log('Server running at:')
    console.log('http://' + hostname + ':' + port)
  })
  
  module.export = app