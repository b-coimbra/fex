class ContextMenu {
  constructor (type) {
    this.element = $('.context-menu');
    this.type = type;
  }

  show (x, y) {
    this.element.style.left = x + 'px';
    this.element.style.top  = y + 'px';

    this.element.classList.add('show');
  }

  hide () {
    this.element.classList.remove('show');
  }
}

class ContextGenerator extends ContextMenu {
  constructor (elem, type) {
    super(type);

    this.elem    = elem;
    this.context = {
      file: {
        open: `openFile('${this.elem}')`,
        copy:   () => {},
        cut:    () => {},
        delete: () => {}
      },
      folder: {
        open:    `readFolder('${this.elem}')`,
        new_tab: '',
        copy: '',
        cut: '',
        delete: ''
      },
      default: {
        new_folder: '',
        open_terminal: '',
        properties: ''
      }
    };

    this.generate();
  }

  generate () {
    this.element.innerHTML = '';

    let context = this.context[this.type];

    for (let option in context)
      if (context.hasOwnProperty(option))
        this.element.innerHTML +=
          `<li onclick="${context[option]}()">${option.replace('_', ' ')}</li>`;
  }
}

function contextMenuEvnt(evnt, elem, type = 'default') {
  const menu = new ContextGenerator(elem, type);

  menu.show(evnt.clientX, evnt.clientY);

  window.onclick = () =>
    menu.hide();

  window.onkeydown = (e) => {
    if (e.key == 'Escape')
      menu.hide();
  };
}
