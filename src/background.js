//ELECTRON MAIN PROCESS
//------------------------------------------------------------------------------

import { app, Menu, Tray, globalShortcut }      from 'electron';
import { devMenuTemplate }                      from './menu/dev_menu_template';
import { viewMenuTemplate, helpMenuTemplate }   from './menu/menu_template';
import createWindow                             from './helpers/window';
const path = require('path')

// Special module holding environment variables which you declared
// in config/env_xxx.json file.
import env from './env';

var mainWindow;
var tray;

var setApplicationMenu = function () {
    var menus = [viewMenuTemplate, helpMenuTemplate];
    if (env.name !== 'production') {
        menus.push(devMenuTemplate);
    }
    Menu.setApplicationMenu(Menu.buildFromTemplate(menus));
};

// Save userData in separate folders for each environment.
// Thanks to this you can use production and development versions of the app
// on same machine like those are two separate apps.
if (env.name !== 'production') {
    var userDataPath = app.getPath('userData');
    app.setPath('userData', userDataPath + ' (' + env.name + ')');
}

app.on('ready', function () {
    setApplicationMenu();

    var mainWindow = createWindow('main', {
        width: 800,
        height: 600
    });
  
    function toggleMainWindow () {
      if (mainWindow) {
        if (mainWindow.isVisible()) {
          mainWindow.hide();
        } else {
          mainWindow.show();
        }

        if (!tray) {
            createTray();
        }
      }
    }

    function createTray () {
        tray = new Tray(path.join(__dirname, '/img/grepolis_desktop.png'));
        const contextMenu = Menu.buildFromTemplate([
          {label: 'Toggle Visibility', click: () => {
            toggleMainWindow();
          }}
        ]);
        tray.setToolTip('Grepolis Desktop');
        tray.setContextMenu(contextMenu);

        tray.on('double-click', function () {
            toggleMainWindow();
        });
    }

    mainWindow.loadURL('file://' + __dirname + '/app.html');

    createTray();

    if (env.name === 'development') {
        mainWindow.openDevTools();
    }
})

app.on('window-all-closed', function () {
    app.quit();
})
