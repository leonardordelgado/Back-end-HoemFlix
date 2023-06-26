// responsavel por validar toda a inserção de filmes
async function validations(req) {
  const erros = [];
  if (!req.body.titulo) {
    erros.push({ message: 'Titulo invalido' });
  }
  if (!req.body.sinopse) {
    erros.push({ message: 'sinopse invalida' });
  }
  if (!req.body.classificacao) {
    erros.push({ message: 'classificação invalida' });
  }
  if (!req.body.url) {
    erros.push({ message: 'url invalida' });
  }
  if (!req.body.poster) {
    erros.push({ message: 'URL do poster invalida' });
  }
  if (req.body.genero.length === 0) {
    erros.push({ message: 'genero invalido' });
  }
  if (erros.length > 0) {
    return erros;
  }
  return true;
}

export default validations;
