const express = require('express');
const getTalker = require('../helpers/getTalker');

const routerTalker = express.Router();

routerTalker.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await getTalker();
  const selectTalker = talker.find((t) => t.id === +id);
  if (selectTalker) return res.status(200).json(selectTalker);
  return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

routerTalker.get('/', async (_req, res) => {
  const talker = await getTalker();
  res.status(200).json(talker);
});

module.exports = routerTalker;