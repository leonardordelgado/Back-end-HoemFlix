import mongoose from 'mongoose';
// criação do atributo de filmes para modelo do banco de dados
const Newfilme = new mongoose.Schema({
  titulo: {
    type: String,
    required: [true, 'O titulo e obrigatorio'],
  },
  sinopse: {
    type: String,
    required: [true, 'A sinopse e obrigatoria'],
  },
  classificacao: {
    type: String,
    required: [true, 'informe a classificação indicativa'],
  },
  url: {
    type: String,
    required: [true, 'informe uma url'],
  },
  poster: {
    type: String,
    required: [true, 'informe uma orl para a capa'],
  },
  genero: {
    type: Object,
    required: [true, 'Informe um ou mais generos'],
  },
}, { versionKey: false });

const filmes = mongoose.model('Filmes', Newfilme);

export default filmes;
