import { inserir, consultar, alterar, login } from '../repository/clienteRepository.js'
import { Router } from "express";
import { consultarClientes } from '../repository/produtoRepository.js';

let endpoints = Router();


endpoints.post('/cliente', async (req, resp) => {
  try {
    let cliente = req.body;

    let r = await inserir(cliente);
    resp.send(r);
  }
  
  catch (err) {
    resp.status(500).send({ erro: err.message });
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