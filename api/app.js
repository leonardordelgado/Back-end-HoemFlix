// import do arquivo do express
import express from 'express';

// importando as configurações de rotas
import routes from './Routes/index.js';

// chamada das funçoes do servidor de arquivo
// eslint-disable-next-line no-unused-vars
import db from './config/db/conectionMongo.js';

// eslint-disable-next-line no-unused-vars
import filmes from './config/models/Filmes.js';

// porta fornecida pela hospedagem ou 3000 em caso de localhost
const Port = process.env.PORT || 3000;

// instanciando o app com o express
const app = express();

// libera a requisição para acesso externo
const allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
};
app.use(allowCrossDomain);

// chamando a configuração de rotas e passando o app como parametro
routes(app);

// iniciando o servidor na porta do host ou 3000
app.listen(Port, () => { console.log(`Servidor rodando no link http://localhost:${Port}`); });

export default app;
