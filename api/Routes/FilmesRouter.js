import { Router } from 'express';

// chamando arquivos que possui os crontroles
import FilmesControles from '../controllers/FilmesControlles.js';

// estanciando o arquivo de rotas do express
const FilmesRotas = Router();

// criando o arquivo de rotas para filmes
FilmesRotas
  .get('/', FilmesControles.coletionFilmes)
  .post('/', FilmesControles.insertFilmes)
  .delete('/:id', FilmesControles.deleteFilmes)
  .put('/filmes/:id', FilmesControles.UpdateFilmes);

// exporta rotas
export default FilmesRotas;
