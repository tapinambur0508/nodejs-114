const fs = require('node:fs/promises');

fs.appendFile('append.txt', 'Hello, Node.js\n')
  .then(() => {
    console.log('Ok');
  })
  .catch((error) => {
    console.error(error);
  });
