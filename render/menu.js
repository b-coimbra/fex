const os = require('os');

class Menu {
  constructor () {
    this.elems = $$('.menu li');

    this.elems.forEach(elem => {
      elem.onclick = (e) => {
        readFolder('/Users/' + os.hostname + e.target.getAttribute('shortcut'), true);
        this.activate(e.target);
      };
    });

    $('.open-menu').onclick = () => this.toggle();
  }

  refresh () {
    // put this line in a separate function -- it returns the current directory path
    let dirs = $('#files[active]').childNodes[1].childNodes[3].attr('directory').split('/');

    Array.from($$('.menu li')).some((elem) => {
      let item = elem.attr('shortcut').split('/').join('');

      if (dirs.includes(item))
        this.activate(elem);
    });
  }

  toggle () {
    $('#window').classList.toggle('activateMenu');
  }

  activate (elem) {
    this.elems.forEach(e => e.classList.remove('active'));
    elem.classList.add('active');
  }
}

module.exports = Menu;
