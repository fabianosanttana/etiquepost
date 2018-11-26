var uuidv = require('uuidv4');

module.exports = (app, firebase) => {


    //realiza login
    app.get('/tickets/users/:id', (req, res) => {


        let idUser = req.params.id;


        firebase.database().ref(`tickets-users/${idUser}/tickets/ticket`).once('value').then(resDatabase =>
            res.status(200).send(resDatabase)
        )

    })



    app.post('/tickets', (req, res) => {

        let idUser = req.headers.id;
        let tickets = req.body;

        firebase.database().ref(`tickets-users/${idUser}/tickets/ticket/${uuidv()}`).set(tickets).then(() => {
            response = { error: 'false', message: 'Etiquetas cadastradas com sucesso.' }
            res.status(201).send(response);
        })

    })
}