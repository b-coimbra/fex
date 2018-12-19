// TODO: save scroll position when changing tabs
// TODO: save ammount of tabs in localStorage when the app is closed
const Menu = require('./menu.js');

class Tabs {
  constructor () {
    this.update();

    $('.add-tab').onclick = () =>
      this.create();
  }

  // this should be in renderer
  winCount () {
    return $$('#listed-files').length;
  }

  previous () {
    let nodes = Array.prototype.slice.call($('#window').children);
    return nodes.indexOf($('#listed-files[active]'));
  }

  viewImages () {
    // TODO: refactor this abomination ASAP
    $('#listed-files[active] #display-files').innerHTML += "<div class='images'></div>";

    $$('#listed-files[active] #display-files tr').forEach((elem) => elem.setAttribute('style', 'display: none !important'));

    $$('#listed-files[active] #display-files tr td[ondblclick^=openFile]').forEach((file) => {
      if (file.innerHTML.split('.').slice(-1)[0].match(/(png|jpg)/i)) {
        $('#display-files .images').innerHTML +=
          `<img src="${$('#listed-files[active] #display-files').attr('directory')}${file.innerHTML}">`;
      }
    });
  }

  create () {
    let newWindow = $('#listed-files[active]').cloneNode(true);

    newWindow.setAttribute('tab-num', this.winCount() + 1);
    newWindow.removeAttribute('active');

    $('#window').appendChild(newWindow);
    $('.tabs').innerHTML = '';

    this.activate(newWindow);
    this.update();
  }

  remove () {
    // this really needs to be put somewhere else, it repeats a lot
    let current = $('#listed-files[active]');

    // if ($$('#listed-files').length > 1 && current.attr('tab-num') != 1) {
    if ($$('#listed-files').length > 1) {
      let previous = (this.previous() - 2);

      if (current.attr('tab-num') == 1)
        previous = 2;

      $('#listed-files[active]').remove();

      this.activate($(`#listed-files[tab-num='${previous}']`));
      // fix this shit
      $(`#listed-files[tab-num='${previous}']`).setAttribute('tab-num', 1);
      this.update();
    }
  }

  activate (tab) {
    if (tab != null) {
      $$('#listed-files').forEach((i) => i.removeAttribute('active'));
      tab.setAttribute('active', '');
    }
  }

  update () {
    let tabs = $('.tabs');
    tabs.innerHTML = '';

    $$('#listed-files').forEach((tab) => {
      let dir = tab.childNodes[1].childNodes[3].attr('directory'),
          num = tab.attr('tab-num');

      if (dir != null)
        dir = dir.split('/').slice(-2, -1);

      tabs.innerHTML += `<div num="${num}"><p>${dir == "" ? "~" : dir}</p></div>`;
    });

    $(`.tabs div:nth-child(${this.previous() - 1})`).classList.add('active');

    $$('.tabs div').forEach((elem) => {
      elem.onclick = (e) => {
        this.activate($(`#listed-files[tab-num='${elem.attr('num')}']`));

        $$('.tabs div').forEach((i) => i.classList.remove('active'));
        elem.classList.add('active');

        new Menu().refresh;
      };
    });
  }
}

module.exports = Tabs;

new Tabs();
