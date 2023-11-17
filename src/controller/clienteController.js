import { inserir, consultarClientes, alterar, login, loginAdm } from '../repository/clienteRepository.js'
import { Router } from "express";


let endpoints = Router();


endpoints.post('/cadastro', async (req, resp) => {
  try {
    let cliente = req.body;

    if (!cliente.nome)
      throw new Error('Nome obrigatório');

    if (!cliente.sobrenome)
    throw new Error('Sobrenome obrigatório');

    if (!cliente.telefone)
    throw new Error('Telefone obrigatório');

    if (!cliente.telefone != isNaN(cliente.telefone))
    throw new Error('Telefone deve ser somente número e sem espaçamento');

    if(cliente.telefone < 9999999999 || cliente.telefone > 100000000000)
    throw new Error('Número de telefone Inválido')

      if (!cliente.cpf)
    throw new Error('Cpf obrigatório');

    if (!cliente.cpf != isNaN(cliente.cpf))
    throw new Error('Cpf deve ser somente número e sem espaçamento');

    if(cliente.cpf < 9999999999 || cliente.cpf > 100000000000)
    throw new Error('Cpf Inválido')

    if (!cliente.email)
    throw new Error('Email obrigatório');

    if (!cliente.senha)
    throw new Error('Senha obrigatório');

    let r = await inserir(cliente);
    resp.send(r);
  }
  
  catch (err) {
    resp.status(404).send({ erro: err.message });
  }
})




endpoints.put('/cliente/:id', async (req, resp) => {
    try {
      let cliente = req.body;
      let id = req.params.id;

      //if
      
  
  
      let r = await alterar(id, cliente);
      resp.send();
    }
    catch (err) {
      resp.status(500).send({ erro: err.message });
    };
  })
  
  endpoints.get('/clientes', async (req,resp) =>{
    try {
      
      let busca = req.body;
      const resposta = await consultarClientes(busca);
      resp.send(resposta)
    } catch (err) {
        resp.status(404).send({
          erro: err.message
        });
    }
  });

  //login
  endpoints.post('/clientes/login' , async (req, resp) => {
    try {
        const { email, senha } = req.body;
        const resposta = await login(email,senha);
        
        if(!resposta){
          throw new Error("Email ou senha inválidos");
        }
        resp.send(resposta);
    } catch (err) {
      resp.status(405).send({
        erro: err.message
      })
    }
  })

  //login do adm
  endpoints.post('/adm/login' , async (req, resp) => {
    try {
        const { email, senha } = req.body;
        const resposta = await loginAdm(email,senha);
        
        if(!resposta){
          throw new Error("Crendenciais inválidas");
        }
        resp.send(resposta);
    } catch (err) {
      resp.status(404).send({
        erro: err.message
      })
    }
  })
  
  export default endpoints;