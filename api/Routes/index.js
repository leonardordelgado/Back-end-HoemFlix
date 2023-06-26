// importe da função body-parser
import bodyParser from 'body-parser';

// importando arquivos de rotas resposaveis pelo crud de filmes
import FilmesRotas from './FilmesRouter.js';

// referencias as rotas criadas
export default (app) => {
  app.use(bodyParser.json());
  app.use(FilmesRotas);
};
