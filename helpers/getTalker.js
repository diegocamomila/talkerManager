const fs = require('fs/promises');

const getTalker = async () => {
  try {
    const talker = await fs.readFile('./talker.json', 'utf-8');
    return JSON.parse(talker);
  } catch (e) {
    return [];
  }
};

module.exports = getTalker;