//configure environment variables
process.env.HOSTNAME = "localhost"
process.env.PORT = "3000"
process.env.DB_URL = "mongodb+srv://pia:balaiyllanagarden@balai-yllana.n8hr8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

//import the necessary modules
const path = require('path');
const electron = require('electron');
const server = require('./server.js');

//retrieves the necessary attributes from electron
const {app, BrowserWindow} = electron;

let mainWindow;
//create new window once electron finishes initialization
app.on('ready', function() {

    //get screen size
    const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize;

    //create new window
    mainWindow = new BrowserWindow({
        width: width,
        height: height,
        title: "Balai Yllana Garden Restaurant",
        // icon: "",
        autoHideMenuBar: true
    });

    //opens the web application
    mainWindow.loadURL(`http://${process.env.HOSTNAME}:${process.env.PORT}/`);

    //terminate the electron application on window close
    mainWindow.on('closed', function() {
        app.quit();
    });

});
