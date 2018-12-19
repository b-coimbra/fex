const Tabs = require('./tabs.js');
const Menu = require('./menu.js');

class Bindings {
  constructor () { }

  // refactor this shit later
  upDir () {
    readFolder(getUpDir($('#listed-files[active] #display-files').attr('directory')));
  }

  show () {
    $('#keybindings').classList.toggle('active');
  }

  cheatsheet (json) {
    for (let elem in json)
      if (json[elem].description != undefined)
        $('.keys ul').innerHTML += `<li key="${elem}">${json[elem].description}</li>`;
  }

  get keybindings() {
    fs.readFile("config.json", "utf8", (err, data) => {
      if (err) throw err;

      const json = JSON.parse(data),
            keys = json.keybindings,
            alt  = keys.alt;

      const tabs = new Tabs(),
            menu = new Menu();

      this.cheatsheet(keys);

      document.onkeydown = (e) => {
        if (e != undefined) {
          if (keys[e.key])
            eval(keys[e.key].function);
          else if (Number.isInteger(parseInt(e.key))) {
            let current = $(`#listed-files[tab-num='${e.key}']`);

            if (current != null) {
              tabs.activate(current);
              tabs.update();
              menu.refresh();
            }
          }
          else if (e.altKey) {
            for (let _key_ in alt)
              if (alt.hasOwnProperty(_key_) && _key_ == e.keyCode)
                eval(alt[_key_]);
          }
        }
      };
    });
  }
}

module.exports = Bindings;

new Bindings().keybindings;
