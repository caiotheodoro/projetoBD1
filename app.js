const express = require("express");
const app = express();
const path = require("path")
const passport = require('passport')
const handlebars =  require('express-handlebars')
const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs')
const session = require("express-session")
const flash = require("connect-flash")
var users = require('./routes/users');
app.use('/routes/users', users);
const PORT = 3000; //porta padrão
const mysql = require('mysql');
const router = express.Router();
const connection = require('./nodemysql/create-table.js')
//config
    //sessao

    app.use(session({
      secret: "curso",
      resave: true,
      saveUnitialized: true
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    app.use(flash());
    
    //middleware
    app.use((req, res, next) => {
      res.locals.success_msg = req.flash("sucees_msg")
      res.locals.error_msg = req.flash("error_msg") 
      res.locals.user = req.user || null
      next();
    });
    //handlebars
    app.engine('handlebars',handlebars({defaultLayout: 'main'}))
    app.set('view engine', 'handlebars')
    //body parser
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())
    
    // public/bootstrap
    app.use(express.static(path.join(__dirname, 'public')));

    //definindo as rotas













    // Rotas (express)
app.get("/", function(req,res) {
    res.render('index', { title: 'Express' });  // busca todas redacoes do banco e renderiza na pagina inical ("/")
  })


  router.get('/', (req, res) => res.json({ message: 'Funcionando!' }));
  app.use('/', router);


router.get('/usuarios', (req, res) =>{
    execSQLQuery('SELECT * FROM USUARIO', res);
})

app.get('/enviarRedacao', function(req, res, next) {
    res.render('enviarRedacao', { title: 'Express' });
  });
  app.get('/redacoesCorrigidas', function(req, res, next) {
    Post.find().then((redacoes) => {
      res.render('redacoesCorrigidas', {redacoes: redacoes})
    })
  });
  app.get("/redacoesCorrigidas/edit/:id",(req, res) => {
    Post.findOne({_id: req.params.id}).then((redacoes) => { //acha a redacao no banco e a renderiza na pagina de edicao
   res.render("redacaoEdit", {redacoes: redacoes})
    })
  })
  app.get('/redacaoEdit', function(req, res, next) {
    res.render('redacaoEdit', { title: 'Express' });
  });
  app.get("/redacoesCorrigidas/edit/:id",(req, res) => {
    res.render("redacaoEdit")
  })
  app.get('/usuarioEdit', function(req, res, next) {
    res.render('usuarioEdit', { title: 'Express' });
  });
  app.get('/registro', function(req, res, next) {
    res.render('registro', { title: 'Express' });
  });
  app.get('/crudAluno', function(req, res, next) {
    res.render('crudAluno', { title: 'Express' });
  });
  app.get('/areaAluno', function(req, res, next) {
    res.render('areaAluno', { title: 'Express' });
  });
  app.get('/redacao', function(req, res, next) {
    res.render('redacao', { title: 'Express' });
  });
  app.get('/redacoesRecebidas', function(req, res, next) {
    res.render('redacoesRecebidas', { title: 'Express' });
  });
  app.get('/redacoesPostadas', function(req, res, next) {
    res.render('redacoesPostadas', { title: 'Express' });
  });
  app.get('/redacaoSend', function(req, res, next) {
    res.render('redacaoSend', { title: 'Express' });
  });

  app.post('/auth', function(req, res) {
    var loginUsuario = req.body.loginUsuario;
    var senhaUsuario = req.body.senhaUsuario;
    if (loginUsuario && senhaUsuario) {
      connection.query('SELECT * FROM USUARIO WHERE loginUsuario = ? AND senhaUsuario = ?', [loginUsuario, senhaUsuario], function(error, results, fields) {
        if (results.length > 0) {
          req.session.loggedin = true;
          req.session.loginUsuario = loginUsuario;
          res.redirect('/');
        } else {
          res.send('Login e/ou senha Incorretos!');
        }			
        res.end();
      });
    } else {
      res.send('Por favor, coloque seu Login e sua Senha!');
      res.end();
    }
  });

 

  app.get("/crudAluno/edit/:id",(req, res) => {
    Usuario.findOne({_id: req.params.id}).then((usuarios) => { //acha a redacao no banco e a renderiza na pagina de edicao
   res.render("usuarioEdit", {usuarios: usuarios})
    })
  })
  app.get("/crudAluno/edit/:id",(req, res) => {
    res.render("usuarioEdit")
  })

  app.post("/redacoesCorrigidas/edit", (req,res) => { // edita a redacao
    Post.findOne({_id: req.body.id}).then((redacoes) => {

      redacoes.texto = req.body.texto

      redacoes.save().then(() => {
        res.redirect("/redacoesCorrigidas")
      })
    })
    
  })
  app.get("/redacoesCorrigidas/deletar/:id", (req,res) => { //deleta a redacao
    Post.remove({_id: req.params.id}).then(() => {
      res.redirect("/redacoesCorrigidas")
    })
  })
  app.post("/crudAluno/edit", (req,res) => { // edita a redacao
    Usuario.findOne({_id: req.body.id}).then((usuarios) => {

      usuarios.login = req.body.login,
      usuarios.email = req.body.email,
      usuarios.senha = req.body.senha

      bcrypt.genSalt(10, (erro, salt) => {
        bcrypt.hash(usuarios.senha, salt,(erro, hash) => {
          if(erro){
            res.redirect("/usuarioEdit")
          }
          usuarios.senha = hash

          usuarios.save().then(() => {
            res.redirect("/")
          })
        })
      })
    })
    
  })
  app.get("/crudAluno/deletar/:id", (req,res) => { //deleta a redacao
    Usuario.remove({_id: req.params.id}).then(() => {
      res.redirect("/")
    })
  }) 

app.get("/redacao/:id", (req,res) => {
    Post.findOne({_id: req.params.id}).then((redacoes) => { //acha a redacao no banco e a renderiza para visualizacao
      res.render("redacao", {redacoes: redacoes})
    })
})

router.get('/clientes/:id?', (req, res) =>{
  let filter = '';
  if(req.params.id) filter = ' WHERE ID=' + parseInt(req.params.id);
  execSQLQuery('SELECT * FROM Clientes' + filter, res);
})
app.post("/registro", (req,res) => {
    let usuario = {};
    const { loginUsuario, emailUsuario, senhaUsuario} = req.body;
      usuario.loginUsuario = loginUsuario;
      usuario.emailUsuario = emailUsuario;
      usuario.senhaUsuario = senhaUsuario;
     strCliente = execSQLQuery(`INSERT INTO USUARIO(loginUsuario, emailUsuario, senhaUsuario) VALUES('${usuario.loginUsuario}','${usuario.emailUsuario}','${usuario.senhaUsuario}')`, res);
     
     connection.query(strCliente, (err, rows, fields) => {
      if (!err)
          res.send(rows);
      else
          console.log(err);
  })
    })


app.get("/logout", (req,res) => { //sai da sessao do usuario
    req.logout()
    res.redirect("/")
})



// module.exports = function(passport){


//   passport.use(new localStrategy({usernameField: 'login', passwordField: 'senha'},(login, senha, done) => {

//     Usuario.findOne({login: login}).then((usuarios) => {
//       if(!usuarios){
//         return done(null,false, {message:"Conta inexistente."})
//       }

//       bcrypt.compare(senha, usuarios.senha, (erro,batem) => {
//         if(batem){
//           return done(null,usuarios)
//         }
//       else{
//         return done(null, false, {message: "Senha incorreta."})
//       }
//       })
//     })
//   }))
//   passport.serializeUser((usuarios,done) => {
//     done(null,usuarios.id)
//   })

//   passport.deserializeUser((id,done) => {
//     Usuario.findById(id,(err,usuarios) => {
//       done(err,usuarios)
//     })
//   })
// }







    // servidor/porta 




 /* app.get('/deletar/:id', function(req,res){
    Post.destroy({where: {'id': req.params.id}}).then(function(){
      res.send("Postagem Deletada.")
    }).catch(function(erro) {
      res.send("Erro..." + erro)
    })
  })*/


function execSQLQuery(sqlQry, res){
  const connection = mysql.createConnection({
    host     : 'localhost',
    port     : 3306,
    user     : 'uga123',
    password : 'uga123',
    database : 'projetobd'
  });
 
  connection.query(sqlQry, function(error, results, fields){
      if(error) 
        res.json(error);
      else
        res.json(results);
      connection.end();
      console.log('executou!');
  });
}

app.listen(PORT,() =>{
    console.log("servidor rodando na url http://localhost:3000");
})

/*app.get("/sobre/:login/:id", function(req,res) {
    res.send(req.params.login);
})
*/
