const fs = require('node:fs/promises');

fs.readFile('mix.txt')
  .then((data) => data)
  .then((data) => fs.writeFile('mix.txt', data))
  .then(() => console.log('Ok'))
  .catch((error) => console.error(error));
