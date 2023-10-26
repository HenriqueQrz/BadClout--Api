import { inserir, consultar, alterar } from '../repository/clienteRepository.js'
import { Router } from "express";

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
    }
    
  
  })
  

  
  
  
  
  
  
  
  
  endpoints.get('/cliente', async (req, resp) => {
    let busca = req.query.busca ?? '';
    let r = await consultar(busca)
    resp.send(r);
  })
  
  
  export default endpoints;