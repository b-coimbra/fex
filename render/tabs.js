$.qS('.add-tab').onclick = () => {
  let newTab = $.qS("#listed-files").cloneNode(true);

  newTab.setAttribute('tab-num', $.qA("#listed-files").length + 1);
  newTab.removeAttribute('active');

  $.qS('#window').appendChild(newTab);
};

document.onkeydown = (e) => {
  if (e != undefined) {
    if (Number.isInteger(parseInt(e.key))) {
      let currentTab = $.qS(`#listed-files[tab-num='${e.key}']`);

      if (currentTab != null) {
        activateTab('#listed-files', currentTab);
        $.qS('.current-tab').innerHTML = e.key;
      }
    }
    else if (e.key == 'x')
      removeTab('#listed-files[active]');
  }
};

let activateTab = (elem, tab) => {
  $.qA(elem).forEach((i) => i.removeAttribute('active'));

  if (tab != null)
    tab.setAttribute('active', '');
};

let removeTab = (tab) =>
    $.qS(tab).remove();
