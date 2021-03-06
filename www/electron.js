/**
 * @description Main file for Electron app
 */

var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform != 'darwin') {
        app.quit();
    }
});



// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function () {
    mainWindow = new BrowserWindow({width: 1100, height: 900});
    mainWindow.loadUrl('file://' + __dirname + '/index.html');
    mainWindow.on('closed', function () {
        mainWindow = null;
    });
});