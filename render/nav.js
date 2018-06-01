const remote = require('electron').remote;

let MinimizeApp = () => {
  let window = remote.getCurrentWindow();
  window.minimize();
};

let closeApp = () => {
  let window = remote.getCurrentWindow();
  window.close();
};
