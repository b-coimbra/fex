class Image {
  constructor () { }

  viewImages () {
    $('#files[active] #display').innerHTML += "<div class='images'></div>";

    $$('#files[active] #display tr').forEach((elem) => elem.setAttribute('style', 'display: none !important'));

    $$('#files[active] #display tr td[ondblclick^=openFile]').forEach((file) => {
      if (file.innerHTML.split('.').slice(-1)[0].match(/(png|jpg)/i)) {
        $('#display .images').innerHTML +=
          `<img src="${$('#files[active] #display').attr('directory')}${file.innerHTML}">`;
      }
    });
  }
}

// module.exports = Image;
