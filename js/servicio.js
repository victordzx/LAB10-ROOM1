const express = require('express');
const mysql = require('mysql2');
const bp = require("body-parser");

const app = express();

let conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'sandylance'
});

conn.connect(function(err){
    if(err) throw err;
    console.log("Conexión exitosa a base de datos");
});
// ruta: /servicio/create/
app.post('/servicio/create', bp.urlencoded({extended: true}), function (req, res) {

    let mascotaid = 0; // inicializamos variable
    let servicioid = req.body.servicioid
    let cuenta = req.body.cuenta;
    let horaInicio = req.body.horaInicio;
    let duracion = req.body.duracion;
    let entrega = req.body.entrega;
    let responsable = req.body.responsable;

    let parametros = [mascotaid, servicioid, cuenta, horaInicio, duracion, entrega, responsable];
    let query = "insert into mascota (mascota_idmascota, idservicio, cuenta_idcuenta, hora_inicio, duracion, entrega, responsable_idresponsable) VALUES (?,?,?,?,?,?,?)";

    conn.query(query, parametros, function (err, result) {
        if (err) throw err;

        conn.query("SELECT * FROM servicio", function (err, results) {
            results.idmascota = results.length; // autoincrementamos id de nuevos registros
            res.json(results);
        });
    });
});

conn.connect(function(err){
    if(err) throw err;
    console.log("Conexión exitosa a base de datos");
});
