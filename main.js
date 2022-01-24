
const {app, BrowserWindow, globalShortcut, dialog} = require('electron')
const url = require('url')
const path = require('path')
const fse = require('fs-extra')
const appPath = app.getAppPath()
const dotenv = require('dotenv')

let logPath = 'logs'




if (process.env.PORTABLE_EXECUTABLE_DIR !== undefined) {
   logPath = path.join(process.env.PORTABLE_EXECUTABLE_DIR, '/logs')
 } else if (fse.existsSync(path.join(appPath, '../../logs'))) {
   logPath = path.join(appPath, '../../logs')
 }
 dotenv.config({ path: path.join(__dirname, '.env') })

 const port = process.env.PORT
 const hostname = process.env.HOSTNAME

 if (!fse.existsSync(logPath)) {
  fse.mkdirSync(logPath)
}

process.on('uncaughtException', function (error) {
  const log = require('electron-log')
  const errorLogPath = path.join(logPath, 'main.log')
  log.transports.file.resolvePath = () => errorLogPath

  log.error(error)
  dialog.showErrorBox('Failed to start application', 'Something went wrong! A log of the error has been made and can be located at \n' + errorLogPath.replace(/\\/g, '\\\n'))
  app.quit()
})

require('./app.js');
//This is the OG createWindow()

// function createWindow() {
//    const win = new BrowserWindow({        webPreferences: {
//       nodeIntegration: true}, width: 1920, height: 1080})
//    win.loadURL(url.format ({
//       pathname: path.join(__dirname, 'login.html'),
//       protocol: 'file:',
//       slashes: true
//    }), {})
   
// }

//This is the test createWindow()

let win 
function createWindow(){
   win = new BrowserWindow({
      width: 1920,
      height: 1080,    
      minWidth:1307,
      minHeight:442,
      webPreferences: {
        // devTools: false,
      },
   })
   win.loadURL('http://' + hostname + ':' + port)
   win.on('closed', () => {
   win = null
  })

  win.maximize()
}

app.on('ready', createWindow)

app.on('activate', function () {
   if (win === null) {
     createWindow()
   }
 })