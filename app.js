const dotenv = require('dotenv')
const express = require('express')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const path = require('path')
//const fse = require('fs-extra')

const app = express()
const routes = require('./routes/routes.js')
//const { dialog } = require('electron')

//hbs
const hbs = exphbs.create({
    defaultLayout: 'main',
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
  
  app.listen(port, hostname, function () {
    console.log('Server running at:')
    console.log('http://' + hostname + ':' + port)
  })
  
  module.export = app