
const {app, BrowserWindow} = require('electron')
const url = require('url')
const path = require('path')

dotenv.config({ path: path.join(__dirname, '.env') })

const port = process.env.PORT
const hostname = process.env.HOSTNAME
require('./app.js');

if (process.env.PORTABLE_EXECUTABLE_DIR !== undefined) {
   logPath = path.join(process.env.PORTABLE_EXECUTABLE_DIR, '/logs')
 } else if (fse.existsSync(path.join(appPath, '../../logs'))) {
   logPath = path.join(appPath, '../../logs')
 }

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

function createWindow(){
   const win = new BrowserWindow({
      width: 1920,
      height: 1080    
   })

   win.loadURL('http://' + hostname + ':' + port)
}

app.on('ready', createWindow)

app.on('activate', function () {
   if (mainWindow === null) {
     createWindow()
   }
 })