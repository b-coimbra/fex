class Selector {
  constructor () {
    this.stack = [];
    this.files = $('.selected-files');

    Object.prototype.del = function (name) {
      this.classList.remove(name);
    };

    Object.prototype.add = function (name) {
      this.classList.add(name);
    };

    let select_callback = (event) => this.select(event);

    ['mousedown', 'mouseup'].forEach(e => $('#display-files').addEventListener(e, select_callback));
  }

  deselect (elems) {
    elems.forEach(e => e.del('active'));

    this.stack = [];
    this.files.innerHTML = '';
  }

  select (event) {
    let elems = $$('#display-files tr');

    elems.forEach(elem => {
      elem.onmouseover = () => {
        if (event.buttons) {
          let path = elem.childNodes[1].id;

          elem.add('active');

          if (!this.stack.includes(path))
            this.stack.push(path);

          if (this.stack.length > 0)
            this.files.innerHTML = `${this.stack.length} files selected`;
        }
      };
    });

    if (event.buttons)
      this.deselect(elems);
  }
}

new Selector();
