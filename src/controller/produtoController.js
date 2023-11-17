import { inserir, consultar, alterar, deletar } from '../repository/produtoRepository.js'
import { listarCategoria, buscarCategoriaPorId } from '../repository/categoriaRepository.js';
import { Router } from "express";

let endpoints = Router();


endpoints.post('/produto', async (req, resp) => {
  try {
    let produto = req.body;

    if (!produto.modelo)
      throw new Error('Modelo obrigatório');

    if (!produto.marca)
    throw new Error('Marca obrigatória');

    if (!produto.preco)
    throw new Error('Preço obrigatório');

    if (!produto.preco || isNaN(produto.preco))
      throw new Error('preço deve ser um número');

    if (!produto.tamanho)
    throw new Error('Tamanho obrigatório');

    if (!produto.estoque)
    throw new Error('Campo estoque obrigatório');
    
    let r1 = await buscarCategoriaPorId(produto.idcategoria);
    if (r1.length == 0)
      throw new Error('Categoria inválida');


    let r = await inserir(produto);
    resp.send(r);
  }
  
  catch (err) {
    resp.status(500).send({ erro: err.message });
  }
})






endpoints.put('/produto/:id', async (req, resp) => {
  try {
    let produto = req.body;
    let id = req.params.id;

    
    let r2 = await buscarCategoriaPorId(produto.idcategoria);
    if (r2.length == 0)
      throw new Error('Categoria inválida');


    let r = await alterar(id, produto);
    resp.send();
  }
  catch (err) {
    resp.status(500).send({ erro: err.message });
  }
  

})






endpoints.delete('/produto/:id', async (req, resp) => {
  try {
    let id = req.params.id;
    let r = await deletar(id);
    if (r == 0)
      throw new Error('Nenhum produto pode ser excluído.');

    resp.send();
  }
  catch (err) {
    resp.status(500).send({ erro: err.message });
  }
});











endpoints.get('/produto/categoria', async (req, resp) => {
  let r = await listarCategoria();
  resp.send(r);
});



endpoints.get('/produto', async (req, resp) => {
  let busca = req.query.busca ?? '';
  let r = await consultar(busca)
  resp.send(r);
})


export default endpoints;