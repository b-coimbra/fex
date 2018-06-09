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

  refreshMenu() {
    // TODO: refactoring
    $.qA('.menu li').forEach((elem) => elem.setAttribute('class', ''));

    let activeWindow = $.qS('#listed-files[active]').childNodes[1].childNodes[3].getAttribute('directory').split('/');

    $.qA('.menu li').forEach((elem) => {
        // TODO: if no currencies, then check whether the drive is C: (highlight 'My Computer' Icon if it is)
      if (`/${activeWindow[activeWindow.length - 2]}/` == elem.getAttribute('shortcut'))
        elem.setAttribute('class', 'active');
    });
  }

  viewImages() {
    // TODO: refactoring
    $.qS('#listed-files[active] #display-files').innerHTML += "<div class='images'></div>";

    $.qA('#listed-files[active] #display-files tr').forEach((elem) => elem.setAttribute('style', 'display: none !important'));

    $.qA('#listed-files[active] #display-files tr td[ondblclick^=openFile]').forEach((file) => {
      if (file.innerHTML.split('.').slice(-1)[0].match(/(png|jpg)/i)) {
        $.qS('#display-files .images').innerHTML +=
          `<img src="${$.qS('#listed-files[active] #display-files').getAttribute('directory')}${file.innerHTML}">`;
      }
    });
  }

  keybindings() {
    document.onkeydown = (e) => {
      if (e != undefined) {
        switch (e.key) {
        case '<':
          goBack();
          break;
        case '>':
          goForward();
          break;
        }

        if (e.altKey) {
          switch (e.keyCode) {
          case 37: // left
            goBack();
            break;
          case 39: // right
            goForward();
            break;
          case 38: // up
            readFolder(getUpDir($.qS('#listed-files[active] #display-files').getAttribute('directory')));
            break;
          }
        }

        if (Number.isInteger(parseInt(e.key))) {
          let current = $.qS(`#listed-files[tab-num='${e.key}']`);

          if (current != null) {
            this.activate(current);
            this.refreshMenu();
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
        else if (e.key == '#')
          this.viewImages();
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

        this.refreshMenu();
      };
    });
  }
}

new Tabs().refresh;

