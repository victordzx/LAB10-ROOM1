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
// ruta: /servicio/create/{idmascota}
app.post('/servicio/create/:idmascota', bp.urlencoded({extended: true}), function (req, res) {

    let mascotaid = req.params.idmascota;
    let cuenta = req.body.cuenta;
    let horaInicio = req.body.horaInicio;
    let duracion = req.body.duracion;
    let entrega = req.body.entrega;
    let responsable = req.body.responsable;

    let parametros = [mascotaid, cuenta, horaInicio, duracion, entrega, responsable];
    let query = "insert into servicio (mascota_idmascota, cuenta_idcuenta, hora_inicio, duracion, entrega, responsable_idresponsable) VALUES (?,?,?,?,?,?)";

    conn.query(query, parametros, function (err, result) {
        if (err) throw err;

        conn.query("select * from servicio order by idservicio desc limit 1", function (err, results) {
            res.json(results);
        });
    });
});
app.listen(3000, () => {
    console.log("Servidor corriendo en puerto 3000");
});
