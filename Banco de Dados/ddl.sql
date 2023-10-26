

INSERT INTO TB_CLIENTE (nm_cliente, nm_sobrenome , ds_telefone, ds_cpf, ds_email, ds_senha)
                      VALUES ('', '', '', '', '' , '' );


select id_cliente       as id,
             nm_cliente       as nome,
             nm_sobrenome     as sobrenome,
             ds_telefone      as telefone,
             ds_cpf           as cpf,
             ds_email         as email,
             ds_senha         as senha
        from tb_cliente
       where nm_cliente like  ?


update tb_cliente
         set nm_cliente   = ?,
             nm_sobrenome = ?,
             ds_telefone  = ?,
             ds_cpf       = ?,
             ds_email     = ?,
             ds_senha     = ?
       where id_cliente   = ?


