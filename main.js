const { app, BrowserWindow }= require('electron');

app.on('ready', e => {
  'use strict';

  const win = new BrowserWindow({ width: 1000, height: 600, frame: false, toolbar: false, transparent: true });

  // win.setMenu(null);

  win.loadURL(`file://${__dirname}/html/index.html`);
});

