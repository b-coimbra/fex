const Tabs = require('./tabs.js');

class Scroller {
  constructor (key, bindings) {
    this.panel = $('#files[active]');

    for (let _key_ in bindings)
      if (_key_ == key)
        this.scroll(eval(bindings[key]));
  }

  get height () {
    return this.panel.offsetHeight;
  }

  percentage (times) {
    return (times / 100) * this.height;
  }

  scroll (value) {
    this.panel.scrollBy(0, this.percentage(value));
  }
}

module.exports = Scroller;
