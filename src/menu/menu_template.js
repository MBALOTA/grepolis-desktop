export var viewMenuTemplate = {
    label: 'View',
    submenu: [
        { label: 'Toggle Fullscreen', accelerator: process.platform === 'darwin' ? 'F' : 'F11',
          click (item, focusedWindow) {
            if (focusedWindow) {
              var isfull = focusedWindow.isFullScreen();
              focusedWindow.setFullScreen(!isfull);
              focusedWindow.setMenuBarVisibility(isfull);
            }
          }
        },
        { type: 'separator' },
        { role: 'resetzoom' },
        { role: 'zoomin' },
        { role: 'zoomout' },
        { type: 'separator' },
        { role: 'minimize' },
        { role: 'close' },
    ]
};

export var helpMenuTemplate = {
    role: 'help',
    submenu: [
        { label: "Grepolis Wiki",
          click() {
            let {BrowserWindow} = require('electron');
            let win = new BrowserWindow({width: 1280, height: 960, center: true, title:"Grepolis Desktop", nodeIntegration:false})
            win.loadURL('http://wiki.grepolis.com')
            win.webContents.on('dom-ready', () => {
              //console.log("win is ready!")
              win.webContents.insertCSS("#globalWrapper {overflow: hidden !important;}")
            })
          }
        },
        { type: 'separator' },
        { label: 'About GD',
          click () {
            require('electron').shell.openExternal('https://github.com/MBALOTA/grepolis-desktop')
          }
        },
        { label: 'About the Developer',
          click () {
            require('electron').shell.openExternal('http://balota.me')
          }
        }
    ]
};
