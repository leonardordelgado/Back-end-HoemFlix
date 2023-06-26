// Inport modal de filmes
import Filmes from '../config/models/Filmes.js';

// import do validador para a inserção de filmes
import validations from '../validations/insertValidations.js';

// criação do controle para o crud de filmes
class FilmesControles {
  // busca todos os  filmes na cadastrados na base de dados
  static async coletionFilmes(req, res) {
    try {
      const filmeColetions = await Filmes.find();
      res.status(200).send(filmeColetions);
    } catch (error) {
      // informa erro caso ocorra
      res.status(500).send({ message: 'houve um erro ao buscar filmes' });
      console.log(error);
    }
  }

  // insere novos filmes na base de dados
  static async insertFilmes(req, res) {
    const FilmeExistente = await Filmes.findOne({ titulo: req.body.titulo });
    if (FilmeExistente === null) {
      const resultValidation = await validations(req);
      if (resultValidation === true) {
        try {
          const newFilme = new Filmes(req.body);
          const result = await newFilme.save();
          res.status(201).send(result.toJSON());
        } catch (error) {
          res.status(500).send({ message: 'Houve um erro interno' });
          console.log(error);
        }
      } else {
        res.status(402).send(resultValidation);
      }
    } else {
      res.status(400).send({ message: 'Parece que este titulo ja existe' });
    }
  }

  // delete filmes na base de dados
  static async deleteFilmes(req, res) {
    try {
      const result = await Filmes.findByIdAndDelete(req.params.id);
      res.status(200).send({ message: `O filme ${result.titulo} foi deletado com sucesso` });
    } catch (error) {
      res.status(404).send({ message: 'Houve um erro ao deletar o titulo solicitado' });
    }
  }

  // Update filmes na base de dados
  static async UpdateFilmes(req, res) {
    const resultValidation = await validations(req);
    if (resultValidation === true) {
      try {
        const result = await Filmes.findOneAndUpdate({ _id: req.params.id }, req.body);
        res.status(200).send({ message: `titulo ${result.titulo} atualizado com sucesso` });
      } catch (error) {
        res.status(404).send({ message: 'O titulo não pode ser atualizado devido a un erro interno' }, error);
        console.log(error);
      }
    } else {
      res.status(402).send(resultValidation);
    }
  }
}
export default FilmesControles;
