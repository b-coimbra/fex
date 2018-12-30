const Tabs     = require('./tabs.js');
const Menu     = require('./menu.js');
const Scroller = require('./scroller.js');
const Config   = require('./config.js');

class Bindings {
  constructor () { }

  // refactor this shit later
  upDir () {
    readFolder(getUpDir($('#files[active] #display').attr('directory')));
  }

  show () {
    $('#options').classList.toggle('active');
  }

  cheatsheet (json) {
    for (let elem in json)
      if (json[elem].description != undefined)
        $('.settings > ul').innerHTML += `<li key="${elem}">${json[elem].description}</li>`;
  }

  vim (key, bindings) {
    new Scroller(key, bindings);
  }

  get keybindings() {
    fs.readFile("config/keybindings.json", "utf8", (err, data) => {
      if (err) throw err;

      const json = JSON.parse(data),
            keys = json.keybindings,
            alt  = keys.alt,
            vim  = keys.vim;

      const tabs = new Tabs(),
            menu = new Menu(),
            conf = new Config();

      this.cheatsheet(keys);

      document.onkeydown = (e) => {
        if (e != undefined) {
          if (keys[e.key])
            eval(keys[e.key].function);
          else if (Number.isInteger(parseInt(e.key))) {
            let current = $(`#files[tab-num='${e.key}']`);

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

          if (conf.settings.general.vim.value == 'true')
            this.vim(e.key, vim);
        }
      };
    });
  }
}

module.exports = Bindings;

new Bindings().keybindings;
