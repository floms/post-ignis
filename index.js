const {app, BrowserWindow, protocol, Menu, session} = require('electron')


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

const path = require('path');

function getFilePath(url) {
  const relativePath = path.relative('/', url.substr(7));

  if (process.platform === 'win32') {
    return '/' + path.relative('/', relativePath);
  }

  return '/' + relativePath;
}

function createWindow() {

  // Modify the user agent for all requests to the following urls.
  const filter = {
    urls: ['*']
  }

  session.defaultSession.webRequest.onBeforeSendHeaders(filter, (details, callback) => {
    details.requestHeaders['User-Agent'] = 'MyAgent'
    callback({ requestHeaders: details.requestHeaders })
  })
  //Intercept any urls on the page and find the file on disk instead
  protocol.interceptFileProtocol('file', function (req, callback) {
    const filePath = __dirname + getFilePath(req.url);

    callback({path: path.normalize(filePath)});
  }, function (error) {
    if (error) {
      console.error('Failed to register protocol');
    }
  });

  // Create the browser window.
  win = new BrowserWindow({
    width: 1000,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // and load the index.html of the app.
  win.loadFile('/index.html');

  // Open the DevTools: Only for DEV
  // win.webContents.openDevTools();

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  });

  // Create the Application's main menu
  const template = [
    {
      label: 'Application',
      submenu: [
        {label: 'About Application', selector: 'orderFrontStandardAboutPanel:'},
        {type: 'separator'},
        {
          label: 'Quit',
          accelerator: 'Command+Q',
          click: function () {
            app.quit();
          }
        }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        {label: 'Undo', accelerator: 'CmdOrCtrl+Z', selector: 'undo:'},
        {label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z', selector: 'redo:'},
        {type: 'separator'},
        {label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:'},
        {label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:'},
        {label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:'},
        {label: 'Select All', accelerator: 'CmdOrCtrl+A', selector: 'selectAll:'}
      ]
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'Developer Tools', accelerator: 'CmdOrCtrl+I', click: () => {
            win.webContents.openDevTools();
          }
        }
      ]
    }
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.