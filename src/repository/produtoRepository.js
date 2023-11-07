import con from "./connection.js"


export async function inserir(produto) {
  let comando = `
      insert into tb_produto (id_categoria, nm_modelo, nm_marca, vl_preco, ds_tamanho, bt_destaque, bt_disponivel, qtd_estoque) 
                      values (?, ?, ?, ?, ?, ?, ?, ?)
  `

  let [resp] = await con.query(comando,
    [
      produto.idcategoria,
      produto.modelo,
      produto.marca,
      produto.preco,
      produto.tamanho,
      produto.destaque,
      produto.disponivel,
      produto.estoque
    ])
  
  produto.id = resp.insertId;
  return produto;
}

//consultar todos clientes
export async function consultarClientes(){
  const comando = `
    SELECT * FROM TB_CLIENTE;  
  `
  const [resp] = await con.query(comando);
  return resp;
}


export async function consultar(busca) {
  let comando = `
      select pr.id_produto			    as id,
              cat.id_categoria	    as idcategoria,
              pr.nm_modelo				  as modelo,
              pr.nm_marca				    as marca,
              pr.vl_preco				    as preco,
              pr.ds_tamanho         as tamanho,
              pr.bt_destaque				as destaque,
              pr.bt_disponivel			as disponivel,
              pr.qtd_estoque				as estoque
        from tb_produto				      as pr
        inner join tb_categoria	as cat  ON pr.id_categoria = pr.id_categoria
        where nm_modelo like ?
           or nm_marca  like ?
  `

  let [dados] = await con.query(comando,
    [
      '%' + busca + '%',
      '%' + busca + '%',
    ])
  return dados;
}


export async function alterar(id, produto) {
  let comando = `
      update tb_produto 
         set id_categoria = ?,
             nm_modelo       = ?,
             nm_marca        = ?,
             vl_preco        = ?,
             ds_tamanho      = ?,
             bt_destaque     = ?,
             bt_disponivel   = ?,
             qtd_estoque     = ?
       where id_produto      = ?
  `

  let [resp] = await con.query(comando, 
    [
      produto.idcategoria,
      produto.modelo,
      produto.marca,
      produto.preco,
      produto.tamanho,
      produto.destaque,
      produto.disponivel,
      produto.estoque,
      id
    ])
  
  return resp.affectedRows;
}



export async function deletar(id) {
  let comando = `
      delete from tb_produto 
            where id_produto = ?
  `

  let [resp] = await con.query(comando, [id]);
  return resp.affectedRows;
}


