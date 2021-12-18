
const {BrowserWindow} = require('electron')
//const {handlebarsHbs} = require('handlebars-hbs');
const url = require('url')
const path = require('path')
/*const newHandlebars = new handlebarsHbs(
   path.join(__dirname, 'views'), // the path to views folder
   path.join(__dirname, 'views', 'layouts'), // the path to layouts
   'login.hbs',// the main file i'ts similar to the following example
   path.join(__dirname, 'views', 'temp') // the temp folder i'ts very important because since that's where all the .html already rendered are saved
);*/

function createWindow() {
   const win = new BrowserWindow({        webPreferences: {
      nodeIntegration: true}, width: 1920, height: 1080})
   win.loadURL(url.format ({
      pathname: path.join(__dirname, 'login.html'),
      protocol: 'file:',
      slashes: true
   }), {})
   
   /*
   mainWindow.webContents.on('did-finish-load', () => {
      mainWindow.show();
      mainWindow.focus();
    });
    */
}

module.exports = {createWindow}