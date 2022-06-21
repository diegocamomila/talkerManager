const express = require('express');
const ferify = require('../helpers/ferify');

const routerLogin = express.Router();

routerLogin.post(
  '/',
  ferify.ferifyEmail,
  ferify.ferifyPassword,
  (_req, res) => {
    const date = new Date().getTime();
    const token = `a${date}Cd`;
    res.status(200).json({ token });
  },
);

module.exports = routerLogin;