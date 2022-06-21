const erroMiddleware = (erro, _req, res, _next) => {
    const { status, message } = erro;
    res.status(status).json({ message });
  };
  
  module.exports = erroMiddleware;