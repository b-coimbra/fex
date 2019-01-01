// TODO: maybe add the input above the sorting panel

class Search {
  constructor () {
    $('.control .search').onclick = () =>
      this.toggle();
  }

  toggle () {
    $('#search').classList.toggle('active');
  }
}

module.exports = Search;

new Search();
