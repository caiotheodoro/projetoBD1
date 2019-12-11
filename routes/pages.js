const express = require('express');
const User = require('../core/user');
const router = express.Router();
const Anotacao = require('../core/anotacao');
const Dados = require('../core/dados');
// create an object from the class User in the file core/user.js
const dados = new Dados;
const anotacao = new Anotacao();
const user = new User();
// Get the index page
router.get('/', (req, res, next) => {
    let user = req.session.user;
    // If there is a session named user that means the use is logged in. so we redirect him to home page by using /home route below
    if(user) {
        res.redirect('/home');
        return;
    }
    // IF not we just send the index page.
    res.render('index', {title:"My application"});
})

// Get home page
router.get('/home', (req, res, next) => {
    let user = req.session.user;

    anotacao.mostrar(user.loginUsuario, function(anotacaoList) {
        if(anotacaoList){
            res.render('home', {opp:req.session.opp, loginUsuario:user.loginUsuario, "anotacaoList" : anotacaoList });
            return;
        }
    });
});

// Post login data
router.post('/login', (req, res, next) => {
    // The data sent from the user are stored in the req.body object.
    // call our login function and it will return the result(the user data).
    user.login(req.body.loginUsuario, req.body.senhaUsuario, function(result) {
        if(result) {
            // Store the user data in a session.
            req.session.user = result;
            req.session.opp = 1;
            // redirect the user to the home page.
            res.redirect('/home');
        }else {
            // if the login function returns null send this error message back to the user.
            res.send('Login/Senha incorretos!');
        }
    })

});


// Post register data
router.post('/register', (req, res, next) => {
    // prepare an object containing all user inputs.
    let userInput = {
        loginUsuario: req.body.loginUsuario,
        emailUsuario: req.body.emailUsuario,
        senhaUsuario: req.body.senhaUsuario
    };
    // call create function. to create a new user. if there is no error this function will return it's id.
    user.create(userInput, function(lastId) {
        // if the creation of the user goes well we should get an integer (id of the inserted user)
        if(lastId) {
            // Get the user data by it's id. and store it in a session.
            user.find(lastId, function(result) {
                req.session.user = result;
                req.session.opp = 0;
                res.redirect('/home');
            });

        }else {
            console.log('Erro ao criar usuario ...');
            res.redirect('/');
        }
    });

});

router.get('/criarAnotacao',(req, res, next) => {
    let user = req.session.user;


    if(user) {
        res.render('criarAnotacao', {opp:req.session.opp, loginUsuario:user.loginUsuario});
        return;
    }
    res.redirect('/');
})

router.post('/criaDados', (req, res, next) => {
    let usu = req.session.user;

    let userInput = {
        nome: req.body.nome,
        idade: req.body.idade
    };

    router.get('/deletarRedacao/:titulo',(req, res, next) => {
        let user = req.session.user;
        
        anotacao.deletar(req.params.titulo, user.loginUsuario, function(result) {
            if(result) {
                res.redirect('/')
            }
            res.redirect('/')
        });
    });
    // call create function. to create a new user. if there is no error this function will return it's id.
    dados.create(usu.loginUsuario, userInput, function(lastId) {
        // if the creation of the user goes well we should get an integer (id of the inserted user)
        if(lastId) {
            // Get the user data by it's id. and store it in a session.
            dados.find(lastId, function(result) {
                res.redirect('/');
            });

        }else {
            res.redirect('/');
            console.log('Erro ao criar dados ...');
        }
    });
});


router.get('/minhaConta',(req, res, next) => {
    let user = req.session.user;

    if(user) {
        res.render('minhaConta', {opp:req.session.opp, loginUsuario:user.loginUsuario});
        return;
    }
    res.redirect('/');
})

router.get('/dados',(req, res, next) => {
    let user = req.session.user;

    if(user) {
        res.render('dados', {opp:req.session.opp, loginUsuario:user.loginUsuario});
        return;
    }
    res.redirect('/');
})
router.get('/criarCat',(req, res, next) => {
    let user = req.session.user;

    if(user) {
        res.render('criarCat', {opp:req.session.opp, loginUsuario:user.loginUsuario});
        return;
    }
    res.redirect('/');
})

router.post('/criar', (req, res, next) => {
    let usu = req.session.user;

    let userInput = {
        titulo: req.body.titulo,
        texto: req.body.texto
    };
    // call create function. to create a new user. if there is no error this function will return it's id.
    anotacao.create(usu.loginUsuario, userInput, function(lastId) {
        // if the creation of the user goes well we should get an integer (id of the inserted user)
        if(lastId) {
            // Get the user data by it's id. and store it in a session.
            anotacao.find(lastId, function(result) {
                res.redirect('/');
            });

        }else {
            console.log('Erro ao criar Anotacao ...');
            res.redirect('/home');
        }
    });
});

router.get('/detalhesDados',(req, res, next) => {
    let user = req.session.user;

    if(user) {
      dados.mostrar(user.loginUsuario, function(dadosUser){
        if(dadosUser){
            res.render('detalhesDados', {opp:req.session.opp, loginUsuario:user.loginUsuario, "dadosUser" : dadosUser });
            return;
        }
      });
    }
})

router.get('/meusDados',(req, res, next) => {
    let user = req.session.user;

    if(user) {
        res.render('meusDados', {opp:req.session.opp, loginUsuario:user.loginUsuario});
        return;
    }
    res.redirect('/');
})


router.post('/deletar', (req, res) =>{
    let usu = req.session.user;
     user.deletar(usu.loginUsuario, function(result) {
     if(result) {
        req.session.user = result;
        req.session.opp = 0;
        res.redirect('/home');
     }else {
        req.session.user = result;
        req.session.opp = 0;
        res.redirect('/')
    }
    return;
    }
     )

})

router.post('/alterar', (req, res, next) => { //alterar usuario
    
    let usu = req.session.user;

    let userInput = {
        emailUsuario: req.body.emailUsuario,
        senhaUsuario: req.body.senhaUsuario
    };

    user.alterar(usu.loginUsuario, userInput, function(lastId) {

        if(lastId) {
            user.find(lastId, function(result) {
                res.redirect('/');
            });

        }else {
            console.log('Erro ao alterar usuarior ...');

        }
    });

});

//router.post("/deletar", (req,res) => {

 //   let usuar = req.session.user;

 //   if(usuar) {
  //  user.deletar(usuar.loginUsuario, function(result) {
  //      if(result) {
          //  res.redirect('/');
  //      }else {
         //   res.send('Erro ao deletar.');
   //     }
  //  })
//    }
//})

// Get loggout page
router.get('/loggout', (req, res, next) => {
    // Check if the session is exist
    if(req.session.user) {
        // destroy the session and redirect the user to the index page.
        req.session.destroy(function() {
            res.redirect('/');
        });
    }
});

module.exports = router;