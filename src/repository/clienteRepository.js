import con from "./connection.js";

//cadastrar
export async function inserir(cliente) {
  let comando = `
      insert into tb_cliente (nm_cliente, nm_sobrenome , ds_telefone, ds_cpf, ds_email, ds_senha)
                      values (?, ?, ?, ?, ? , ? )
      `

  let [resp] = await con.query(comando,
    [
      cliente.nome,
      cliente.sobrenome,
      cliente.telefone,
      cliente.cpf,
      cliente.email,
      cliente.senha
    ])
  
  cliente.id = resp.insertId;
  return cliente;
}


export async  function consultar(nome) {
  let comando = `
      select id_cliente       as id,
             nm_cliente       as nome,
             nm_sobrenome     as sobrenome,
             ds_telefone      as telefone,
             ds_cpf           as cpf,
             ds_email         as email,
             ds_senha         as senha
        from tb_cliente
       where nm_cliente like  ?
  `

  let [dados] = await con.query(comando, ['%' + nome + '%'])
  return dados;
}


//consultar todos clientes
export async function consultarClientes(){
  const comando = `
    SELECT * FROM TB_CLIENTE;  
  `
  const [resp] = await con.query(comando);
  return resp;
}





export async function alterar(id, cliente) {
  let comando = `
      update tb_cliente
         set nm_cliente   = ?,
             nm_sobrenome = ?,
             ds_telefone  = ?,
             ds_cpf       = ?,
             ds_email     = ?,
             ds_senha     = ?
       where id_cliente   = ?
  `

  let [resp] = await con.query(comando,
    [
      cliente.nome,
      cliente.sobrenome,
      cliente.telefone,
      cliente.cpf,
      cliente.email,
      cliente.senha,
      id
    ])
  
  return resp.affectedRows;

}

export async function login(email,senha){
  const resposta = `
        select ID_CLIENTE,
          DS_EMAIL	EMAIL,
              NM_CLIENTE	CLIENTE
        FROM TB_CLIENTE
        WHERE DS_EMAIL =?
          AND DS_SENHA = ? `

      const [resp] = await con.query(resposta, [email,senha]);
      return resp[0];
}

//login adm
export async function loginAdm(email,senha){
  const resposta = `
        select ID_ADM,
          DS_EMAIL	EMAIL,
              NM_ADM	ADM
        FROM TB_ADM
        WHERE DS_EMAIL =?
          AND DS_SENHA = ? `

      const [resp] = await con.query(resposta, [email,senha]);
      return resp[0];
}