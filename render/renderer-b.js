// TODO: add marking 'onclick' on the item selected
// TODO: add total of files in current folder at the 'status' panel
// TODO: add TABS

const fs = require('fs');

const { shell } = require('electron');

const $ = {
  qS: (e) => document.querySelector(e),
  qA: (e) => document.querySelectorAll(e)
};

class Render {
  constructor() {
    this.previous = [];
    this.directories = ['/'];
  }

  get render() {
    this.readFolder('/');
  }

  readFolder(path = '/', append = false) {
    if (append) directories.push(path);

    Number.prototype.to_filesize = function () {
      let sizes = {
        'B' : 1024,
        'KB': 1024 * 1024,
        'MB': 1024 * 1024 * 1024,
        'GB': 1024 * 1024 * 1024 * 1024,
        'TB': 1024 * 1024 * 1024 * 1024 * 1024
      };

      for (var key in sizes)
        if (this < sizes[key])
          return `${Math.round((parseFloat(this) / (sizes[key] / 1024)))} ${key}`;
    };

    let maxSize = 0,
        fileCount = 0;

    fs.readdir(path, (err, files) => {
      'use strict';

      if (err) throw err;

      let fileContainer = $.qS('#listed-files[active] #display-files');
      fileContainer.innerHTML = '';
      fileContainer.setAttribute('directory', path);

      for (let file of files) {
        fs.stat(path + file, (err, status) => {
          let fileID = `${path}${file}/`;

          if (err) throw err;

          if (status.isDirectory())
            fileContainer.innerHTML +=
            `<tr>
              <td id="${fileID}" ondblclick="this.readFolder(this.id, true)" onclick="selectFolder(this)">
                <div>
                  <i class="material-icons">folder</i>
                  ${file}
                </div>
              </td>
              <td></td>
              <td></td>
            </tr>`;
          else {
            fileContainer.innerHTML +=
              `<tr>
              <td id="${fileID}" ondblclick="this.openFile(this.id)">${file}</td>
              <td>${this.getModDate(status.mtime)}</td>
              <td>${this.fileSize(fileID).to_filesize()}</td>
            </tr>`;

            maxSize += this.fileSize(fileID);
            $.qS('.max-size').innerHTML = `${maxSize.to_filesize()} total`;
          }
        });
        ++fileCount;
      }
      $.qS('.file-count').innerHTML = `${fileCount} files`;
    });
  }

  fileSize(filename) {
    return fs.statSync(filename).size;
  }

  getModDate(date) {
    return `${date.getDay()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
  }

  openFile(path) {
    shell.openItem('C:' + path);
  }

  selectFolder(folder) {
    // TODO: refactor this function, activate current folder with bg color instead of icon-only
    folder.childNodes[1].childNodes[1].innerHTML = 'folder_open';
  }

  goForward() {
    this.readFolder(previous.pop(), true);
  }

  goBack() {
    this.previous.push(this.directories.pop());

    if (this.previous.length > 0)
      $.qS('.nav .control .forward').classList.remove('deactivated');
    else
      $.qS('.nav .control .forward').classList.add('deactivated');

    this.readFolder(this.directories.pop(), true);
  }
}

new Render().render;
