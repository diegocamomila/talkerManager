const express = require('express');
const bodyParser = require('body-parser');
const routerTalker = require('./routes/routerTalker');
const routerLogin = require('./routes/routerLogin');
const erroMiddleware = require('./erroMiddleware');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.use('/talker', routerTalker);
app.use('/login', routerLogin);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.use(erroMiddleware);

app.listen(PORT, () => {
  console.log('Online');
});
