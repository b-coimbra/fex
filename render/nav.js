const remote = require('electron').remote;

let minimizeApp = () => {
  let window = remote.getCurrentWindow();
  window.minimize();
};

let closeApp = () => {
  let window = remote.getCurrentWindow();
  window.close();
};

let maximizeApp = () => {
  let window = remote.getCurrentWindow();
  window.maximize();
  // TODO: change state to 'unmaximize' after click
};
