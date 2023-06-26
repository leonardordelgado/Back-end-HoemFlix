// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, it, expect } from '@jest/globals';

import mongoose from 'mongoose';

// eslint-disable-next-line no-unused-vars
import { conexao } from '../config/db/conectionMongo.js';

describe('Modeulo teste do mongoDB insert delete', () => {
  it('Caso de erro na conexão', async () => {
    await mongoose.connection.close();

    function erro() {
      return conexao('mongodb://api_HomeFlix:api_HomeFlix@localhost:3000');
    }

    await expect(erro()).rejects.toThrowError('Houve um erro ao conectar com o banco');
  });
});
