const remote = require('electron').remote;

let minimizeApp = () => {
  remote.getCurrentWindow().minimize();
};

let closeApp = () => {
  remote.getCurrentWindow().close();
};

let maximizeApp = () => {
  let window = remote.getCurrentWindow();
  window.maximize();
  // TODO: change state to 'unmaximize' after click
};
