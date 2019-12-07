const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  port     : 3306,
  user     : 'uga123',
  password : 'uga123',
  database : 'projetoBD'
});




function createTable(conn){

    const sql = "CREATE TABLE IF NOT EXISTS USUARIO (\n"+
                "loginUsuario varchar(15) NOT NULL,\n"+
                "senhaUsuario varchar(50) NOT NULL,\n"+
                "emailUsuario varchar(50) NOT NULL,\n"+
                "PRIMARY KEY (loginUsuario)\n"+
                ");"
                "CREATE TABLE IF NOT EXISTS CANECA (\n"+
                "nomeCaneca varchar(50) NOT NULL,\n"+
                "donoCaneca varchar(15),\n"+
                "foreign key (donoCaneca) REFERENCES USUARIO(loginUsuario),\n"+
                "PRIMARY KEY (nomeCaneca)\n"+
                ");"
                "CREATE TABLE IF NOT EXISTS SUBCATEGORIA (\n"+
                "nomeCaneca varchar(50) NOT NULL,\n"+
                "subCategoriaCaneca varchar(50) NOT NULL,\n"+
                "FOREIGN KEY (nomeCaneca) REFERENCES CANECA(nomeCaneca),\n"+
                "PRIMARY KEY(nomeCaneca,subCategoriaCaneca)\n"+
                ");"
                ;
                
    conn.query(sql, function (error, results, fields){
        if(error) return console.log(error);
        console.log('criou a tabela!');
    });
}

function addRows(conn){
    const sql = "INSERT INTO USUARIO(loginUsuario,senhaUsuario,emailUsuario ) VALUES ?";
    const values = [
          ['teste1', '1234','teste1@hotmail.com'],
          ['teste2', '12345','teste2@hotmail.com'],
          ['teste3', '123456','teste3@hotmail.com']
        ];

connection.connect(function(err){
    if(err) return console.log(err);
    console.log('conectou!');
    createTable(connection);
  })

  
  conn.query(sql, [values], function (error, results, fields){
          if(error) return console.log(error);
          console.log('adicionou registros!');
          conn.end();//fecha a conexão
      });
}

module.exports = connection;