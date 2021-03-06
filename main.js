const electron = require('electron');
const {app, BrowserWindow, Menu} = electron;
const path = require('path');
const url = require('url');
//process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

// Template for the Menu
menuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'About',
        click: () => {
          openAboutWindow()
        }
      },
      {
        label: 'Exit',
        click: () => {
          app.quit()
        }
      }
    ]
	},
	{
    label: 'Settings',
    submenu: [
      {
        label: 'Add Item',
        click: () => {
          addItem()
        }
      },
      {
        label: 'Delete Receipts',
        click: () => {
          deleteReceipts()
        }
      }
    ]
  },
	{
    label: 'Receipts',
    click: () => {
      openReceiptPage()
    }
  },
	{
    label: 'Reload',
    role: 'reload'
  },
   
  {
     label: 'View',
     submenu: [
        {
           role: 'reload'
        },
        {
           role: 'toggledevtools'
        },
        {
           type: 'separator'
        },
        {
           role: 'resetzoom'
        },
        {
           role: 'zoomin'
        },
        {
           role: 'zoomout'
        },
        {
           type: 'separator'
        },
        {
           role: 'togglefullscreen'
        }
     ]
  }
]

// Keep a global reference so the garbage collector does not destroy our app
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    icon: path.join(__dirname, 'assets/icon/icon.ico'),
    titleBarStyle: 'customButtonsOnHover'
  })

  // maximiaze the window
  mainWindow.maximize()

  // Load the index.html file
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true,
  }))
  
  // Set up the menu
  var menu = Menu.buildFromTemplate(menuTemplate)
  mainWindow.setMenu(menu)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

// Opens the about window
function openAboutWindow() {

  let aboutWindow = new BrowserWindow({
    parent: mainWindow,
    modal: true,
    show: false,
    width: 600,
		height: 350,
    icon: path.join(__dirname, 'assets/icon/icon.ico')    
  })
  aboutWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'about.html'),
    protocol: 'file:',
    slashes: true
  }))
  aboutWindow.setMenu(null)
  aboutWindow.once('ready-to-show', () => {
  aboutWindow.show()
  })
}
// Opens the add item window
function addItem() {
  let aboutWindow = new BrowserWindow({
    parent: mainWindow,
    modal: true,
    show: false,
    width: 1000,
    height: 650,
    icon: path.join(__dirname, 'assets/icon/icon.ico'),
  })
  aboutWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'additem.html'),
    protocol: 'file:',
    slashes: true
  }))
  aboutWindow.setMenu(null)
  aboutWindow.once('ready-to-show', () => {
    aboutWindow.show()
  })
}
// Opens the delete receipts window
function deleteReceipts() {
  let aboutWindow = new BrowserWindow({
    parent: mainWindow,
    modal: true,
    show: false,
    width: 600,
    height: 350,
    icon: path.join(__dirname, 'assets/icon/icon.ico'),
  })
  aboutWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'deletereceipts.html'),
    protocol: 'file:',
    slashes: true
  }))
  aboutWindow.setMenu(null)
  aboutWindow.once('ready-to-show', () => {
    aboutWindow.show()
  })
}
// Opens the add waiter window
function addWaiter() {
  let aboutWindow = new BrowserWindow({
    parent: mainWindow,
    modal: true,
    show: false,
    width: 1000,
    height: 650,
    icon: path.join(__dirname, 'assets/icon/icon.ico'),
  })
  aboutWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'addwaiter.html'),
    protocol: 'file:',
    slashes: true
  }))
  aboutWindow.setMenu(null)
  aboutWindow.once('ready-to-show', () => {
    aboutWindow.show()
  })
}


function openReceiptPage() {
  let receiptWindow = new BrowserWindow({
    parent: mainWindow,
    modal: true,
    show: false,
    width: 1150,
    height: 700,
    icon: path.join(__dirname, 'assets/icon/icon.ico'),
  })
  receiptWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'receipt.html'),
    protocol: 'file:',
    slashes: true
  }))
  receiptWindow.setMenu(null)
  receiptWindow.once('ready-to-show', () => {
    receiptWindow.show()
  })
}

function reloadPage() {
  var remote = require('electron').remote;
  remote.getCurrentWindow().webContents.openDevTools();
  M.toast({html: 'Reloaded!'});
}

// Create the window then the app is ready
app.on('ready', () => {
  createWindow()
  electron.powerMonitor.on('on-ac', () => {
    mainWindow.restore()
  })
  electron.powerMonitor.on('on-battery', () => {
    mainWindow.minimize()
  })
})

// Quit when all windows are closed
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// Reopen the app on macOS
app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

