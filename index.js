const express = require('express');
const bodyParser = require('body-parser');

const fs = require('fs').promises;

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// 1 - Crie o endpoint GET /talker
app.get('/talker', async (_req, response) => {
  const data = JSON.parse(await fs.readFile('./talker.json'));
  if (data.length === 0) return response.status(200).json([]);
  response.status(200).json(data);
});
// 1 final

// 2 inicio - Crie o endpoint GET /talker/:id
const getData = async (request, _res, next) => {
  const data = JSON.parse(await fs.readFile('./talker.json'));
  request.data = data;
  next();
};

app.get('/talker/:id', getData, async (request, response) => {
  const { data } = request;
  const { id } = request.params;

  const findTalker = data.find((talker) => talker.id === Number(id));
    if (!findTalker) {
      return response.status(404).json(
        { message: 'Pessoa palestrante não encontrada' },
      ); 
  } 
  response.status(200).json(findTalker);
});
// 2 final

app.listen(PORT, () => {
  console.log('Online');
});
