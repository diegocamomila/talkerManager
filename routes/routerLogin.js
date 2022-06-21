const express = require('express');
const check = require('../helpers/check');

const routerLogin = express.Router();

routerLogin.post(
  '/',
  check.checkEmail,
  check.checkPassword,
  (_req, res) => {
    const date = new Date().getTime();
    const token = `a${date}Cd`;
    res.status(200).json({ token });
  },
);

module.exports = routerLogin;