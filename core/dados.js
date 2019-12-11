const pool = require('./pool');
const express = require('express');
const router = express.Router();
function Dados() {};

Dados.prototype = {
    find : function(dados = null, callback)
    {
        // if the user variable is defind
        if(dados) {
            // if user = number return field = id, if user = string return field = username.
            var field = Number.isInteger(dados) ? 'id' : 'loginUsuario';
        }
        // prepare the sql query
        let sql = `SELECT * FROM DADOS WHERE ${field} = ?`;


        pool.query(sql, dados, function(err, result) {
            if(err) throw err

            if(result.length) {
                callback(result[0]);
            }else {
                callback(null);
            }
        });
    },
    create : function(loginUsuario, body, callback) 
    {
 

        // this array will contain the values of the fields.
        var bind = [];

        for(prop in body){
            bind.push(body[prop]);
        }
                // prepare the sql query

        // call the query give it the sql string and the values (bind array)
        pool.query("SELECT * FROM DADOS WHERE loginUsuario ='"+ loginUsuario +"'", bind, function(err, result) {

            if(result){
                let sql = "UPDATE DADOS SET nome = '" + body.nome + "', idade = '"+ body.idade +"' WHERE loginUsuario ='"+ loginUsuario +"'";
            // prepare the sql query
            // call the query give it the sql string and the values (bind array)
            pool.query(sql, bind, function(err, result) {
                if(err) throw err;
                // return the last inserted id. if there is no error
                callback(result.insertId);
            });

            }  else {

            let sql = "INSERT INTO DADOS (nome, idade, loginUsuario) VALUES ('" + body.nome + "', '" + body.idade + "', '" + loginUsuario + "')";

            pool.query(sql, bind, function(err, result) {
             if(err) throw err;
                // return the last inserted id. if there is no error
                callback(result.insertId);
            });
    
            }
        });
    },
    mostrar : function(loginUsuario, callback){
        pool.query("SELECT * FROM DADOS WHERE loginUsuario ='" + loginUsuario + "'", function(err, rows, fields) {
            var dadosUser;

                  if(rows.length==1) {
                      // Create the object to save the data.
                     var dadosUser = {
                      'nome' : rows[0].nome,
                      'idade': rows[0].idade
                     }

                     callback(dadosUser); 
                
           }
 
        })
    }
}

module.exports = Dados;