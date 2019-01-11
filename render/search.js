// TODO: maybe add the input above the sorting panel
// TODO: parse 'ESC' for closing the search panel
// TODO: add 'active' state to the search nav button

class Search {
  constructor () {
    this.input = $('#search input');

    $('.search').onclick = () =>
      this.toggle();
  }

  toggle () {
    $('#search').classList.toggle('active');

    this.input.focus();
  }

  isActive () {
    return this.input == document.activeElement;
  }

  clear() {
    $('.filter').innerHTML     = '';
    $('.list').style.display   = 'block';
    $('.marker').style.opacity = 0;
  }

  empty (elem) {
    return /^[\s\n\r]$/m.test(elem) || elem.length === 0;
  }
}

module.exports = Search;

new Search();
