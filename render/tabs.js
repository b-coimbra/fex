// TODO: save scroll position when changing tabs
// TODO: save ammount of tabs in localStorage when the app is closed
const Menu     = require('./menu.js');
const Config   = require('./config.js');
const Selector = require('./selector.js');

class Tabs {
  constructor () {
    $('.add-tab').onclick = () =>
      this.create();

    $('.split-tabs').onclick = () =>
      this.split();
  }

  // this should be in renderer or a Window class
  winCount () {
    return $$('#files').length;
  }

  previous () {
    let nodes = Array.prototype.slice.call($('#window').children);

    return nodes.indexOf($('#files[active]'));
  }

  split () {
    $('#files[active] + div').classList.toggle('split');

    $('.split-tabs').classList.toggle('splitted');
  }

  create () {
    let newWindow = $('#files[active]').cloneNode(true);

    newWindow.setAttribute('tab-num', this.winCount() + 1);
    newWindow.removeAttribute('active');

    $('#window').appendChild(newWindow);
    $('.tabs').innerHTML = '';

    this.activate(newWindow);
    this.update();
  }

  remove () {
    let current = $('#files[active]'),
        files   = $$('#files');

    if (files.length > 1) {
      let previous = (this.previous() - 1);

      if (files.length == previous)
        previous -= 1;

      $('#files[active]').remove();

      $$('#files').forEach((f, i) => f.setAttribute('tab-num', i + 1));

      this.activate($(`#files[tab-num='${previous}']`));
      this.update();
    }
  }

  activate (tab) {
    if (tab != null) {
      $$('#files').forEach((i) => i.removeAttribute('active'));
      tab.setAttribute('active', '');
    }
  }

  titleize (tabs) {
    let config = new Config().settings.tabs;
    let settings = {
      numbers:    (config.numbers.value    === "true"),
      navbuttons: (config.navbuttons.value === "false")
    };

    $('.navigation').style.display = (settings.navbuttons ? 'none' : 'inherit');

    $$('#files').forEach((tab) => {
      let dir = tab.childNodes[1].childNodes[3].attr('directory'),
          num = tab.attr('tab-num');

      if (dir != null)
        dir = dir.split('/').slice(-2, -1);

      tabs.innerHTML +=
        `<div num="${num}">
            <p>
              ${settings.numbers ? num : (dir == "" ? "~" : dir)}
            </p>
        </div>`;
    });
  }

  update () {
    let tabs = $('.tabs');
    tabs.innerHTML = '';

    this.titleize(tabs);

    $(`.tabs div:nth-child(${this.previous() - 1})`).classList.add('active');

    $$('.tabs div').forEach((elem) => {
      elem.onclick = (e) => {
        this.activate($(`#files[tab-num='${elem.attr('num')}']`));

        $$('.tabs div').forEach((i) => i.classList.remove('active'));

        elem.classList.add('active');

        new Menu().refresh;
      };
    });
  }
}

module.exports = Tabs;

let tabs = new Tabs();

let updateTabs = () => {
  tabs.update();

  window.requestAnimationFrame(updateTabs);
};

window.requestAnimationFrame(updateTabs);

