/* eslint-disable import/no-extraneous-dependencies */
import {
  // eslint-disable-next-line no-unused-vars
  describe, it, expect, beforeEach, afterEach, jest,
} from '@jest/globals';

import request from 'supertest';
import app from '../app.js';

let server;
beforeEach(() => {
  const port = 3005;
  // eslint-disable-next-line prefer-const
  server = app.listen(port);
});
afterEach(() => {
  server.close();
});
let resposta;

describe('Superteste de rotas de filmes', () => {
  // teste de inserts
  it('insere e devolve uma resposta na rota post', async () => {
    resposta = await request(app)
      .post('/')
      .send({
        titulo: 'Teste insert',
        sinopse: 'teste',
        classificacao: 'teste',
        url: 'teste',
        poster: 'teste',
        genero: ['teste'],
      })
      .expect(201);
    expect(resposta.body.titulo).toEqual('Teste insert');
  });
  it('insert informações vazias', async () => {
    const respostaErroInsert = await request(app)
      .post('/')
      .send({
        titulo: '',
        sinopse: '',
        classificacao: '',
        url: '',
        poster: '',
        genero: [''],
      })
      .expect(402);
    expect(respostaErroInsert.body[0].message).toEqual('Titulo invalido');
  });
  it('insert informações Iguais', async () => {
    const respostaErroInsert = await request(app)
      .post('/')
      .send({
        titulo: 'Teste insert',
        sinopse: 'teste',
        classificacao: 'teste',
        url: 'teste',
        poster: 'teste',
        genero: ['teste'],
      })
      .expect(400);
    expect(respostaErroInsert.body.message).toEqual('Parece que este titulo ja existe');
  });

  // testes de get
  it('Devolver uma lista de', async () => {
    const respostaGet = await request(app)
      .get('/')
      .set('Accept', 'application/json')
      .expect('content-type', /json/)
      .expect(200);
    const filter = respostaGet.body.filter((t) => t.titulo === 'Teste insert');
    expect(filter[0].titulo).toEqual('Teste insert');
  });

  // teste para update
  it('update de filmes', async () => {
    const respostaUpdate = await request(app)
      // eslint-disable-next-line no-underscore-dangle
      .put(`/filmes/${resposta.body._id}`) // Usando a resposta do POST para obter o _id
      .send({
        titulo: 'Teste de update',
        sinopse: 'teste atualizado',
        classificacao: 'teste atualizado',
        url: 'teste atualizado',
        poster: 'teste atualizado',
        genero: ['teste atualizado'],
      })
      .expect(200);
    expect(respostaUpdate.body.message).toEqual('titulo Teste insert atualizado com sucesso');
  });
  it('update de filmes error', async () => {
    const respostaUpdate = await request(app)
      // eslint-disable-next-line no-underscore-dangle
      .put(`/filmes/${resposta.body._id}`) // Usando a resposta do POST para obter o _id
      .send({
        titulo: '',
        sinopse: 'teste atualizado',
        classificacao: 'teste atualizado',
        url: 'teste atualizado',
        poster: 'teste atualizado',
        genero: ['teste atualizado'],
      })
      .expect(402);
    expect(respostaUpdate.body[0].message).toEqual('Titulo invalido');
  });

  // testes de delete
  it('deleta filmes', async () => {
    const respostaDelete = await request(app)
      // eslint-disable-next-line no-underscore-dangle
      .delete(`/${resposta.body._id}`)
      .expect(200);
    expect(respostaDelete.body.message).toEqual('O filme Teste de update foi deletado com sucesso');
  });
  it('deleta filmes erro', async () => {
    const respostaDelete = await request(app)
      // eslint-disable-next-line no-underscore-dangle
      .delete(`/${resposta.body}`)
      .expect(404);
    expect(respostaDelete.body.message).toEqual('Houve um erro ao deletar o titulo solicitado');
  });
});
