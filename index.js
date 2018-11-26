var app = require('./configs/config-express')();
var firebase = require('./configs/config-firebase')();
var loginApi = require('./routes/login');
var usuarioApi = require('./routes/usuario');
var ticketsApi = require('./routes/tickets')
var admin = require("firebase-admin");

var port = process.env.port || 8000;

loginApi(app, firebase);
usuarioApi(app, firebase);
ticketsApi(app,firebase);

app.listen(process.env.PORT, "0.0.0.0", () => {
    console.log("Servidor rodando na porta" + process.env.PORT)
}) 