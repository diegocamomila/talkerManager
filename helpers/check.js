const checkEmail = (req, res, next) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  if (!email.includes('@') || !email.includes('.com')) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};

const checkPassword = (req, res, next) => {
  const { password } = req.body;
  if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

// tester 5  // 

const checkToken = (req, _res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    next({ status: 401, message: 'Token não encontrado' });
  }
  if (authorization.length !== 16) {
    next({ status: 401, message: 'Token inválido' });
  }
  next();
};

const checkName = (req, _res, next) => {
  const { name } = req.body;
  if (!name || name.length === 0) {
    next({ status: 400, message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    next({ status: 400, message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const checkAge = (req, _res, next) => {
  const { age } = req.body;
  if (!age || age.length === 0) {
    next({ status: 400, message: 'O campo "age" é obrigatório' });
  }
  if (+age < 18) {
    next({ status: 400, message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const checkTalker = (req, res, next) => {
  const { talk } = req.body;
  if (!talk) {
    return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  }
  next();
};

const checkWatchedAt = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  const dateRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i; // https://www.regextester.com
  if (!watchedAt) {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }

  if (!dateRegex.test(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};
  
const checkRate = (req, res, next) => {
  const { talk: { rate } } = req.body;
  console.log('rate', rate);
  if (!rate) {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }

  if (rate < 1 || rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
};

module.exports = {
    checkEmail,
    checkPassword,
    checkToken,
    checkName,
    checkAge,
    checkTalker,
    checkWatchedAt,
    checkRate,
};