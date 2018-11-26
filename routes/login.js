module.exports = (app, firebase) => {

    //realiza login
    app.post('/login', (req, res) => {
        req.assert('email', 'Email deve ser preechido').notEmpty();
        req.assert('password', 'Senha deve ser preechido').notEmpty();
        let erros = req.validationErrors();

        if (erros) {
            console.log("Erro na autenticação");
            res.status(400).send(erros);
            return;
        }
        let dadosLogin = req.body;
        firebase.auth().signInWithEmailAndPassword(dadosLogin.email, dadosLogin.password).then(response => {
            firebase.database().ref(`users/${response.uid}`).once('value').then(resDatabase => {
                res.status(200).send(resDatabase)
            })
        }, err => {
            if (err.code == 'auth/user-not-found') {
                return res.status(404).send({ error: 'true', mensagem: "Usuário não cadastrado", code: 404 })
            }
            res.status(403).send({ error: 'true', mensagem: err.code })
        });
    })
}