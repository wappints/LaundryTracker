
const {BrowserWindow} = require('electron')

const url = require('url')
const path = require('path')

//Electron

function createWindow() {
   const win = new BrowserWindow({width: 1920, height: 1080})
   win.loadURL(url.format ({
      pathname: path.join(__dirname, 'login.html'),
      protocol: 'file:',
      slashes: true
   }))
}

module.exports = {createWindow}