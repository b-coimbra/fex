const os = require('os');

let menuElems = $.qA('.menu li');

let activateMenu = (elem) => {
  menuElems.forEach((e) => e.classList.remove('active'));

  elem.classList.add('active');
};

menuElems.forEach((elem) => {
  elem.onclick = (e) => {
    readFolder('/Users/' + os.hostname + e.target.getAttribute('shortcut'), true);
    activateMenu(e.target);
  };
});

$.qS('.open-menu').onclick = () => {
  $.qS('#window').classList.toggle('activateMenu');
};
