var uuidv = require('uuidv4');
var _ = require('lodash')
module.exports = (app, firebase) => {

    //retorna todos usuarios e suas informações
    app.get('/users', (req, res) => {
        firebase.database().ref(`users/`).once('value').then(response => {
            response.val() ? res.status(200).send(response) : res.status(400).send({ erro: true, message: "Não existe usuario cadastrado." })
        })
    });

    app.get('/food', (req, res) => {
        firebase.database().ref(`/receitas/listagem`).once('value').then(response => {
            if(response.val()){
                let result = _.toArray(response)
                res.status(200).send(result)
            }else{
                res.status(400).send({ erro: true, message: "Não existe receita disponível." })
            }
        })
    });

    app.post('/users/recover', (req, res) => {
        let body = req.body;
        console.log(body.email);
        firebase.auth().sendPasswordResetEmail(body.email)
        .then((obj) => 
        {
            response = { error: 'false', message: 'Email enviando com sucesso.' }
            res.status(201).send(response);
        })
    });

    /**
     * Cadastra um novo usuário
     * {"nome":"NOME", "email":"EMAIL",	"password":"PASSWORD"} 
     */
    app.post('/users', (req, res) => {
        console.log(req.body);
        req.assert('name', 'Campo nome deve ser preenchido').notEmpty();
        req.assert('email', 'Campo email deve ser preenchido').notEmpty();
        req.assert('password', 'Campo password deve ser preenchido').notEmpty();

        let erros = req.validationErrors();

        if (erros) {
            console.log('Erros de validação encontrado')
            res.status(400).send(erros);
            return;
        }

        let body = req.body;
        firebase.auth().createUserWithEmailAndPassword(body.email, body.password).then((user) => {
            let usuario = {
                email: body.email,
                nome: body.name,
                accessToken: uuidv(),
                expireDate: (new Date().getTime() + (86400 * 1000 * 365))
            }
            firebase.database().ref(`users/${user.uid}`).set(usuario).then(() => {
                response = { error: 'false', message: 'Usuario cadastrado com sucesso.', user: usuario }
                res.status(201).send(response);
            })
        }, err => {
            res.status(406).send(err);
        });
    });
}
