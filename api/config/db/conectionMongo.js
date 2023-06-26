import mongoose from 'mongoose';

const url = 'mongodb://api_HomeFlix:api_HomeFlix@localhost:30002/api_HomeFlix_Filmes';
// eslint-disable-next-line no-shadow
export async function conexao(url) {
  try {
    await mongoose.connect(url, { serverSelectionTimeoutMS: 400 });
    console.log('conexao realixado com a base de Dados de filmes');
  } catch {
    throw new Error('Houve um erro ao conectar com o banco');
  }
}

const db = conexao(url);

export default db;
