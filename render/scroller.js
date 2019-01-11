const Tabs = require('./tabs.js');

class Scroller {
  constructor (modifier, bindings) {
    this.panel = $('#files[active]');

    for (let key in bindings)
      if (key == modifier)
        this.scroll(eval(bindings[key]));
  }

  get height () {
    return this.panel.offsetHeight;
  }

  percentage (times) {
    return (times / 100) * this.height;
  }

  scroll (ammount) {
    this.panel.scrollBy(0, this.percentage(ammount));
  }
}

module.exports = Scroller;
