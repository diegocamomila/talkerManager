const express = require('express');
const getTalker = require('../helpers/getTalker');
const postTalker = require('../helpers/postTalker');
const check = require('../helpers/check');

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

routerTalker.post('/',
  check.checkToken,
  check.checkName,
  check.checkAge,
  check.checkTalker,
  check.checkWatchedAt,
  check.checkRate,
  async (req, res) => {
  const talker = await getTalker();
  const newTalker = { id: (talker.length + 1), ...req.body };
  talker.push(newTalker);
  postTalker(talker);
  res.status(201).json(newTalker);
});

routerTalker.put('/:id', 
check.checkToken,
check.checkName,
check.checkAge,
check.checkTalker,
check.checkWatchedAt,
check.checkRate,
   async (req, res) => {
  const { id } = req.params;
  const talker = await getTalker();
  talker.map((t, i) => {
    if (+t.id === +id) {
      talker[i] = { id: +id, ...req.body };
    }
    return t;
  });
  postTalker(talker);
  res.status(200).json({ id: +id, ...req.body });
});

module.exports = routerTalker;