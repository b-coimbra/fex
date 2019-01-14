let append = (item, reg, search) =>
    item.match(reg).input
        .split("")
        .map(i => `<span ${i == search[search.indexOf(i)] && 'matched'}>${i}</span>`).join("");

function search(query) {
  let match   = new RegExp(`(?:\\b${query})+`, 'mi'),
      matches = [],
      filter  = { html: e => $('.result').innerHTML = e };

  $$('#files[active] #display td div p').forEach(item => {
    if (match.test(item.innerHTML))
      matches.push(
        `<li>
          <p file="${item.innerHTML}">${append(item.innerHTML.toLowerCase(), match, query)}</p>
        </li>`);
  });
  filter.html(matches.join(""));
}

class Search {
  constructor () {
    this.input = $('#search input');

    $('.search').onclick = () =>
      this.toggle();

    this.input.onkeyup = (e) => {
      if (e.key == 'Escape')
        this.toggle();
      else if (e.key == 'Enter') {
        // BUG: directory is being appended after going back
        let path = $('.result li:first-child p').attr('file');

        path = directories.slice(-1)[0] + path + "/";

        readFolder(path, true);

        this.toggle();
      }
    };

    this.input.oninput = (e) => {
      let query = e.target.value;

      if (!this.empty(query))
        search(query);
      else this.clear();
    };
  }

  toggle () {
    this.input.value = '';
    this.clear();

    $('#search').classList.toggle('active');
    $('.search').classList.toggle('active');

    setTimeout(() => this.input.focus(), 0); // prevents sending the keybinding to the input field
  }

  isActive () {
    return this.input == document.activeElement;
  }

  clear() {
    $('.result').innerHTML = '';
  }

  empty (elem) {
    return /^[\s\n\r]$/m.test(elem) || elem.length === 0;
  }
}

module.exports = Search;

new Search();
