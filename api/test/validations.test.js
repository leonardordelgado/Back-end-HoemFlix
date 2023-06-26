import validations from '../validations/insertValidations.js';

// eslint-disable-next-line no-undef
describe('Testes das verificações de adição e update de filmes', () => {
  // caso de erro
  // eslint-disable-next-line no-undef
  it('teste de validações caso erro', async () => {
    // teste de erros esperado
    const errosEsperado = [
      {
        message: 'Titulo invalido',
      },
      {
        message: 'sinopse invalida',
      },
      {
        message: 'classificação invalida',
      },
      {
        message: 'url invalida',
      },
      {
        message: 'URL do poster invalida',
      },
      {
        message: 'genero invalido',
      },
    ];

    // pasando variaveis de objeto vazia para gerar erro
    const body = {
      titulo: '',
      sinopse: '',
      classificacao: '',
      url: '',
      poster: '',
      genero: [],

    };

    // tornando o body um objeto de req
    const req = { body };

    // recebendo os erros
    const retornoErro = await validations(req);

    // realizando o primeiro teste desta variavel
    // eslint-disable-next-line no-undef
    expect(retornoErro).toStrictEqual(errosEsperado);
  });

  // segundo teste desta variavel agora de sucesso
  // eslint-disable-next-line no-undef
  it('teste de validações caso sucesso', async () => {
    // pasando variaveis de objeto
    const body = {
      titulo: 'testando o put',
      sinopse: 'so pra confirmar',
      classificacao: 'L',
      url: 'teste',
      poster: 'teste',
      genero: [
        'ação',
      ],
    };

    // tornando o body um objeto de re
    const req = { body };

    // recebendo true caso sucesso
    const sucesso = await validations(req);

    // realizando o segundo teste desta variavel
    // eslint-disable-next-line no-undef
    expect(sucesso).toStrictEqual(true);
  });
});
