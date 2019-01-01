class Config {
  constructor () { }

  get settings () {
    let data = fs.readFileSync("config/options.json", 'utf8');

    return JSON.parse(data);
  }

  build () {
    let json = this.settings;

    for (let elem in json) {
      if (elem != 'attr' && elem != undefined) {
        let hashes = Object.keys(json[elem]),
            data   = json[elem];

        $('.settings .wrapper').innerHTML +=
          `<ul name="${elem}"><h1 onclick="collapse('${elem}')">${elem}</h1></ul>`;

        hashes.forEach(hash => {
          let val = data[hash];

          $(`.settings .wrapper ul[name="${elem}"]`).innerHTML +=
            `<li name="${hash}">
              <input type="checkbox" ${val.value == "true" && 'checked'} onclick="checkbox('${elem} ${hash}')">
              <h1>${val.title}</h1>
              <p>${val.description}</p>
          </li>`;
        });
      }
    }
  }
}

module.exports = Config;
