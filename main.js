const { app, BrowserWindow, Menu, MenuItem } = require('electron');

app.on('ready', e => {
  'use strict';

  const win = new BrowserWindow({ width: 1000, height: 600, frame: false, toolbar: false, transparent: true });

  // win.setMenu(null);

  win.loadURL(`file://${__dirname}/html/index.html`);
});

const menu = new Menu();

menu.append(new MenuItem({ label: 'New Folder' }));
menu.append(new MenuItem({ label: 'Open Terminal' }));
menu.append(new MenuItem({ label: 'Properties' }));

app.on('browser-window-created', (event, win) => {
  'use strict';
  // A callback that takes the coordinates of where you clicked and displays the menu there
  win.webContents.on('context-menu', (e, params) => {
    menu.popup(win, params.x, params.y);
  });
});
