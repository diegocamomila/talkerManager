const fs = require('fs/promises');

const postTalker = (talker) => {
  fs.writeFile('./talker.json', JSON.stringify(talker));
};

module.exports = postTalker;