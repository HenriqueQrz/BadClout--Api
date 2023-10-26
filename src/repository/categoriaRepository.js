import con from "./connection.js";


export async function buscarCategoriaPorId(id) {
  let comando = 'select * from tb_categoria where id_categoria = ?';
  let [dados] = await con.query(comando, [id]);
  return dados;
}


export async function listarCategoria() {
  let comando = `
      select id_categoria      id,
             nm_categoria      as categoria
        from tb_categoria`;
  
  let [dados] = await con.query(comando);
  return dados;
}