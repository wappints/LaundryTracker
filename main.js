
const {app, BrowserWindow} = require('electron')
require('./app.js')
const url = require('url')
const path = require('path')

//Electron

let win

function createWindow() {
   win = new BrowserWindow({width: 1920, height: 1080})
   win.loadURL(url.format ({
      pathname: path.join(__dirname, 'views/login.hbs'),
      protocol: 'file:',
      slashes: true
   }))
}

app.on('ready', createWindow)


