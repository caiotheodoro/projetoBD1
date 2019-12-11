const pool = require('./pool');
const bcrypt = require('bcryptjs')

function User() {};

User.prototype = {
    // Find the user data by id or username.
    find : function(user = null, callback)
    {
        // if the user variable is defind
        if(user) {
            // if user = number return field = id, if user = string return field = username.
            var field = Number.isInteger(user) ? 'id' : 'loginUsuario';
        }
        // prepare the sql query
        let sql = `SELECT * FROM USUARIO WHERE ${field} = ?`;


        pool.query(sql, user, function(err, result) {
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
    create : function(body, callback) 
    {
        var pwd = body.senhaUsuario;
        // Hash the password before insert it into the database.
        body.senhaUsuario = bcrypt.hashSync(pwd,10);

        // this array will contain the values of the fields.
        var bind = [];
        // loop in the attributes of the object and push the values into the bind array.
        for(prop in body){
            bind.push(body[prop]);
        }
        
        
        // prepare the sql query
        let sql = `INSERT INTO USUARIO(loginUsuario, emailUsuario, senhaUsuario) VALUES (?, ?, ?)`;
        // call the query give it the sql string and the values (bind array)
        pool.query(sql, bind, function(err, result) {
            if(err) throw err;
            // return the last inserted id. if there is no error
            callback(result.insertId);
        });
    },

    login : function(loginUsuario, senhaUsuario, callback)
    {
        // find the user data by his username.
        this.find(loginUsuario, function(user) {
            // if there is a user by this username.
            if(user) {
                // now we check his password.
                if(bcrypt.compareSync(senhaUsuario, user.senhaUsuario)) {
                    // return his data.
                    callback(user);
                    return;
                }  
            }
            // if the username/password is wrong then return null.
            callback(null);
        });
        
    },

    alterar : function(loginUsuario, body, callback) 
    {
        this.find(loginUsuario, function(user) {
            if(user) {
                var field = 'loginUsuario'; 
            }

            var pwd = body.senhaUsuario;
            // Hash the password before insert it into the database.
            body.senhaUsuario = bcrypt.hashSync(pwd,10);
            
            // this array will contain the values of the fields.
            var bind = [];
            // loop in the attributes of the object and push the values into the bind array.
            for(prop in body){
                bind.push(body[prop]);
            }
    
            
            var sql = "UPDATE USUARIO SET emailUsuario = '" + body.emailUsuario + "', senhaUsuario = '"+ body.senhaUsuario +"' WHERE loginUsuario ='"+ loginUsuario +"'";
            // prepare the sql query
            // call the query give it the sql string and the values (bind array)
            pool.query(sql, bind, function(err, result) {
                if(err) throw err;
                // return the last inserted id. if there is no error
                callback(result.insertId);
            });
        });

    },

    deletar : function(loginUsuario, callback)
    {
        this.find(loginUsuario, function(user) {
            if(user) {    
                var field = 'loginUsuario';       
            }
            let sql = "DELETE FROM DADOS WHERE loginUsuario ='" + loginUsuario + "'";

            pool.query(sql, user, function(err, result) {
                if(err) throw err
    

            });  

            let sql1 = "DELETE FROM ANOTACAO WHERE userAnotacao ='" + loginUsuario + "'";

            pool.query(sql1, user, function(err, result) {
                if(err) throw err

            });   
        
        let sql2 = "DELETE FROM USUARIO WHERE loginUsuario ='" + loginUsuario + "'";

        pool.query(sql2, user, function(err, result) {
            if(err) throw err

        });   
        callback(null);

    });
    }
}

module.exports = User;