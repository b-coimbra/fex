// TODO: save scroll position when changing tabs
// TODO: save ammount of tabs in localStorage when the app is closed
class Tabs {
  constructor() { }

  get refresh() {
    this.update();
    this.keybindings();

    $.qS('.add-tab').onclick = () =>
      this.create();
  }

  winCount() {
    return $.qA('#listed-files').length;
  }

  getPreviousTab() {
    let nodes = Array.prototype.slice.call($.qS('#window').children);

    return nodes.indexOf($.qS('#listed-files[active]'));
  }

  keybindings() {
    document.onkeydown = (e) => {
      if (e != undefined) {
        if (Number.isInteger(parseInt(e.key))) {
          let current = $.qS(`#listed-files[tab-num='${e.key}']`);

          if (current != null) {
            this.activate(current);
            this.update();
          }
        }
        else if (e.key == 'x') {
          if ($.qA('#listed-files').length > 1) {
            let previous = (this.getPreviousTab() - 2);

            this.remove('#listed-files[active]');
            this.activate($.qS(`#listed-files[tab-num='${previous}']`));

            this.update();
          }
        }
        else if (e.ctrlKey && e.key == 'n')
          this.create();
      }
    };
  }

  create() {
    let newWindow = $.qS('#listed-files').cloneNode(true);

    newWindow.setAttribute('tab-num', this.winCount() + 1);
    newWindow.removeAttribute('active');

    $.qS('#window').appendChild(newWindow);
    $.qS('.tabs').innerHTML = '';

    this.activate(newWindow);
    this.update();
  }

  remove(tab) {
    $.qS(tab).remove();
  }

  activate(tab) {
    if (tab != null) {
      $.qA('#listed-files').forEach((i) => i.removeAttribute('active'));

      tab.setAttribute('active', '');
    }
  }

  update() {
    let tabs = $.qS('.tabs');
    tabs.innerHTML = '';

    $.qA('#listed-files').forEach((tab) => tabs.innerHTML += `<div><p>${tab.getAttribute('tab-num')}</p></div>`);
    $.qS(`.tabs div:nth-child(${this.getPreviousTab() - 1})`).classList.add('active');

    $.qA('.tabs div').forEach((elem) => {
      elem.onclick = (e) => {
        this.activate($.qS(`#listed-files[tab-num='${elem.childNodes[0].innerHTML}']`));

        $.qA('.tabs div').forEach((i) => i.classList.remove('active'));
        elem.classList.add('active');
      };
    });
  }
}

new Tabs().refresh;

