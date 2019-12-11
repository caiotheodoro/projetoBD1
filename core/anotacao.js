const pool = require('./pool');

function Anotacao() {};

Anotacao.prototype = {
    find : function(anotacao = null, callback)
    {

        if(anotacao) {
            // if user = number return field = id, if user = string return field = username.
            var field = Number.isInteger(anotacao) ? 'id' : 'titulo';
        }
        // prepare the sql query
        let sql = `SELECT * FROM ANOTACAO WHERE ${field} = ?`;


        pool.query(sql, anotacao, function(err, result) {
            if(err) throw err

            if(result.length) {
                callback(result[0]);
            }else {
                callback(null);
            }
        });
    },

    // This function will insert data into the database. (create a new user)
    // body is an object 
    create : function(loginUsuario, body, callback) 
    {


        // this array will contain the values of the fields.
        var bind = [];
        // loop in the attributes of the object and push the values into the bind array.
        for(prop in body){
            bind.push(body[prop]);
        }
        
        // prepare the sql query
        let sql = "INSERT INTO ANOTACAO(titulo, texto, userAnotacao ) VALUES ('"+ body.titulo +"','"+ body.texto +"','"+ loginUsuario +"')";
        // call the query give it the sql string and the values (bind array)
        pool.query(sql, bind, function(err, result) {
            if(err) throw err;
            // return the last inserted id. if there is no error
            callback(result.insertId);
        });
    },


    alterar : function(titulo, loginUsuario, body, callback) 
    {
        this.find(loginUsuario, function(user) {
            if(user) {
                var field = 'loginUsuario'; 
            }

            
            // this array will contain the values of the fields.
            var bind = [];
            // loop in the attributes of the object and push the values into the bind array.
            for(prop in body){
                bind.push(body[prop]);
            }
    
            
            var sql = "UPDATE ANOTACAO SET texto = '"+ body.texto +"' WHERE loginUsuario ='"+ loginUsuario +"' AND titulo = '"+ titulo +"' ";
            // prepare the sql query
            // call the query give it the sql string and the values (bind array)
            pool.query(sql, bind, function(err, result) {
                if(err) throw err;
                // return the last inserted id. if there is no error
                callback(result.insertId);
            });
        });

    },

    mostrar : function(loginUsuario, callback){
        pool.query("SELECT * FROM ANOTACAO WHERE userAnotacao ='" + loginUsuario + "'", function(err, rows, fields) {
            var anotacaoList = [];

                  for (var i = 0; i < rows.length; i++) {
                      // Create the object to save the data.
                     var anotacao = {
                      'titulo' : rows[i].titulo,
                      'texto': rows[i].texto
                     }

                     anotacaoList.push(anotacao);
                
           }

           callback(anotacaoList);
           if(err) throw err;    
        })
    
    },
    
    deletar : function(titulo, loginUsuario, callback){  
            this.find(loginUsuario, function(user) {
                if(user) {    
                    var field = 'loginUsuario';       
                }
                let sql = "DELETE FROM ANOTACAO WHERE userAnotacao ='" + loginUsuario + "' AND titulo ='"+ titulo +"'";
    
                pool.query(sql, user, function(err, result) {
                    if(err) throw err
        
    
                });  
        
    })
    }
}



module.exports = Anotacao;