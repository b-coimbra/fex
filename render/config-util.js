let update_warn = () => {
  // add a little html box at the bottom

  console.warn("Config file has been updated!");
};

let collapse = (e) =>
    $(`.settings .wrapper ul[name=${e}]`).classList.toggle('collapsed');

let checkbox = (path) => {
  path = path.split(" ");

  let input = $(`.settings .wrapper li[name=${path[1]}] input`),
      sub   = new Config().settings,
      aux   = sub[path[0]][path[1]];

  aux.value = (input.checked ? "true" : "false");

  sub[path[0]][path[1]] = aux;

  fs.writeFile('config/options.json', JSON.stringify(sub, null, 2), (err) => {
    if (err)
      console.error("couldn't update options: ", err);
    else
      update_warn();
  });
};

new Config().build();
